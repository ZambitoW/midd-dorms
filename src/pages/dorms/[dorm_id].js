import DormLayout from "@/components/DormLayout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import User from "../../../models/User";
import Rating from "../../../models/Rating";

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login?alert=1",
        permanent: false,
      },
    };
  }
  const userId = session.user.id;

  try {
    const user = await User.query().findById(userId).throwIfNotFound();
    const reviews = await Rating.query().where("userId", userId);
    const hasReview = reviews.length > 0;
    const classYearNumber = Number(user.classYear);
    const isFirstYear = classYearNumber > 2028;
    if (!hasReview && !isFirstYear) {
      return {
        redirect: {
          destination: "/?alert=need_review",
          permanent: false,
        },
      };
    }
    return {
      props: {
        session,
      },
    };
  } catch (error) {
    console.error("Error fetching user data", error);
  }

  return {
    props: {
      session,
    },
  };
}

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
