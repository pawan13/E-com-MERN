/* eslint-disable consistent-return */
/* eslint-disable padded-blocks */
/* eslint-disable no-underscore-dangle */
/* eslint-disable indent */
const { default: slugify } = require('slugify');

const { message: { SUCCESS } } = require('../utils/const');
const {
    createCategory, getCategoriesByFilter, getCategoryById, updateCategoryById, deleteCategoryById,
} = require('../model/category/CategoryModel');

const createCategoryController = async (req, res, next) => {
    try {
        const obj = { ...req.body };
        obj.slug = slugify(obj.title, {
            trim: true,
            lower: true,
        });
        await createCategory(obj);
        res.json({
            status: SUCCESS,
            message: 'New category is created',
        });
    } catch (error) {
        next(error);
    }
};
const getAllCategoryController = async (req, res, next) => {
    try {
        const result = await getCategoriesByFilter({});
        if (!result) {
            const error = new Error('Not found');
            error.statusCode = 404;
            return next(error);
        }
        res.json({
            status: SUCCESS,
            result,
        });
    } catch (error) {
        next(error);
    }
};
const getACategoryController = async (req, res, next) => {
    try {
        const _id = req.params;
        const result = await getCategoryById(_id);
        if (!result) {
            const error = new Error('Not found');
            error.statusCode = 404;
            return next(error);
        }
        res.json({
            status: SUCCESS,
            result,
        });
    } catch (error) {
        next(error);
    }
};
const updateCategoryController = async (req, res, next) => {
    try {
        const _id = req.params;

        const result = await updateCategoryById(_id, req.body);
        res.json({
            status: SUCCESS,
            result,
        });
    } catch (error) {
        next(error);
    }
};
const deleteCategoryController = async (req, res, next) => {
    try {
        const _id = req.params;
        const result = await deleteCategoryById(_id);
        if (!result) {
            const error = new Error('Not Found');
            error.statusCode = 404;
            return next(error);
        }
        res.json({
            status: SUCCESS,
            message: 'Sucessfully deleted',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createCategoryController, getAllCategoryController, getACategoryController, updateCategoryController, deleteCategoryController,
};
