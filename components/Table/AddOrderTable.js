import React from 'react'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
function AddOrderTable({rows,invoiceSubtotal,invoiceDiscount,invoiceTotal}) {

    const ccyFormat=(num)=> {
        return `${num.toFixed(2)}`;
      }

  return (
    <TableContainer
        component={Paper}
        sx={{ width: "97%", mx: "auto", marginTop: "20px" }}
      >
        <Table sx={{ minWidth: 700 }} aria-label="spanning table">
          <TableHead>
           
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
              <TableCell>Discount</TableCell>
              <TableCell align="right">{`${(invoiceDiscount * 100).toFixed(
                0
              )} %`}</TableCell>
              <TableCell align="right">{ccyFormat(0)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
  )
}

export default React.memo(AddOrderTable)