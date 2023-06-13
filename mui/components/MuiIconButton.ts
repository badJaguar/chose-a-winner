// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import defaultTheme from '../defaultTheme';

const MuiIconButton = {
  styleOverrides: {
    root: {
      color: '#00bcd4 !important',
      '&.Mui-disabled': {
        color: `${defaultTheme.palette.action.disabled} !important`,
      }
    },
  },
};
export default MuiIconButton;
