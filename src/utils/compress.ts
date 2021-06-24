function utoa (str: string): string {
    return window.btoa(unescape(encodeURIComponent(str)))
  }
  // base64 encoded ascii to ucs-2 string
function atou (str: string): string {
return decodeURIComponent(escape(window.atob(str)))
}

export const encryptText = (s: string): string => {
try {
    const dict: any = {}
    const data = (s + '').split('')
    const out = []
    let currChar
    let phrase = data[0]
    let code = 256
    for (let i = 1; i < data.length; i++) {
    currChar = data[i]
    if (dict[phrase + currChar] != null) {
        phrase += currChar
    } else {
        out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0))
        dict[phrase + currChar] = code
        code++
        phrase = currChar
    }
    }
    out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0))
    for (let j = 0; j < out.length; j++) {
    out[j] = String.fromCharCode(out[j])
    }
    return utoa(out.join(''))
} catch (e) {
    console.log('Failed to zip string return empty string', e)
    return ''
}
}

export const decryptText = (base64ZippedString: string): string => {
try {
    const s = atou(base64ZippedString)
    const dict: any = {}
    const data = (s + '').split('')
    let currChar = data[0]
    let oldPhrase = currChar
    const out = [currChar]
    let code = 256
    let phrase
    for (let i = 1; i < data.length; i++) {
    const currCode = data[i].charCodeAt(0)
    if (currCode < 256) {
        phrase = data[i]
    } else {
        phrase = dict[currCode] ? dict[currCode] : oldPhrase + currChar
    }
    out.push(phrase)
    currChar = phrase.charAt(0)
    dict[code] = oldPhrase + currChar
    code++
    oldPhrase = phrase
    }
    return out.join('')
} catch (e) {
    console.log('Failed to unzip string return empty string', e)
    return ''
}
}