import { createRouter } from "next-connect";
import User from "../../../../../models/User";

const router = createRouter();

router.put(async (req, res) => {
  const { classYear } = req.body;
  const { id } = req.query;
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

export default router.handler();
