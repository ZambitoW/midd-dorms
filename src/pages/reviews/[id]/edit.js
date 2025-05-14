import Editor from "@/components/Editor";
import { useRouter } from "next/router";

export default function EditDormPage() {
  const { id } = useRouter().query;
  return (
    <div style={{ paddingTop: "100px" }}>
      <Editor id={id} />
    </div>
  );
}
