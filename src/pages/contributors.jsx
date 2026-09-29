import Layout from "../components/Layout";
import React, { useEffect } from "react";
import SEO from "../components/seo";
import mentors from "../assets/people/mentors";
import judges from "../assets/people/judges";
import twitterLogo from "../assets/twitter.png";
import githubLogo from "../assets/github.png";
import team from "../assets/people/team";
import speakers from "../assets/people/speakers";
import workshopHosts from "../assets/people/workshops";
import ETHBerlin from "../components/ETHBerlin";
import { TbWorldWww } from "react-icons/tb";
import { SiFarcaster } from "react-icons/si";
import { BsGitlab } from "react-icons/bs";

// Where a link goes, as its name reads: "<person> on <site>" (issue 47).
const SITES = {
  twitter: "X / Twitter",
  github: "GitHub",
  farcaster: "Farcaster",
  gitlab: "GitLab",
  website: "the web",
};

// A 36 px link with a hidden icon and a visible-to-assistive-tech name.
const Social = ({ href, label, children }) => (
  <a
    href={href}
    rel="noopener noreferrer"
    target="_blank"
    className="w-9 h-9 flex items-center justify-center opacity-70 hover:opacity-100"
  >
    <span className="sr-only">{label}</span>
    {children}
  </a>
);

const Person = ({
  name,
  organization,
  maskImage,
  image,
  twitter,
  github,
  website,
  farcaster,
  gitlab,
  organization2,
}) => {
  // The photo shows on hover, and on a tap or a key press (issue 48).
  const [revealed, setRevealed] = React.useState(false);
  const photo = (
    <>
      {maskImage && (
        <img
          src={maskImage.default}
          alt=""
          className={`max-h-full max-w-full top-0 left-0 right-0 bottom-0 absolute m-auto z-10 ${
            revealed ? "opacity-0" : "opacity-95"
          } hover:opacity-0 transition-all duration-200 ease-in-out`}
        />
      )}
      {image && (
        <img
          src={image.default}
          alt=""
          className="max-h-full max-w-full top-0 left-0 right-0 bottom-0 absolute m-auto"
        />
      )}
    </>
  );
  const frame =
    "flex flex-col justify-center items-center h-48 w-full relative break-words";
  return (
    <div className="mx-4 my-6 w-48 hover:text-berlin-red">
      {maskImage && image ? (
        <button
          type="button"
          aria-pressed={revealed}
          onClick={() => setRevealed(!revealed)}
          className={frame}
        >
          <span className="sr-only">Show photo of {name}</span>
          {photo}
        </button>
      ) : (
        <div className={frame}>{photo}</div>
      )}
      <div className="text-2xl text-center mt-2">{name}</div>
      {organization && (
        <div className="text-center text-lg">
          <a href={organization.url} rel="noopener noreferrer" target="_blank">
            {organization.name}
          </a>{" "}
          {organization2 && <span>{" - "}</span>}
          {organization2 && (
            <a
              href={organization2.url}
              rel="noopener noreferrer"
              target="_blank"
            >
              {organization2.name}
            </a>
          )}
        </div>
      )}
      <div className="flex justify-center flex-wrap mt-1">
        {twitter && (
          <Social href={twitter} label={`${name} on ${SITES.twitter}`}>
            <img
              src={twitterLogo}
              className="h-5"
              style={{ filter: "invert(1) grayscale(1)" }}
              alt=""
            />
          </Social>
        )}
        {github && (
          <Social href={github} label={`${name} on ${SITES.github}`}>
            <img
              src={githubLogo}
              className="h-5"
              style={{ filter: "invert(1) grayscale(1)" }}
              alt=""
            />
          </Social>
        )}
        {farcaster && (
          <Social href={farcaster} label={`${name} on ${SITES.farcaster}`}>
            <SiFarcaster aria-hidden="true" className="w-5 h-5 text-black" />
          </Social>
        )}
        {gitlab && (
          <Social href={gitlab} label={`${name} on ${SITES.gitlab}`}>
            <BsGitlab aria-hidden="true" className="w-5 h-5 text-black" />
          </Social>
        )}
        {website && (
          <Social href={website} label={`${name} on ${SITES.website}`}>
            <TbWorldWww aria-hidden="true" className="w-6 h-6 text-black" />
          </Social>
        )}
      </div>
    </div>
  );
};

// function to randomize an array
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

///////////////////////
//// MAIN COMPONENT ///
///////////////////////

// The groups: the tab's name, its MRZ label, and the people.
const GROUPS = [
  ["Team", "TEAM", team],
  ["Speakers", "SPEAKERS", speakers],
  ["Workshop hosts", "WORKSHOP HOSTS", workshopHosts],
  ["Judges", "JUDGES", judges],
  ["Mentors", "MENTORS", mentors],
];

const Contributors = () => {
  const [tab, setTab] = React.useState(0);
  // The people come in after the first render: the shuffle differs between
  // the build and the browser.
  const [people, setPeople] = React.useState([]);
  const tabs = React.useRef([]);

  useEffect(() => {
    setPeople(GROUPS[tab][2]);
  }, [tab]);

  // Arrow keys, Home and End move between the tabs and select one.
  const onKeyDown = (e) => {
    const last = GROUPS.length - 1;
    const next = {
      ArrowRight: tab === last ? 0 : tab + 1,
      ArrowLeft: tab === 0 ? last : tab - 1,
      Home: 0,
      End: last,
    }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    setTab(next);
    tabs.current[next].focus();
  };

  return (
    <Layout>
      <div className="textbox">
        <h1 className="my-4 text-secondary font-ocra">
          &lt;&lt;C&lt;ONTRIBUTORS
        </h1>
        <p>
          These are the amazing people that made <ETHBerlin /> possible.{" "}
          <span className="text-sm text-gray-500 italic">
            In pseudo-random order
          </span>
        </p>

        <div
          role="tablist"
          aria-label="Contributor groups"
          onKeyDown={onKeyDown}
          className="grid grid-cols-2 md:grid-cols-5 gap-2 font-ocra text-base leading-5"
        >
          {GROUPS.map(([name, label], i) => (
            <button
              key={name}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`group-tab-${i}`}
              aria-selected={i === tab}
              aria-controls="group-panel"
              tabIndex={i === tab ? 0 : -1}
              onClick={() => setTab(i)}
              className={`border border-black px-2.5 py-3 text-left hover:underline ${
                i === tab ? "bg-black text-white" : ""
              }`}
            >
              <span className="sr-only">{name}</span>
              <span aria-hidden="true">&lt;&lt;{label}&lt;&lt;</span>
            </button>
          ))}
        </div>
        <div
          id="group-panel"
          role="tabpanel"
          aria-labelledby={`group-tab-${tab}`}
        >
          <h2 className="font-ocra text-2xl mt-8">{GROUPS[tab][0]}</h2>
          <div className="flex flex-wrap justify-around">
            {shuffle(people).map((person) => (
              <Person {...person} key={person.name + Math.random()} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const Head = () => <SEO title="Contributors · ETHBerlin04" />;

export default Contributors;
