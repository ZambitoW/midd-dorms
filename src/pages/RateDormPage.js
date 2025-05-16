import Reviewer from "@/components/Reviewer";
import { getSession } from "next-auth/react";

export default function RateDormPage() {
  return (
    <div style={{ paddingTop: "100px" }}>
      <Reviewer />
    </div>
  );
}

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

  return {
    props: {
      session,
    },
  };
}
