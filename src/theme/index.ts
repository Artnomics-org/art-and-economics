import { black, green, grey, red, white, yellow, nav, footer, bg, text } from './colors'

const theme = {
  borderRadius: 12,
  breakpoints: {
    mobile: 400,
  },
  color: {
    nav,
    footer,
    bg,
    text,
    black,
    grey,
    red,
    primary: {
      light: red[200],
      main: red[500],
    },
    secondary: {
      main: green[500],
    },
    white,
    yellow,
  },
  siteWidth: 1440,
  spacing: {
    1: 4,
    2: 8,
    3: 16,
    4: 24,
    5: 32,
    6: 48,
    7: 64,
  },
  topBarSize: 100
}

export default theme