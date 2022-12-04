import { Image, VStack, Heading, Button } from "@chakra-ui/react";

export interface QuizProps {
  id: number;
  imageSrc: string;
  options: [string, string, string, string];
  onAnswer: (answer: string) => void;
}

export const Quiz: React.FC<QuizProps> = ({
  id,
  imageSrc,
  options,
  onAnswer,
}) => (
  <VStack spacing={8}>
    <Heading>{id}. Which film is this character from?</Heading>
    <Image src={imageSrc} />

    {options.map((option) => (
      <Button key={option} onClick={() => onAnswer(option)}>
        {option}
      </Button>
    ))}
  </VStack>
);
