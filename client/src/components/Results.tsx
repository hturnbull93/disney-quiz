import { Text, VStack, Heading, Button } from "@chakra-ui/react";

export interface ResultsProps {
  correct: number
  total: number
  // onFinish: () => Promise<void>
}

export const Results = ({ correct, total,  }: ResultsProps) => (
  <VStack spacing={8}>
    <Heading>Results</Heading>
    <Text>{correct} out of {total}!</Text>
    {/* <Button onClick={onFinish}>Try again</Button> */}
  </VStack>
);
