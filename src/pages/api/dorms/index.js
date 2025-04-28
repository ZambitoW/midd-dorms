// need a 'dorms' table with the list of dorms we have info, for now just Giff

// export default async function handler(req, res) {
//     const dorms = await db("dorms").select("dorm_id", "name");
//     res.status(200).json(dorms);
//   }

// temp route for testing
export default function handler(req, res) {
  res.status(200).json([
    {
      dorm_id: "gifford",
      name: "Gifford",
      roomTypes: ["suite", "single"],
      amenities: ["laundry", "kitchen"],
      accessibility: ["elevator"],
    },
    {
      dorm_id: "battell",
      name: "Battell",
      roomTypes: ["double", "single", "triple"],
      amenities: ["kitchen"],
    },
    {
      dorm_id: "forest",
      name: "Forest",
      roomTypes: ["double", "single"],
      amenities: ["kitchen", "laundry"],
      accessibility: ["elevator"],
    },
  ]);
}
