import DormLayout from "@/components/DormLayout";
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

  return <DormLayout dorm={dorm} />;
}
