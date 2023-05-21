
import dbConnect from '../../utils/dbconnect';
import { getUser } from '../../utils/getUser';
import jwt from 'jsonwebtoken'

const JWT_SECRET = "hunfaisagoodboy";

const handler = async (req, res) => {


    if (req.method === 'POST') {
        const user = await getUser(req, res);


        if (!user) return res.send({ success: false, payload: { message: "user not found" } })



        const token = jwt.sign({ user }, JWT_SECRET);


        res.send({ success: true, payload: { token, user } })

    } else {
        res.send({ success: false })
    }


}

export default dbConnect(handler);
