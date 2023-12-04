/* eslint-disable object-curly-newline */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
const express = require('express');
const { getAllCategoryController, createCategoryController, getACategoryController, updateCategoryController, deleteCategoryController } = require('../controller/categoryController');
const { createCategoryValidation } = require('../middleware/joiValidation/categoryValidation');

const categoryRouter = express.Router();

// categoryCRUD
categoryRouter.post('/', createCategoryValidation, createCategoryController);
categoryRouter.get('/', getAllCategoryController);
categoryRouter.get('/_id', getACategoryController);
categoryRouter.put('/_id', updateCategoryController);
categoryRouter.delete('/_id', deleteCategoryController);

module.exports = {
    categoryRouter,
};
