import { createRouter } from "next-connect";
import Building from "../../../../../models/Building";

const router = createRouter();

router.get(async (req, res) => {
  const { dorm_id } = req.query;
  try {
    const dorm = await Building.query().findById(dorm_id);
    if (!dorm) {
      return res.status(404).json({ error: "Dorm not found" });
    }
    res.status(200).json(dorm);
  } catch (error) {
    console.error("Error fetching dorm:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router.handler();
