/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable indent */
const express = require('express');
const multer = require('multer');
const path = require('path');

const uploadDirectory = path.join(path.resolve(__dirname, '..'), '/public/product/images');
console.log(`uploadDirectory: ${uploadDirectory}`);
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, uploadDirectory);
    },
    filename(req, file, cb) {
        const fullName = `${Date.now()} - ${file.originalname}`;
        cb(null, fullName);
    },
});
const upload = multer({ storage });
console.log(upload);

const {
    getAllProductController, createProductController, getAProductController, updateProductController, deleteProductController,
} = require('../controller/productController');

const productRouter = express.Router();

productRouter.post('/', upload.array('images', 4), createProductController);
productRouter.get('/', getAllProductController);
productRouter.get('/:id', getAProductController);
productRouter.put('/:id', updateProductController);
productRouter.delete('/:id', deleteProductController);

module.exports = {
    productRouter,
};
