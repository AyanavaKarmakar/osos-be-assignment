import { Router } from "express";
import { Restaurant } from "../models/restaurant";

const router = Router();

router.get("/", async (req, res) => {
  const { latitude, longitude, radius } = req.query;
  try {
    const restaurants = await Restaurant.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [Number(longitude), Number(latitude)],
          },
          // $maxDistance: Number(radius),
        },
      },
    }).select("name description location ratings");

    const output = restaurants.map((restaurant) => {
      const { name, description, location, ratings } = restaurant;
      const averageRating = ratings.reduce((a, b) => a + b, 0) / ratings.length;
      const numberOfRatings = ratings.length;
      return {
        name,
        description,
        location: location.coordinates,
        averageRating,
        numberOfRatings,
      };
    });

    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});

export const SearchRouter = router;
