/* eslint-disable indent */
const express = require('express');
const {
    getAllProductController, createProductController, getAProductController, updateProductController, deleteProductController,
} = require('../controller/productController');

const productRouter = express.Router();

productRouter.post('/', createProductController);
productRouter.get('/', getAllProductController);
productRouter.get('/:id', getAProductController);
productRouter.put('/:id', updateProductController);
productRouter.delete('/:id', deleteProductController);

module.exports = {
    productRouter,
};
