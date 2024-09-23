import { textRepresentation } from '../button/buttonsSet';

const { plus } = textRepresentation;
const { minus } = textRepresentation;
const { multiplication } = textRepresentation;
const { division } = textRepresentation;
const { percent } = textRepresentation;

export default function precedence(op) {
  switch (op) {
    case plus:
    case minus:
      return 1;
    case multiplication:
    case division:
      return 2;
    case percent:
      return 3;
    default:
      return 0;
  }
}
