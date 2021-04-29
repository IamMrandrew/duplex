export const getUrlLastSegmant = () =>
  window.location.href.substring(window.location.href.lastIndexOf('/') + 1).replaceAll('%20', ' ')

export const getCookieTheme = () => document.cookie.replace(/(?:(?:^|.*;\s*)theme_mode\s*\=\s*([^;]*).*$)|^.*$/, "$1")

/**
 * generate uuidv4
 *
 * @returns uuidv4
 */
 export const uuidv4 = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}