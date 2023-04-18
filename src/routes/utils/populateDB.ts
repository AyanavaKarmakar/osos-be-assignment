import { Router } from "express";
import { Restaurant } from "../../models/restaurant";

const router = Router();

// used to populate the database with random restaurants within a given radius
function getRandomCoordinates(center: number[], radius: number) {
  const randomRadius = Math.random() * radius;
  const randomAngle = Math.random() * 2 * Math.PI;
  const dx = randomRadius * Math.cos(randomAngle);
  const dy = randomRadius * Math.sin(randomAngle);
  const newLongitude =
    center[0] + dx / (111.32 * Math.cos((center[1] * Math.PI) / 180));
  const newLatitude = center[1] + dy / 111.32;

  return [newLongitude, newLatitude];
}

router.post("/addrestaurants", async (req, res) => {
  const { centerLongitude, centerLatitude, radius, numberOfRestaurants } =
    req.body;

  const center = [centerLongitude, centerLatitude];

  const restaurants = [];

  for (let i = 0; i < numberOfRestaurants; i++) {
    const randomCoordinates = getRandomCoordinates(center, radius);

    const restaurant = new Restaurant({
      name: `Restaurant \${i + 1}`,
      description: `Sample description for Restaurant \${i + 1}`,
      location: {
        type: "Point",
        coordinates: randomCoordinates,
      },
      ratings: [Math.floor(Math.random() * 5) + 1],
    });

    restaurants.push(restaurant);
  }

  try {
    await Restaurant.insertMany(restaurants);
    res.status(201).send(restaurants);
  } catch (error) {
    res.status(500).send(error);
  }
});

export const PopulateDBRouter = router;
