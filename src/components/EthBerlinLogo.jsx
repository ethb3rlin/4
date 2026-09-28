import React, { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";

const SUBTITLE = "<<<<IDENTITY<<CRISIS<<";

const EthBerlinLogo = React.forwardRef((props, ref) => {
  // The server renders an empty subtitle line, as before. After mounting it
  // types, or, under prefers-reduced-motion, shows the whole line at once.
  const [motion, setMotion] = useState(null);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    setMotion(!reduce.matches);
  }, []);

  return (
    <a
      ref={ref}
      className={`text-black hover:no-underline ${props.className}`}
      href="/"
      aria-label="ETHBerlin04, home"
    >
      <div className="font-dotpassport text-3xl tracking-widest">
        {/* <Typewriter
          options={{
            cursor: null,
            strings: ["ETHBerlin04"],
            autoStart: true,
            loop: true,
            delay: 30,
          }}
        /> */}
        ETHBerlin04
      </div>
      {/* Hidden from assistive tech, so the link's name stays put while the
          line types; the minimum height keeps the menu from jumping when the
          line is empty. */}
      <div
        aria-hidden="true"
        className="font-ocra text-[.91rem] leading-[22px] min-h-[22px] uppercase"
      >
        {motion === true && (
          <Typewriter
            options={{
              cursor: null,
              strings: [SUBTITLE],
              autoStart: true,
              loop: true,
              delay: 30,
              deleteSpeed: 30,
              pauseFor: 10000,
            }}
          />
        )}
        {motion === false && SUBTITLE}
        {/* {"<<<<<<<<<<<<<identity<<crisis<<<"} */}
      </div>
    </a>
  );
});

export default EthBerlinLogo;
