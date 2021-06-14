const Product = require("../models/product.model");
const Category = require("../models/category.model");

const destructuredData = (request) => ({ ...request.body });

exports.getAll = (_, res) => {
  Product.find().populate('category').exec((err, products) => {
    res.status(200).send(products);
  });
};

exports.add = (req, res) => {
  Category.find({ _id: destructuredData(req).category }).exec(
    (err, category) => {
      const product = new Product({
        name: destructuredData(req).name,
        description: destructuredData(req).description,
        price: destructuredData(req).price,
        category: destructuredData(req).category
      });

      product.save((err) => {
        if (!err) return true;
        console.log(err);
        return false;
      });
    }
  );
};

exports.update = (req, res) => {
  Product.updateOne(
    { _id: destructuredData(req).id },
    {
      name: destructuredData(req).name,
      description: destructuredData(req).description,
      price: destructuredData(req).price,
    }
  ).exec();
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Product.deleteOne({ _id: id }).exec();
};
