import dbConnect from "../../utils/dbconnect";
import Product from "../../schema/productSchema";

const JWT_SECRET = "hunfaisagoodboy";

const handler = async (req, res) => {
  if (req.method === "POST") {
    console.log(req.body.isvariant);
    const {
      productcode,
      title,
      quantity,
      Price,
      salePrice,
      brand,
      stuff,
      category,
      status,
      // variant,
    } = req.body.data;
    // const variantStatus = req.body.isvariant;

    let product;
    try {
      console.log("run try");
      product = new Product({
        productCode: productcode,
        productTitle: title,
        quantity: quantity,
        rate: Price,
        salePrice: salePrice,
        brand: brand,
        stuff: stuff,
        category: category,
        status: status,
        // variantStatus: variantStatus,
        // variant: variantStatus === "no" ? null : variant,
      });
      await product.save();
      return res.send({ success: true });
    } catch (error) {
      console.log("error", error);
      return res.send({ success: false, error: error });
    }
  } else {
    res.send({ success: false });
  }
};

export default dbConnect(handler);
