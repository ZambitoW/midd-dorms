import { createRouter } from "next-connect";
import Rating from "../../../../../models/Rating";

const router = createRouter();

router.get(async (req, res) => {
  const { dorm_id } = req.query;
  try {
    const reviews = await Rating.query().where({ buildingId: dorm_id });
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router.handler();
