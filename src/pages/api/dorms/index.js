import Building from "../../../../models/Building";
import { createRouter } from "next-connect";

const router = createRouter();

router.get(async (req, res) => {
  try {
    const dorms = await Building.query();

    res.status(200).json(dorms);
  } catch (error) {
    console.error("Error fetching dorms:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router.handler();
