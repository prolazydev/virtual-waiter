import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';

import type { ProductCategory } from '@/db/models/ProductCateogry';

import { respond } from '@/utils/common/http';
import { Message } from '@/utils/common/ServerResponseMessages';
import { requestHandler } from '@/utils/common/asyncErrorHandler';
import { handleError } from '@/utils/errors/error';

import { 
    createProductCategory, 
    findAllProductCategories, 
    findProductCategoryById, 
    findProductCategoriesByName,
    findProductCategoriesByCustomQuery, 
    deleteProductCategoriesByUserId,
    findAndUpdateProductCategoryById,
    deleteProductCategoriesByUserIdTransaction 
} from '@/services/CRUD/productCategory.service';

export const registerProductCategory = requestHandler<ProductCategory>(async (req, res) => {
    try {
        const body = req.body;
        if (!body) 
            return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);
        
        const productCategory = await createProductCategory(body);
        respond(res, StatusCodes.CREATED, Message.SuccessCreate, productCategory);
    } catch (error) {
        handleError(res, error);
    }
});

export const getAllProductCategories = requestHandler(async (req, res) => {
    try {
        const productCategories = await findAllProductCategories();
        respond(res, StatusCodes.OK, Message.SuccessRead, productCategories);
    } catch (error) {
        handleError(res, error);
    }
});

export const getProductCategoryById = requestHandler(async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) 
            return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);
        
        const productCategory = await findProductCategoryById(id);
        if (!productCategory)
            return respond(res, StatusCodes.NOT_FOUND, Message.NotFound);
            
        respond(res, StatusCodes.OK, Message.SuccessRead, productCategory);
    } catch (error) {
        handleError(res, error);
    }
});

export const getProductCategoriesByName = requestHandler(async (req, res) => {
    try {
        const { name } = req.query;
        if (!name || typeof name !== 'string')
            return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);

        const productCategories = await findProductCategoriesByName(name);
        respond(res, StatusCodes.OK, Message.SuccessRead, productCategories);
    } catch (error) {
        handleError(res, error);
    }
});

export const updateProductCategoryById = requestHandler(async (req, res) => {
    try {
        const id = req.params.id;
        const updates = req.body;
        
        if (!id || !updates)
            return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);

        const updatedCategory = await findAndUpdateProductCategoryById(id, updates);
        if (!updatedCategory)
            return respond(res, StatusCodes.NOT_FOUND, Message.NotFound);

        respond(res, StatusCodes.OK, Message.SuccessUpdate, updatedCategory);
    } catch (error) {
        handleError(res, error);
    }
});

export const deleteProductCategoryById = requestHandler(async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId)
            return respond(res, StatusCodes.BAD_REQUEST, Message.InvalidInput);

        await deleteProductCategoriesByUserId(userId);
        respond(res, StatusCodes.OK, Message.SuccessDelete);
    } catch (error) {
        handleError(res, error);
    }
});