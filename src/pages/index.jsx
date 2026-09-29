import React, { useEffect, useRef, useState } from "react";
import passface from "../assets/passface/passface.gif";
import dod from "../assets/passface/dod.png";
import Layout from "../components/Layout";
import { useBreakpoint } from "../components/useBreakpoint";
import EthBerlinLogo from "../components/EthBerlinLogo";
import EditionStamps from "../components/EditionStamps";
import SEO from "../components/seo";

const INTRO_KEYS = ["ArrowDown", "PageDown", " ", "Enter"];

// Tiles of the archive index after the projects tile: href, MRZ key, the
// rest of the label, and the name read out.
const TILES = [["/gallery", "G", "ALLERY", "Gallery"]];

const reducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const Home = () => {
  // mouseover image passport
  const [imageSrcPass, setImageSrcPass] = useState(dod);
  const [showSidebar, setShowSidebar] = useState(false);
  const ethBerlinTextRef = useRef();
  const { isSm } = useBreakpoint("sm");

  // https://medium.com/autodesk-tlv/smooth-text-scaling-in-javascript-css-a817ae8cc4c9
  useEffect(() => {
    // Don't run on mobile, nor for anyone who asked for less motion.
    if (!isSm || reducedMotion()) {
      setShowSidebar(true);
      return;
    }
    const MIN_SCALE = 1;
    const MAX_SCALE = 3;
    const SCALE_DOMAIN = MAX_SCALE - MIN_SCALE;
    let scale = MAX_SCALE;

    // Use size ref not the main element
    const elementWidth = ethBerlinTextRef.current.offsetWidth;
    const elementHeight = ethBerlinTextRef.current.offsetHeight;

    const MAX_TRANSLATE_X = window.innerWidth / 2 - elementWidth / 2; //32px = 2rem
    const MAX_TRANSLATE_Y = window.innerHeight / 2 - elementHeight / 2; // idk why + 1.5rem not needed here
    const MIN_TRANSLATE_X = 0;
    const MIN_TRANSLATE_Y = 0;
    const TRANSLATE_DOMAIN_Y = MAX_TRANSLATE_Y - MIN_TRANSLATE_Y;
    const TRANSLATE_DOMAIN_X = MAX_TRANSLATE_X - MIN_TRANSLATE_X;

    let translateX = MAX_TRANSLATE_X;
    let translateY = MAX_TRANSLATE_Y;

    if (!showSidebar) {
      // Only set up on first load
      ethBerlinTextRef.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) scale(${scale})`;
    }

    function onMouseWheel(e) {
      if (!showSidebar) {
        e.preventDefault();
      }
      moveElementOnDelta(-e.deltaY);
    }

    // Takes either the mousewheel or touch scroll as Y axis delta
    function moveElementOnDelta(delta) {
      const scaleDelta = (delta * SCALE_DOMAIN) / TRANSLATE_DOMAIN_X;

      // Normalize X and Y scroll to window width and height to send the element directly to the corner.
      // Otherwise it hits the shorter axis first.
      const translateXDelta = delta;
      const translateYDelta = (delta / TRANSLATE_DOMAIN_X) * TRANSLATE_DOMAIN_Y;

      // scroll upwards
      if (scaleDelta > 0) {
        scale = Math.min(MAX_SCALE, scale + scaleDelta);
        // Don't translate past the original position towards right and right.
        translateX = Math.min(translateX + translateXDelta, MAX_TRANSLATE_X);
        translateY = Math.min(translateY + translateYDelta, MAX_TRANSLATE_Y);
      } else {
        // scroll downwards
        scale = Math.max(MIN_SCALE, scale + scaleDelta);
        translateX = Math.max(translateX + translateXDelta, MIN_TRANSLATE_X);
        translateY = Math.max(translateY + translateYDelta, MIN_TRANSLATE_Y);
      }

      const style = `translateX(${translateX}px) translateY(${translateY}px) scale(${scale})`;
      ethBerlinTextRef.current.style.transform = style;
      // Show sidebar when logo is in place
      if (translateX === 0) setShowSidebar(true);
    }

    // A swipe moves the logo as the wheel does; so do the keys that scroll a
    // page, which send it all the way (sendToTopLeft).
    let touchY = 0;
    function onTouchStart(e) {
      touchY = e.touches[0].clientY;
    }
    function onTouchMove(e) {
      if (showSidebar) return;
      e.preventDefault();
      const y = e.touches[0].clientY;
      moveElementOnDelta((y - touchY) * 2);
      touchY = y;
    }
    function onKeyDown(e) {
      if (showSidebar || !INTRO_KEYS.includes(e.key)) return;
      e.preventDefault();
      sendToTopLeft();
    }

    window.addEventListener("wheel", onMouseWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("wheel", onMouseWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isSm, showSidebar]);

  function sendToTopLeft() {
    const el = ethBerlinTextRef.current;
    el.style.transition = "transform 0.6s ease";
    el.style.transform = `translateX(0) translateY(0) scale(1)`;
    setTimeout(() => setShowSidebar(true), 450);
  }

  // The passport photo swaps between the seal and the face, at least 600 ms
  // apart, and not at all under reduced motion.
  useEffect(() => {
    if (reducedMotion()) return undefined;
    let timeoutId;
    const changeImage = () => {
      setImageSrcPass((current) => (current === dod ? passface : dod));
      timeoutId = setTimeout(changeImage, 600 + Math.random() * 2000);
    };
    timeoutId = setTimeout(changeImage, 600 + Math.random() * 2000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <EthBerlinLogo
        ref={ethBerlinTextRef}
        className={`${
          showSidebar ? "hidden" : "sm:flex"
        } flex-col top-0 left-0 px-6 py-8 fixed w-auto  justify-center origin-center`}
      />
      {/* Scroll indicator */}
      <button
        type="button"
        aria-label="Enter site"
        className={`hidden ${
          showSidebar ? "hidden" : "sm:flex"
        } text-black fixed left-1/2 bottom-3 font-light flex-col items-center -translate-x-1/2 z-20`}
        onClick={sendToTopLeft}
      >
        <span
          aria-hidden="true"
          className="material-symbols-outlined text-6xl -mb-4 light-up"
        >
          expand_more
        </span>
        <span
          aria-hidden="true"
          className="material-symbols-outlined text-6xl -mt-5 light-up-delayed"
        >
          expand_more
        </span>
        <span aria-hidden="true" className="font-ocra text-xs mt-1.5">
          SCROLL OR PRESS ↓
        </span>
      </button>
      <Layout
        className={` ${
          !showSidebar
            ? "invisible opacity-0"
            : "fade-in-left visible opacity-100"
        } transition-opacity duration-2000 ease-in-out`}
      >
        {/* Page content: the passport beside the text from 1280 px, above
            it and compact below. */}
        <div className="flex flex-col items-start gap-4 xl:flex-row-reverse xl:gap-8">
          <div className="textbox text-black xl:w-80 xl:flex-none">
            <div className="flex flex-row flex-wrap items-center justify-center gap-x-5 gap-y-1 text-left xl:flex-col xl:gap-0 xl:text-center">
              <img
                src={imageSrcPass}
                className="w-28 h-28 sm:w-36 sm:h-36 xl:w-48 xl:h-48 xl:mb-4 object-cover"
                alt=""
              />
              <div className="font-ocra text-sm leading-5 sm:text-base sm:leading-6">
                <p className="my-0">Event: ETHBerlin04</p>
                <p className="my-0">Theme: Identity Crisis</p>
                <p className="my-0">Dates: May 24-26, 2024</p>
                <p className="my-0">Location: CIC, Berlin</p>
              </div>
              <div className="w-full text-center">
                <EditionStamps />
              </div>
            </div>
          </div>
          <div className="textbox min-w-0 max-w-[760px] xl:flex-1">
            <p>
              ETHBerlin was a hackathon, a cultural festival, an educational
              event, a platform for hacktivism, and a community initiative to
              push the decentralized ecosystem forward.
            </p>

            <nav
              aria-label="Archive"
              className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6 font-ocra text-[15px] leading-5"
            >
              <a
                href="https://projects.ethberlin.org/results/"
                target="_blank"
                rel="noreferrer"
                className="flex justify-between gap-2 border border-black px-3.5 py-3 text-black no-underline hover:bg-black hover:text-white hover:no-underline"
              >
                <span className="sr-only">
                  Projects and results (opens in a new tab)
                </span>
                <span aria-hidden="true">PROJECTS &amp; RESULTS</span>
                <span aria-hidden="true">↗</span>
              </a>
              {TILES.map(([href, key, rest, label]) => (
                <a
                  key={href}
                  href={href}
                  className="border border-black px-3.5 py-3 text-black no-underline hover:bg-black hover:text-white hover:no-underline"
                >
                  <span className="sr-only">{label}</span>
                  <span aria-hidden="true">
                    &lt;&lt;<span className="text-berlin-red-text">{key}</span>
                    &lt;{rest}
                  </span>
                </a>
              ))}
            </nav>

            <p>
              The situation is dire. We have been operating in crisis mode for
              years now. Established systems are failing, new and old
              imperialist powers are throwing continents into wars of attrition,
              global supply chains are collapsing, financial markets are
              tumbling, healthcare systems are falling apart, education is on a
              consistent downward spiral — the list goes on.
            </p>

            <p>
              But there is hope: The soils to grow new ideas have never been
              more nutritious. It has never been more urgent to double down on
              new revolutionary concepts and ideas. It is high time to change
              the world.
            </p>

            <p>
              To read our manifesto, press{" "}
              <a
                href="/manifesto"
                aria-label="M, opens the manifesto"
                className="font-ocra text-sm text-black"
              >
                &lt;&lt;<span className="text-berlin-red-text">M</span>&lt;
              </a>
              .
            </p>

            <p>
              ETHBerlin is not a conference but a hackathon. Every attendee
              played an active role in the event.{" "}
              <b>All applications are closed</b>. ETHBerlin04 was part of the{" "}
              <a
                href="https://blockchainweek.berlin"
                target="_blank"
                rel="noreferrer"
              >
                blockchainweek.berlin
              </a>
              .
            </p>
          </div>
        </div>
      </Layout>
    </>
  );
};

export const Head = () => (
  <>
    <SEO title="ETHBerlin04 · Identity Crisis · May 24–26, 2024" />
  </>
);

export default Home;
