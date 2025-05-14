import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "@/styles/Reviewer.module.css";
import { useRouter } from "next/router";
import {
  Autocomplete,
  TextField,
  Slider,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export const defaultQuestions = [
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
    scale: { low: "Very Small", high: "Very Big" },
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
  // {
  //   id: "elevators",
  //   prompt: "How many elevators are in your dorm and how reliable are they?",
  //   scale: { low: "No elevators", high: "Many very reliable elevators" },
  // },
];

const reviewerTheme = createTheme({
  typography: {
    fontFamily: '"Merriweather", serif',
  },
});

export default function Reviewer({
  initialResponses = {},
  initialComment = "",
}) {
  const router = useRouter();

  const [selectedDorm, setSelectedDorm] = useState("");
  const [selectedRoomType, setSelectedRoomType] = useState("");
  const [responses, setResponses] = useState(initialResponses);
  const [comment, setComment] = useState(initialComment);
  const [questions] = useState(defaultQuestions);
  const [dormOptions, setDormOptions] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [dormsRoomTypes, setdormsRoomTypes] = useState([]);

  useEffect(() => {
    const fetchDormsAndRoomTypes = async () => {
      try {
        const response = await fetch("/api/dorms");
        if (response.ok) {
          const data = await response.json();
          const drt = data.reduce((dict, dorm) => {
            dict[dorm.id] = dorm.roomTypes;
            return dict;
          }, {});
          setdormsRoomTypes(drt);

          const dorms = data.map((dorm) => dorm.name);
          setDormOptions(dorms);
        } else {
          console.error(
            "Failed to fetch dorms and room types:",
            response.statusText,
          );
        }
      } catch (error) {
        console.error("Error fetching dorms and room types:", error);
      }
    };
    fetchDormsAndRoomTypes();
  }, []);

  useEffect(() => {
    setRoomTypes(
      selectedDorm
        ? dormsRoomTypes[selectedDorm.split(" ")[0].toLowerCase()] || []
        : [],
    );
  }, [selectedDorm, dormsRoomTypes]);

  const handleChange = (questionId, value) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: Number(value),
    }));
  };

  const handleSubmit = async () => {
    const reviewData = {
      dorm: selectedDorm.split(" ")[0].toLowerCase(),
      roomType: selectedRoomType,
      responses,
      comment,
    };

    const response = await fetch("/api/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    });

    if (response.ok) {
      router.push(`/dorms/${selectedDorm.split(" ")[0].toLowerCase()}`);
    } else {
      console.error("Failed to submit review:", response.statusText);
    }
  };

  return (
    <ThemeProvider theme={reviewerTheme}>
      <div className={styles.pageBackground}>
        <div className={styles.formBox}>
          <div className={styles.overall}>
            <h1>
              {selectedDorm
                ? `Rate Your ${selectedDorm} Experience`
                : "Rate Your Dorm Experience"}
            </h1>
            <br />
            <br />

            {/* Dorm selector */}
            <div className={styles.question}>
              <Autocomplete
                options={dormOptions}
                value={selectedDorm}
                onChange={(e, newValue) => setSelectedDorm(newValue || "")}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Your Dorm"
                    variant="outlined"
                  />
                )}
                sx={{ mb: 2 }}
              />
            </div>
            {/* Room type selector */}
            <div className={styles.question}>
              <Autocomplete
                options={roomTypes}
                value={selectedRoomType}
                onChange={(e, newValue) => setSelectedRoomType(newValue)}
                disabled={!selectedDorm}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Your Room Type"
                    variant="outlined"
                  />
                )}
                sx={{ mb: 2 }}
              />
            </div>
            <br />
            {questions.map((question) => (
              <div key={question.id} className={styles.question}>
                <Typography>{question.prompt}</Typography>

                <Slider
                  min={1}
                  max={5}
                  step={1}
                  value={responses[question.id] || 3}
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
                placeholder="Wow, what a well made website to help me rate dorms!"
                multiline
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                fullWidth
                helperText={
                  comment.length < 100
                    ? `You need ${100 - comment.length} more characters`
                    : "You've reached the character minimum!"
                }
                error={comment.length < 100}
                sx={{ mt: 2 }}
              />
            </div>

            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={
                !selectedDorm || !selectedRoomType || comment.length < 100
              }
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

Reviewer.propTypes = {
  dormOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  roomTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  complete: PropTypes.func.isRequired,
  initialResponses: PropTypes.object,
  initialComment: PropTypes.string,
};
