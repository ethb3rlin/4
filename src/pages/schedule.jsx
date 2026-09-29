import Layout from "../components/Layout";
import ArchiveNote from "../components/ArchiveNote";
import React from "react";
import SEO from "../components/seo";
import ReactModal from "react-modal";
import "../styles/modal.css";
import "../styles/rooms/groundFloor.css";
import "../styles/rooms/firstFloor.css";
import "../styles/rooms/secondFloor.css";
import "../styles/rooms/fifthFloor.css";
import groundFloor from "../images/groundFloor.png";
import firstFloor from "../images/firstFloor.png";
import secondFloor from "../images/secondFloor.png";
import thirdFloor from "../images/thirdFloor.png";
import fourthFloor from "../images/fourthFloor.png";
import fifthFloor from "../images/fifthFloor.png";
import ETHBerlin from "../components/ETHBerlin";
import VenueMapModal from "../components/VenueMapModal";
import LocationButton from "../components/LocationButton";
import austin from "../assets/people/workshops/austin.jpeg";
import sergei from "../assets/people/workshops/sergei.jpeg";
import tino from "../assets/people/workshops/tino.jpeg";
import odysseas from "../assets/people/workshops/odysseas.jpeg";
import greg from "../assets/people/workshops/greg.jpeg";
import pedro from "../assets/people/workshops/pedro.jpeg";
import richard from "../assets/people/workshops/richard.jpeg";
import ivan from "../assets/people/workshops/ivan.jpeg";
import ameen from "../assets/people/speakers/ameen.jpeg";
import edmundedgar from "../assets/people/speakers/edmundedgar.jpeg";
import fat from "../assets/people/speakers/fat.jpeg";
import josh from "../assets/people/speakers/josh.jpeg";
import kat from "../assets/people/speakers/kat.jpeg";
import matthew from "../assets/people/speakers/matthew.jpeg";
import mikhail from "../assets/people/speakers/mikhail.jpeg";
import nick from "../assets/people/speakers/nick.jpeg";
import peter from "../assets/people/speakers/peter.jpeg";
import puja from "../assets/people/speakers/puja.jpeg";

import { FaTwitter } from "react-icons/fa";
import { ImSoundcloud } from "react-icons/im";

// The day of each date, for the talk dialog.
const DAYS = {
  "2024-05-24": "Friday",
  "2024-05-25": "Saturday",
  "2024-05-26": "Sunday",
};

// One entry as a row: the time in its own column, then the title, the
// speaker and the rooms (design review, issues 34 and 37). A talk with a
// description opens it in a dialog (issue 36). The event is over, so no row
// marks itself as past or current.
const ProgramItem = ({
  title,
  eventLocations,
  dayStr,
  startTime,
  endTime,
  className,
  isExtravaganza,
  indent,
  speakerName,
  description,
  photos = [],
}) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const titleId = React.useId();
  const speaker = speakerName && speakerName !== "TBA" ? speakerName : null;
  const time = startTime + (endTime ? "–" + endTime : "");
  const close = (e) => {
    e.stopPropagation();
    setIsModalOpen(false);
  };
  return (
    <li
      className={`list-none m-0 max-w-none py-2.5 pr-0 ${
        indent ? "pl-6" : "pl-0"
      } grid grid-cols-[92px_minmax(0,1fr)] sm:grid-cols-[112px_minmax(0,1fr)] gap-x-4 border-b border-black/10`}
    >
      <time
        dateTime={`${dayStr}T${startTime}`}
        className="font-ocra text-sm leading-6"
      >
        {time}
      </time>
      <div>
        <div
          className={`${isExtravaganza ? "text-berlin-red-text" : ""} ${
            className || ""
          }`}
        >
          {title}
        </div>
        {speaker && <div className="text-sm text-gray-700">{speaker}</div>}
        {(eventLocations.length > 0 || description) && (
          <div className="flex flex-wrap gap-2 mt-1.5">
            {eventLocations.map((loc) => (
              <LocationButton key={loc.name} loc={loc} />
            ))}
            {description && (
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center min-h-[32px] px-2.5 py-1 border border-[rgba(0,0,0,0.35)] hover:border-black bg-white text-sm"
              >
                About this talk
              </button>
            )}
          </div>
        )}
      </div>
      {description && (
        <ReactModal
          isOpen={isModalOpen}
          aria={{ labelledby: titleId }}
          overlayClassName="fixed inset-0 z-40 flex items-center justify-center p-4 bg-[rgba(0,0,0,0.45)]"
          className="relative w-full max-w-[720px] max-h-full overflow-y-auto bg-white text-black font-bundessans p-6 outline-none"
          shouldCloseOnEsc={true}
          shouldCloseOnOverlayClick={true}
          onRequestClose={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute top-3 right-3 w-11 h-11 border border-black bg-white material-symbols-outlined !text-2xl !leading-none"
          >
            close
          </button>
          {photos.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-4">
              {photos.map((photo) => (
                <img
                  key={photo}
                  src={photo}
                  alt={speaker || ""}
                  className="w-28 h-28 object-cover"
                />
              ))}
            </div>
          )}
          <p className="font-ocra text-[13px] leading-[18px] mb-1">
            {DAYS[dayStr]} · {time}
          </p>
          <h2 id={titleId} className="text-2xl font-bold mr-14">
            {title}
          </h2>
          {speaker && <p className="text-gray-700 mb-0">{speaker}</p>}
          <div className="mt-4">{description}</div>
        </ReactModal>
      )}
    </li>
  );
};

// A talk: a row with its speaker's photos for the dialog.
const SpeechItem = ({ photo, photo2, photo3, ...item }) => (
  <ProgramItem {...item} photos={[photo, photo2, photo3].filter(Boolean)} />
);

// A day's heading, with a rule under it.
const DAY = "font-ocra text-xl pb-2 border-b border-black";

const Program = () => {
  const [isMapModalOpen, setIsMapModalOpen] = React.useState(false);
  const [activeMap, setActiveMap] = React.useState(groundFloor);
  const [activeRoomClass, setActiveRoomClass] = React.useState("lexis");
  const [activeMapName, setActiveMapName] = React.useState("Ground Floor (#0)");
  const [activeRoomName, setActiveRoomName] = React.useState("");
  const [extravaganzaActive, setExtravaganzaActive] = React.useState(false);
  const [isSticky, setIsSticky] = React.useState(false);

  let toggleRef = React.useRef(null);

  const handleCloseModal = (e) => {
    e.stopPropagation();
    setIsMapModalOpen(false);
  };

  const handleGroundFloor = () => {
    setActiveMap(groundFloor);
    setActiveMapName("Ground Floor (#0)");
  };

  const handleFirstFloor = () => {
    setActiveMap(firstFloor);
    setActiveMapName("First Floor (#1)");
  };

  const handleSecondFloor = () => {
    setActiveMap(secondFloor);
    setActiveMapName("Second Floor (#2)");
  };

  const handleThirdFloor = () => {
    setActiveMap(thirdFloor);
    setActiveMapName("Third Floor (#3)");
  };

  const handleFourthFloor = () => {
    setActiveMap(fourthFloor);
    setActiveMapName("Fourth Floor (#4)");
  };

  const handleFifthFloor = () => {
    setActiveMap(fifthFloor);
    setActiveMapName("Fifth Floor (#5)");
  };

  const locations = {
    lexis: {
      name: "Lexis",
      handler: () => {
        handleGroundFloor();
        setActiveRoomClass("lexis");
        setIsMapModalOpen(true);
      },
    },
    giftShop: {
      name: "Gift Shop",
      handler: () => {
        handleGroundFloor();
        setActiveRoomClass("giftShop");
        setIsMapModalOpen(true);
      },
    },
    nodeCafe: {
      name: "Node Cafe",
      handler: () => {
        handleGroundFloor();
        setActiveRoomClass("nodeCafe");
        setIsMapModalOpen(true);
      },
    },
    yard0: {
      name: "Yard 0",
      handler: () => {
        handleGroundFloor();
        setActiveRoomClass("yard0");
        setIsMapModalOpen(true);
      },
    },
    yard1: {
      name: "Yard 1",
      handler: () => {
        handleGroundFloor();
        setActiveRoomClass("yard1");
        setIsMapModalOpen(true);
      },
    },
    yard2: {
      name: "Yard 2",
      handler: () => {
        handleGroundFloor();
        setActiveRoomClass("yard2");
        setIsMapModalOpen(true);
      },
    },
    mainEnterence: {
      name: "Main Entrance",
      handler: () => {
        handleGroundFloor();
        setActiveRoomClass("main-enterence");
        setIsMapModalOpen(true);
      },
    },
    registration: {
      name: "Registration",
      handler: () => {
        handleGroundFloor();
        setActiveRoomClass("registration");
        setIsMapModalOpen(true);
      },
    },
    restaurant: {
      name: "Restaurant",
      handler: () => {
        handleGroundFloor();
        setActiveRoomClass("restaurant");
        setIsMapModalOpen(true);
      },
    },
    mckinsey: {
      name: "McKinsey",
      handler: () => {
        handleFirstFloor();
        setActiveRoomClass("mckinsey");
        setIsMapModalOpen(true);
      },
    },
    communitySpace1: {
      name: "First Floor Community Space",
      handler: () => {
        handleFirstFloor();
        setActiveRoomClass("community-space-first-floor");
        setIsMapModalOpen(true);
      },
    },
    communitySpace2: {
      name: "Second Floor Community Space",
      handler: () => {
        handleSecondFloor();
        setActiveRoomClass("community-space-second-floor");
        setIsMapModalOpen(true);
      },
    },
    artExhibition: {
      name: "Art Exhibition",
      handler: () => {
        handleFifthFloor();
        setActiveRoomClass("artExhibition");
        setIsMapModalOpen(true);
      },
    },
    library: {
      name: "Library",
      handler: () => {
        handleFirstFloor();
        setActiveRoomClass("library");
        setIsMapModalOpen(true);
      },
    },
    alice: {
      name: "Alice",
      handler: () => {
        handleSecondFloor();
        setActiveRoomClass("alice");
        setIsMapModalOpen(true);
      },
    },
    wellnessRoom: {
      name: "Wellness & Planetarium",
      handler: () => {
        handleFifthFloor();
        setActiveRoomClass("wellnessRoom");
        setIsMapModalOpen(true);
      },
    },
    cinema: {
      name: "Cinema",
      handler: () => {
        handleFifthFloor();
        setActiveRoomClass("cinema");
        setIsMapModalOpen(true);
      },
    },
    cinebar: {
      name: "Cinebar",
      handler: () => {
        handleFifthFloor();
        setActiveRoomClass("cinebar");
        setIsMapModalOpen(true);
      },
    },
  };

  // Each handler also names its room, which titles the map dialog.
  for (const loc of Object.values(locations)) {
    const show = loc.handler;
    loc.handler = () => {
      setActiveRoomName(loc.name);
      show();
    };
  }

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) =>
        e.intersectionRatio < 1 ? setIsSticky(true) : setIsSticky(false),
      { threshold: [1] }
    );
    if (toggleRef.current) observer.observe(toggleRef.current);
    return () => {
      if (toggleRef.current) observer.unobserve(toggleRef.current);
    };
  }, [toggleRef]);

  return (
    <Layout>
      <div className="textbox">
        <h1 className="my-4 text-secondary font-ocra">&lt;&lt;S&lt;CHEDULE</h1>
        <ArchiveNote />
        <div className="">
          <p className="mt-4">
            Welcome to <ETHBerlin />! If you have the chance, please claim your
            badge early during preregistration at the venue to avoid long queues
            in the evening.
          </p>
          {/* Use top: -1px to detect stickyness https://davidwalsh.name/detect-sticky */}

          {/* Hacker Essentials vs Extravaganza */}

          <div
            className={`flex flex-wrap items-center justify-between gap-3 w-full sticky -top-1 py-3 px-5 sm:px-8 schedule-sticky ${
              isSticky
                ? "bg-[rgba(255,255,255,0.97)] border-b border-[rgba(0,0,0,0.15)]"
                : ""
            }`}
            ref={toggleRef}
          >
            {/* The Essentials and Extravaganza switch. Its checkbox stays in the
                keyboard order, and its focus shows as a ring on the track. */}
            <label
              htmlFor="toogleA"
              className="flex items-center cursor-pointer"
            >
              <span className="mr-3">Hacker Essentials</span>
              <span className="relative">
                <input
                  id="toogleA"
                  type="checkbox"
                  role="switch"
                  aria-label="Hacker Extravaganza"
                  className="sr-only peer"
                  checked={extravaganzaActive}
                  onChange={() => setExtravaganzaActive((prev) => !prev)}
                />
                <span
                  className={`block w-10 h-4 ${
                    extravaganzaActive ? "bg-red-500" : "bg-gray-400"
                  } rounded-full shadow-inner peer-focus-visible:ring-2 peer-focus-visible:ring-black peer-focus-visible:ring-offset-2`}
                />
                <span
                  className={`absolute w-6 h-6 rounded-full shadow -left-1 -top-1 transition ${
                    extravaganzaActive
                      ? "translate-x-full bg-red-300"
                      : "bg-gray-200"
                  }`}
                />
              </span>
              <span className="ml-3 text-berlin-red-text">
                Hacker Extravaganza
              </span>
            </label>
            <nav aria-label="Days" className="flex gap-1 font-ocra text-sm">
              <a href="#fri" className="px-2 py-2.5 text-black">
                FRI 24
              </a>
              <a href="#sat" className="px-2 py-2.5 text-black">
                SAT 25
              </a>
              <a href="#sun" className="px-2 py-2.5 text-black">
                SUN 26
              </a>
            </nav>
          </div>
          <section id="fri" className="mt-8 scroll-mt-20">
            <h2 className={DAY}>Friday, May 24</h2>
            <ol className="mt-1">
              <ProgramItem
                dayStr="2024-05-24"
                startTime="12:00"
                endTime="16:00"
                title="Pre-registration"
                eventLocations={[locations.giftShop]}
              />
              <ProgramItem
                dayStr="2024-05-24"
                startTime="16:00"
                title="Registration"
                eventLocations={[locations.giftShop]}
              />
              <ProgramItem
                dayStr="2024-05-24"
                startTime="16:00"
                title="Doors open"
                eventLocations={[locations.yard0]}
              />
              <SpeechItem
                dayStr="2024-05-24"
                startTime="16:30"
                endTime="17:00"
                title="Talk: We need Censorships"
                speakerName="Fatemeh Fannizadeh (Swarm)"
                photo={fat}
                eventLocations={[locations.lexis]}
              />
              <SpeechItem
                dayStr="2024-05-24"
                startTime="17:00"
                endTime="17:30"
                title="Talk: Building for Big V Value"
                speakerName="Nick Almond (FactoryDAO)"
                description={
                  "Crypto was meant to be different. This was the technological frontier for a new world, away from the banks, centralised rent seeking and maximally extractive business models. So what happened? This talk lays out some home truths, discusses where we've gone wrong and what we can do to steer the industry into a better direction."
                }
                photo={nick}
                eventLocations={[locations.lexis]}
              />
              <SpeechItem
                dayStr="2024-05-24"
                startTime="17:30"
                endTime="18:00"
                title="Talk: Are there limits to the reach of US Sanctions laws?"
                description="The US Treasury's decision to sanction Tornado Cash, including the immutable pool contracts, has set off a wave of criminal and civil litigation. Do these sanctions go too far, can similar sanctions be used to effectively outlaw crypto all together, and how can we fight back?"
                speakerName="Peter van Valkenburg (Coin Center)"
                photo={peter}
                eventLocations={[locations.lexis]}
              />{" "}
              <SpeechItem
                dayStr="2024-05-24"
                startTime="18:00"
                endTime="19:00"
                title="Opening Ceremony"
                speakerName="TBA"
                // photo={gillordPisas}
                eventLocations={[locations.lexis]}
              />
              <ProgramItem
                dayStr="2024-05-24"
                startTime="19:00"
                endTime="23:59"
                title="Hacking begins"
                className={"font-bold italic"}
                eventLocations={[]} // Location = everywhere
              />
              <ProgramItem
                dayStr="2024-05-24"
                startTime="19:00"
                endTime="19:30"
                title="Hacker Team Finding Session"
                eventLocations={[locations.yard0]}
              />
              <ProgramItem
                dayStr="2024-05-24"
                startTime="19:00"
                endTime="21:00"
                title="Dinner"
                eventLocations={[locations.lexis]}
              />
              {extravaganzaActive && (
                <ProgramItem
                  dayStr="2024-05-24"
                  isExtravaganza
                  startTime="19:00"
                  endTime="23:59"
                  title="Art Exhibition: co-create"
                  eventLocations={[locations.artExhibition]}
                />
              )}
              <SpeechItem
                dayStr="2024-05-24"
                startTime="19:30"
                endTime="20:15"
                title="Technical Workshop: Build an Ethereum dApp in 40 mins"
                speakerName="Austin Griffith (Ethereum Foundation)"
                photo={austin}
                eventLocations={[locations.lexis]}
              />
              {extravaganzaActive && (
                <ProgramItem
                  dayStr="2024-05-24"
                  startTime="20:00"
                  endTime="21:00"
                  title="Privacy Corner: Project Ideation Session"
                  isExtravaganza
                  eventLocations={[locations.library]}
                />
              )}
              <SpeechItem
                dayStr="2024-05-24"
                startTime="20:15"
                endTime="21:00"
                title="Technical Workshop: Re-inventing login with Sign-in-with-Ethereum"
                speakerName="Pedro Gomes (WalletConnect)"
                description={
                  <>
                    <div>
                      We will learn how powerful SIWE can be used as a tool for
                      building different use-cases such as identity,
                      attestations, permissions and messaging. For example
                      WalletConnect built this app called Web3Inbox to aggregate
                      notifications for multiple dapps and it's based on SIWE.
                      Additionally there are other systems where you can use
                      attestations to build roots of trust with SIWE that
                      generate CACAOs (CAIP-74) to build dapps offchain. Finally
                      we are working on Session Keys which also uses SIWE to
                      empower key delegation for transaction signing for Smart
                      Accounts
                    </div>
                  </>
                }
                photo={pedro}
                eventLocations={[locations.lexis]}
              />
              <SpeechItem
                dayStr="2024-05-24"
                startTime="21:00"
                endTime="21:45"
                title="Technical Workshop: Integrating RPCh in your Dapp to privately connect to RPC endpoints
"
                speakerName="Tino Breddin (HOPR)"
                description="TBA"
                photo={tino}
                eventLocations={[locations.lexis]}
              />
              <SpeechItem
                dayStr="2024-05-24"
                startTime="21:45"
                endTime="22:30"
                title="Technical Workshop: Secure communications with Waku"
                speakerName="Sergei Tikhomirov (Waku)"
                description="TBA"
                photo={sergei}
                eventLocations={[locations.lexis]}
              />
              <SpeechItem
                dayStr="2024-05-24"
                startTime="22:30"
                endTime="23:15"
                title="Technical Workshop: ZK vs TEE: Wat do (as a product builder)?"
                speakerName="Odysseas (Phylax Systems), GregTheGreek (ChainSafe)"
                photo={odysseas}
                photo2={greg}
                description={
                  <>
                    <div>
                      This session delves into Trusted Execution Environments
                      (TEEs) and Zero-Knowledge (ZK) for Ethereum product
                      builders with limited technical depth in these areas. We
                      will examine key considerations such as performance, trust
                      assumptions, cost efficiency, and the complexity of
                      integration to determine their suitability for privacy and
                      verifiable computation in applications.
                    </div>{" "}
                    <br />
                    <div>
                      Participants will learn about the security
                      vulnerabilities, scalability potential, and regulatory
                      compliance aspects of each technology. The talk will also
                      highlight the support available through developer
                      ecosystems and the maturity of existing libraries and
                      tools. By the end, attendees will be equipped to make
                      informed decisions on which technology best meets their
                      project's needs and understand the resources available for
                      implementation.
                    </div>
                  </>
                }
                // photo={shumoChu}
                eventLocations={[locations.lexis]}
              />
              <SpeechItem
                dayStr="2024-05-24"
                startTime="23:15"
                endTime="23:59"
                title="Technical Workshop: How to add ZKPs to your app (with Zupass)?"
                speakerName="Richard Liu (0xPARC), Ivan Chub (0xPARC)"
                photo={richard}
                photo2={ivan}
                description={
                  <>
                    <div>
                      No prior circom or ZK experience needed for this workshop,
                      where we'll run through a simple example of a
                      sybil-resistant app that requests a "proof of ETHBerlin
                      hacker visa". Hackers may receive a *cryptographic
                      surprise* during this workshop.
                    </div>
                  </>
                }
                // photo={shumoChu}
                eventLocations={[locations.lexis]}
              />
              <ProgramItem
                dayStr="2024-05-24"
                startTime="23:59"
                endDayStr="2024-05-25"
                endTime="01:00"
                title="Midnight Snack"
                eventLocations={[locations.restaurant]}
              />
            </ol>
          </section>
          <section id="sat" className="mt-8 scroll-mt-20">
            <h2 className={DAY}>Saturday, May 25</h2>
            <p className="mt-3 mb-0 font-bold">
              Happy hacking, no distractions!
            </p>
            <ol className="mt-1">
              <ProgramItem
                dayStr="2024-05-25"
                startTime="00:00"
                endTime="23:59"
                title="Hacking"
                className={"font-bold italic"}
                eventLocations={[]}
              />
              <ProgramItem
                dayStr="2024-05-25"
                startTime="09:00"
                endTime="11:00"
                title="Breakfast"
                eventLocations={[locations.restaurant]}
              />
              {extravaganzaActive && (
                <ProgramItem
                  dayStr="2024-05-25"
                  startTime="10:00"
                  endTime="11:30"
                  title="Kundalini yoga"
                  eventLocations={[locations.wellnessRoom]}
                  isExtravaganza
                />
              )}
              <SpeechItem
                dayStr="2024-05-25"
                startTime="11:00"
                endTime="13:00"
                title="Project Pitches / Feedback Sessions"
                description="Are you stuck, looking for another team member or want feedback on your idea? Join this session to pitch your project on stage or learn more about the projects others are working on!"
                eventLocations={[locations.lexis]}
              />
              {extravaganzaActive && (
                <ProgramItem
                  dayStr="2024-05-25"
                  startTime="11:00"
                  endTime="23:59"
                  title="Art Exhibition: co-create"
                  eventLocations={[locations.artExhibition]}
                  isExtravaganza
                />
              )}
              {extravaganzaActive && (
                <ProgramItem
                  dayStr="2024-05-25"
                  startTime="12:00"
                  endTime="18:00"
                  title="Screenprinting and Matcha"
                  eventLocations={[locations.library]}
                  isExtravaganza
                />
              )}
              {extravaganzaActive && (
                <SpeechItem
                  dayStr="2024-05-25"
                  startTime="12:00"
                  endTime="13:20"
                  isExtravaganza
                  title="Panel - Decentralized Art Organisation"
                  speakerName="Vincent Trasov, Benny Giang"
                  // photo={richard}
                  // photo2={ivan}
                  description={
                    <>
                      <div>
                        Panel - Decentralized Art Organisation: With Vincent
                        Trasov and Benny Giang; Moderated by Stina Gustafsson.
                      </div>
                    </>
                  }
                  // photo={shumoChu}
                  eventLocations={[locations.artExhibition]}
                />
              )}
              <ProgramItem
                dayStr="2024-05-25"
                startTime="13:00"
                endTime="15:00"
                title="Lunch"
                eventLocations={[locations.restaurant]}
              />
              {extravaganzaActive && (
                <ProgramItem
                  dayStr="2024-05-25"
                  startTime="13:00"
                  endTime="15:00"
                  title="Reiki practitioner available"
                  isExtravaganza
                  eventLocations={[locations.wellnessRoom]}
                />
              )}
              {extravaganzaActive && (
                <SpeechItem
                  dayStr="2024-05-25"
                  startTime="13:30"
                  endTime="14:50"
                  isExtravaganza
                  title="Panel - Art after NFTs"
                  speakerName="Joan Heemskerk, Billy Rennekamp"
                  // photo={richard}
                  // photo2={ivan}
                  description={
                    <>
                      <div>
                        Panel - Art after NFTs: With Joan Heemskerk and Billy
                        Rennekamp; Moderated by María Paula Fernández.
                      </div>
                    </>
                  }
                  // photo={shumoChu}
                  eventLocations={[locations.artExhibition]}
                />
              )}
              <ProgramItem
                dayStr="2024-05-25"
                startTime="14:00"
                endTime="17:00"
                title="Mentoring Expert Office Hours"
                description="Check mentor area for detailed schedule!"
                eventLocations={[locations.nodeCafe]}
              />
              {extravaganzaActive && (
                <ProgramItem
                  dayStr="2024-05-25"
                  startTime="15:00"
                  endTime="16:30"
                  title="Sound healing practice"
                  isExtravaganza
                  eventLocations={[locations.wellnessRoom]}
                />
              )}
              {extravaganzaActive && (
                <ProgramItem
                  dayStr="2024-05-25"
                  startTime="16:00"
                  endTime="17:00"
                  title="Privacy Corner: Project Pitches and Feedback Session"
                  isExtravaganza
                  eventLocations={[locations.library]}
                />
              )}
              {extravaganzaActive && (
                <ProgramItem
                  dayStr="2024-05-25"
                  startTime="17:00"
                  endTime="19:00"
                  title="Yoga flow + Sound Bath"
                  isExtravaganza
                  eventLocations={[locations.wellnessRoom]}
                />
              )}
              {extravaganzaActive && (
                <>
                  <ProgramItem
                    dayStr="2024-05-25"
                    startTime="17:00"
                    endDayStr="2024-05-26"
                    endTime="01:00"
                    title="DJs in Courtyard 1"
                    eventLocations={[locations.yard0]}
                    isExtravaganza
                  />
                  <>
                    <ProgramItem
                      indent
                      dayStr="2024-05-25"
                      startTime="17:00"
                      isExtravaganza
                      endTime="19:00"
                      title={
                        <span className="inline-flex items-center">
                          Jommi & Francesco{" "}
                          <a
                            href="https://twitter.com/joakimhi"
                            className="ml-1.5 inline-flex items-center gap-1 p-1 align-middle text-berlin-red-text"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span className="sr-only">
                              X / Twitter (opens in a new tab)
                            </span>
                            <FaTwitter aria-hidden="true" />
                          </a>
                          &
                          <a
                            href="https://x.com/fmelp"
                            className="ml-1.5 inline-flex items-center gap-1 p-1 align-middle text-berlin-red-text"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span className="sr-only">
                              X / Twitter (opens in a new tab)
                            </span>
                            <FaTwitter aria-hidden="true" />
                          </a>
                        </span>
                      }
                      eventLocations={[locations.yard0]}
                    />
                    <ProgramItem
                      indent
                      dayStr="2024-05-25"
                      startTime="19:00"
                      endTime="21:00"
                      isExtravaganza
                      title={
                        <span className="inline-flex items-center">
                          Anna{" "}
                          <a
                            href="https://soundcloud.com/innermost3000"
                            className="ml-1.5 inline-flex items-center gap-1 p-1 align-middle text-berlin-red-text"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span className="sr-only">
                              SoundCloud (opens in a new tab)
                            </span>
                            <ImSoundcloud aria-hidden="true" />
                          </a>
                          <a
                            href="https://twitter.com/annmehr"
                            className="ml-1.5 inline-flex items-center gap-1 p-1 align-middle text-berlin-red-text"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span className="sr-only">
                              X / Twitter (opens in a new tab)
                            </span>
                            <FaTwitter aria-hidden="true" />
                          </a>
                        </span>
                      }
                      eventLocations={[locations.yard0]}
                    />
                    <ProgramItem
                      indent
                      dayStr="2024-05-25"
                      startTime="21:00"
                      endTime="23:00"
                      isExtravaganza
                      title={
                        <span className="inline-flex items-center">
                          Manu +{" "}
                          <a
                            href="https://twitter.com/blockravers"
                            className="ml-1.5 inline-flex items-center gap-1 p-1 align-middle text-berlin-red-text"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            @blockravers{" "}
                            <span className="sr-only">
                              on X / Twitter (opens in a new tab)
                            </span>
                            <FaTwitter aria-hidden="true" className="ml-2" />
                          </a>
                        </span>
                      }
                      eventLocations={[locations.yard0]}
                    />
                    <ProgramItem
                      indent
                      dayStr="2024-05-25"
                      endDayStr="2024-05-26"
                      startTime="23:00"
                      endTime="01:00"
                      isExtravaganza
                      title={
                        <span className="inline-flex items-center">
                          Manuel{" "}
                          <a
                            href="https://soundcloud.com/umcharra"
                            className="ml-1.5 inline-flex items-center gap-1 p-1 align-middle text-berlin-red-text"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span className="sr-only">
                              SoundCloud (opens in a new tab)
                            </span>
                            <ImSoundcloud aria-hidden="true" />
                          </a>
                        </span>
                      }
                      eventLocations={[locations.yard0]}
                    />
                  </>
                </>
              )}
              {extravaganzaActive && (
                <ProgramItem
                  dayStr="2024-05-25"
                  startTime="18:00"
                  endTime="23:59"
                  title="Cocktails @Cinebar"
                  eventLocations={[locations.cinebar]}
                  isExtravaganza
                />
              )}
              {extravaganzaActive && (
                <>
                  <ProgramItem
                    dayStr="2024-05-25"
                    startTime="19:15"
                    endTime="01:40"
                    endDayStr="2024-05-26"
                    title="Cinema"
                    eventLocations={[locations.cinema]}
                    isExtravaganza
                  />
                  <>
                    <ProgramItem
                      indent
                      dayStr="2024-05-25"
                      startTime="17:15"
                      endTime="18:35"
                      title="Terms and Conditions May Apply (Documentary, 2013)"
                      eventLocations={[locations.cinema]}
                      isExtravaganza
                    />
                    <ProgramItem
                      indent
                      dayStr="2024-05-25"
                      startTime="18:45"
                      endTime="20:12"
                      title="All Creatures Welcome (Documentary, 2018)"
                      eventLocations={[locations.cinema]}
                      isExtravaganza
                    />
                    <ProgramItem
                      indent
                      dayStr="2024-05-25"
                      startTime="20:15"
                      endTime="22:21"
                      title="Sneakers (Comedy/Crime, 1992)"
                      eventLocations={[locations.cinema]}
                      isExtravaganza
                    />
                    <ProgramItem
                      indent
                      dayStr="2024-05-25"
                      startTime="22:30"
                      endTime="23:51"
                      title="Idiocracy (Comedy/SciFi, 2006)"
                      eventLocations={[locations.cinema]}
                      isExtravaganza
                    />
                    <ProgramItem
                      indent
                      dayStr="2024-05-25"
                      startTime="23:59"
                      endTime="01:40"
                      endDayStr="2024-05-26"
                      title="Sans Soleil (Documentary, 1983)"
                      eventLocations={[locations.cinema]}
                      isExtravaganza
                    />
                  </>
                </>
              )}
              <ProgramItem
                dayStr="2024-05-25"
                startTime="19:00"
                endTime="21:00"
                title="Dinner"
                eventLocations={[locations.restaurant]}
              />
              <ProgramItem
                dayStr="2024-05-25"
                startTime="23:59"
                endDayStr="2024-05-26"
                endTime="01:00"
                title="Midnight Snack"
                eventLocations={[locations.restaurant]}
              />
            </ol>
          </section>
          <section id="sun" className="mt-8 scroll-mt-20">
            <h2 className={DAY}>Sunday, May 26</h2>
            <p className="mt-3 mb-0 font-bold">
              Don't forget to submit your projects by 11:30 am Berlin time!
            </p>
            <ol className="mt-1">
              <ProgramItem
                dayStr="2024-05-26"
                startTime="00:00"
                endTime="11:00"
                title="Hacking (Submission deadline at 11:30 am)"
                className={"font-bold italic"}
                eventLocations={[]}
              />
              <ProgramItem
                dayStr="2024-05-26"
                startTime="09:00"
                endTime="11:00"
                title="Breakfast"
                eventLocations={[locations.restaurant]}
              />
              {extravaganzaActive && (
                <ProgramItem
                  dayStr="2024-05-26"
                  startTime="10:00"
                  endTime="10:45"
                  title="Active/dance meditation"
                  isExtravaganza
                  eventLocations={[locations.wellnessRoom]}
                />
              )}
              {extravaganzaActive && (
                <ProgramItem
                  dayStr="2024-05-26"
                  startTime="10:45"
                  endTime="11:30"
                  title="Vibro Acoustic massage 1:1 first slot"
                  isExtravaganza
                  eventLocations={[locations.wellnessRoom]}
                />
              )}
              <ProgramItem
                dayStr="2024-05-26"
                startTime="11:30"
                title="PROJECT SUBMISSION DEADLINE"
                className={"font-bold italic"}
                eventLocations={[]}
              />
              {extravaganzaActive && (
                <ProgramItem
                  dayStr="2024-05-26"
                  startTime="11:45"
                  endTime="12:30"
                  title="Vibro acoustic massage 1:1 2nd slot"
                  isExtravaganza
                  eventLocations={[locations.wellnessRoom]}
                />
              )}
              <ProgramItem
                dayStr="2024-05-26"
                startTime="12:00"
                endTime="16:30"
                title="Hackathon Project Judging"
                eventLocations={[locations.mckinsey]} // TODO McKinsey Space (1st floor to the left)
              />
              <ProgramItem
                dayStr="2024-05-26"
                startTime="13:00"
                endTime="15:00"
                title="Lunch"
                eventLocations={[locations.restaurant]}
              />
              <ProgramItem
                dayStr="2024-05-26"
                startTime="14:00"
                title="Stage opening"
                eventLocations={[locations.lexis]}
              />
              <SpeechItem
                dayStr="2024-05-26"
                startTime="14:05"
                endTime="14:35"
                title="Talk: Ethevacuations: Crypto in a humanitarian crisis"
                speakerName={
                  "Kat (EthEvacuations), Joshua Dávila (The Blockchain Socialist)"
                }
                description="Kat recently left her crypto job to start Ethevacuations when the ongoing conflict in Gaza began as she learned that crypto was a useful tool to help those suffering under the bombardment. Kat will be interviewed by Joshua Dávila to talk about her experience and the reality of using crypto to help those evacuate from Gaza during one of the most difficult humanitarian crises imaginable. Crypto was made for this and there are important lessons to be had."
                photo={kat}
                photo2={josh}
                eventLocations={[locations.lexis]}
              />
              <SpeechItem
                dayStr="2024-05-26"
                startTime="14:40"
                endTime="15:10"
                title="Talk: Information flow control a.k.a. privacy is not the concept your are looking for"
                speakerName={"Christopher Goes (Anoma)"}
                eventLocations={[locations.lexis]}
              />
              <SpeechItem
                dayStr="2024-05-26"
                startTime="15:15"
                endTime="15:45"
                title="Talk: Anarchy, Truth and Justice"
                description={`We are building systems that resist coercion and promote freedom. We are not the first people in history to try that, so what happened before?
This talk will look at some historical attempts to create systems and societies that do not depend on government or institutional power, from the Diggers to the Free Software movement.
Then we will look at tools and techniques we can use to govern and sustain crypto-economic systems and talk about how to increase their impact and protect them against bribery, cooption and destruction.`}
                speakerName={"Edmund Edgar (RealityETH)"}
                photo={edmundedgar}
                eventLocations={[locations.lexis]}
              />
              <SpeechItem
                dayStr="2024-05-26"
                startTime="15:50"
                endTime="16:20"
                title="Talk: The Silent Strings of Proof of Personhood"
                description={
                  <>
                    <p>
                      Experiments in Proof of Personhood—where each person has a
                      single, unique identity—have increasingly been touted as a
                      mechanism for tracing information provenance, distributing
                      Universal Basic Income, and facilitating democratic
                      governance over systems of artificial intelligence.
                    </p>
                    <p>
                      {" "}
                      This talk chronicles Idena's experiment in Proof of
                      Personhood from launch in August 2019 to a crisis in May
                      2022. We show how despite verifying humans, hidden pools
                      rapidly emerged—some cooperative, but most controlled by
                      “puppeteers” who, at best, remunerated participants for
                      periodically proving their uniqueness in exchange for
                      access to their secret keys and controlling their
                      accounts. Instead of fostering an egalitarian network of
                      unique identities, the protocol fractured into hidden
                      subnetworks vying for control over an economic pie with
                      economies of scale trending towards oligopoly, undermining
                      the protocol's security and ambitions for democratic
                      governance (one-person, one-vote) and UBI rewards
                      (one-person, one reward). By giving humans economic
                      incentives to periodically differentiate themselves from
                      bots, the protocol gave more informed, resourceful humans
                      financial incentives to puppeteer less informed humans
                      like bots.
                    </p>
                  </>
                }
                speakerName={
                  "Puja Ohlhaver (Lawyer & Researcher), Mikhail Nikulin (Idena)"
                }
                photo={puja}
                photo2={mikhail}
                eventLocations={[locations.lexis]}
              />
              <SpeechItem
                dayStr="2024-05-26"
                startTime="16:25"
                endTime="16:55"
                title="Talk: The Fight for Privacy"
                speakerName={"Ameen Soleimani (0xbow)"}
                photo={ameen}
                eventLocations={[locations.lexis]}
              />
              <ProgramItem
                dayStr="2024-05-26"
                startTime="16:30"
                title="Upper floors close"
                eventLocations={[]}
              />
              <SpeechItem
                dayStr="2024-05-26"
                startTime="17:00"
                endTime="17:30"
                title="Talk: The Challenge of Decentralised Communication"
                description={
                  <>
                    <p>
                      Decentralised communication tools are at least 10x harder
                      to build than their mainstream centralised equivalents,
                      and in a world where Discord, Slack, Telegram and WhatsApp
                      have billions of dollars of funding and have created
                      incredibly polished products, it can be hard for
                      decentralised alternatives to compete. However:
                      centralisation lasts until the next Elon, whereas
                      decentralisation can last forever.
                    </p>
                    <p>
                      In this talk, I'll explain the challenges we've hit in
                      building Matrix to compete with the mainstream
                      alternatives, how we're solving them, why it's taken so
                      long, and why it's more important than ever to keep the
                      ideal of decentralised communication alive.
                    </p>
                  </>
                }
                speakerName={"Matthew Hodgson (Matrix)"}
                photo={matthew}
                eventLocations={[locations.lexis]}
              />
              <ProgramItem
                dayStr="2024-05-26"
                startTime="17:30"
                endTime="19:00"
                title="Closing Ceremony"
                eventLocations={[locations.lexis]}
              />
              <ProgramItem
                dayStr="2024-05-26"
                startTime="19:00"
                endTime="20:00"
                title={"Closing aperitif, snacks & mingle with DJ"}
                eventLocations={[locations.yard0]}
              />
              <>
                <ProgramItem
                  indent
                  dayStr="2024-05-26"
                  startTime="19:00"
                  endTime="20:00"
                  title={
                    <span className="inline-flex items-center">
                      YaNKeY{" "}
                      <a
                        href="https://on.soundcloud.com/cEYw4"
                        className="ml-1.5 inline-flex items-center gap-1 p-1 align-middle text-berlin-red-text"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="sr-only">
                          SoundCloud (opens in a new tab)
                        </span>
                        <ImSoundcloud aria-hidden="true" />
                      </a>
                    </span>
                  }
                  eventLocations={[locations.yard0]}
                />
              </>

              <ProgramItem
                dayStr="2024-05-26"
                startTime="20:00"
                title="End of hackathon, doors close"
                eventLocations={[]}
              />
              {extravaganzaActive && (
                <ProgramItem
                  dayStr="2024-05-26"
                  startTime="20:00"
                  endTime="06:00"
                  endDayStr={"2024-05-27"}
                  isExtravaganza
                  title={
                    <span>
                      After Party ·{" "}
                      <a
                        href="https://aedenberlin.com"
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        Aeden ↗
                      </a>
                    </span>
                  }
                  eventLocations={[]}
                />
              )}
            </ol>
          </section>
        </div>
      </div>

      <VenueMapModal
        isOpen={isMapModalOpen}
        handleCloseModal={handleCloseModal}
        activeMapName={activeMapName}
        activeMap={activeMap}
        activeRoomClass={activeRoomClass}
        roomName={activeRoomName}
      />
    </Layout>
  );
};
export const Head = () => <SEO title="Schedule · ETHBerlin04" />;

export default Program;
