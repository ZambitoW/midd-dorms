import React from "react";
import {
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import styles from "@/styles/Faq.module.css";

const faqs = [
  {
    question: "Can I change my room after selection?",
    answer: "Possibly, if there's availability. Contact ResLife.",
  },
  {
    question: "What is the best dorm?",
    answer:
      "'The best' is subjective and differs by person. We encourage you to explore and find a dorm that suits you. That said, Townhouses are the best.",
  },
  {
    question:
      "I don't see my social/interest house as an option here. Why not?",
    answer:
      "We exclude social/interest houses to protect their community focus. Listing them could attract students for housing quality alone, rather than the shared mission of the space.",
  },
  {
    question: "Is MiddDorms affiliated with Reslife or Middlebury College?",
    answer:
      "No, MiddDorms is not affiliated with ResLife or Middlebury college. We are an independent group of students.",
  },
];

const FAQPage = () => {
  return (
    <Container className={styles.pageContainer}>
      <div className={styles.faqCard}>
        <h2>Frequently Asked Questions</h2>
        <br />
        {faqs.map((faq) => (
          <Accordion className={styles.accordion} key={faq.question}>
            <AccordionSummary expandIcon={"⏷"}>
              <p className={styles.question}>{faq.question}</p>
            </AccordionSummary>
            <AccordionDetails>
              <p className={styles.answer}>{faq.answer}</p>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </Container>
  );
};

export default FAQPage;
