import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "@/styles/Editor.module.css";
import { useRouter } from "next/router";
import { TextField, Slider, Button, Typography, Box } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const reviewerTheme = createTheme({
  typography: {
    fontFamily: '"Merriweather", serif',
  },
});

export default function Editor({ id }) {
  const questions = [
    {
      id: "storage_space",
      prompt: "How much storage did you have?",
      scale: { low: "Very Little Storage", high: "Lots of Storage" },
    },
    {
      id: "clean",
      prompt: "How clean was your dorm?",
      scale: { low: "Not Clean", high: "Very Clean" },
    },
    {
      id: "noise",
      prompt: "How loud was your dorm?",
      scale: { low: "Very Loud", high: "Not Loud" },
    },
    {
      id: "size",
      prompt: "How big was your dorm?",
      scale: { low: "Very Little", high: "Very Big" },
    },
    {
      id: "dining_hall_proximity",
      prompt: "How close was the nearest dining hall?",
      scale: { low: "Very Far", high: "Very Close" },
    },
    {
      id: "laundry",
      prompt: "How close was the nearest laundry?",
      scale: { low: "Very Far", high: "Very Close" },
    },
    {
      id: "public_bathrooms",
      prompt: "Rate the quality of the public bathrooms in your dorm.",
      scale: { low: "Bad quality", high: "Great quality" },
    },
    {
      id: "public_kitchens",
      prompt: "Rate the quality of the public kitchens in your dorm.",
      scale: { low: "Bad quality", high: "Great quality" },
    },
    {
      id: "ac_proximity",
      prompt: "How close are you to the athletic center?",
      scale: { low: "Very far", high: "Very close" },
    },
  ];

  const router = useRouter();

  const [review, setReview] = useState({});

  useEffect(() => {
    //Just make sure that id is defied before we try to fetch
    if (!id) return;
    const fetchReview = async () => {
      const response = await fetch(`/api/reviews/${id}`);
      if (response.ok) {
        const data = await response.json();
        setReview(data);
      }
    };
    fetchReview();
  }, [id]);

  const handleEditSubmit = async (editedReview) => {
    const response = await fetch(`/api/reviews/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...editedReview,
        //created_at: new Date().toISOString(),
        //maybe add an updated_at field
      }),
    });
    if (response.ok) {
      router.push(`/dorms/${review.buildingId}`);
    }
  };

  const handleChange = (questionId, value) => {
    setReview((prev) => ({
      ...prev,
      [questionId]: Number(value),
    }));
  };

  if (review.comment === undefined) {
    return <div>Loading...</div>;
  } else {
    return (
      <ThemeProvider theme={reviewerTheme}>
        <div className={styles.pageBackground}>
          <div className={styles.formBox}>
            <div className={styles.overall}>
              <h1>
                {review.buildingId
                  ? `Rate Your ${review.buildingId.charAt(0).toUpperCase() + review.buildingId.slice(1)} Experience`
                  : "Rate Your Dorm Experience"}
              </h1>

              <br />
              {questions.map((question) => (
                <div key={question.id} className={styles.question}>
                  <Typography>{question.prompt}</Typography>

                  <Slider
                    min={1}
                    max={5}
                    step={1}
                    value={review[question.id] || 3}
                    onChange={(e, val) => handleChange(question.id, val)}
                    valueLabelDisplay="auto"
                    sx={{ width: "100%", mt: 1 }}
                  />

                  <Box display="flex" justifyContent="space-between" mt={0.5}>
                    <Typography fontSize="0.9rem">
                      {question.scale.low}
                    </Typography>
                    <Typography fontSize="0.9rem">
                      {question.scale.high}
                    </Typography>
                  </Box>
                </div>
              ))}

              {/* comment box */}
              <div className={styles.question}>
                <h3> Please Leave a Comment on Your Room: </h3>
                <TextField
                  placeholder="Type your comment here"
                  multiline
                  rows={4}
                  value={review.comment}
                  onChange={(e) =>
                    setReview((prev) => ({
                      ...prev,
                      comment: e.target.value,
                    }))
                  }
                  fullWidth
                  helperText={
                    review.comment.length < 100
                      ? `You need ${100 - review.comment.length} more characters`
                      : "You've reached the character minimum!"
                  }
                  error={review.comment.length < 100}
                  sx={{ mt: 2 }}
                />
              </div>

              <Button
                variant="contained"
                color="primary"
                onClick={() => handleEditSubmit(review)}
                disabled={review.comment.length < 100}
                sx={{ mt: 3 }}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

Editor.propTypes = {
  id: PropTypes.number.isRequired,
};
