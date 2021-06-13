const Category = require('../models/category.model');

const categories = [];

exports.getAll = (req, res) => {
    res.status(200).send(categories);
}

exports.add = (req, res) => {
    const {id, name} = req.body;
    const category = new Category(id, name);
    categories.push(category);
    res.status(201).send(category);
}

exports.update = (req, res) => {
    const {id, name} = req.body;
    const category = new Category(id, name);
    const searchedProductIndx = categories.findIndex((category) => category.id == id);

    categories.splice(searchedProductIndx, 1, category);
    res.status(200).send(category);
}

exports.delete = (req, res) => {
    const id = req.params.id;
    const searchedCategoryIndx = categories.findIndex((category) => Number(category.id) == Number(id));

    const deletedCategory = categories.splice(searchedCategoryIndx, 1);
    res.status(200).send(deletedCategory);
}