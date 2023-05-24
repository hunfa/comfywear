import React, { useState, useEffect } from "react";
import Table from "../../components/Table/MaterialTable";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";

const Allorders = () => {
  const router = useRouter();
  const [data, setdata] = useState([]);
  useEffect(() => {
    const fetchdata = async () => {
      const responce = await axios.get("/api/getOrders");
      console.log(responce.data.payload);
      setdata(responce.data.payload);
    };

    fetchdata();
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("user") || !localStorage.getItem("token")) {
      router.push("/");
    }
  }, [router.pathname]);

  const columns = [
    {
      accessorKey: "branch",
      header: "Branch",
      size: 40,
    },
    {
      accessorKey: "date",
      header: "Date",
      size: 120,
    },
    {
      accessorKey: "totalEarning",
      header: "Total Earning",
      size: 120,
    },
    {
      accessorKey: "orders.type",
      header: "type",
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
      <Box marginTop={"2rem"}>
        <Typography fontWeight={"bold"} fontSize={"2rem"}>
          List of all Orders
        </Typography>
        <Table data={data} columns={columns} />
      </Box>
    </>
  );
};

export default Allorders;
