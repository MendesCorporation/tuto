import Be, { useState as fe, useRef as gr, useCallback as de, useEffect as Le } from "react";
import { motion as z } from "framer-motion";
var pe = { exports: {} }, X = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ye;
function br() {
  if (Ye) return X;
  Ye = 1;
  var h = Be, c = Symbol.for("react.element"), O = Symbol.for("react.fragment"), _ = Object.prototype.hasOwnProperty, x = h.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, k = { key: !0, ref: !0, __self: !0, __source: !0 };
  function T(f, g, y) {
    var u, R = {}, E = null, C = null;
    y !== void 0 && (E = "" + y), g.key !== void 0 && (E = "" + g.key), g.ref !== void 0 && (C = g.ref);
    for (u in g) _.call(g, u) && !k.hasOwnProperty(u) && (R[u] = g[u]);
    if (f && f.defaultProps) for (u in g = f.defaultProps, g) R[u] === void 0 && (R[u] = g[u]);
    return { $$typeof: c, type: f, key: E, ref: C, props: R, _owner: x.current };
  }
  return X.Fragment = O, X.jsx = T, X.jsxs = T, X;
}
var H = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Me;
function yr() {
  return Me || (Me = 1, process.env.NODE_ENV !== "production" && function() {
    var h = Be, c = Symbol.for("react.element"), O = Symbol.for("react.portal"), _ = Symbol.for("react.fragment"), x = Symbol.for("react.strict_mode"), k = Symbol.for("react.profiler"), T = Symbol.for("react.provider"), f = Symbol.for("react.context"), g = Symbol.for("react.forward_ref"), y = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), R = Symbol.for("react.memo"), E = Symbol.for("react.lazy"), C = Symbol.for("react.offscreen"), S = Symbol.iterator, A = "@@iterator";
    function B(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = S && e[S] || e[A];
      return typeof r == "function" ? r : null;
    }
    var m = h.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function d(e) {
      {
        for (var r = arguments.length, t = new Array(r > 1 ? r - 1 : 0), n = 1; n < r; n++)
          t[n - 1] = arguments[n];
        I("error", e, t);
      }
    }
    function I(e, r, t) {
      {
        var n = m.ReactDebugCurrentFrame, s = n.getStackAddendum();
        s !== "" && (r += "%s", t = t.concat([s]));
        var l = t.map(function(a) {
          return String(a);
        });
        l.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, l);
      }
    }
    var V = !1, $ = !1, F = !1, ee = !1, re = !1, J;
    J = Symbol.for("react.module.reference");
    function K(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === _ || e === k || re || e === x || e === y || e === u || ee || e === C || V || $ || F || typeof e == "object" && e !== null && (e.$$typeof === E || e.$$typeof === R || e.$$typeof === T || e.$$typeof === f || e.$$typeof === g || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === J || e.getModuleId !== void 0));
    }
    function te(e, r, t) {
      var n = e.displayName;
      if (n)
        return n;
      var s = r.displayName || r.name || "";
      return s !== "" ? t + "(" + s + ")" : t;
    }
    function U(e) {
      return e.displayName || "Context";
    }
    function b(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && d("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case _:
          return "Fragment";
        case O:
          return "Portal";
        case k:
          return "Profiler";
        case x:
          return "StrictMode";
        case y:
          return "Suspense";
        case u:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case f:
            var r = e;
            return U(r) + ".Consumer";
          case T:
            var t = e;
            return U(t._context) + ".Provider";
          case g:
            return te(e, e.render, "ForwardRef");
          case R:
            var n = e.displayName || null;
            return n !== null ? n : b(e.type) || "Memo";
          case E: {
            var s = e, l = s._payload, a = s._init;
            try {
              return b(a(l));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var P = Object.assign, W = 0, he, ge, be, ye, me, xe, Re;
    function Ee() {
    }
    Ee.__reactDisabledLog = !0;
    function Ve() {
      {
        if (W === 0) {
          he = console.log, ge = console.info, be = console.warn, ye = console.error, me = console.group, xe = console.groupCollapsed, Re = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: Ee,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        W++;
      }
    }
    function Ue() {
      {
        if (W--, W === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: P({}, e, {
              value: he
            }),
            info: P({}, e, {
              value: ge
            }),
            warn: P({}, e, {
              value: be
            }),
            error: P({}, e, {
              value: ye
            }),
            group: P({}, e, {
              value: me
            }),
            groupCollapsed: P({}, e, {
              value: xe
            }),
            groupEnd: P({}, e, {
              value: Re
            })
          });
        }
        W < 0 && d("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var ne = m.ReactCurrentDispatcher, ie;
    function q(e, r, t) {
      {
        if (ie === void 0)
          try {
            throw Error();
          } catch (s) {
            var n = s.stack.trim().match(/\n( *(at )?)/);
            ie = n && n[1] || "";
          }
        return `
` + ie + e;
      }
    }
    var ae = !1, G;
    {
      var Ne = typeof WeakMap == "function" ? WeakMap : Map;
      G = new Ne();
    }
    function we(e, r) {
      if (!e || ae)
        return "";
      {
        var t = G.get(e);
        if (t !== void 0)
          return t;
      }
      var n;
      ae = !0;
      var s = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var l;
      l = ne.current, ne.current = null, Ve();
      try {
        if (r) {
          var a = function() {
            throw Error();
          };
          if (Object.defineProperty(a.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(a, []);
            } catch (j) {
              n = j;
            }
            Reflect.construct(e, [], a);
          } else {
            try {
              a.call();
            } catch (j) {
              n = j;
            }
            e.call(a.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (j) {
            n = j;
          }
          e();
        }
      } catch (j) {
        if (j && n && typeof j.stack == "string") {
          for (var i = j.stack.split(`
`), w = n.stack.split(`
`), v = i.length - 1, p = w.length - 1; v >= 1 && p >= 0 && i[v] !== w[p]; )
            p--;
          for (; v >= 1 && p >= 0; v--, p--)
            if (i[v] !== w[p]) {
              if (v !== 1 || p !== 1)
                do
                  if (v--, p--, p < 0 || i[v] !== w[p]) {
                    var D = `
` + i[v].replace(" at new ", " at ");
                    return e.displayName && D.includes("<anonymous>") && (D = D.replace("<anonymous>", e.displayName)), typeof e == "function" && G.set(e, D), D;
                  }
                while (v >= 1 && p >= 0);
              break;
            }
        }
      } finally {
        ae = !1, ne.current = l, Ue(), Error.prepareStackTrace = s;
      }
      var M = e ? e.displayName || e.name : "", L = M ? q(M) : "";
      return typeof e == "function" && G.set(e, L), L;
    }
    function Xe(e, r, t) {
      return we(e, !1);
    }
    function He(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function Z(e, r, t) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return we(e, He(e));
      if (typeof e == "string")
        return q(e);
      switch (e) {
        case y:
          return q("Suspense");
        case u:
          return q("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case g:
            return Xe(e.render);
          case R:
            return Z(e.type, r, t);
          case E: {
            var n = e, s = n._payload, l = n._init;
            try {
              return Z(l(s), r, t);
            } catch {
            }
          }
        }
      return "";
    }
    var N = Object.prototype.hasOwnProperty, _e = {}, je = m.ReactDebugCurrentFrame;
    function Q(e) {
      if (e) {
        var r = e._owner, t = Z(e.type, e._source, r ? r.type : null);
        je.setExtraStackFrame(t);
      } else
        je.setExtraStackFrame(null);
    }
    function Je(e, r, t, n, s) {
      {
        var l = Function.call.bind(N);
        for (var a in e)
          if (l(e, a)) {
            var i = void 0;
            try {
              if (typeof e[a] != "function") {
                var w = Error((n || "React class") + ": " + t + " type `" + a + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[a] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw w.name = "Invariant Violation", w;
              }
              i = e[a](r, a, n, t, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (v) {
              i = v;
            }
            i && !(i instanceof Error) && (Q(s), d("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", n || "React class", t, a, typeof i), Q(null)), i instanceof Error && !(i.message in _e) && (_e[i.message] = !0, Q(s), d("Failed %s type: %s", t, i.message), Q(null));
          }
      }
    }
    var Ke = Array.isArray;
    function oe(e) {
      return Ke(e);
    }
    function qe(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, t = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return t;
      }
    }
    function Ge(e) {
      try {
        return ke(e), !1;
      } catch {
        return !0;
      }
    }
    function ke(e) {
      return "" + e;
    }
    function Te(e) {
      if (Ge(e))
        return d("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", qe(e)), ke(e);
    }
    var Se = m.ReactCurrentOwner, Ze = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Oe, Ce;
    function Qe(e) {
      if (N.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function er(e) {
      if (N.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function rr(e, r) {
      typeof e.ref == "string" && Se.current;
    }
    function tr(e, r) {
      {
        var t = function() {
          Oe || (Oe = !0, d("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: t,
          configurable: !0
        });
      }
    }
    function nr(e, r) {
      {
        var t = function() {
          Ce || (Ce = !0, d("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: t,
          configurable: !0
        });
      }
    }
    var ir = function(e, r, t, n, s, l, a) {
      var i = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: c,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: t,
        props: a,
        // Record the component responsible for creating this element.
        _owner: l
      };
      return i._store = {}, Object.defineProperty(i._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(i, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: n
      }), Object.defineProperty(i, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: s
      }), Object.freeze && (Object.freeze(i.props), Object.freeze(i)), i;
    };
    function ar(e, r, t, n, s) {
      {
        var l, a = {}, i = null, w = null;
        t !== void 0 && (Te(t), i = "" + t), er(r) && (Te(r.key), i = "" + r.key), Qe(r) && (w = r.ref, rr(r, s));
        for (l in r)
          N.call(r, l) && !Ze.hasOwnProperty(l) && (a[l] = r[l]);
        if (e && e.defaultProps) {
          var v = e.defaultProps;
          for (l in v)
            a[l] === void 0 && (a[l] = v[l]);
        }
        if (i || w) {
          var p = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          i && tr(a, p), w && nr(a, p);
        }
        return ir(e, i, w, s, n, Se.current, a);
      }
    }
    var se = m.ReactCurrentOwner, Pe = m.ReactDebugCurrentFrame;
    function Y(e) {
      if (e) {
        var r = e._owner, t = Z(e.type, e._source, r ? r.type : null);
        Pe.setExtraStackFrame(t);
      } else
        Pe.setExtraStackFrame(null);
    }
    var le;
    le = !1;
    function ue(e) {
      return typeof e == "object" && e !== null && e.$$typeof === c;
    }
    function De() {
      {
        if (se.current) {
          var e = b(se.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function or(e) {
      return "";
    }
    var Fe = {};
    function sr(e) {
      {
        var r = De();
        if (!r) {
          var t = typeof e == "string" ? e : e.displayName || e.name;
          t && (r = `

Check the top-level render call using <` + t + ">.");
        }
        return r;
      }
    }
    function Ae(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var t = sr(r);
        if (Fe[t])
          return;
        Fe[t] = !0;
        var n = "";
        e && e._owner && e._owner !== se.current && (n = " It was passed a child from " + b(e._owner.type) + "."), Y(e), d('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', t, n), Y(null);
      }
    }
    function Ie(e, r) {
      {
        if (typeof e != "object")
          return;
        if (oe(e))
          for (var t = 0; t < e.length; t++) {
            var n = e[t];
            ue(n) && Ae(n, r);
          }
        else if (ue(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var s = B(e);
          if (typeof s == "function" && s !== e.entries)
            for (var l = s.call(e), a; !(a = l.next()).done; )
              ue(a.value) && Ae(a.value, r);
        }
      }
    }
    function lr(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var t;
        if (typeof r == "function")
          t = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === g || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === R))
          t = r.propTypes;
        else
          return;
        if (t) {
          var n = b(r);
          Je(t, e.props, "prop", n, e);
        } else if (r.PropTypes !== void 0 && !le) {
          le = !0;
          var s = b(r);
          d("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", s || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && d("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function ur(e) {
      {
        for (var r = Object.keys(e.props), t = 0; t < r.length; t++) {
          var n = r[t];
          if (n !== "children" && n !== "key") {
            Y(e), d("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", n), Y(null);
            break;
          }
        }
        e.ref !== null && (Y(e), d("Invalid attribute `ref` supplied to `React.Fragment`."), Y(null));
      }
    }
    var $e = {};
    function We(e, r, t, n, s, l) {
      {
        var a = K(e);
        if (!a) {
          var i = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (i += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var w = or();
          w ? i += w : i += De();
          var v;
          e === null ? v = "null" : oe(e) ? v = "array" : e !== void 0 && e.$$typeof === c ? (v = "<" + (b(e.type) || "Unknown") + " />", i = " Did you accidentally export a JSX literal instead of a component?") : v = typeof e, d("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", v, i);
        }
        var p = ar(e, r, t, s, l);
        if (p == null)
          return p;
        if (a) {
          var D = r.children;
          if (D !== void 0)
            if (n)
              if (oe(D)) {
                for (var M = 0; M < D.length; M++)
                  Ie(D[M], e);
                Object.freeze && Object.freeze(D);
              } else
                d("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Ie(D, e);
        }
        if (N.call(r, "key")) {
          var L = b(e), j = Object.keys(r).filter(function(hr) {
            return hr !== "key";
          }), ce = j.length > 0 ? "{key: someKey, " + j.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!$e[L + ce]) {
            var pr = j.length > 0 ? "{" + j.join(": ..., ") + ": ...}" : "{}";
            d(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, ce, L, pr, L), $e[L + ce] = !0;
          }
        }
        return e === _ ? ur(p) : lr(p), p;
      }
    }
    function cr(e, r, t) {
      return We(e, r, t, !0);
    }
    function fr(e, r, t) {
      return We(e, r, t, !1);
    }
    var dr = fr, vr = cr;
    H.Fragment = _, H.jsx = dr, H.jsxs = vr;
  }()), H;
}
process.env.NODE_ENV === "production" ? pe.exports = br() : pe.exports = yr();
var o = pe.exports;
function mr({
  currentIndex: h,
  total: c,
  isPlaying: O,
  onPlay: _,
  onPause: x,
  onNext: k,
  onPrev: T,
  onSeek: f
}) {
  const g = c > 1 ? h / (c - 1) : 1;
  return /* @__PURE__ */ o.jsxs("div", { style: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: "12px 24px 20px",
    background: "linear-gradient(to top, rgba(10,10,11,0.95) 0%, transparent 100%)"
  }, children: [
    /* @__PURE__ */ o.jsxs(
      "div",
      {
        style: {
          height: 3,
          background: "#1e1e22",
          borderRadius: 2,
          marginBottom: 12,
          cursor: "pointer",
          position: "relative"
        },
        onClick: (y) => {
          const u = y.currentTarget.getBoundingClientRect(), R = (y.clientX - u.left) / u.width, E = Math.round(R * (c - 1));
          f(Math.max(0, Math.min(c - 1, E)));
        },
        children: [
          /* @__PURE__ */ o.jsx("div", { style: {
            height: "100%",
            width: `${g * 100}%`,
            background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
            borderRadius: 2,
            transition: "width 0.3s ease"
          } }),
          Array.from({ length: c }).map((y, u) => /* @__PURE__ */ o.jsx(
            "div",
            {
              style: {
                position: "absolute",
                top: "50%",
                left: `${c > 1 ? u / (c - 1) * 100 : 100}%`,
                transform: "translate(-50%, -50%)",
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: u <= h ? "#8b5cf6" : "#333",
                transition: "background 0.3s"
              }
            },
            u
          ))
        ]
      }
    ),
    /* @__PURE__ */ o.jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }, children: [
      /* @__PURE__ */ o.jsx(
        "button",
        {
          onClick: T,
          disabled: h === 0,
          style: ve(h === 0),
          children: "←"
        }
      ),
      /* @__PURE__ */ o.jsx(
        "button",
        {
          onClick: O ? x : _,
          style: {
            ...ve(!1),
            width: 40,
            height: 40,
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            color: "#fff",
            fontSize: 16
          },
          children: O ? "⏸" : "▶"
        }
      ),
      /* @__PURE__ */ o.jsx(
        "button",
        {
          onClick: k,
          disabled: h === c - 1,
          style: ve(h === c - 1),
          children: "→"
        }
      )
    ] })
  ] });
}
function ve(h) {
  return {
    width: 36,
    height: 36,
    borderRadius: 8,
    border: "1px solid #2a2a2e",
    background: "#111113",
    color: h ? "#333" : "#888",
    cursor: h ? "not-allowed" : "pointer",
    fontSize: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.15s"
  };
}
function xr({ x: h, y: c, viewportWidth: O, viewportHeight: _ }) {
  const x = h / O * 100, k = c / _ * 100;
  return /* @__PURE__ */ o.jsx(
    z.div,
    {
      animate: {
        left: `${x}%`,
        top: `${k}%`
      },
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
      style: {
        position: "absolute",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        zIndex: 20
      },
      children: /* @__PURE__ */ o.jsx("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ o.jsx(
        "path",
        {
          d: "M4 2L18 11L11.5 12.5L9 19L4 2Z",
          fill: "white",
          stroke: "#000",
          strokeWidth: "1.5",
          strokeLinejoin: "round"
        }
      ) })
    }
  );
}
function Rr({ x: h, y: c, viewportWidth: O, viewportHeight: _ }) {
  const x = h / O * 100, k = c / _ * 100;
  return /* @__PURE__ */ o.jsxs("div", { style: {
    position: "absolute",
    left: `${x}%`,
    top: `${k}%`,
    transform: "translate(-50%, -50%)",
    pointerEvents: "none",
    zIndex: 15
  }, children: [
    [0, 1, 2].map((T) => /* @__PURE__ */ o.jsx(
      z.div,
      {
        initial: { scale: 0, opacity: 0.8 },
        animate: { scale: 3 + T, opacity: 0 },
        transition: { duration: 0.8, delay: T * 0.1, ease: "easeOut" },
        style: {
          position: "absolute",
          width: 20,
          height: 20,
          borderRadius: "50%",
          border: "2px solid #6366f1",
          top: -10,
          left: -10
        }
      },
      T
    )),
    /* @__PURE__ */ o.jsx(
      z.div,
      {
        initial: { scale: 0 },
        animate: { scale: 1 },
        exit: { scale: 0 },
        transition: { duration: 0.2 },
        style: {
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: "#6366f1",
          position: "absolute",
          top: -5,
          left: -5,
          boxShadow: "0 0 12px rgba(99,102,241,0.8)"
        }
      }
    )
  ] });
}
const Er = 1200, wr = 700, ze = 1800;
function kr({
  data: h,
  width: c = "100%",
  height: O = "100%",
  autoPlay: _ = !1,
  onComplete: x
}) {
  const { steps: k, title: T } = h, [f, g] = fe(0), [y, u] = fe("before"), [R, E] = fe(_), C = gr(null), S = k[f], A = k.length, B = !!(S != null && S.screenshotBefore), m = () => {
    C.current && (clearTimeout(C.current), C.current = null);
  }, d = de((b) => {
    b < 0 || b >= A || (m(), g(b), u("before"));
  }, [A]), I = de(() => {
    f < A - 1 ? d(f + 1) : (E(!1), x == null || x());
  }, [f, A, d, x]), V = de(() => d(f - 1), [f, d]);
  if (Le(() => R ? B ? (y === "before" ? C.current = setTimeout(() => u("zoom"), Er) : y === "zoom" ? C.current = setTimeout(() => u("after"), wr) : C.current = setTimeout(I, ze), m) : (u("after"), C.current = setTimeout(I, ze), m) : m, [R, y, B, I]), Le(() => {
    const b = (P) => {
      P.key === "ArrowRight" ? (m(), I()) : P.key === "ArrowLeft" ? (m(), V()) : P.key === " " && (P.preventDefault(), E((W) => !W));
    };
    return window.addEventListener("keydown", b), () => window.removeEventListener("keydown", b);
  }, [I, V]), !S) return null;
  const { position: $, viewport: F } = S, ee = $.x / F.width * 100, re = $.y / F.height * 100, J = y === "zoom" ? 1.22 : 1, K = S.screenshotBefore || S.screenshot, te = S.screenshot, U = y === "after";
  return /* @__PURE__ */ o.jsxs("div", { style: {
    width: c,
    height: O,
    background: "#0a0a0b",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    position: "relative",
    // Ensure the component respects its container
    minWidth: 0,
    minHeight: 0
  }, children: [
    /* @__PURE__ */ o.jsxs("div", { style: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10,
      padding: "12px 20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: "linear-gradient(to bottom, rgba(10,10,11,0.9), transparent)"
    }, children: [
      /* @__PURE__ */ o.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
        /* @__PURE__ */ o.jsx("div", { style: {
          width: 20,
          height: 20,
          borderRadius: 5,
          flexShrink: 0,
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)"
        } }),
        /* @__PURE__ */ o.jsx("span", { style: {
          fontSize: 13,
          fontWeight: 600,
          color: "#fff",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          maxWidth: 300
        }, children: T })
      ] }),
      /* @__PURE__ */ o.jsxs("span", { style: { fontSize: 12, color: "#555", flexShrink: 0 }, children: [
        f + 1,
        " / ",
        A
      ] })
    ] }),
    /* @__PURE__ */ o.jsxs("div", { style: {
      flex: 1,
      minHeight: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "52px 32px 88px",
      position: "relative",
      overflow: "hidden"
    }, children: [
      /* @__PURE__ */ o.jsxs("div", { style: {
        width: "100%",
        maxWidth: "100%",
        maxHeight: "100%",
        background: "#1a1a1e",
        borderRadius: 10,
        overflow: "hidden",
        boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
        border: "1px solid #2a2a2e",
        display: "flex",
        flexDirection: "column"
      }, children: [
        /* @__PURE__ */ o.jsx("div", { style: {
          height: 32,
          background: "#141416",
          borderBottom: "1px solid #222",
          display: "flex",
          alignItems: "center",
          padding: "0 10px",
          gap: 5,
          flexShrink: 0
        }, children: [0, 1, 2].map((b) => /* @__PURE__ */ o.jsx("div", { style: { width: 9, height: 9, borderRadius: "50%", background: "#3a3a3a" } }, b)) }),
        /* @__PURE__ */ o.jsx("div", { style: {
          position: "relative",
          overflow: "hidden",
          flex: 1,
          aspectRatio: `${F.width} / ${F.height}`
        }, children: /* @__PURE__ */ o.jsxs(
          z.div,
          {
            animate: { scale: J },
            transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] },
            style: { position: "absolute", inset: 0, transformOrigin: `${ee}% ${re}%` },
            children: [
              K ? /* @__PURE__ */ o.jsx("img", { src: K, alt: "", style: {
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block"
              } }) : /* @__PURE__ */ o.jsx("div", { style: {
                position: "absolute",
                inset: 0,
                background: "#1a1a20",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#444",
                fontSize: 13
              }, children: "No screenshot captured" }),
              B && /* @__PURE__ */ o.jsx(
                z.img,
                {
                  src: te,
                  alt: "",
                  animate: { opacity: U ? 1 : 0 },
                  transition: { duration: 0.45, delay: U ? 0.1 : 0 },
                  style: {
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    opacity: 0
                  }
                }
              ),
              /* @__PURE__ */ o.jsx(
                xr,
                {
                  x: $.x,
                  y: $.y,
                  viewportWidth: F.width,
                  viewportHeight: F.height
                }
              ),
              y !== "before" && S.type === "click" && /* @__PURE__ */ o.jsx(
                Rr,
                {
                  x: $.x,
                  y: $.y,
                  viewportWidth: F.width,
                  viewportHeight: F.height
                },
                f + "-hl"
              )
            ]
          },
          f
        ) })
      ] }),
      /* @__PURE__ */ o.jsx(
        z.div,
        {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.25, delay: 0.15 },
          style: {
            position: "absolute",
            bottom: 80,
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(18,18,22,0.96)",
            border: "1px solid #2a2a2e",
            borderRadius: 8,
            padding: "7px 14px",
            fontSize: 13,
            color: "#ccc",
            backdropFilter: "blur(8px)",
            whiteSpace: "nowrap",
            maxWidth: "85%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            pointerEvents: "none"
          },
          children: S.description
        },
        f + "-desc"
      )
    ] }),
    /* @__PURE__ */ o.jsx(
      mr,
      {
        currentIndex: f,
        total: A,
        isPlaying: R,
        onPlay: () => E(!0),
        onPause: () => {
          m(), E(!1);
        },
        onNext: () => {
          m(), I();
        },
        onPrev: () => {
          m(), V();
        },
        onSeek: (b) => {
          m(), d(b), E(!1);
        }
      }
    )
  ] });
}
export {
  kr as DemoPlayer
};
