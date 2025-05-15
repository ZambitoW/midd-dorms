import React, { useEffect, useState } from "react";
import styles from "../../styles/ProfilePage.module.css";
import ReviewTable from "@/components/ReviewTable";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function ProfilePage() {
  const { data: sessionData, status } = useSession();
  const router = useRouter();

  const [userProfile, setUserProfile] = useState({
    id: null,
    firstName: "",
    lastName: "",
    email: "",
    classYear: "",
    pastReviews: [],
  });

  const [classChange, setClassChange] = useState(true);
  const [errorMessageState, setErrorMessage] = useState("");

  //Redirect client-side if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/api/auth/signin");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/reviews`);

        if (response.ok) {
          const data = await response.json();
          setUserProfile({
            ...data.userInfo,
            pastReviews: data.pastReviews,
          });
        } else {
          console.error("Error fetching profile data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching profile information", error);
      }
    };

    if (sessionData?.user?.id) {
      fetchProfile();
    }
  }, [sessionData]);

  const handleClassYearChange = async () => {
    const currentYear = new Date().getFullYear();
    if (userProfile.classYear < currentYear) {
      setErrorMessage("You must enter a valid Graduation Year!");
      return;
    }

    try {
      const response = await fetch(`/api/users/${userProfile.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          classYear: userProfile.classYear,
        }),
      });

      if (response.ok) {
        setClassChange(!classChange);
        setErrorMessage("");
      } else {
        console.error("Error updating class year:", response.statusText);
      }
    } catch (error) {
      console.error("Error making PUT request:", error);
    }
  };

  const handleDeleteReview = async (id) => {
    try {
      const response = await fetch(`/api/reviews/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setUserProfile((prevProfile) => ({
          ...prevProfile,
          pastReviews: prevProfile.pastReviews.filter(
            (review) => review.id !== id,
          ),
        }));
      } else {
        console.error("Failed to delete review:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const openEditForm = async (id) => {
    router.push(`/reviews/${id}/edit`);
  };

  return (
    <div style={{ paddingTop: "100px" }}>
      <div className={styles["profile-container"]}>
        <h1>Profile Page</h1>
        <div>
          <h2>{`${userProfile.firstName} ${userProfile.lastName}`}</h2>
          <p>{`Email: ${userProfile.email}`}</p>
          <div className={styles["graduation-year-section"]}>
            {classChange ? (
              <span>{`Graduation Year: ${userProfile.classYear}`}</span>
            ) : (
              <input
                type="number"
                value={userProfile.classYear}
                placeholder="Enter your graduation year"
                onChange={(e) =>
                  setUserProfile({
                    ...userProfile,
                    classYear: e.target.value,
                  })
                }
              />
            )}
            <button
              className={styles.button}
              onClick={() => {
                if (!classChange) {
                  handleClassYearChange();
                } else {
                  setClassChange(!classChange);
                }
              }}
            >
              {classChange ? "Change Graduation Year" : "Submit"}
            </button>
          </div>
          {errorMessageState && (
            <p style={{ color: "red" }}>{errorMessageState}</p>
          )}
          <h2>Past Reviews</h2>
          <ReviewTable
            reviews={userProfile.pastReviews}
            onDelete={handleDeleteReview}
            onEdit={openEditForm}
          />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
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
