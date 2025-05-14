import { createRouter } from "next-connect";
import Rating from "../../../../models/Rating";

const router = createRouter();

router.put(async (req, res) => {
  const { id } = req.query;
  const newReview = req.body;
  try {
    const review = await Rating.query().findById(id).throwIfNotFound();
    const updatedReview = await review
      .$query()
      .updateAndFetchById(id, newReview);
    res.status(200).json(updatedReview);
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get(async (req, res) => {
  const { id } = req.query;
  try {
    const review = await Rating.query().findById(id).throwIfNotFound();
    res.status(200).json(review);
  } catch (error) {
    console.error("Error fetching review:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router.handler();
