import mongoose, { model, Schema } from "mongoose";

// {
//     "products": [
//       {
//         "id": 1,
//         "title": "Essence Mascara Lash Princess",
//         "description": "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
//         "category": "beauty",
//         "price": 9.99,
//         "discountPercentage": 7.17,
//         "rating": 4.94,
//         "stock": 5,
//         "tags": [
//           "beauty",
//           "mascara"
//         ],
//         "brand": "Essence",
//         "sku": "RCH45Q1A",
//         "weight": 2,
//         "dimensions": {
//           "width": 23.17,
//           "height": 14.43,
//           "depth": 28.01
//         },
//         "warrantyInformation": "1 month warranty",
//         "shippingInformation": "Ships in 1 month",
//         "availabilityStatus": "Low Stock",
//         "reviews": [
//           {
//             "rating": 2,
//             "comment": "Very unhappy with my purchase!",
//             "date": "2024-05-23T08:56:21.618Z",
//             "reviewerName": "John Doe",
//             "reviewerEmail": "john.doe@x.dummyjson.com"
//           },
//           {
//             "rating": 2,
//             "comment": "Not as described!",
//             "date": "2024-05-23T08:56:21.618Z",
//             "reviewerName": "Nolan Gonzalez",
//             "reviewerEmail": "nolan.gonzalez@x.dummyjson.com"
//           },
//           {
//             "rating": 5,
//             "comment": "Very satisfied!",
//             "date": "2024-05-23T08:56:21.618Z",
//             "reviewerName": "Scarlett Wright",
//             "reviewerEmail": "scarlett.wright@x.dummyjson.com"
//           }
//         ],
//         "returnPolicy": "30 days return policy",
//         "minimumOrderQuantity": 24,
//         "meta": {
//           "createdAt": "2024-05-23T08:56:21.618Z",
//           "updatedAt": "2024-05-23T08:56:21.618Z",
//           "barcode": "9164035109868",
//           "qrCode": "..."
//         },
//         "thumbnail": "...",
//         "images": ["...", "...", "..."]
//       },
//       {...},
//       {...},
//       {...}
//       // 30 items
//     ],
//     "total": 194,
//     "skip": 0,
//     "limit": 30
//   }

const productSchema = new Schema(
  {
    title: { type: String, require: true },
    description: { type: String, default: null },
    categoryId: { type: mongoose.Types.ObjectId, ref: "Categories" },
    price: { type: Number, require: true },
    discountPercentage: { type: Number, default: null },
    stock: { type: Number, default: 0 },
    tags: [{ type: String }],
    // brand: {},
    sku: { type: String },
    weight: { type: Number },
    dimensions: [
      {
        width: { type: Number },
        height: { type: Number },
        depth: { type: Number },
      },
    ],
    // reviews: [{ type: mongoose.Types.ObjectId, ref: "Reviews" }],
    thumbnail: { type: String, require: true },
    images: [{ type: String }],
    returnPolicy: { type: String, default: null },
    minimumOrderQuantity: { type: Number, default: null },
  },
  { timestamps: true }
);

export const ProductModel = model("Products", productSchema);
