/**
 * Get the Cookie associate with current window's Origin based on given Cookie name
 * 根据给定的 Cookie 名称获取当前 Window 的域名归属 Cookie
 * @param {String} cname   - Cookie's name Cookie 的名字
 */
export function getCookie(cname: string): string {
  const name = cname + '='
  const decodedCookie = decodeURIComponent(document.cookie)
  const ca = decodedCookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

/**
 * Set the Cookie associate with current window's origin based on given name and token
 * 根据给定的 Cookie 名字和 Cookie Token 设置到当前窗口域名归属的 Cookie
 * @param {String} cname   - Cookie's name Cookie 的名字
 * @param {String} token   - Cookie 的存储值
 * @param {Number} exp     - Cookie 失效的时间，顺延时间，以 天数 为单位
 */
export function setCookie(cname: string, token: string, exp: number): void {
  if (getCookie(cname)) clearCookie(cname)
  const date = new Date(Date.now())
  date.setDate(date.getDate() + exp)

  document.cookie = cname + '=' + token + '; expires=' + date.toUTCString()
}

/**
 * Clear the Cookie based on the given name
 * 清除指定 的 Cookie
 * @param {String} cname   - Cookie's name Cookie 的名字
 */
export function clearCookie(cname: string): void {
  document.cookie = `${cname}=; Max-Age=0;`
}
