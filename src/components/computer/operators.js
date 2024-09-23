import { textRepresentation } from '../button/buttonsSet';

const { plus } = textRepresentation;
const { minus } = textRepresentation;
const { multiplication } = textRepresentation;
const { division } = textRepresentation;

const operators = {
  [plus]: (a, b) => a + b,
  [minus]: (a, b) => a - b,
  [multiplication]: (a, b) => a * b,
  [division]: (a, b) => a / b,
};

export default operators;
