import { useState } from "react";
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./components/ColorModeSwitcher";
import { Welcome } from "./components/Welcome";
import { Quiz, QuizProps } from "./components/Quiz";
import { getQuestion, getResults, postAnswer } from "./api";
import { Results, ResultsProps } from "./components/Results";

export const App = () => {
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
    const result = await getQuestion(1);
    setQuestion(result.data);
    setStage("quiz");
  });

  const fetchResults = asyncActionHandler(async () => {
    const result = await getResults();
    setResults(result.data);
    setStage("results");
  });

  const handleAnswer = asyncActionHandler(
    async ({ id, answer }: { id: number; answer: string }) => {
      const result = await postAnswer(id, answer);
      console.log("result", result);
      if (result.data.nextQuestion) {
        await fetchQuestion(result.data.nextQuestion);
      } else if (result.data.complete) {
        await fetchResults(null)
      }
    }
  );

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          {loading && <Spinner />}
          {stage === "start" && <Welcome onStart={() => fetchQuestion(0)} />}
          {stage === "quiz" && !question && (
            <Text>Something went wrong!</Text>
          )}
          {stage === "quiz" && !!question && (
            <Quiz {...question} onAnswer={handleAnswer} />
          )}
          {stage === "results" && !!results && (
            <Results {...results} />
          )}
        </Grid>
      </Box>
    </ChakraProvider>
  );
};
