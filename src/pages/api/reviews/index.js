import User from "../../../../models/User";
import Rating from "../../../../models/Rating";
import { getSession } from "next-auth/react";
import { createRouter } from "next-connect";

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
          .filter((value) => value !== 0);

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
          date: review.created_at.toISOString().split("T")[0],
        };
      }),
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({ error: "Failed to fetch user data" });
  }
});

export default router.handler();
