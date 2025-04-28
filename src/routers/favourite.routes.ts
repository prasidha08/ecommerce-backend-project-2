import express from "express";
import { authentication } from "../middleware/authentication";
import { authorization } from "../middleware/authorization";
import { ROLE } from "../model/user.model";
import { validateData } from "../utility/validator";
import { FavouriteZodSchema } from "../types/favourite";
// import controllers from "../controllers/favourite.controller";

const { deleteFavourite, getFavouriteLists, createFavourite } = controllers;

const router = express.Router();

// add to fav

router.post(
  "/api/favourites",
  authentication,
  authorization([ROLE.CUSTOMER]),
  validateData(FavouriteZodSchema), // req.body validation
  createFavourite
);

// remove from fav
router.delete(
  "/api/favourites/:favouriteId",
  authentication,
  authorization([ROLE.CUSTOMER]),
  deleteFavourite
);

// fetch favourite list of a user
router.get(
  "/api/favourites",
  authentication,
  authorization([ROLE.CUSTOMER]),
  getFavouriteLists
);

export = router;
