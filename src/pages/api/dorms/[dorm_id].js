// export default async function handler(req, res) {
//     const { dorm_id } = req.query;
//     const dorm = await db("dorms").where({ dorm_id }).first();

//     if (!dorm) {
//       res.status(404).json({ error: "Dorm not found" });
//     } else {
//       res.status(200).json(dorm);
//     }
//   }

// test stuff:

export default function handler(req, res) {
  const { dorm_id } = req.query;

  const dorms = {
    gifford: {
      dorm_id: "gifford",
      name: "Gifford Hall",
      building_type: "Suites, Singles",
      residents: "Sophmores",
    },
    battell: {
      dorm_id: "battell",
      name: "Battell",
      building_type: "Singles, Doubles",
      residents: "Freshman",
    },
    forest: {
      dorm_id: "forest",
      name: "Forest",
      building_type: "Sink-mate singles",
      residents: "Seniors/Febs",
    },
  };

  const dorm = dorms[dorm_id];

  if (!dorm) {
    res.status(404).json({ error: "Dorm not found" });
  } else {
    res.status(200).json(dorm);
  }
}
