import React, { useEffect, useState } from "react";
import SEO from "../components/seo";
import Layout from "../components/Layout";
import Typewriter from "typewriter-effect";

const CODE = "<<<<404<<";

// Inside the site's layout, with a way home (design review, issue 58). The
// heading glitches and types unless the reader asked for less motion; until
// that is known (the build, the first paint) it stands still.
const NotFound = () => {
  const [motion, setMotion] = useState(null);
  useEffect(() => {
    setMotion(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <Layout>
      <div className="textbox max-w-[760px]">
        <h1 className="font-ocra text-5xl sm:text-7xl leading-[1.1] text-black [overflow-wrap:anywhere]">
          <span className="sr-only">Page not found (404)</span>
          <span
            aria-hidden="true"
            className={motion ? "glitch block" : "block"}
          >
            {motion ? (
              <Typewriter
                options={{
                  cursor: null,
                  strings: [CODE],
                  autoStart: true,
                  loop: true,
                  delay: 30,
                  deleteSpeed: 30,
                  pauseFor: 10000,
                }}
              />
            ) : (
              CODE
            )}
          </span>
        </h1>
        <p className="mt-4">We couldn't find the page you are looking for.</p>
        <p className="mb-0 font-ocra">
          <a
            href="/"
            className="inline-block border border-black px-3.5 py-3 text-black no-underline hover:bg-black hover:text-white"
          >
            GO TO THE HOMEPAGE
          </a>
        </p>
      </div>
    </Layout>
  );
};

export const Head = () => <SEO title="Page not found · ETHBerlin04" />;

export default NotFound;
