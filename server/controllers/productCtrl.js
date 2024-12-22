const Product = require("../models/productModel");
const {
  uploadImageToCloudinary,
  deleteImageFromCloudinary,
} = require("../utils/cloudinary");
const fs = require("node:fs");

exports.createProductCtrl = async (req, res) => {
  const {
    productName,
    category,
    brand,
    description,
    price,
    discount,
    color,
    sizes,
  } = req.body;
  try {
    if (!req.files.length) {
      return res.status(400).json({ msg: "you must add one image atleast" });
    }
    let images = [];
    for (const image of req.files) {
      const result = await uploadImageToCloudinary(image.path);
      images.push({ url: result.secure_url, publicId: result.public_id });
    }
    const product = new Product({
      productName,
      category,
      brand,
      description,
      price,
      discount,
      color,
      sizes,
      productImages: images,
    });
    await product.save();
    res.status(201).json({ msg: "product created successfully", product });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "error creating product" });
  } finally {
    if (req.files.length) {
      for (const image of req.files) {
        fs.unlinkSync(image.path);
      }
    }
  }
};

exports.getAllProductsCtrl = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "error get all products" });
  }
};

exports.getProductCtrl = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ msg: "product not found" });
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "error get product" });
  }
};

exports.updateProductCtrl = async (req, res) => {
  const {
    productName,
    category,
    brand,
    description,
    price,
    discount,
    color,
    sizes,
  } = req.body;
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ msg: "product not found" });
    if (req.files.length) {
      for (const image of product.productImages) {
        if (image.publicId) {
          await deleteImageFromCloudinary(image.publicId);
        }
      }
      let images = [];
      for (const image of req.files) {
        const result = await uploadImageToCloudinary(image.path);
        images.push({ url: result.secure_url, publicId: result.public_id });
      }
      product.productImages = images;
      await product.save();
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        $set: {
          productName,
          category,
          brand,
          description,
          price,
          discount,
          color,
          sizes,
        },
      },
      { new: true }
    );
    res
      .status(200)
      .json({ msg: "product updated successfully", product: updatedProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "error update product" });
  } finally {
    if (req.files.length) {
      for (const image of req.files) {
        fs.unlinkSync(image.path);
      }
    }
  }
};

exports.deleteProductCtrl = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ msg: "product not found" });
    for (const image of product.productImages) {
      if (image.publicId) {
        await deleteImageFromCloudinary(image.publicId);
      }
    }
    const deletedProduct = await Product.findByIdAndDelete(id);
    res
      .status(200)
      .json({ msg: "Product deleted successfully", product: deletedProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "error delete product" });
  }
};