import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "@/styles/Home.module.css";

export default function DormList() {
  const [dorms, setDorms] = useState([]);

  useEffect(() => {
    fetch("/api/dorms")
      .then((res) => res.json())
      .then((data) => setDorms(data));
  }, []);

  return (
    <div>
      <ul
        style={{ listStyle: "none", padding: 0, display: "flex", gap: "16px" }}
      >
        {dorms.map((dorm) => (
          <li key={dorm.dorm_id}>
            <Link href={`/dorms/${dorm.dorm_id}`} className={styles.primary}>
              <button className={styles.primary}> {dorm.name}</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
