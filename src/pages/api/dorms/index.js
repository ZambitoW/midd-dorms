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

/*
    // need a 'dorms' table with the list of dorms we have info, for now just Giff

// export default async function handler(req, res) {
//     const dorms = await db("dorms").select("dorm_id", "name");
//     res.status(200).json(dorms);
//   }

// temp route for testing
export default function handler(req, res) {
    res.status(200).json([
      { dorm_id: "gifford", name: "Gifford" },
      { dorm_id: "battell", name: "Battell" },
      { dorm_id: "forest", name: "Forest" },
    ]);
  }
  */

export default router.handler();
