/* eslint-disable indent */
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    status: {
        type: String,
        required: true,
        default: 'Available',
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },

}, { timestamps: true });

const product = mongoose.model('product', productSchema);
const createProduct = (prodObj) => product.create(prodObj);
const getProductById = (id) => product.findById(id);
const getProductsByFilter = (filter) => product.find(filter);
const updateProductById = (id) => product.findByIdAndUpdate(id);
const deleteProductById = (id) => product.findByIdAndDelete(id);

module.exports = {
    createProduct, getProductById, getProductsByFilter, updateProductById, deleteProductById,
};
