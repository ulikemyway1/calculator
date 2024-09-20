const textRepresentation = {
  plus: '+',
  minus: '-',
  division: '÷',
  multiplication: '×',
  percent: '%',
  evaluation: '=',
  delete: 'AC',
  invert: '±',
  comma: ',',
  leftParenthesis: '(',
  rightParenthesis: ')',
};
const buttonsSet = [
  {
    textContent: '0',
    value: 0,
    role: 'number',
  },
  {
    textContent: '1',
    value: 1,
    role: 'number',
  },
  {
    textContent: '2',
    value: 2,
    role: 'number',
  },
  {
    textContent: '3',
    value: 3,
    role: 'number',
  },
  {
    textContent: '4',
    value: 4,
    role: 'number',
  },
  {
    textContent: '5',
    value: 5,
    role: 'number',
  },
  {
    textContent: '6',
    value: 6,
    role: 'number',
  },
  {
    textContent: '7',
    value: 7,
    role: 'number',
  },
  {
    textContent: '8',
    value: 8,
    role: 'number',
  },
  {
    textContent: '9',
    value: 9,
    role: 'number',
  },
  {
    textContent: textRepresentation.minus,
    value: null,
    role: 'minus',
  },
  {
    textContent: textRepresentation.plus,
    value: null,
    role: 'plus',
  },
  {
    textContent: textRepresentation.division,
    value: null,
    role: 'division',
  },
  {
    textContent: textRepresentation.multiplication,
    value: null,
    role: 'multiplication',
  },
  {
    textContent: textRepresentation.percent,
    value: null,
    role: 'percent',
  },
  {
    textContent: textRepresentation.evaluation,
    value: null,
    role: 'evaluation',
  },
  {
    textContent: textRepresentation.delete,
    value: null,
    role: 'delete',
  },
  {
    textContent: textRepresentation.invert,
    value: null,
    role: 'invert',
  },
  {
    textContent: textRepresentation.comma,
    value: null,
    role: 'comma',
  },
  {
    textContent: textRepresentation.leftParenthesis,
    value: null,
    role: 'separator-left',
  },
  {
    textContent: textRepresentation.rightParenthesis,
    value: null,
    role: 'separator-right',
  },
];

export { textRepresentation, buttonsSet };
