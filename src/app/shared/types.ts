type IrregularityForm = { [P in Person]?: string };

type Person =
  | 'yo'
  | 'tú'
  | 'él / ella / usted'
  | 'nosotros'
  | 'vosotros'
  | 'ellos / ellas / ustedes';
