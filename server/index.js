import express from "express";
import session from "express-session";
import cors from "cors";
import bodyParser from "body-parser";
import { generateQuestionAndAnswer } from "./generateQuestionAndAnswer.js";

const QUESTION_LIMIT = 10;
const PORT = 3001;

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    name: "disney-quiz",
    resave: false,
    saveUninitialized: true,
    secret: "here be dragons",
  })
);

app.get("/question", async (req, res) => {
  const { question, answer } = await generateQuestionAndAnswer();

  if (!req.session.answers) req.session.answers = {};
  if (!req.session.questionNumber) req.session.questionNumber = 1;

  req.session.answers[req.session.questionNumber] = answer;

  question.id = req.session.questionNumber;

  res.send(question);
});

app.post("/question", (req, res) => {
  req.session.answers[req.session.questionNumber].response = req.body.answer;
  
  if (req.session.questionNumber === QUESTION_LIMIT) {
    res.send({ complete: true });
  } else {
    req.session.questionNumber++;
    res.send({ nextQuestion: req.session.questionNumber });
  }
});

app.get("/results", (req, res) => {
  const answersArray = Object.values(req.session.answers);

  const correctAnswers = answersArray.filter(
    (answer) => answer.response === answer.correct
  );

  res.send({ correct: correctAnswers.length, total: QUESTION_LIMIT });

  req.session.destroy();
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
