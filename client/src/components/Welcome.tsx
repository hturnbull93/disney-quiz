import { Text, VStack, Heading, Button } from "@chakra-ui/react";

export interface WelcomeProps {
  onStart: () => Promise<void>
}

export const Welcome = ({ onStart }: WelcomeProps) => (
  <VStack spacing={8}>
    <Heading>Disney Quiz</Heading>
    <Text>Try to guess the show the character is from!</Text>
    <Button onClick={onStart}>Start</Button>
  </VStack>
);
