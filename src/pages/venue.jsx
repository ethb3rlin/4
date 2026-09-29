import Layout from "../components/Layout";
import ArchiveNote from "../components/ArchiveNote";
import React from "react";
import SEO from "../components/seo";
import groundFloor from "../images/groundFloor.png";
import firstFloor from "../images/firstFloor.png";
import secondFloor from "../images/secondFloor.png";
import thirdFloor from "../images/thirdFloor.png";
import fourthFloor from "../images/fourthFloor.png";
import fifthFloor from "../images/fifthFloor.png";

// Each floor: its number, its name, its map, and what the map shows, for
// whoever cannot see it (design review, issues 38 and 39).
const FLOORS = [
  [
    "0",
    "Ground floor (#0)",
    groundFloor,
    "Ground floor map: Gift Shop and Registration, Anechoic Chamber, Yard 2, Lexis with the Main Stage, Café & Restaurant, Yard 1, Yard 0 with the DJ Stage, Node Café with the Info Desk & Mentor Help, the main entrance, staircases 0 to 4.",
  ],
  [
    "1",
    "First floor (#1)",
    firstFloor,
    "First floor map: Hacking & Judging, Playground, Community Kitchen, Hacking, Library, room 1.3.3, Staff area, staircases 0 to 4.",
  ],
  [
    "2",
    "Second floor (#2)",
    secondFloor,
    "Second floor map: four hacking areas and the Community Kitchen; the far left and top right are closed.",
  ],
  [
    "3",
    "Third floor (#3)",
    thirdFloor,
    "Third floor map: three hacking areas, the Community Kitchen and THC HQ; the rest is closed.",
  ],
  [
    "4",
    "Fourth floor (#4)",
    fourthFloor,
    "Fourth floor map: the whole floor is closed.",
  ],
  [
    "5",
    "Fifth floor (#5)",
    fifthFloor,
    "Fifth floor map: Art Exhibition, Wellness & Planetarium, Hacking, Cinema and Cine-bar.",
  ],
];

const Venue = () => {
  return (
    <Layout>
      <div className="textbox">
        <h1 className="my-4 text-secondary font-ocra">&lt;&lt;V&lt;ENUE</h1>
        <ArchiveNote />
        <div className="">
          <p className="mt-4">
            The venue will be the same as every year. This year it is called{" "}
            <a
              href="https://cic.com/berlin/"
              target="_blank"
              rel="noreferrer noopener"
            >CIC Innovation Campus</a>{" "}
            (previously: Factory Berlin). Address:{" "}
            <a
              href="https://nominatim.openstreetmap.org/ui/search.html?q=Lohmuehlenstra%C3%9Fe+65+12435+Berlin"
              target="_blank"
              rel="noreferrer noopener"
            >Lohmühlenstraße 65, 12435 Berlin</a>.
          </p>
          <p className="mt-4">
            Preregistration starts at 12pm on Friday. Doors open at 4pm on Friday.
          </p>
          <p className="mt-4">
            You have access to almost the entire venue for ETHBerlin04. Go
            explore, find all experiences, eat at the restaurant, chill in the
            cinema or discover the best rooms for hacking. This venue map will
            help you navigate all the floors.
          </p>
          <p className="mt-4">
            Start at the registration and gift shop on the ground floor. A
            secondary entrance and exit is available through backyard 0
            (registered hackers only).
          </p>
          <p className="mt-4">
            Note, areas marked in grey (and the entire 4th floor) are not
            available for hackers this year.
          </p>
          <nav
            aria-label="Floors"
            className="flex flex-wrap items-center gap-2 font-ocra text-[15px] leading-5 mb-2"
          >
            <span className="mr-1">FLOOR</span>
            {FLOORS.map(([n, name]) => (
              <a
                key={n}
                href={`#floor-${n}`}
                className="min-w-[44px] h-11 flex items-center justify-center border border-black text-black no-underline hover:bg-black hover:text-white"
              >
                <span className="sr-only">{name}</span>
                <span aria-hidden="true">{n}</span>
              </a>
            ))}
          </nav>
          {FLOORS.map(([n, name, map, alt]) => (
            <section key={n} id={`floor-${n}`} className="mt-10 scroll-mt-6">
              <div className="flex flex-wrap justify-between items-baseline gap-2 mb-2">
                <h2 className="font-ocra text-lg leading-6 uppercase">
                  {name}
                </h2>
                <a
                  href={map}
                  target="_blank"
                  rel="noreferrer"
                  className="font-ocra text-[13px] leading-[18px] py-1.5"
                >
                  <span className="sr-only">
                    {name}, full size (opens in a new tab)
                  </span>
                  <span aria-hidden="true">OPEN FULL SIZE ↗</span>
                </a>
              </div>
              <img src={map} alt={alt} loading="lazy" />
            </section>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export const Head = () => <SEO title="Venue · ETHBerlin04" />;

export default Venue;
