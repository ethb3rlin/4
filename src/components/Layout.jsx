import React from "react";
import Sidebar from "./Sidebar";
import wolpy from "../assets/wolpy_transparent_red.png";

const Layout = ({ children, showEthDiamond, className, hidden }) => {
  return (
    <div className={`${className ? className : ""} flex flex-col min-h-screen`}>
      {/* Off-screen until focused: the first Tab stop on every page. */}
      <a
        href="#content"
        className="fixed left-[-10000px] focus:left-2 top-2 z-[100] bg-black text-white px-3.5 py-2.5 font-ocra text-sm"
      >
        Skip to content
      </a>
      <div className="flex-1 flex flex-col min-h-full font-bundessans text-black max-w-[100rem] w-full m-auto">
        <Sidebar />
        {/* Top Right items Desktop only */}
        <div
          className={`z-10 hidden md:flex justify-end items-center gap-6 my-9 sm:mr-12 font-ocra text-black`}
        >
          <span className="bg-black text-white px-2 py-0.5">ARCHIVE</span>
          <span>May 24-26, 2024</span>
          <a
            className="underline"
            href="https://cic.com/berlin/"
            target="_blank"
            rel="noreferrer"
          >
            CIC Innovation Campus, Berlin
          </a>
        </div>

        <div></div>

        <div
          aria-hidden="true"
          className="hidden md:block fixed -bottom-10 -right-10 -z-50"
        >
          <img src={wolpy} alt="" className="w-56 h-56 opacity-25 -rotate-12" />
        </div>
        {/* Main content */}

        <main
          id="content"
          tabIndex={-1}
          className="flex flex-row flex-1 ml-4 mr-4 sm:mr-8  sm:ml-72 focus:outline-none"
        >
          {children && (
            <div className="flex-grow sm:mt-16 md:mt-7 mb-16 w-full sm:mr-8">
              {children}
            </div>
          )}
        </main>

        {/* Footer: 14px type and 6px padding make 32px-tall targets. Only
            the letters that are shortcuts carry the key styling; ↗ marks a
            new tab, and the accessible name says so. */}
        <footer
          className={`flex flex-col md:flex-row flex-wrap justify-center items-center text-center sm:justify-end gap-x-6 mt-4 mb-6 z-20 sm:mr-8 text-sm font-ocra sm:ml-72`}
        >
          <a
            className="py-1.5 text-black"
            href="https://dod.ngo"
            target="_blank"
            rel="noreferrer"
          >
            <span className="sr-only">
              Department of Decentralization (opens in a new tab)
            </span>
            <span aria-hidden="true">
              &lt;&lt;<span className="text-berlin-red-text">D</span>
              &lt;EPARTMENT OF DECENTRALIZATION ↗
            </span>
          </a>
          <a
            className="py-1.5 text-black"
            href="https://dod.ngo/blog"
            target="_blank"
            rel="noreferrer"
          >
            <span className="sr-only">Blog (opens in a new tab)</span>
            <span aria-hidden="true">
              &lt;&lt;<span className="text-berlin-red-text">B</span>&lt;LOG ↗
            </span>
          </a>
          <a className="py-1.5 text-black" href="/code-of-conduct">
            <span className="sr-only">Code of Conduct</span>
            <span aria-hidden="true">
              CODE &lt;&lt;<span className="text-berlin-red-text">O</span>&lt;F
              CONDUCT
            </span>
          </a>
          <a className="py-1.5 text-black" href="/privacy-policy">
            <span className="sr-only">Privacy Policy</span>
            <span aria-hidden="true">
              PRIVACY &lt;&lt;<span className="text-berlin-red-text">P</span>
              &lt;OLICY
            </span>
          </a>
          <a className="py-1.5 text-black" href="/contact">
            <span className="sr-only">Contact and Impressum</span>
            <span aria-hidden="true">
              CONTACT &amp; &lt;&lt;
              <span className="text-berlin-red-text">I</span>&lt;MPRESSUM
            </span>
          </a>
          <a
            className="py-1.5 text-black"
            href="https://github.com/ethb3rlin/4"
            target="_blank"
            rel="noreferrer"
          >
            <span className="sr-only">Source code (opens in a new tab)</span>
            <span aria-hidden="true">SOURCE CODE ↗</span>
          </a>
        </footer>
      </div>
    </div>
  );
};
Layout.defaultProps = {
  showEthDiamond: true,
};
export default Layout;
