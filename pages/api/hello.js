import dbConnect from "../../utils/dbconnect";
export default async function handler(req, res) {
  await dbConnect();
  res.status(200).json({ name: "John Doe" });
}
