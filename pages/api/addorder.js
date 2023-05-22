import dbConnect from "../../utils/dbconnect";
import { getUser } from "../../utils/getUser";
import jwt from "jsonwebtoken";
import Product from "../../schema/productSchema";

const JWT_SECRET = "hunfaisagoodboy";

const handler = async (req, res,client) => {
  if (req.method === "POST") {
    const user = await getUser(req, res);

    if (!user)
      return res.send({
        success: false,
        payload: { message: "user not found" },
      });
const {totalItems,products}= req.body;

      const session = client.startSession();
try {
     // Start a session
     await session.withTransaction(async () => {

        for (let i = 0; i < totalItems; i++) {
           
            await Product.findByIdAndUpdate(
                {_id:[products[i]._id]},
                {$inc:{quantity: -products[i].qty }}
                )
            
        }


     })


} catch (error) {
    res.send({success:false,payload:"Network Error"})
}
finally{
    if (session) await session.endSession();
}











   
  } else {
    res.send({ success: false });
  }
};

export default dbConnect(handler);
