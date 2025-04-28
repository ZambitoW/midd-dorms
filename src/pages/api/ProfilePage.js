import { createRouter } from "next-connect";
import User from "../../../models/User"; // Assuming you have a User model
import Rating from "../../../models/Rating"; // Assuming you have a Rating model

const router = createRouter();

router.get(async (req, res) => {
  const tempUserID = 1; // Placeholder, replace with dynamic user ID when available
  try {
    const user = await User.query().findById(tempUserID).throwIfNotFound();

    const reviews = await Rating.query().where("userId", tempUserID);

    // Respond with user data and reviews
    res.status(200).json({
      userInfo: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        classYear: user.classYear,
      },
      pastReviews: reviews.map((review) => ({
        id: review.id,
        Dorm: review.buildingId,
        RoomType: review.room_type,
        Rating: (
          ((review.storage_space || 0) +
            (review.size || 0) +
            (review.noise || 0) +
            (review.dining_hall_proximity || 0) +
            (review.ac_proximity || 0) +
            (review.public_bathrooms || 0) +
            (review.public_kitchens || 0) +
            (review.elevators || 0) +
            (review.laundry || 0)) /
          9
        ).toFixed(1),
        comment: review.comment, // Placeholder, modify if you add comments to the Rating model
        date: new Date().toISOString().split("T")[0], // Placeholder date
      })),
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({ error: "Failed to fetch user data" });
  }
});

router.put(async (req, res) => {
  const { id, classYear } = req.body; // Extract `id` and `classYear` from the request body
  try {
    // Find the user by ID
    const user = await User.query().findById(id).throwIfNotFound();

    // Update only the classYear field
    const updatedUser = await user.$query().updateAndFetch({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      classYear: parseInt(classYear), // Ensure it's an integer
    });

    // Respond with the updated user data
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error.message, error.stack);
    return res.status(500).json({ error: "Failed to update user data" });
  }
});

export default router.handler();
