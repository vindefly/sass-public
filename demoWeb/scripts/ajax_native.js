
function Ajax(b, e, a, d, c) {
    this.before = b;
    this.after = e;
    this.timeout = a;
    this.time = d ? d: 10000;
    this.async = c ? false: true;
    this._request = null;
    this._response = null
}

Ajax.prototype = {
    formatParam: function(c) {
        if (!c || typeof c != "object") {
            return c
        }
        var a, b = [];
        for (a in c) {
            b.push([a, "=", encodeURIComponent(c[a])].join(""))
        }
        return b.join("&")
    },
    create: function() {
        if (window.XMLHttpRequest) {
            this._request = new XMLHttpRequest()
        } else {
            try {
                this._request = new window.ActiveXObject("Microsoft.XMLHTTP")
            } catch(a) {}
        }
    },
    send: function(b, e, g, d) {
        if (typeof this.before == "function") {
            this.before()
        }
        g = g.toUpperCase();
        this.create();
        var a = this;
        var f = setTimeout(function() {
                if (typeof a.timeout == "function") {
                    a.timeout()
                }
                if (a._request) {
                    a._request.abort();
                    a._request = null
                }
                return true
            },
            this.time);
        var c = this.formatParam(e);
        if ("GET" == g) {
            b = [b, (b.indexOf("?") == -1 ? "?": "&"), c].join("");
            c = null
        }
        if (!d) {
            b = [b, (b.indexOf("?") == -1 ? "?": "&"), "ajaxtimestamp=", (new Date()).getTime()].join("")
        }
        this._request.open(g, b, this.async);
        if ("POST" == g) {
            this._request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
        }
        this._request.onreadystatechange = function() {
            if (a._request.readyState == 4) {
                if (a._request.status == 200) {
                    if (f) {
                        clearTimeout(f)
                    }
                    a._response = a._request.responseText;
                    if (typeof a.after == "function") {
                        a.after(a._response)
                    }
                }
            }
        };
        this._request.send(c)
    },
    get: function(b, d, f, g, c) {
        if (typeof f == "string") {
            f = document.getElementById(f)
        }
        if (g) {
            var a = /\.(gif|jpg|jpeg|png|bmp)$/i;
            if (a.test(g)) {
                g = ['<img src="', g, '"  align="absmiddle" />'].join("")
            }
            this.before = function() {
                f.innerHTML = g
            }
        }
        this.after = function(e) {
            f.innerHTML = e
        };
        this.timeout = function() {
            f.innerHTML = " \u8bf7\u6c42\u8d85\u65f6! "
        };
        this.send(b, d, "GET", c ? true: false)
    }
};

 var getAjax = new Ajax();

 getAjax.send("", {

 }, function(data){

 }, "POST");