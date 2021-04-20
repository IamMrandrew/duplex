export const getUrlLastSegmant = () =>
  window.location.href.substring(window.location.href.lastIndexOf('/') + 1).replaceAll('%20', ' ')