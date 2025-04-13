import React, { useEffect } from "react";
import { useState } from "react";
import styles from "../../styles/ProfilePage.module.css";

export default function ProfilePage() {
  // Placeholder data to check
  const test = [
    {
      id: 1,
      Dorm: "Battell",
      RoomType: "Double",
      Rating: 4,
      date: "2025-03-01",
    },
    {
      id: 2,
      Dorm: "Atwater",
      RoomType: "Single",
      Rating: 5,
      date: "2025-02-20",
    },
  ];

  const [firstName, setFirstName] = useState("Midd"); //Placeholder waiting for DB
  const [lastName, setLastName] = useState("Dorms"); //Placeholder waiting for DB
  const [classYear, setClassYear] = useState("2028"); //Placeholder waiting for DB
  const [email] = useState("middDorms@middlebury.edu"); //Placeholder waiting for DB
  const [pastReviews, setPastReviews] = useState(test);

  const [classChange, setClassChange] = useState(true);

  // PlaceHolder Code/Text

  // Will need to fetch by userID
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("Enter my URL");

        if (response.ok) {
          const data = await response.json();
          setFirstName(data.userInfo.firstName);
          setLastName(data.userInfo.lastName);
          setClassYear(data.userInfo.classYear);
          setPastReviews(data.pastReviews);
        } else {
          console.error("Error fetching profile data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching profile information", error);
      }
    };
    fetchProfile();
  }, []);

  function generateTable() {
    return (
      <table className={styles["review-table"]}>
        <thead>
          <tr>
            <th>Dorm</th>
            <th>Room Type</th>
            <th>Rating</th>
            <th>Date </th>
          </tr>
        </thead>
        <tbody>
          {pastReviews.map((review) => (
            <tr key={review.id}>
              <td>{review.Dorm}</td>
              <td>{review.RoomType}</td>
              <td>{review.Rating} </td>
              <td>{review.date} </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <div className={styles["profile-container"]}>
      <h1>Profile Page</h1>
      <div>
        <h2>{`${firstName} ${lastName}`}</h2>
        <p>{`Email: ${email}`}</p>
        <div className={styles["graduation-year-section"]}>
          {classChange ? (
            <span>{`Graduation Year: ${classYear}`}</span>
          ) : (
            <input
              type="number"
              value={classYear}
              placeholder="Enter your graduation year"
              onChange={(e) => setClassYear(e.target.value)}
            />
          )}
          <button
            className={styles.button}
            onClick={() => {
              setClassChange(!classChange);
            }}
          >
            {classChange ? "Change Graduation Year" : "Submit"}
          </button>
        </div>
        <h2> Past Reviews </h2>
        <div>{generateTable(pastReviews)}</div>
      </div>
    </div>
  );
}
