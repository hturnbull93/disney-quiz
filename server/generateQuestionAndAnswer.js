import { getCharactersByPage } from "./api.js";
import { pickFromArray } from "./utils.js";

const TOTAL_CHARACTERS = 7438;
const PAGE_SIZE = 50;
const TOTAL_PAGES = TOTAL_CHARACTERS / PAGE_SIZE;
const NUMBER_OF_OPTIONS = 4;

const getCharactersWithFilmsAndImages = async () => {
  const pageToFetch = Math.random() * TOTAL_PAGES + 1;
  const result = await getCharactersByPage(pageToFetch);
  const characters = result.data.data;

  return characters.filter(
    (character) => !!character.films.length && !!character.imageUrl
  );
};

const selectRandomCharacter = (characters, selectedCharacters) => {
  const excludedFilms = selectedCharacters.flatMap(
    (character) => character.films
  );
  const excludedIds = selectedCharacters.map((character) => character._id);

  const remainingCharacters = characters.filter(
    (character) =>
      !excludedIds.includes(character._id) &&
      !character.films.some((film) => excludedFilms.includes(film))
  );

  return pickFromArray(remainingCharacters);
};

const selectFourCharactersWithUniqueFilms = (characters) => {
  const selectedCharacters = [];

  while (selectedCharacters.length < NUMBER_OF_OPTIONS) {
    selectedCharacters.push(
      selectRandomCharacter(characters, selectedCharacters)
    );
  }

  return selectedCharacters;
};

export const generateQuestionAndAnswer = async () => {
  const usableCharacters = await getCharactersWithFilmsAndImages();

  const characterOptions =
    selectFourCharactersWithUniqueFilms(usableCharacters);

  const correctOption = pickFromArray(characterOptions);

  const question = {
    options: characterOptions.map((character) => character.films[0]),
    imageSrc: correctOption.imageUrl,
  };

  const answer = {
    correct: correctOption.films[0],
    response: null,
  };

  return { question, answer };
};
