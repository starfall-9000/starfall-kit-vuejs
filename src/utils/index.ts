export const checkIsIOS = () => {
  if (
    navigator.userAgent.indexOf('iPhone') > -1 ||
    navigator.userAgent.indexOf('iPad') > -1 ||
    navigator.userAgent.indexOf('Mac') > -1
  ) {
    return true
  }

  return false
}

export const checkIsMobile = () => {
  if (
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
  ) {
    return true
  } else {
    return false
  }
}
