import React, { useState, useEffect } from "react";
import Table from "../../components/Table/MaterialTable";
import axios from "axios";

export default function allproduct() {
  const [data, setdata] = useState([]);
  useEffect(() => {
    const fetchdata = async () => {
      const responce = await axios.get("/api/getProducts");
      console.log(responce.data.payload);
      setdata(responce.data.payload);
    };

    fetchdata();
  }, []);

  const [getproducts, setgetproducts] = useState([]);
  return (
    <>
      <Table data={data} />
    </>
  );
}
