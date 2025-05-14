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

router.delete(async (req, res) => {
  const { id } = req.query;

  try {
    const deletedReview = await Rating.query().findById(id).delete();

    if (deletedReview) {
      return res.status(200).json({ message: "Review deleted successfully" });
    } else {
      return res.status(404).json({ error: "Review not found" });
    }
  } catch (error) {
    console.error("Error deleting review:", error.message, error.stack);
    return res.status(500).json({ error: "Failed to delete review" });
  }
});

export default router.handler();
