import Editor from "@/components/Editor";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

export default function EditDormPage() {
  const { id } = useRouter().query;
  return (
    <div style={{ paddingTop: "100px" }}>
      <Editor id={id} />
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
