import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DormPage() {
  const router = useRouter();
  const { dorm_id } = router.query;

  const [dorm, setDorm] = useState(null);

  useEffect(() => {
    if (!dorm_id) return;
    fetch(`/api/dorms/${dorm_id}`)
      .then((res) => res.json())
      .then((data) => setDorm(data));
  }, [dorm_id]);

  if (!dorm) return <p>Loading...</p>;

  return (
    <div>
      <h1>{dorm.name}</h1>
      <p>Type: {dorm.building_type}</p>
      <p>Residents: {dorm.residents}</p>
      {/* other stuff... */}
      <p />
      <button onClick={() => router.push("/")}>Home</button>
    </div>
  );
}
