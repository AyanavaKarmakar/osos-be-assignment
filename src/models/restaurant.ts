import { Schema, Document, Model, model } from "mongoose";

// Refer: https://mongoosejs.com/docs/typescript/statics.html

interface IRestaurant {
  name: string;
  description: string;
  location: {
    type: string;
    coordinates: number[];
  };
  ratings: number[];
}

export interface IRestaurantDocument extends IRestaurant, Document {}
export interface RestaurantModel extends Model<IRestaurantDocument> {}

const RestaurantSchema = new Schema({
  name: String,
  description: String,
  location: {
    type: { type: String, default: "Point" },
    coordinates: { type: [Number], index: "2dsphere" },
  },
  ratings: [Number],
});

RestaurantSchema.index({ location: "2dsphere" });

export const Restaurant = model<IRestaurantDocument, RestaurantModel>(
  "Restaurant",
  RestaurantSchema
);
