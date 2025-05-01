import React, { useEffect } from "react";
import { useState } from "react";
import styles from "../../styles/ProfilePage.module.css";
import ReviewTable from "@/components/ReviewTable";

export default function ProfilePage() {
  const [userProfile, setUserProfile] = useState({
    id: null,
    firstName: "",
    lastName: "",
    email: "",
    classYear: "",
    pastReviews: [],
  });

  const [classChange, setClassChange] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // PlaceHolder Code/Text

  // Will need to fetch by userID when authentication is implemented
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/ProfilePage"); //Api Call will be set up in next Sprint

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
    fetchProfile();
  }, []);

  const handleClassYearChange = async () => {
    const currentYear = new Date().getFullYear();
    if (userProfile.classYear < currentYear) {
      setErrorMessage("You must enter a valid Graduation Year!");
      return;
    }

    try {
      const response = await fetch("/api/ProfilePage", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userProfile.id,
          classYear: userProfile.classYear,
        }),
      });

      if (response.ok) {
        const updatedData = await response.json();
        console.log("Class year updated successfully:", updatedData);
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
      const response = await fetch("/api/ProfilePage", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reviewId: id }),
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
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <h2>Past Reviews</h2>
          <ReviewTable
            reviews={userProfile.pastReviews}
            onDelete={handleDeleteReview}
          />
        </div>
      </div>
    </div>
  );
}
