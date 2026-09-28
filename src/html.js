import React from "react";
import PropTypes from "prop-types";

export default function HTML(props) {
  return (
    <html lang="en" {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            document.addEventListener("keydown", checkKey);

            function checkKey(e) {
                // A key held down, pressed with a modifier, or typed into a
                // field is not a shortcut.
                if (e.repeat || e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) {
                  return;
                }
                var t = e.target;
                if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) {
                  return;
                }
                // The sidebar's SHORTCUTS button switches them off, remembered here.
                try {
                  if (localStorage.getItem("ethb4-shortcuts") === "off") {
                    return;
                  }
                } catch (x) {}

                var dest = {
                    a: "/art",
                    e: "/experiences",
                    m: "/manifesto",
                    h: "/hacker-manual",
                    i: "/contact",
                    d: "https://dod.ngo",
                    o: "/code-of-conduct",
                    c: "/contributors",
                    p: "/privacy-policy",
                    f: "/face-idont",
                    s: "/schedule",
                    v: "/venue",
                    b: "https://dod.ngo/blog",
                    g: "/gallery"
                }[(e.key || "").toLowerCase()];
                if (!dest) {
                  return;
                }
                // Pages of this site open here; other sites open in a new tab.
                if (dest.charAt(0) === "/") {
                  window.location.href = dest;
                } else {
                  window.open(dest, "_blank", "noopener");
                }
            }
            `,
          }}
        />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  );
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
};
