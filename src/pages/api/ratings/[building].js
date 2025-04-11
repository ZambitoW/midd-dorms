import { createRouter } from "next-connect";
import { onError } from "@/lib/middleware";
//gonna need more imports

const router = createRouter();

router.get(async (req, res) => {
  const { building } = req.query;
  const buildingRatings = await Rating.query()
    .where("buildingId", building)
    .throwIfNotFound();
  res.status(200).json(buildingRatings);
});

// Notice the `onError` middleware for aspect-oriented error handler. That middleware
// will be invoked if the handler code throws an exception.
export default router.handler({ onError });
