// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import defaultTheme from '../defaultTheme';

const MuiButton = {
  styleOverrides: {
    root: {
      fontSize: defaultTheme.typography.body1.fontSize,
      borderColor: 'rgb(192, 192, 192)',
      paddingLeft: defaultTheme.spacing(4),
      paddingRight: defaultTheme.spacing(4),
    },
    containedSuccess: {
      backgroundColor: defaultTheme.palette.secondary.dark,
      '&:hover': {
        backgroundColor: '#f47b2047',
      },
    },
    contained: {
      color: defaultTheme.palette.common.white,
      backgroundColor: '#00bcd4 !important',
    },
    outlined: {
      color: defaultTheme.palette.text.primary,
      borderColor: 'rgb(192, 192, 192)',
      '&:hover': {
        borderColor: defaultTheme.palette.secondary.main,
      },
    },
  },
};
export default MuiButton;
