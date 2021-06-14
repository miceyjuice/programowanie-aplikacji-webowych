const Category = require("../models/category.model");

const destructuredData = (request) => ({ ...request.body });

exports.getAll = (req, res) => {
  Category.find().exec((err, categories) => {
    res.status(200).send(categories);
  });
};

exports.add = (req, res) => {
  const category = new Category({
    name: destructuredData(req).name,
  });

  category.save((err) => {
    if (!err) return true;
    console.log(err);
    return false;
  });
};

exports.update = (req, res) => {
  Category.updateOne(
    { _id: destructuredData(req).id },
    {
      name: destructuredData(req).name,
    }
  ).exec();
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Product.deleteOne({ _id: id }).exec();
};
