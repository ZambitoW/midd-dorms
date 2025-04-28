import { createRouter } from "next-connect";
import Rating from "../../../models/Rating";

const router = createRouter();

router.post(async (req, res) => {
  const tempUserId = 1; //This should be changes when we do authentication
  try {
    //console.log("Received data:", req.body);
    const { dorm, roomType, responses, comment } = req.body;
    const rating = await Rating.query().insertAndFetch({
      userId: tempUserId, //This should be changes when we do authentication
      buildingId: dorm.toLowerCase(),
      room_type: roomType.toLowerCase(),
      storage_space: responses.storage_space,
      clean: responses.clean,
      size: responses.size,
      noise: responses.noise,
      dining_hall_proximity: responses.dining_hall_proximity,
      ac_proximity: responses.ac_proximity,
      public_bathrooms: responses.public_bathrooms,
      public_kitchens: responses.public_kitchens,
      elevators: responses.elevators,
      laundry: responses.laundry,
      comment: comment,
      created_at: new Date().toISOString(),
    });
    res.status(200).json(rating);
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router.handler();
