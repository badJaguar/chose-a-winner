import { createTheme, responsiveFontSizes } from '@mui/material';

import palette from './palette';

const defaultTheme = responsiveFontSizes(createTheme({ palette }));
export default defaultTheme;
