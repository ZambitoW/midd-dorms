import { createRouter } from "next-connect";
import User from "../../../models/User";
import Rating from "../../../models/Rating";
import { getSession } from "next-auth/react";

const router = createRouter();

router.get(async (req, res) => {
  const session = await getSession({ req });

  if (!session || !session.user?.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const userID = session.user.id;
  try {
    const user = await User.query().findById(userID).throwIfNotFound();
    const reviews = await Rating.query().where("userId", userID);

    const ratingFields = [
      "storage_space",
      "size",
      "noise",
      "dining_hall_proximity",
      "ac_proximity",
      "public_bathrooms",
      "public_kitchens",
      "elevators",
      "laundry",
    ];

    res.status(200).json({
      userInfo: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        classYear: user.classYear,
      },
      pastReviews: reviews.map((review) => {
        const validRatings = ratingFields
          .map((field) => review[field])
          .filter((value) => value != null);

        const averageRating = validRatings.length
          ? (
              validRatings.reduce((sum, value) => sum + value, 0) /
              validRatings.length
            ).toFixed(1)
          : "0.0";

        return {
          id: review.id,
          Dorm: review.buildingId,
          RoomType: review.room_type,
          Rating: averageRating,
          comment: review.comment,
          date: new Date().toISOString().split("T")[0],
        };
      }),
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({ error: "Failed to fetch user data" });
  }
});

router.put(async (req, res) => {
  const { id, classYear } = req.body;
  try {
    const user = await User.query().findById(id).throwIfNotFound();

    const updatedUser = await user.$query().updateAndFetch({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      classYear: parseInt(classYear),
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error.message, error.stack);
    return res.status(500).json({ error: "Failed to update user data" });
  }
});
router.delete(async (req, res) => {
  const { reviewId } = req.body;

  try {
    const deletedReview = await Rating.query().findById(reviewId).delete();

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
