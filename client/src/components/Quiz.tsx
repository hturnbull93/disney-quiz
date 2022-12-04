import { Image, VStack, Heading, Button } from "@chakra-ui/react";

export interface QuizProps {
  id: number;
  imageSrc: string;
  options: [string, string, string, string];
  onAnswer: ({ id, answer }: { id: number; answer: string }) => void;
}

export const Quiz = ({ id, imageSrc, options, onAnswer }: QuizProps) => (
  <VStack spacing={8}>
    <Heading>{id}. Which show is this character from?</Heading>
    <Image src={imageSrc} />

    {options.map((option) => (
      <Button key={option} onClick={() => onAnswer({id, answer: option})}>
        {option}
      </Button>
    ))}
  </VStack>
);
