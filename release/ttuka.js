(function(){var h = this;
function l(a, b) {
  var c = a.split("."), d = h;
  c[0] in d || !d.execScript || d.execScript("var " + c[0]);
  for (var g;c.length && (g = c.shift());) {
    c.length || void 0 === b ? d[g] ? d = d[g] : d = d[g] = {} : d[g] = b;
  }
}
function m(a) {
  var b = typeof a;
  if ("object" == b) {
    if (a) {
      if (a instanceof Array) {
        return "array";
      }
      if (a instanceof Object) {
        return b;
      }
      var c = Object.prototype.toString.call(a);
      if ("[object Window]" == c) {
        return "object";
      }
      if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) {
        return "array";
      }
      if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) {
        return "function";
      }
    } else {
      return "null";
    }
  } else {
    if ("function" == b && "undefined" == typeof a.call) {
      return "object";
    }
  }
  return b;
}
function n(a) {
  var b = m(a);
  return "array" == b || "object" == b && "number" == typeof a.length;
}
function p(a) {
  return "string" == typeof a;
}
function q(a) {
  var b = typeof a;
  return "object" == b && null != a || "function" == b;
}
;function r(a, b) {
  for (var c in a) {
    b.call(void 0, a[c], c, a);
  }
}
var t = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
function u(a, b) {
  for (var c, d, g = 1;g < arguments.length;g++) {
    d = arguments[g];
    for (c in d) {
      a[c] = d[c];
    }
    for (var e = 0;e < t.length;e++) {
      c = t[e], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c]);
    }
  }
}
;function v(a, b) {
  var c = w;
  Object.prototype.hasOwnProperty.call(c, a) || (c[a] = b(a));
}
;var x = String.prototype.trim ? function(a) {
  return a.trim();
} : function(a) {
  return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "");
};
function y(a) {
  if (!z.test(a)) {
    return a;
  }
  -1 != a.indexOf("&") && (a = a.replace(A, "&amp;"));
  -1 != a.indexOf("<") && (a = a.replace(B, "&lt;"));
  -1 != a.indexOf(">") && (a = a.replace(C, "&gt;"));
  -1 != a.indexOf('"') && (a = a.replace(D, "&quot;"));
  -1 != a.indexOf("'") && (a = a.replace(aa, "&#39;"));
  -1 != a.indexOf("\x00") && (a = a.replace(ba, "&#0;"));
  return a;
}
var A = /&/g, B = /</g, C = />/g, D = /"/g, aa = /'/g, ba = /\x00/g, z = /[\x00&<>"']/;
function E(a, b) {
  return a < b ? -1 : a > b ? 1 : 0;
}
;var ca = Array.prototype.indexOf ? function(a, b, c) {
  return Array.prototype.indexOf.call(a, b, c);
} : function(a, b, c) {
  c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
  if (p(a)) {
    return p(b) && 1 == b.length ? a.indexOf(b, c) : -1;
  }
  for (;c < a.length;c++) {
    if (c in a && a[c] === b) {
      return c;
    }
  }
  return -1;
}, da = Array.prototype.forEach ? function(a, b, c) {
  Array.prototype.forEach.call(a, b, c);
} : function(a, b, c) {
  for (var d = a.length, g = p(a) ? a.split("") : a, e = 0;e < d;e++) {
    e in g && b.call(c, g[e], e, a);
  }
};
function F(a) {
  var b = a.length;
  if (0 < b) {
    for (var c = Array(b), d = 0;d < b;d++) {
      c[d] = a[d];
    }
    return c;
  }
  return [];
}
;var G;
a: {
  var H = h.navigator;
  if (H) {
    var I = H.userAgent;
    if (I) {
      G = I;
      break a;
    }
  }
  G = "";
}
;var ea = -1 != G.indexOf("Opera"), J = -1 != G.indexOf("Trident") || -1 != G.indexOf("MSIE"), fa = -1 != G.indexOf("Edge"), K = -1 != G.indexOf("Gecko") && !(-1 != G.toLowerCase().indexOf("webkit") && -1 == G.indexOf("Edge")) && !(-1 != G.indexOf("Trident") || -1 != G.indexOf("MSIE")) && -1 == G.indexOf("Edge"), ga = -1 != G.toLowerCase().indexOf("webkit") && -1 == G.indexOf("Edge");
function L() {
  var a = h.document;
  return a ? a.documentMode : void 0;
}
var M;
a: {
  var N = "", O = function() {
    var a = G;
    if (K) {
      return /rv\:([^\);]+)(\)|;)/.exec(a);
    }
    if (fa) {
      return /Edge\/([\d\.]+)/.exec(a);
    }
    if (J) {
      return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
    }
    if (ga) {
      return /WebKit\/(\S+)/.exec(a);
    }
    if (ea) {
      return /(?:Version)[ \/]?(\S+)/.exec(a);
    }
  }();
  O && (N = O ? O[1] : "");
  if (J) {
    var P = L();
    if (null != P && P > parseFloat(N)) {
      M = String(P);
      break a;
    }
  }
  M = N;
}
var w = {};
function Q(a) {
  v(a, function() {
    for (var b = 0, c = x(String(M)).split("."), d = x(String(a)).split("."), g = Math.max(c.length, d.length), e = 0;0 == b && e < g;e++) {
      var f = c[e] || "", k = d[e] || "";
      do {
        f = /(\d*)(\D*)(.*)/.exec(f) || ["", "", "", ""];
        k = /(\d*)(\D*)(.*)/.exec(k) || ["", "", "", ""];
        if (0 == f[0].length && 0 == k[0].length) {
          break;
        }
        b = E(0 == f[1].length ? 0 : parseInt(f[1], 10), 0 == k[1].length ? 0 : parseInt(k[1], 10)) || E(0 == f[2].length, 0 == k[2].length) || E(f[2], k[2]);
        f = f[3];
        k = k[3];
      } while (0 == b);
    }
    return 0 <= b;
  });
}
var R = h.document, S = R && J ? L() || ("CSS1Compat" == R.compatMode ? parseInt(M, 10) : 5) : void 0;
var ha = !J || 9 <= Number(S);
!K && !J || J && 9 <= Number(S) || K && Q("1.9.1");
J && Q("9");
function ia(a, b) {
  r(b, function(b, d) {
    "style" == d ? a.style.cssText = b : "class" == d ? a.className = b : "for" == d ? a.htmlFor = b : T.hasOwnProperty(d) ? a.setAttribute(T[d], b) : 0 == d.lastIndexOf("aria-", 0) || 0 == d.lastIndexOf("data-", 0) ? a.setAttribute(d, b) : a[d] = b;
  });
}
var T = {cellpadding:"cellPadding", cellspacing:"cellSpacing", colspan:"colSpan", frameborder:"frameBorder", height:"height", maxlength:"maxLength", nonce:"nonce", role:"role", rowspan:"rowSpan", type:"type", usemap:"useMap", valign:"vAlign", width:"width"};
function U(a, b, c) {
  var d = arguments, g = document, e = String(d[0]), f = d[1];
  if (!ha && f && (f.name || f.type)) {
    e = ["<", e];
    f.name && e.push(' name="', y(f.name), '"');
    if (f.type) {
      e.push(' type="', y(f.type), '"');
      var k = {};
      u(k, f);
      delete k.type;
      f = k;
    }
    e.push(">");
    e = e.join("");
  }
  e = g.createElement(e);
  f && (p(f) ? e.className = f : "array" == m(f) ? e.className = f.join(" ") : ia(e, f));
  2 < d.length && ja(g, e, d);
  return e;
}
function ja(a, b, c) {
  function d(c) {
    c && b.appendChild(p(c) ? a.createTextNode(c) : c);
  }
  for (var g = 2;g < c.length;g++) {
    var e = c[g];
    if (!n(e) || q(e) && 0 < e.nodeType) {
      d(e);
    } else {
      var f;
      a: {
        if (e && "number" == typeof e.length) {
          if (q(e)) {
            f = "function" == typeof e.item || "string" == typeof e.item;
            break a;
          }
          if ("function" == m(e)) {
            f = "function" == typeof e.item;
            break a;
          }
        }
        f = !1;
      }
      da(f ? F(e) : e, d);
    }
  }
}
;var V = {}, W = [], X = [];
V.h = function(a) {
  W = a;
};
V.s = function() {
};
V.i = function(a) {
  W.push(a);
  return W;
};
V.o = function() {
  return W;
};
V.subscribe = function(a) {
  X.push(a);
};
V.unsubscribe = function(a) {
  X = X.filter(function(b) {
    if (b !== a) {
      return b;
    }
  });
};
V.m = function(a, b) {
  var c = b || window;
  X.forEach(function(b) {
    b.call(c, a);
  });
};
var Y = {f:"app", languages:["en", "tr"], j:"tr", g:[{name:"module_one", u:'<div contenteditable="true">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis, itaque?</div>', languages:{}, l:{}}], rows:[]};
l("_opt", Y);
function Z() {
  this.a = Y;
  var a = F(this.a.rows);
  this.b.h(a);
  var a = this.a.f, b = document, a = p(a) ? b.getElementById(a) : a, b = U("div", {c:"tuka-list"}, null), c = U("div", {c:"tuka-area"}, null);
  a.appendChild(b);
  a.appendChild(c);
  a.classList ? a.classList.add("tuka-app") : (a.classList ? b = !a.classList.contains("tuka-app") : (a.classList ? b = a.classList : (b = a.className, b = p(b) && b.match(/\S+/g) || []), b = !(0 <= ca(b, "tuka-app"))), b && (a.className += 0 < a.className.length ? " tuka-app" : "tuka-app"));
  ka(this);
}
l("Tuka", Z);
Z.prototype.b = V;
Z.prototype.app = new function() {
};
function ka(a) {
  var b = F(a.a.g);
  F(a.a.languages).forEach(function(a) {
    b.forEach(function(b) {
      b.languages[a] = "";
    });
  });
}
;})();
