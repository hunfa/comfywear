import React, { useState, useEffect } from "react";
import Table from "../../components/Table/MaterialTable";
import axios from "axios";
import { Box, CircularProgress, Typography, Button } from "@mui/material";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { setProduct } from "../../store/productSlice";

export default function Allproduct() {
  const products = useSelector((state) => state.product.products);
  // console.log(products);
  const dispatch = useDispatch();
  const [data, setdata] = useState([]);
  const router = useRouter();
  const [loading, setloading] = useState(false);
  useEffect(() => {
    if (products.length) {
      setdata(products);
    } else {
      const fetchdata = async () => {
        const responce = await axios.get("/api/getProducts");
        console.log(responce.data.payload);
        setdata(responce.data.payload);
        dispatch(setProduct(responce.data.payload));
      };
      fetchdata();
    }
  }, []);

  useEffect(() => {
    setloading(true);
    if (!localStorage.getItem("user") || !localStorage.getItem("token")) {
      router.push("/");
    } else {
      setloading(false);
    }
  }, [router.pathname]);

  const columns = [
    {
      accessorKey: "productCode",
      header: "code",
      size: 40,
    },
    {
      accessorKey: "productTitle",
      header: "Product Name",
      size: 120,
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
      size: 120,
    },
    {
      accessorKey: "rate",
      header: "Price",
      size: 300,
    },
    {
      accessorKey: "status",
      header: "status",
    },
    {
      accessorKey: "salePrice",
      header: "Sale Price",
      size: 220,
    },
    {
      accessorKey: "show",
      header: "action",
      Cell: ({ row }) => (
        <Button variant="contained" onClick={() => handleAction(row.original)}>
          Edit
        </Button>
      ),
    },
  ];

  const handleAction = (id) => {
    dispatch(setProduct(id));
    router.push("/dashboard/editProduct");
  };

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Box marginTop={"2rem"}>
            <Typography fontWeight={"bold"} fontSize={"2rem"}>
              List of all Products
            </Typography>

            <Table data={data} columns={columns} />
          </Box>
        </>
      )}
    </>
  );
}
