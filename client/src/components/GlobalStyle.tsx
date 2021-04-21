import { createGlobalStyle } from 'styled-components/macro'

export const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    -ms-overflow-style: scrollbar;
    overflow-y: hidden;
  }

  html, body, #root {
    width: 100%;
    height: 100%;
  }
  
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  body {
    font-family: "Roboto", "Open Sans", sans-serif;
    -webkit-font-smoothing: antialiased;
  }
`

export const COLOR = {
  dark: {
    // dark mode
    bg: {
      tint: '#36393F',
      main: '#2F3136',
      shade: '#202225',
    },
    font: {
      secondary: '#999999', // for details e.g. datetime
      primary: '#FFFFFF', // for main text e.g. title
      contrast: '#FFFFFF', // for message bubble
    },
    primary: {
      // for icon, button
      tint: '#c3d1e4',
      main: '#4E6482',
      shade: '#455973',
    },
    divider: '#2B2E33',
    error: {
      tint: '#423337', // light red color, for error bg
      main: '#F0595A', // red color, for error text
      shade: '#d64f50',
    },
    success: {
      tint: '#48C28B',
      main: '#3CA374',
      shade: '#399C6F',
    },
    message: {
      incoming: '#4E6482',
      sender: '#40444B',
    },
  },
  light: {
    // light mode
    bg: {
      tint: '#FFFFFF',
      main: '#F8FAFB',
      shade: '#EFF0F1',
    },
    font: {
      secondary: '#999999', // for details e.g. datetime
      primary: '#000', // for main text e.g. title
      contrast: '#FFF', // for message bubble
    },
    primary: {
      tint: '#c3d1e4',
      main: '#8C9DAF',
      shade: '#4E5460',
    },
    divider: '#EDEDED',
    error: {
      tint: '#F1E1E3', // light red color, for error bg
      main: '#F0595A', // red color, for error text
      shade: '#d64f50',
    },
    success: {
      tint: '#48C28B',
      main: '#3CA374',
      shade: '#399C6F',
    },
    message: {
      incoming: '#8C9DAF',
      sender: '#F9F9F9',
    },
  },
}

export const ResetStyle = createGlobalStyle`
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}

/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}

body {
  line-height: 1;
  -webkit-font-smoothing: antialiased;
}

ol,
ul {
  list-style: none;
}

blockquote,
q {
  quotes: none;
}

blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

input {
  -webkit-appearance: none;
}

a[href^="tel"] {
  text-decoration: inherit;
  color: inherit;
}

* {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -moz-tap-hightlight-color: rgba(0, 0, 0, 0);
}

`
