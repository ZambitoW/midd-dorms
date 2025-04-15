import { useRouter } from "next/router";

export default function Submission() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/"); // Redirects to the home page
  };

  return (
    <div>
      <h3>Thank you for submitting a review</h3>
      <button onClick={handleGoHome}>Back to Home</button>
    </div>
  );
}
