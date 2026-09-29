import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "@reach/router";
import EthBerlinLogo from "./EthBerlinLogo";

// Path, shortcut key, the rest of the MRZ label, and the name read out.
const NAV = [
  ["/manifesto", "M", "ANIFESTO", "Manifesto"],
  ["/gallery", "G", "ALLERY", "Gallery"],
  ["/hacker-manual", "H", "ACKER MANUAL", "Hacker Manual"],
  ["/schedule", "S", "CHEDULE", "Schedule"],
  ["/venue", "V", "ENUE", "Venue"],
  ["/experiences", "E", "XPERIENCES", "Experiences"],
  ["/art", "A", "RT", "Art"],
  ["/contributors", "C", "ONTRIBUTORS", "Contributors"],
  ["/face-idont", "F", "ACE IDON'T", "Face IDon't"],
];

const Sidebar = ({ className }) => {
  const [showNav, setShowNav] = useState(false);
  const [keysOn, setKeysOn] = useState(true);
  const { pathname } = useLocation();
  const opener = useRef(null);
  const closer = useRef(null);
  const here = pathname.replace(/\/$/, "");

  // The shortcut switch is remembered in the browser; html.js reads it.
  useEffect(() => {
    try {
      setKeysOn(localStorage.getItem("ethb4-shortcuts") !== "off");
    } catch {}
  }, []);
  const toggleKeys = () => {
    const next = !keysOn;
    setKeysOn(next);
    try {
      localStorage.setItem("ethb4-shortcuts", next ? "on" : "off");
    } catch {}
  };

  // While the phone menu is open the page behind it doesn't scroll, Escape
  // closes it, and focus moves to its close button and back to the opener.
  useEffect(() => {
    if (!showNav) return undefined;
    document.body.style.overflow = "hidden";
    closer.current?.focus();
    const onKey = (e) => e.key === "Escape" && setShowNav(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      opener.current?.focus();
    };
  }, [showNav]);

  const MenuItems = ({ className, mobile }) => (
    <nav aria-label="Main" className={`flex flex-col font-ocra ${className}`}>
      {NAV.map(([href, key, rest, label]) => {
        const current = here === href;
        return (
          <a
            key={href}
            href={href}
            aria-keyshortcuts={mobile ? undefined : key}
            aria-current={current ? "page" : undefined}
            className={`${mobile ? "px-3 py-2" : "px-2 py-1.5 -ml-2"} ${
              current ? "bg-black text-white" : ""
            }`}
          >
            {/* Read out as the plain name; the MRZ label is for the eye. */}
            <span className="sr-only">{label}</span>
            <span aria-hidden="true">
              &lt;&lt;
              <span
                className={current ? "text-berlin-red" : "text-berlin-red-text"}
              >
                {key}
              </span>
              &lt;{rest}
            </span>
          </a>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* 5.5rem to align with the Latout main content box */}
      <header
        className={`h-screen hidden sm:flex flex-col py-6 px-6 fixed w-72 overflow-y-auto text-black font-ocra ${className}`}
      >
        {" "}
        <EthBerlinLogo
          className="flex flex-col justify-center origin-center"
          titleClassName="text-3xl"
          subtitleClassName={`text-xs`}
        />
        <MenuItems className="mt-12 items-start gap-0.5 text-lg" />
        <div className="mt-auto pt-6">
          <div className="text-sm flex flex-col items-start">
            <a
              className="underline py-1"
              href="https://matrix.to/#/%23ethberlin:dod.ngo"
              target="_blank"
              rel="noreferrer"
            >
              #ethberlin:dod.ngo
            </a>
            <a
              className="underline py-1"
              href="mailto:contact@ethberlin.org"
              target="_blank"
              rel="noreferrer"
            >
              contact@ethberlin.org
            </a>
          </div>
          <button
            type="button"
            onClick={toggleKeys}
            aria-pressed={keysOn}
            className="mt-4 text-xs text-gray-600 border border-gray-400 px-2.5 py-[7px] hover:text-black hover:border-black"
          >
            SHORTCUTS: {keysOn ? "ON" : "OFF"}
          </button>
          <p className="text-xs text-gray-600 mt-2 mb-0">
            Press a red letter to jump.
          </p>
        </div>
      </header>

      <header className="flex sm:hidden flex-col text-xl text-left">
        {/* Non-moving logo navbar for mobile */}
        <div className="text-black my-6 mx-4 flex items-center justify-between gap-4">
          <div className="max-w-[300px]">
            <EthBerlinLogo
              className=""
              titleClassName="text-2xl"
              subtitleClassName={`text-xs `}
            />
          </div>
          <button
            ref={opener}
            type="button"
            onClick={() => setShowNav(true)}
            aria-label="Menu"
            aria-expanded={showNav}
            className="w-11 h-11 flex-none bg-white flex flex-col items-center justify-center gap-[5px]"
          >
            <span className="block w-[22px] h-0.5 bg-black" />
            <span className="block w-[22px] h-0.5 bg-black" />
            <span className="block w-[22px] h-0.5 bg-black" />
          </button>
        </div>
        {showNav && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-30 flex flex-col overflow-y-auto bg-[rgba(255,255,255,0.97)]"
          >
            {/* The close button takes the menu button's place. */}
            <div className="flex justify-end my-6 mx-4">
              <button
                ref={closer}
                type="button"
                onClick={() => setShowNav(false)}
                aria-label="Close menu"
                className="w-11 h-11 border border-black bg-white material-symbols-outlined !text-[28px] !leading-none"
              >
                close
              </button>
            </div>
            <MenuItems className="items-center gap-1 text-xl mt-2" mobile />
            <div className="mt-auto px-4 pt-6 pb-8 font-ocra text-sm flex flex-col items-center gap-1">
              <a
                className="underline py-1.5"
                href="https://matrix.to/#/%23ethberlin:dod.ngo"
                target="_blank"
                rel="noreferrer"
              >
                #ethberlin:dod.ngo
              </a>
              <a
                className="underline py-1.5"
                href="mailto:contact@ethberlin.org"
                target="_blank"
                rel="noreferrer"
              >
                contact@ethberlin.org
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Sidebar;
