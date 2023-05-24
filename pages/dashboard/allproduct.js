import React, { useState, useEffect } from "react";
import Table from "../../components/Table/MaterialTable";
import axios from "axios";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useRouter } from "next/router";

export default function Allproduct() {
  const [data, setdata] = useState([]);
  const router = useRouter();
  const [loading, setloading] = useState(false);
  useEffect(() => {
    const fetchdata = async () => {
      const responce = await axios.get("/api/getProducts");
      console.log(responce.data.payload);
      setdata(responce.data.payload);
    };

    fetchdata();
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
  ];

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
