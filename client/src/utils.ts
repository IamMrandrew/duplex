export const getUrlLastSegmant = () =>
  window.location.href.substring(window.location.href.lastIndexOf('/') + 1).replaceAll('%20', ' ')

export const getCookieTheme = () => document.cookie.replace(/(?:(?:^|.*;\s*)theme_mode\s*\=\s*([^;]*).*$)|^.*$/, "$1")