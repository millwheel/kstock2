/* @ds-bundle: {"format":4,"namespace":"KakaoBankDesignSystem_b05144","components":[{"name":"Button","sourcePath":"components/button/Button.jsx"},{"name":"Card","sourcePath":"components/cards/Card.jsx"},{"name":"Badge","sourcePath":"components/feedback/Badge.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"ListItem","sourcePath":"components/lists/ListItem.jsx"},{"name":"Tabs","sourcePath":"components/tabs/Tabs.jsx"}],"sourceHashes":{"components/button/Button.jsx":"2cd86917fb17","components/cards/Card.jsx":"08b237cec903","components/feedback/Badge.jsx":"f602e162828c","components/forms/Input.jsx":"03ff72602ef5","components/lists/ListItem.jsx":"f966810d4421","components/tabs/Tabs.jsx":"b0ce45585b20","ui_kits/corporate-site/CorporateSite.jsx":"eff1391f9d45","ui_kits/mobile-app/MobileApp.jsx":"1214d89ef102"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.KakaoBankDesignSystem_b05144 = window.KakaoBankDesignSystem_b05144 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/button/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const VARIANT_STYLE = {
  "yellow-solid": {
    background: "var(--kb-yellow)",
    color: "var(--color-text-on-brand)",
    border: "none"
  },
  "black-solid": {
    background: "var(--kb-black)",
    color: "var(--kb-white)",
    border: "none"
  },
  outline: {
    background: "transparent",
    color: "var(--kb-black)",
    border: "1px solid var(--kb-gray-light)"
  },
  critical: {
    background: "var(--kb-error)",
    color: "var(--kb-white)",
    border: "none"
  },
  "nav-link": {
    background: "transparent",
    color: "var(--kb-black)",
    border: "none"
  }
};
const SIZE_STYLE = {
  default: {
    padding: "14px 20px",
    fontSize: "var(--text-body-large-size)",
    minHeight: 48
  },
  large: {
    padding: "16px 24px",
    fontSize: "var(--text-body-large-size)",
    minHeight: 56
  },
  compact: {
    padding: "8px 14px",
    fontSize: "var(--text-body-size)",
    minHeight: 40
  }
};

/**
 * Button — KakaoBank primary UI action.
 * Variants: yellow-solid (primary CTA), black-solid (secondary strong),
 * outline (tertiary), critical (destructive), nav-link (top-nav / sub-nav text link).
 */
function Button({
  variant = "yellow-solid",
  size = "default",
  disabled = false,
  fullWidth = false,
  children,
  onClick,
  style,
  ...rest
}) {
  const isNav = variant === "nav-link";
  const vs = VARIANT_STYLE[variant] || VARIANT_STYLE["yellow-solid"];
  const ss = isNav ? {
    padding: "0 20px",
    fontSize: "var(--text-body-size)",
    minHeight: 62
  } : SIZE_STYLE[size] || SIZE_STYLE.default;
  const disabledStyle = disabled && !isNav ? {
    background: "var(--kb-surface-fill)",
    color: "var(--kb-gray-light)",
    border: "none"
  } : {};
  return /*#__PURE__*/React.createElement("button", _extends({
    disabled: disabled,
    onClick: onClick,
    style: {
      fontFamily: "var(--font-sans)",
      fontWeight: 600,
      borderRadius: isNav ? 0 : "var(--radius-md)",
      cursor: disabled ? "default" : "pointer",
      width: fullWidth ? "100%" : "auto",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      transition: "opacity var(--motion-fast) var(--ease-standard)",
      ...vs,
      ...ss,
      ...disabledStyle,
      ...style
    },
    onMouseDown: e => {
      if (!disabled && !isNav) e.currentTarget.style.opacity = "0.85";
    },
    onMouseUp: e => {
      e.currentTarget.style.opacity = "1";
    },
    onMouseLeave: e => {
      e.currentTarget.style.opacity = "1";
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/button/Button.jsx", error: String((e && e.message) || e) }); }

// components/cards/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Card — three KakaoBank surface treatments.
 * variant: "product" (white, 24px pad, corporate site), "section-fill" (gray fill, 32px pad,
 * mid-page promo/FAQ groupings), "debit" (yellow CR-80 card face for debit/savings visualization).
 */
function Card({
  variant = "product",
  children,
  style,
  ...rest
}) {
  if (variant === "debit") {
    return /*#__PURE__*/React.createElement("div", _extends({
      style: {
        background: "var(--kb-yellow)",
        borderRadius: "var(--radius-lg)",
        aspectRatio: "1.586",
        width: 320,
        padding: 24,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        fontFamily: "var(--font-sans)",
        color: "var(--kb-black)",
        boxSizing: "border-box",
        ...style
      }
    }, rest), children);
  }
  const variantStyle = variant === "section-fill" ? {
    background: "var(--kb-surface-fill)",
    borderRadius: "var(--radius-lg)",
    padding: 32,
    boxShadow: "none"
  } : {
    background: "var(--kb-white)",
    borderRadius: "var(--radius-md)",
    padding: 24,
    boxShadow: "none",
    border: "1px solid var(--color-border-subtle)"
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      fontFamily: "var(--font-sans)",
      color: "var(--kb-black)",
      ...variantStyle,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/Card.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Badge.jsx
try { (() => {
/**
 * Badge — notification dot and status pills.
 * variant: "notification" (red dot), "status-positive" (green pill), "status-critical" (red pill).
 */
function Badge({
  variant = "status-positive",
  children
}) {
  if (variant === "notification") {
    return /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 16,
        height: 16,
        padding: "2px 6px",
        borderRadius: "var(--radius-full)",
        background: "var(--kb-error)",
        border: "1.5px solid var(--kb-white)",
        color: "var(--kb-white)",
        fontFamily: "var(--font-sans)",
        fontSize: 11,
        fontWeight: 700,
        boxSizing: "border-box"
      }
    }, children);
  }
  const positive = variant === "status-positive";
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      padding: "4px 10px",
      borderRadius: "var(--radius-full)",
      background: positive ? "var(--kb-success-wash)" : "var(--kb-error-wash)",
      color: positive ? "var(--kb-success)" : "var(--kb-error)",
      fontFamily: "var(--font-sans)",
      fontSize: 12,
      fontWeight: 600
    }
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Badge.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Input — default text field and large hero amount input.
 * variant: "default" (form fields, 12px radius, gray border) or "amount" (transfer hero numeral).
 */
function Input({
  variant = "default",
  error = false,
  placeholder,
  value,
  onChange,
  style,
  ...rest
}) {
  if (variant === "amount") {
    return /*#__PURE__*/React.createElement("input", _extends({
      type: "text",
      inputMode: "numeric",
      placeholder: placeholder || "0",
      value: value,
      onChange: onChange,
      style: {
        fontFamily: "var(--font-sans)",
        fontSize: 32,
        fontWeight: 700,
        color: "var(--kb-black)",
        background: "transparent",
        border: "none",
        borderBottom: "2px solid var(--kb-black)",
        padding: "4px 0",
        outline: "none",
        width: "100%",
        boxSizing: "border-box",
        ...style
      }
    }, rest));
  }
  return /*#__PURE__*/React.createElement("input", _extends({
    type: "text",
    placeholder: placeholder,
    value: value,
    onChange: onChange,
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-body-large-size)",
      color: "var(--kb-black)",
      background: "var(--kb-white)",
      border: `1px solid ${error ? "var(--kb-error)" : "var(--kb-gray-light)"}`,
      borderRadius: "var(--radius-md)",
      padding: "14px 16px",
      outline: "none",
      width: "100%",
      boxSizing: "border-box",
      transition: "border-color var(--motion-fast) var(--ease-standard)",
      ...style
    },
    onFocus: e => {
      if (!error) e.currentTarget.style.borderColor = "var(--kb-black)";
    },
    onBlur: e => {
      if (!error) e.currentTarget.style.borderColor = "var(--kb-gray-light)";
    }
  }, rest));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/lists/ListItem.jsx
try { (() => {
/**
 * ListItem — account row. 64px min-height, 40px rounded-square avatar (never circular),
 * name/number left, amount right (flips to red when negative).
 */
function ListItem({
  avatarColor = "var(--kb-yellow)",
  name,
  subLabel,
  amount,
  negative = false,
  divider = true
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      minHeight: 64,
      padding: "16px 20px",
      background: "var(--kb-white)",
      borderBottom: divider ? "1px solid var(--color-border-subtle)" : "none",
      boxSizing: "border-box",
      fontFamily: "var(--font-sans)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: "var(--radius-md)",
      background: avatarColor,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 600,
      color: "var(--kb-black)"
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 400,
      color: "var(--kb-gray)"
    }
  }, subLabel))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      color: negative ? "var(--kb-error)" : "var(--kb-black)"
    }
  }, amount));
}
Object.assign(__ds_scope, { ListItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/lists/ListItem.jsx", error: String((e && e.message) || e) }); }

// components/tabs/Tabs.jsx
try { (() => {
/**
 * Tabs — three KakaoBank tab treatments.
 * variant: "sub-nav" (corporate sub-section nav), "service" (product-category tabs),
 * "segmented" (pill segmented control switching account types / period filters).
 */
function Tabs({
  variant = "segmented",
  items = [],
  active = 0,
  onChange
}) {
  if (variant === "sub-nav") {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 32,
        borderBottom: "1px solid var(--color-border-subtle)"
      }
    }, items.map((item, i) => /*#__PURE__*/React.createElement("button", {
      key: item,
      onClick: () => onChange && onChange(i),
      style: {
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "20px 0",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-body-size)",
        fontWeight: 400,
        color: i === active ? "var(--kb-black)" : "var(--kb-gray-inactive-tab)"
      }
    }, item)));
  }
  if (variant === "service") {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 40
      }
    }, items.map((item, i) => /*#__PURE__*/React.createElement("button", {
      key: item,
      onClick: () => onChange && onChange(i),
      style: {
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "16px 0",
        height: 61,
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-body-large-size)",
        fontWeight: i === active ? 600 : 400,
        color: "var(--kb-black)",
        borderBottom: i === active ? "2px solid var(--kb-black)" : "2px solid transparent"
      }
    }, item)));
  }

  // segmented
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      background: "var(--kb-surface-fill)",
      borderRadius: "var(--radius-md)",
      padding: 4,
      gap: 4
    }
  }, items.map((item, i) => /*#__PURE__*/React.createElement("button", {
    key: item,
    onClick: () => onChange && onChange(i),
    style: {
      border: "none",
      cursor: "pointer",
      padding: "8px 16px",
      borderRadius: "var(--radius-sm)",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-body-size)",
      fontWeight: 600,
      background: i === active ? "var(--kb-white)" : "transparent",
      color: i === active ? "var(--kb-black)" : "var(--kb-gray)",
      boxShadow: i === active ? "var(--shadow-whisper)" : "none",
      transition: "all var(--motion-fast) var(--ease-standard)"
    }
  }, item)));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/tabs/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/corporate-site/CorporateSite.jsx
try { (() => {
const {
  Button,
  Tabs,
  Card
} = window.KakaoBankDesignSystem_b05144;
const NAV_ITEMS = ["소개", "서비스", "ESG", "투자정보", "고객센터", "인재영입"];
const SERVICE_TABS = ["통장", "저축", "대출", "투자", "외환", "카드", "사업자"];
const SUB_NAV = ["비즈니스", "기술", "새소식"];
function Header() {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      height: 62,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 40px",
      borderBottom: "1px solid var(--color-border-subtle)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 32,
      borderRadius: 8,
      background: "var(--kb-yellow)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 800,
      fontSize: 14
    }
  }, "B"), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex"
    }
  }, NAV_ITEMS.map(item => /*#__PURE__*/React.createElement(Button, {
    key: item,
    variant: "nav-link"
  }, item)))), /*#__PURE__*/React.createElement(Button, {
    variant: "black-solid",
    size: "compact"
  }, "\uC571 \uB2E4\uC6B4\uB85C\uB4DC"));
}
function Hero() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "100px 40px 80px",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 64,
      fontWeight: 800,
      lineHeight: 1.1,
      marginBottom: 20
    }
  }, "\uB098\uC758 \uCCAB \uBC88\uC9F8 AI \uC740\uD589", /*#__PURE__*/React.createElement("br", null), "\uCE74\uCE74\uC624\uBC45\uD06C"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      color: "var(--kb-gray)",
      marginBottom: 32
    }
  }, "\uB098\uC758 \uC77C\uC0C1 \uC18D \uC720\uC6A9\uD55C \uAE08\uC735 \uC11C\uBE44\uC2A4\uB97C \uB9CC\uB4ED\uB2C8\uB2E4"), /*#__PURE__*/React.createElement(Button, {
    variant: "yellow-solid",
    size: "large"
  }, "\uC11C\uBE44\uC2A4 \uC0B4\uD3B4\uBCF4\uAE30"));
}
function ServicesSection() {
  const [tab, setTab] = React.useState(0);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "0 40px 80px",
      maxWidth: 1360,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 32,
      fontWeight: 700,
      marginBottom: 8
    }
  }, "\uCE74\uCE74\uC624\uBC45\uD06C\uC758 \uC11C\uBE44\uC2A4\uB97C \uC18C\uAC1C\uD569\uB2C8\uB2E4"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      color: "var(--kb-gray)",
      marginBottom: 32
    }
  }, "\uC0C8\uB85C\uC6B4 \uAE08\uC735 \uACBD\uD5D8, AI \uC11C\uBE44\uC2A4"), /*#__PURE__*/React.createElement(Tabs, {
    variant: "service",
    items: SERVICE_TABS,
    active: tab,
    onChange: setTab
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 20,
      marginTop: 32
    }
  }, /*#__PURE__*/React.createElement(Card, {
    variant: "product"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 600,
      marginBottom: 8
    }
  }, "AI \uC11C\uBE44\uC2A4"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: "var(--kb-gray)"
    }
  }, "\uC5B4\uB835\uACE0 \uBCF5\uC7A1\uD55C \uAE08\uC735\uC0DD\uD65C, \uCE74\uCE74\uC624\uBC45\uD06C AI\uAC00 \uB3C4\uC640\uB4DC\uB9B4\uAC8C\uC694.")), /*#__PURE__*/React.createElement(Card, {
    variant: "product"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 600,
      marginBottom: 8
    }
  }, "mini"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: "var(--kb-gray)"
    }
  }, "\uB9CC 14\uC138~18\uC138\uB97C \uC704\uD55C \uAE08\uC735 \uC0DD\uD65C\uC758 \uCCAB\uAC78\uC74C.")), /*#__PURE__*/React.createElement(Card, {
    variant: "product"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 600,
      marginBottom: 8
    }
  }, "\uC0AC\uC5C5\uC790"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: "var(--kb-gray)"
    }
  }, "\uB0B4 \uC0AC\uC5C5\uC7A5\uC5D0 \uB9DE\uB294 \uBCF4\uC99D\uC11C\uB300\uCD9C\uC744 \uD655\uC778\uD560 \uC218 \uC788\uC5B4\uC694.")), /*#__PURE__*/React.createElement(Card, {
    variant: "product"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 600,
      marginBottom: 8
    }
  }, "\uAE00\uB85C\uBC8C"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: "var(--kb-gray)"
    }
  }, "\uD574\uC678 \uC1A1\uAE08\uB3C4 \uCE74\uCE74\uC624\uBC45\uD06C \uC548\uC5D0\uC11C \uAC04\uD3B8\uD558\uAC8C."))));
}
function NewsSection() {
  const [tab, setTab] = React.useState(0);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--kb-surface-fill)",
      padding: "80px 40px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1360,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    variant: "sub-nav",
    items: SUB_NAV,
    active: tab,
    onChange: setTab
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 20,
      marginTop: 32
    }
  }, /*#__PURE__*/React.createElement(Card, {
    variant: "section-fill",
    style: {
      background: "#fff"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--kb-gray)",
      marginBottom: 8
    }
  }, "2026.06.18"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 600
    }
  }, "\uCE74\uCE74\uC624\uBC45\uD06C, 2\uBD84\uAE30 \uC2E4\uC801 \uBC1C\uD45C")), /*#__PURE__*/React.createElement(Card, {
    variant: "section-fill",
    style: {
      background: "#fff"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--kb-gray)",
      marginBottom: 8
    }
  }, "2026.05.02"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 600
    }
  }, "26\uC8FC\uC801\uAE08, \uB204\uC801 \uAC00\uC785 500\uB9CC \uACC4\uC88C \uB3CC\uD30C")), /*#__PURE__*/React.createElement(Card, {
    variant: "section-fill",
    style: {
      background: "#fff"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--kb-gray)",
      marginBottom: 8
    }
  }, "2026.04.11"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 600
    }
  }, "\uC0AC\uC5C5\uC790 \uBCF4\uC99D\uC11C\uB300\uCD9C \uC11C\uBE44\uC2A4 \uD655\uB300")))));
}
function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: "var(--kb-surface-subtle)",
      padding: "56px 40px 32px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1360,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 32,
      marginBottom: 40
    }
  }, ["소개", "서비스", "ESG", "투자정보"].map(col => /*#__PURE__*/React.createElement("div", {
    key: col
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 20,
      fontWeight: 600,
      marginBottom: 16
    }
  }, col), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: "var(--kb-gray)",
      lineHeight: 2
    }
  }, "\uD558\uC704 \uBA54\uB274 1", /*#__PURE__*/React.createElement("br", null), "\uD558\uC704 \uBA54\uB274 2", /*#__PURE__*/React.createElement("br", null), "\uD558\uC704 \uBA54\uB274 3")))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid var(--color-border-subtle)",
      paddingTop: 20,
      fontSize: 12,
      color: "var(--kb-gray)",
      lineHeight: 1.8
    }
  }, "\uC8FC\uC2DD\uD68C\uC0AC \uCE74\uCE74\uC624\uBC45\uD06C \xB7 \uB300\uD45C \uC724\uD638\uC601 \xB7 \uC0AC\uC5C5\uC790\uBC88\uD638 375-88-00197 \xB7 \uACE0\uAC1D\uC13C\uD130 1599-3333")));
}
function App() {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Header, null), /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement(ServicesSection, null), /*#__PURE__*/React.createElement(NewsSection, null), /*#__PURE__*/React.createElement(Footer, null));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/corporate-site/CorporateSite.jsx", error: String((e && e.message) || e) }); }

// ui_kits/mobile-app/MobileApp.jsx
try { (() => {
const {
  Button,
  Card,
  ListItem,
  Badge,
  Input
} = window.KakaoBankDesignSystem_b05144;
function StatusBar() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 44,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 20px",
      fontSize: 13,
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement("span", null, "9:41"), /*#__PURE__*/React.createElement("span", null, "\uD83D\uDD0B"));
}
function HomeScreen({
  onTransfer
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement(StatusBar, null), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "8px 20px 20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 600
    }
  }, "\uBBFC\uC9C0\uB2D8"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 20
    }
  }, "\uD83D\uDD14"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: -4,
      right: -6
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "notification"
  }, "2")))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px 24px"
    }
  }, /*#__PURE__*/React.createElement(Card, {
    variant: "debit",
    style: {
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600
    }
  }, "\uCE74\uCE74\uC624\uBC45\uD06C \uC785\uCD9C\uAE08"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 500
    }
  }, "\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 1234"))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px 24px",
      display: "flex",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "yellow-solid",
    fullWidth: true,
    onClick: onTransfer
  }, "\uC774\uCCB4\uD558\uAE30"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    fullWidth: true
  }, "\uCDA9\uC804\uD558\uAE30")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px 16px"
    }
  }, /*#__PURE__*/React.createElement(Card, {
    variant: "section-fill"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 700,
      marginBottom: 4
    }
  }, "26\uC8FC\uC801\uAE08"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--kb-gray)"
    }
  }, "13\uC8FC\uCC28 \uC9C4\uD589\uC911")), /*#__PURE__*/React.createElement(Badge, {
    variant: "status-positive"
  }, "\uC801\uAE08 \uC9C4\uD589\uC911")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 4,
      margin: "16px 0 12px",
      flexWrap: "wrap"
    }
  }, Array.from({
    length: 26
  }).map((_, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: i < 13 ? "var(--kb-yellow)" : "var(--kb-gray-light)"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--kb-gray)"
    }
  }, "13\uC8FC\uCC28 \uC9C4\uD589\uC911"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 700
    }
  }, "KRW 130,000")))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(ListItem, {
    name: "\uCE74\uCE74\uC624\uBC45\uD06C \uC785\uCD9C\uAE08",
    subLabel: "3333-01-1234567",
    amount: "1,240,000\uC6D0"
  }), /*#__PURE__*/React.createElement(ListItem, {
    name: "\uC815\uAE30 \uC774\uCCB4",
    subLabel: "07.09 14:20",
    amount: "-50,000\uC6D0",
    negative: true
  }), /*#__PURE__*/React.createElement(ListItem, {
    name: "26\uC8FC\uC801\uAE08",
    subLabel: "\uC790\uB3D9\uC774\uCCB4",
    amount: "-10,000\uC6D0",
    negative: true,
    divider: false
  })));
}
function TransferScreen({
  onBack,
  onSend
}) {
  const [amount, setAmount] = React.useState("");
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement(StatusBar, null), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "8px 20px 24px",
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    style: {
      border: "none",
      background: "none",
      fontSize: 20,
      cursor: "pointer"
    }
  }, "\u2190"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 600
    }
  }, "\uC774\uCCB4\uD558\uAE30")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px",
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: "var(--kb-gray)",
      marginBottom: 8
    }
  }, "\uBC1B\uB294 \uC0AC\uB78C"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 600,
      marginBottom: 32
    }
  }, "\uAE40\uCE74\uBC45"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: "var(--kb-gray)",
      marginBottom: 8
    }
  }, "\uBCF4\uB0BC \uAE08\uC561"), /*#__PURE__*/React.createElement(Input, {
    variant: "amount",
    placeholder: "0",
    value: amount,
    onChange: e => setAmount(e.target.value.replace(/[^0-9]/g, ""))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--kb-gray)",
      marginTop: 8
    }
  }, "\uBCF4\uB0BC \uC218 \uC788\uB294 \uAE08\uC561: 1,240,000\uC6D0")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 20
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "yellow-solid",
    size: "large",
    fullWidth: true,
    onClick: () => onSend(amount || "50000")
  }, amount ? `${Number(amount).toLocaleString()}원 보내기` : "다음")));
}
function SuccessScreen({
  amount,
  onDone
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 64,
      height: 64,
      borderRadius: "50%",
      background: "var(--kb-success-wash)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 32,
      color: "var(--kb-success)",
      marginBottom: 24
    }
  }, "\u2713"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 24,
      fontWeight: 700,
      marginBottom: 12
    }
  }, "\uC774\uCCB4\uAC00 \uC644\uB8CC\uB418\uC5C8\uC5B4\uC694"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      color: "var(--kb-gray)",
      marginBottom: 40
    }
  }, Number(amount).toLocaleString(), "\uC6D0\uC744 \uAE40\uCE74\uBC45\uC5D0\uAC8C \uBCF4\uB0C8\uC5B4\uC694"), /*#__PURE__*/React.createElement(Button, {
    variant: "yellow-solid",
    size: "large",
    fullWidth: true,
    onClick: onDone
  }, "\uD655\uC778"));
}
function App() {
  const [screen, setScreen] = React.useState("home");
  const [amount, setAmount] = React.useState("50000");
  if (screen === "transfer") {
    return /*#__PURE__*/React.createElement(TransferScreen, {
      onBack: () => setScreen("home"),
      onSend: a => {
        setAmount(a);
        setScreen("success");
      }
    });
  }
  if (screen === "success") {
    return /*#__PURE__*/React.createElement(SuccessScreen, {
      amount: amount,
      onDone: () => setScreen("home")
    });
  }
  return /*#__PURE__*/React.createElement(HomeScreen, {
    onTransfer: () => setScreen("transfer")
  });
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/mobile-app/MobileApp.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.ListItem = __ds_scope.ListItem;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
