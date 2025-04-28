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
      id: "Gifford",
      name: "Gifford",
      building_type: "Suites, Singles",
      residents: "Sophmores",
      mapId: "511466",
    },
    battell: {
      id: "Battell",
      name: "Battell",
      building_type: "Singles, Doubles",
      residents: "Freshman",
      mapId: "511452",
    },
    forest: {
      id: "Forest",
      name: "Forest",
      building_type: "Sink-mate singles",
      residents: "Seniors/Febs",
      mapId: "571679",
    },
  };

  const dorm = dorms[dorm_id];

  if (!dorm) {
    res.status(404).json({ error: "Dorm not found" });
  } else {
    res.status(200).json(dorm);
  }
}
