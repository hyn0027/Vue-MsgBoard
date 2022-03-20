const cookieOperation = {
    getCookie: (key, defaultValue) => {
        var rgx = new RegExp("(?:^|(?:; ))" + key + "=([^;]*)")
        var result = document.cookie.match(rgx)
        console.log(result)
        if (result) {
            return unescape(result[1])
        } else {
            return defaultValue
        }
    },
    setCookie: (key, value, expireMs) => {
        var exDate = new Date();
        exDate.setTime(exDate.getTime() + expireMs);
        document.cookie = key + "=" + escape(value) + ";expires=" + exDate.toGMTString()
    }
}

export default cookieOperation