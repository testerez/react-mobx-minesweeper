export const boxSize = '26px';
export const background = '#d0d0d0';

// $borderShadow: darken($background, 20%);
// $borderLight: lighten($background, 12%);

const borderShadow = 'red';
const borderLight = 'blue';

export const insetArea = (width: number) => `
  border: ${width}px solid;
  background: ${background};
  border-color:
      ${borderShadow}
      ${borderLight}
      ${borderLight}
      ${borderShadow}
  ;
`;

export const outsetArea = (width: number) => `
  border: ${width} solid;
  border-color:
    ${borderLight}
    ${borderShadow}
    ${borderShadow}
    ${borderLight}
  ;
`;
