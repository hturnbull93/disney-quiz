import { useState } from "react";
import { Text, Spinner } from "@chakra-ui/react";
import { Welcome } from "./components/Welcome";
import { Quiz, QuizProps } from "./components/Quiz";
import { getQuestion, getResults, postAnswer } from "./api";
import { Results, ResultsProps } from "./components/Results";
import { Layout } from "./components/Layout";

export const App: React.FC = () => {
  const [stage, setStage] = useState<"start" | "quiz" | "results">("start");

  const [question, setQuestion] = useState<Omit<QuizProps, "onAnswer">>();
  const [results, setResults] = useState<ResultsProps>();
  const [loading, setLoading] = useState(false);

  const asyncActionHandler =
    <T,>(action: (args: T) => Promise<void>) =>
    async (args: T) => {
      setLoading(true);
      await action(args);
      setLoading(false);
    };

  const fetchQuestion = asyncActionHandler(async () => {
    const result = await getQuestion();
    setQuestion(result.data);
    setStage("quiz");
  });

  const fetchResults = asyncActionHandler(async () => {
    const result = await getResults();
    setResults(result.data);
    setStage("results");
  });

  const handleAnswer = asyncActionHandler(
    async (answer:string) => {
      const result = await postAnswer(answer);

      if (result.data.nextQuestion) {
        await fetchQuestion(null);
      } else if (result.data.complete) {
        await fetchResults(null);
      }
    }
  );

  if (loading) return (
    <Layout><Spinner mx="auto" /></Layout>
  )

  return (
    <Layout>
      {stage === "start" && <Welcome onStart={() => fetchQuestion(0)} />}
      {stage === "quiz" && !question && <Text>Something went wrong!</Text>}
      {stage === "quiz" && !!question && (
        <Quiz {...question} onAnswer={handleAnswer} />
      )}
      {stage === "results" && !!results && <Results {...results} />}
    </Layout>
  );
};
