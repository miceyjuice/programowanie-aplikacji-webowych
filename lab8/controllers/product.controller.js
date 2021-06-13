const Product = require('../models/product.model');

const products = [];

exports.getAll = (req, res) => {
    res.status(200).send(products);
}

exports.add = (req, res) => {
    const product = new Product(req.body.id, req.body.name, req.body.description, req.body.price);
    products.push(product);
    res.status(201).send(product);
}

exports.update = (req, res) => {
    const {id, name, description, price} = req.body;
    const product = new Product(id, name, description, price);
    const searchedProductIndx = products.findIndex((product) => product.id == id);

    products.splice(searchedProductIndx, 1, product);
    res.status(200).send(product);
}

exports.delete = (req, res) => {
    const id = req.params.id;
    const searchedProductIndx = products.findIndex((product) => Number(product.id) == Number(id));

    const deletedProduct = products.splice(searchedProductIndx, 1);
    res.status(200).send(deletedProduct);
}