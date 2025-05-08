import { createRouter } from "next-connect";
import Rating from "../../../models/Rating";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";

const router = createRouter();

router.post(async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    const tempUserId = 1; //This should be changes when we do authentication
    try {
      //console.log("Received data:", req.body);
      const { dorm, roomType, responses, comment } = req.body;
      const rating = await Rating.query().insertAndFetch({
        userId: tempUserId, //This should be changes when we do authentication
        buildingId: dorm,
        room_type: roomType,
        storage_space: responses.storage_space || 0,
        clean: responses.clean || 0,
        size: responses.size || 0,
        noise: responses.noise || 0,
        dining_hall_proximity: responses.dining_hall_proximity || 0,
        ac_proximity: responses.ac_proximity || 0,
        public_bathrooms: responses.public_bathrooms || 0,
        public_kitchens: responses.public_kitchens || 0,
        elevators: responses.elevators || 0,
        laundry: responses.laundry || 0,
        comment: comment,
        created_at: new Date().toISOString(),
      });
      res.status(200).json(rating);
    } catch (error) {
      console.error("Error processing request:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(403).end("You must be signed in to access this endpoint.");
  }
});

export default router.handler();
