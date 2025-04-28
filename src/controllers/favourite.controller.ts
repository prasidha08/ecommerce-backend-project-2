import { NextFunction, Request, Response } from "express";
import { ReviewModel } from "../model/review.model";
import mongoose, { Error } from "mongoose";
import { FavouriteZodType } from "../types/favourite";
import { FavouriteModel } from "../model/favourite.model";
import { ErrorHandler } from "../utility/errorHandler";

const createFavourite = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user, ...remainigFavReqBody } = req.body;

  const remainigFavouriteRequest: FavouriteZodType = remainigFavReqBody;

  try {
    const isFavProduct = await FavouriteModel.find({
      userId: user._id,
      productId: remainigFavouriteRequest.productId,
    }).exec();

    const [favProduct] = isFavProduct;

    if (favProduct?._id) {
      throw new ErrorHandler("Already exits", 409);
    } else {
      await FavouriteModel.create({
        ...remainigFavouriteRequest,
        userId: user._id,
      });
    }

    res.status(201).json({
      message: "Favourite product is created successfully",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const deleteFavourite = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { favouriteId } = req.params;

  try {
    const favourite = await FavouriteModel.findByIdAndDelete({
      _id: favouriteId,
    });

    if (favourite === null) {
      throw new ErrorHandler("Fav product doesnot exists", 404);
    }

    res.status(200).json({
      message: "Fav product is deleted successfully",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const getFavouriteLists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.body.user;

  try {
    const result = await FavouriteModel.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(user._id as string),
        },
      },
      {
        $lookup: {
          as: "products",
          from: "products",
          localField: "productId", //Field from the input documents
          foreignField: "_id", //  Field from the documents of the "from"    collection
        },
      },
      {
        $unwind: {
          path: "$products",
          preserveNullAndEmptyArrays: true,
        },
      },
      { $replaceRoot: { newRoot: { $mergeObjects: ["$products", "$$ROOT"] } } },
      {
        $project: {
          _id: 0,
          userId: 0,
          productId: 0,
          createdAt: 0,
          updatedAt: 0,
          products: 0,
        },
      },
    ]);

    // const result = [{ _id:"1", userId:"1",cret: products:[{id:"p1"},{id:"p2"}]}]

    // const result =[{_id:"1",userId:"1",products:{id:"p1"}},{_id:"1",userId:"1",products:{id:"p2"}}]

    res.status(200).json({
      message: "Review is fetched successfully.",
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export = {
  createFavourite,
  deleteFavourite,
  getFavouriteLists,
};
