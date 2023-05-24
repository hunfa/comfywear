import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useScanDetection from "use-scan-detection";
import { useSelector } from "react-redux";
import { Box, Button, TextField } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Backdroploading from "../../components/backdrop";
import axios from "axios";
import moment from "moment/moment";
const TAX_RATE = 0;

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit, code, product) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price, code, product };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AddOrder() {
  const [rows, setrows] = React.useState([]);
  const [dueAmount, setdueAmount] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [apiLoading, setapiLoading] = React.useState(false);
  const [snackbar, setsnackbar] = React.useState({ msg: "", status: "" });
  const paidAmount = React.useRef(0);
  const invoiceDiscount = 0;
  const products = useSelector((state) => state.product.products);
  const invoiceSubtotal = subtotal(rows);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  React.useEffect(() => {
    if (snackbar.msg) openSnackBar();
  }, [snackbar]);
  const openSnackBar = () => {
    setOpen(true);
  };

  const closeSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const alreadyExistsInRow = (code) => {
    for (let i = 0; i < rows.length; i++) {
      if (code === rows[i].code) return true;
    }
    return false;
  };

  const updateCurrentRow = (product) => {
    const newState = rows.map((row) => {
      if (row.code === product.productCode) {
        return createRow(row.desc, row.qty + 1, row.unit, row.code, product);
      }
      return row;
    });
    setrows(newState);
  };
  const getProduct = (barcode) => {
    for (let i = 0; i < products.length; i++) {
      if (products[i].productCode === barcode) {
        return products[i];
      }
    }
    return null;
  };

  useScanDetection({
    onComplete: (barcode) => {
      const product = getProduct(barcode);
      if (!product) return;

      if (alreadyExistsInRow(product.productCode)) updateCurrentRow(product);
      else
        setrows([
          ...rows,
          createRow(
            product.productTitle,
            1,
            product.salePrice,
            product.productCode,
            product
          ),
        ]);
    },
    minLength: 2,
  });

  const handlePaidAmount = (e) => {
    if (!e.target.value) {
      setdueAmount(0);
    } else {
      const paidAmount = parseInt(e.target.value);
      setdueAmount(paidAmount - invoiceTotal);
    }
  };

  const handleReset = () => {
    setrows([]);
    setdueAmount(0);
  };

  const handleOrder = async () => {
    if (rows.length <= 0) return;
    setapiLoading(true);

    const products = rows.map((p) => {
      return {
        title: p.product.productTitle,
        code: p.product.productCode,
        rate: p.product.rate,
        salePrice: p.product.salePrice,
        qty: p.qty,
        _id: p.product._id,
      };
    });
    const newObj = {
      name: "hunfa",
      contact: "03004245465",
      totalItems: rows.length,
      paid: paidAmount.current,
      due: dueAmount,
      total: invoiceTotal,
      type: "cash",
      date: moment().format("DD/MM/YYYY"),
      subTotal: invoiceSubtotal,
      tax: invoiceTaxes,
      discount: invoiceDiscount,
      products,
      branch: JSON.parse(localStorage.getItem("user")).branch,
    };

    try {
      const res = await axios.post(`/api/addorder`, {
        newObj,
      });
      console.log(res);
      if (res.data.success) {
        setsnackbar({ msg: "Order Placed Successfully", status: "success" });
      }
    } catch (error) {
      console.log(error);
      setsnackbar({ msg: "Error: Order Failed", status: "error" });
    }

    setapiLoading(false);
  };

  return (
    <>
      {apiLoading && <Backdroploading />}
      <Snackbar open={open} autoHideDuration={6000} onClose={closeSnackBar}>
        <Alert
          onClose={closeSnackBar}
          severity={snackbar.status}
          sx={{ width: "100%" }}
        >
          {snackbar.msg}
        </Alert>
      </Snackbar>
      <TableContainer
        component={Paper}
        sx={{ width: "97%", mx: "auto", marginTop: "20px" }}
      >
        <Table sx={{ minWidth: 700 }} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={3}>
                Details
              </TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Desc</TableCell>
              <TableCell align="right">Qty.</TableCell>
              <TableCell align="right">Unit</TableCell>
              <TableCell align="right">Sum</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.code}>
                <TableCell>{row.desc}</TableCell>
                <TableCell align="right">{row.qty}</TableCell>
                <TableCell align="right">{row.unit}</TableCell>
                <TableCell align="right">{ccyFormat(row.price)}</TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Tax</TableCell>
              <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
                0
              )} %`}</TableCell>
              <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Paper
        sx={{
          marginTop: "20px",
          width: "97%",
          mx: "auto",
          padding: 1,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <TextField
          type="number"
          value={dueAmount}
          label="Due Amount"
          variant="filled"
          disabled
        ></TextField>
        <TextField
          type="number"
          label="Paid Amount"
          variant="filled"
          onChange={handlePaidAmount}
        ></TextField>
      </Paper>
      <Box
        width={"97%"}
        mx={"auto"}
        textAlign={"right"}
        marginTop={2}
        display={"flex"}
        justifyContent={"space-between"}
      >
        <Button
          variant="contained"
          color="error"
          size="large"
          onClick={handleReset}
        >
          Reset
        </Button>
        <Button variant="contained" size="large" onClick={handleOrder}>
          Place Order
        </Button>
      </Box>
    </>
  );
}

export default AddOrder;
