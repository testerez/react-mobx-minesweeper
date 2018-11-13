export const classnames = (...classes: (string | undefined | null | false)[]) =>
  classes.filter(s => s).join(' ');
