"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
const category_model_1 = require("../model/category.model");
const errorHandler_1 = require("../utility/errorHandler");
// aggregate pipeline
function fetchCategories({ skipCalculation, pageLimit, search }) {
    let query = {};
    if (search) {
        query = { name: search };
    }
    return category_model_1.CategoryModel.find(Object.assign({}, query))
        .limit(pageLimit)
        .skip(skipCalculation);
}
const createCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.body, { user } = _a, remainigData = __rest(_a, ["user"]);
        const request = remainigData;
        // check name in db to make name unique
        const category = yield category_model_1.CategoryModel.find({
            name: request.name,
        }).countDocuments();
        if (category > 0) {
            throw new errorHandler_1.ErrorHandler("Category with this name already exists.", 409);
        }
        yield category_model_1.CategoryModel.create(Object.assign({}, request));
        res.status(201).json({
            message: "Category is created successfully.",
            success: true,
        });
    }
    catch (error) {
        next(error); // skip // error middle >> response
    }
});
const getAllCategoriesByPublic = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { limit = 10, page = 1, search } = req.query; //
        const pageLimit = Number(limit);
        const pageNumber = Number(page);
        // 10 , page 1 ==> 0 ==> 1 to 10 // fetched
        //  page 2 ===> 11 to 20
        //page 3 ==> 21 to 30
        // 98 , 10
        // 98/10 , 9.... ,
        const skipCalculation = (pageNumber - 1) * limit;
        // const [categories, totalCategories] = await Promise.all([
        //   fetchCategories({
        //     pageLimit,
        //     skipCalculation,
        //     search,
        //   }),
        //   CategoryModel.find().countDocuments(),
        // ]);
        const aggregatedData = yield category_model_1.CategoryModel.aggregate([
            { $match: search ? { name: search } : {} },
            {
                $facet: {
                    data: [
                        { $sort: { createdAt: -1 } },
                        { $skip: skipCalculation },
                        { $limit: pageLimit },
                    ], // one pipeline
                    totalCount: [{ $count: "count" }], // second pipeline
                },
            },
        ]);
        const categories = aggregatedData[0].data;
        const totalCategories = aggregatedData[0].totalCount[0].count;
        const totalPage = Math.ceil(totalCategories / limit);
        res.status(201).json({
            message: "Fetched category successfully.",
            success: true,
            data: {
                data: categories,
                pagination: {
                    limit: pageLimit,
                    page: pageNumber,
                    firsPage: pageNumber === 1,
                    lastPage: totalPage === pageNumber,
                    totalPage: totalPage,
                },
            },
        });
    }
    catch (error) {
        next(error); // skip // error middle >> response
    }
});
const getAllCategoriesByAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { limit = 10, page = 1, search } = req.query; //
        const pageLimit = Number(limit);
        const pageNumber = Number(page);
        const skipCalculation = (pageNumber - 1) * limit;
        const [categories, totalCategories] = yield Promise.all([
            fetchCategories({
                pageLimit,
                skipCalculation,
                search,
            }),
            category_model_1.CategoryModel.find().countDocuments(),
        ]);
        const totalPage = Math.ceil(totalCategories / limit);
        res.status(201).json({
            message: "Fetched category successfully.",
            success: true,
            data: {
                data: categories,
                pagination: {
                    limit: pageLimit,
                    page: pageNumber,
                    firsPage: pageNumber === 1,
                    lastPage: totalPage === pageNumber,
                    totalPage: totalPage,
                },
            },
        });
    }
    catch (error) {
        next(error); // skip // error middle >> response
    }
});
module.exports = {
    createCategory,
    getAllCategoriesByPublic,
    getAllCategoriesByAdmin,
};
