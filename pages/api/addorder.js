import dbConnect from "../../utils/dbconnect";
import { getUser } from "../../utils/getUser";
import jwt from "jsonwebtoken";
import Product from "../../schema/productSchema";

const JWT_SECRET = "hunfaisagoodboy";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const user = await getUser(req, res);

    if (!user)
      return res.send({
        success: false,
        payload: { message: "user not found" },
      });





      
   
  } else {
    res.send({ success: false });
  }
};

export default dbConnect(handler);
