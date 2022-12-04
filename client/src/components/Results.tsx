import { Text, VStack, Heading } from "@chakra-ui/react";

export interface ResultsProps {
  correct: number
  total: number
}

export const Results: React.FC<ResultsProps> = ({ correct, total }) => (
  <VStack spacing={8}>
    <Heading>Results</Heading>
    <Text>{correct} out of {total}!</Text>
  </VStack>
);
