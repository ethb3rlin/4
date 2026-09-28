import React from "react";
import SEO from "../components/seo";
import Layout from "../components/Layout";
import ArchiveNote from "../components/ArchiveNote";
import VenueMapModal from "../components/VenueMapModal";
import LocationButton from "../components/LocationButton";
import groundFloor from "../images/groundFloor.png";
import firstFloor from "../images/firstFloor.png";
import secondFloor from "../images/secondFloor.png";
import thirdFloor from "../images/thirdFloor.png";
import fourthFloor from "../images/fourthFloor.png";
import fifthFloor from "../images/fifthFloor.png";

const Experiences = () => {
  const [isMapModalOpen, setIsMapModalOpen] = React.useState(false);
  const [activeMap, setActiveMap] = React.useState(groundFloor);
  const [activeMapName, setActiveMapName] = React.useState("Ground Floor (#0)");
  const [activeRoomClass, setActiveRoomClass] = React.useState("lexis");
  const [activeRoomName, setActiveRoomName] = React.useState("");

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

  return (
    <Layout>
      <div className="textbox max-w-[760px]">
        <h1 className="text-secondary font-ocra">&lt;&lt;E&lt;XPERIENCES</h1>
        <ArchiveNote />
        <h2 className="text-2xl mt-8 font-bold">ETHBerlin04 Experiences</h2>
        <p>
          ETHBerlin is a hackathon first but not a hackathon only. Like the last
          years we’re also hosting different experiences for our hackers to
          enjoy during the weekend. These experiences are not only hosted and
          organized by us, the Department of Decentralization, but also by our
          friends and conspirators.
        </p>

        <div>
          <div>
            <h3 className="font-bold text-xl mb-0.5">Gift Shop</h3>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 mb-2 text-[15px] leading-[22px] text-gray-700">
              <span>
                Hosted by{" "}
                <a
                  href="https://dod.ngo"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  DoD
                </a>
              </span>
              <LocationButton loc={locations.giftShop} />
            </div>
            <div>
              Grab our iconic ETHBerlin04 swag and goodies from some of our
              experience hosts at the gift shop!
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-bold text-xl mb-0.5">Cafe & Books</h3>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 mb-2 text-[15px] leading-[22px] text-gray-700">
              <span>
                Hosted by{" "}
                <a
                  href="https://www.eigenlayer.xyz/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Eigenlayer
                </a>
              </span>
              <LocationButton loc={locations.nodeCafe} />
            </div>
            <div>
              <div>
                Get your day started with coffee and a good read on blockchain
                essentials.
              </div>
              <ul className="mt-2">
                <li>Saturday: 09:00 - 16:00</li>
                <li>Sunday: 09:00 - 12:00</li>
              </ul>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-bold text-xl mb-0.5">
              Wellness Room by Day, Planetarium by Night
            </h3>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 mb-2 text-[15px] leading-[22px] text-gray-700">
              <span>
                Hosted by{" "}
                <a
                  href="https://scroll.io/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Scroll
                </a>
              </span>
              <LocationButton loc={locations.wellnessRoom} />
            </div>
            <div>
              <div>
                On the fifth floor we’ll host yoga, reiki, meditation and
                breathwork sessions throughout the weekend so hackers can rewind
                and recenter. At night the space will transform into a starry
                night, with areas for hackers to sleep or unwind.
              </div>
              <div className="mt-4 mb-1">Saturday 25th:</div>
              <ul>
                <li>10:00 - 11:30 - Kundalini yoga</li>
                <li>13:00 - 15:00 - Reiki practitioner available</li>
                <li>15:00 - 16:30 - Sound healing practice</li>
                <li>17:00 - 19:00 - Yoga flow + Sound Bath</li>
              </ul>
              <div className="mt-4 mb-1">Sunday 26th:</div>
              <ul>
                <li>10:00 - 10:45 Active/dance meditation</li>
                <li>10:45 - 11:30 Vibro Acoustic massage 1:1 first slot</li>
                <li>11:45 - 12:30 Vibro acoustic massage 1:1 2nd slot</li>
              </ul>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-bold text-xl mb-0.5">Screen Printing</h3>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 mb-2 text-[15px] leading-[22px] text-gray-700">
              <span>
                Hosted by{" "}
                <a
                  href="https://www.lens.xyz/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Lens
                </a>
              </span>
              <LocationButton loc={locations.library} />
            </div>
            <div>
              Family Style, located in the Library, invites hackers to relax,
              have some matcha, get some Lens swag live-screen printed by a
              local Berliner screen printer.
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-bold text-xl mb-0.5">Pizza Delivery</h3>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 mb-2 text-[15px] leading-[22px] text-gray-700">
              <span>
                By{" "}
                <a
                  href="https://www.base.org/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Base
                </a>
              </span>
            </div>
            <div>
              Pizza will be served on Saturday, after 22 hs. Stay tuned for the
              mic call, and make sure to get some napkins, greasy fingers
              guaranteed. :)
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-bold text-xl mb-0.5">Co-Create</h3>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 mb-2 text-[15px] leading-[22px] text-gray-700">
              <span>
                Hosted by{" "}
                <a
                  href="https://www.refractionfestival.com/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Refraction
                </a>
              </span>
              <LocationButton loc={locations.artExhibition} />
            </div>
            <div>
              <div>
                Art exhibition curated by Department of Decentralization and
                Refraction.
              </div>
              <ul className=" mt-2">
                <li>Friday: 19:00 - 23:59 for hackers</li>
                <li>
                  Saturday: 11:00 - 23:59 for hackers, 11:00 - 17:00 for public.
                  Public tickets available{" "}
                  <a
                    href="https://visas.ethberlin.org/ethberlin/art/"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    here
                  </a>{" "}
                  <div className="mt-2">
                    With panels and content from 12:00 - 14:00
                  </div>
                </li>
                <li>Sunday 11:00-15:00</li>
              </ul>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-bold text-xl mb-0.5">THC @ETHBerlin04</h3>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 mb-2 text-[15px] leading-[22px] text-gray-700">
              <span>
                Hosted by{" "}
                <a
                  href="https://www.dist0rtion.com/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Social Dist0rtion Protocol
                </a>
              </span>
            </div>
            <div>
              Social Dist0rtion Protocol (SDP) where the first "o" in
              "distortion" is a zero, have an important message for you. Their
              upcoming special operation will unfold at ETHBerlin04, where they
              urgently require your collaboration to avert a dire human destiny.
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-bold text-xl mb-0.5">
              Cocktails at the Cinebar
            </h3>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 mb-2 text-[15px] leading-[22px] text-gray-700">
              <span>
                Hosted by{" "}
                <a
                  href="https://celestia.org/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Celestia
                </a>
              </span>
              <LocationButton loc={locations.cinebar} />
            </div>
            <div>
              Celestia will be serving what they do best: vibes, games and some
              fine cocktails. Starting from 6pm on Saturday you’ll be able to
              take a break from your computer and mingle with other teams,
              mentors, and hackers over a cocktail or two.
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-bold text-xl mb-0.5">Cypherpunk Cinema</h3>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 mb-2 text-[15px] leading-[22px] text-gray-700">
              <span>
                By{" "}
                <a
                  href="https://dod.ngo"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  DoD
                </a>
              </span>
              <LocationButton loc={locations.cinema} />
            </div>
            <div>
              For newbies to our hackathon series, our amazing venue is blessed
              with a cinema and very comfy couches for the ultimate viewing
              experience. As per ETHBerlin³, we will be curating the cinema on
              Saturday with movies to inspire you.
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-bold text-xl mb-0.5">Görli On-Chain</h3>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 mb-2 text-[15px] leading-[22px] text-gray-700">
              <span>
                Hosted by{" "}
                <a
                  href="https://infura.io/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Infura
                </a>{" "}
                &{" "}
                <a
                  href="https://consensys.io/diligence/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Consensys Diligence
                </a>
              </span>
            </div>
            <div>
              Join the Decentralized Infrastructure Network (DIN) and Consensys
              Diligence team for a Smart Contract Capture the Flag (CTF)
              Farcaster Frames challenge to solve riddles and mint a limited
              edition Goerli Commemorative NFT. Celebrating Goerli's launch at
              Göorlicon in Feb 2019, this puzzle will be deployed at ETHBerlin
              and available to the broader audience.
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-bold text-xl mb-0.5">Teledisko</h3>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 mb-2 text-[15px] leading-[22px] text-gray-700">
              <span>
                By{" "}
                <a
                  href="https://www.teledisko.com/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  TelediskoDAO
                </a>
              </span>
              <LocationButton loc={locations.yard0} />
            </div>
            <div>
              The teledisko needs no further explanation. Brought to you by
              telediskoDAO, it’s the smallest disco on earth - literally an
              upcycled telephone booth with a disco in it.
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-bold text-xl mb-0.5">Donut Wall</h3>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 mb-2 text-[15px] leading-[22px] text-gray-700">
              <span>
                By{" "}
                <a
                  href="https://missing-link.io/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Missing Link
                </a>
              </span>
              <LocationButton loc={locations.yard0} />
            </div>
            <div>
              Back by popular demand is the donut wall! It’s exactly what it
              says on the tin - A wall of donuts for you to get your sugar hit
              during the weekend.
            </div>
          </div>
          <div className="mt-8">
            <h3 className="font-bold text-xl mb-0.5">
              ETHBerlin Privacy Corner
            </h3>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 mb-2 text-[15px] leading-[22px] text-gray-700">
              <span>
                By{" "}
                <a
                  href="https://c24ber.web3privacy.info"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Web3 Privacy now
                </a>
              </span>
              <LocationButton loc={locations.library} />
            </div>
            <div>
              Hacker-focused safe space where you can get productive feedback on
              your hackathon project idea, its privacy features, and general
              viability. The Web3 Privacy team will be available throughout the
              weekend and will host open feedback and ideation sessions. For
              more info please see:{" "}
              <a href="https://c24ber.web3privacy.info">
                https://c24ber.web3privacy.info
              </a>
            </div>
          </div>
          <div id="party" className="mt-8">
            <h3 className="font-bold text-xl mb-0.5">After party</h3>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 mb-2 text-[15px] leading-[22px] text-gray-700">
              <span>
                By{" "}
                <a
                  href="https://entropy.xyz/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Entropy
                </a>{" "}
                &{" "}
                <a
                  href="https://fuel.network/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Fuel
                </a>{" "}
                ·{" "}
                <a
                  href="https://aedenberlin.com"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Aeden ↗
                </a>
              </span>
            </div>
            <div>
              <em>From 8PM onwards on Sunday night.</em>
            </div>
            <div>
              It would not be a hackathon without an after party. It would also
              not be Berlin without a dose of techno.
            </div>
            <div>
              You will receive an after-party wristband during the hackathon
              registration. If you don't want to or cannot attend on Sunday
              evening, you can share it with your friends.
            </div>
          </div>
        </div>

        <VenueMapModal
          isOpen={isMapModalOpen}
          handleCloseModal={handleCloseModal}
          activeMapName={activeMapName}
          activeMap={activeMap} // only ground floor
          activeRoomClass={activeRoomClass}
          roomName={activeRoomName}
        />
      </div>
    </Layout>
  );
};

export const Head = () => <SEO title="Experiences · ETHBerlin04" />;

export default Experiences;
