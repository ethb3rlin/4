"use strict";(self.webpackChunkethberlin=self.webpackChunkethberlin||[]).push([[96],{1002:function(e,t,a){a.r(t);var n=a(3911),r=a(7294),i=a(3253),o=a.n(i),l=a(4787),s=a(228),c=a(9515),m=(a(6048),a(8595),a(9184)),d=a(7336),h=a(2722),u=a(7650),p=a(3762),y=a(1784),f=a(1606),E=a(1689),v=a(4636),g=a(8009),T=a(9765),b=a(1104),x=a(7222),S=a(7557),k=a(4449),w=a(7361),N=a(5593),L=a(8085),C=a(756),F=a(2488),A=a(4931),D=a(2091),P=a(8908);const W=new Date,z=e=>{let{title:t,eventLocations:a,dayStr:n,endDayStr:i,startTime:o,endTime:l,className:s,isExtravaganza:c}=e;const m=new Date(n+"T"+o+":00+02:00"),d=l?new Date(i||n+"T"+l+":00+02:00"):m;return r.createElement("div",{className:(c?"text-berlin-red":"")+" "+(W>d?"text-gray-300":W>m?"font-bold animate-pulse-faster":s)+" list-none md:text-lg mt-3"},r.createElement("span",{className:"fake-bold"},r.createElement("span",{className:"text-berlin-red opacity-50"},"> "),o+(l?"-"+l:"")+" -")," ",t," ",a.map((e=>r.createElement("button",{className:"text-berlin-red "+(W>d?"text-gray-300":W>m?"font-bold animate-pulse-faster":s)+" text-sm",onClick:()=>{e.handler()}},r.createElement("span",{className:"align-middle"},r.createElement("span",{class:"material-symbols-outlined text-sm mr-0.5 ml-1"},"my_location")),r.createElement("span",{className:"underline"},e.name)))))},R=e=>{let{className:t,title:a,eventLocations:n,dayStr:i,endDayStr:l,startTime:s,endTime:c,description:m,speakerName:d,photo:h,photo2:u,photo3:p}=e;const[y,f]=r.useState(!1),E=new Date(i+"T"+s+":00+02:00"),v=c?new Date(l||i+"T"+c+":00+02:00"):E;return r.createElement("div",null,r.createElement(z,{title:a,eventLocations:n,dayStr:i,endDayStr:l,startTime:s,endTime:c,className:t}),r.createElement("div",{className:"ml-8 text-sm "+(W>v?"text-gray-300":W>E?"font-bold animate-pulse-faster":"")+" "+t},r.createElement("span",null,r.createElement("span",{className:"text-xs text-berlin-red opacity-50 mr-0.5"},"> "),d),r.createElement("button",{onClick:()=>f(!0),className:"underline "+(W>v?"text-gray-300":"text-gray-500")+" mx-2"},"More Info")),r.createElement(o(),{isOpen:y,style:{overlay:{position:"fixed",top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(255, 255, 255, 0.5)"},content:{zIndex:40,backgroundColor:"rgba(0, 0, 0, 0.9)",margin:"auto"}},overlayClassName:"flex items-center z-40 px-4 md:px-16 lg:px-32 xl:px-48 transition-all duration-200 ease-in-out py-8 max-h-screen",className:"flex flex-col items-center justify-center max-h-full",shouldCloseOnEsc:!0,shouldCloseOnOverlayClick:!0,onRequestClose:e=>{e.stopPropagation(),f(!1)},closeTimeoutMS:500},r.createElement("div",{className:"p-8 font-w95 text-center overflow-y-auto max-w-4xl"},r.createElement("div",{className:"flex justify-end"},r.createElement("button",{className:"text-4xl text-berlin-red",onClick:()=>f(!1)},"X")),r.createElement("div",{className:"flex flex-row justify-center p-4 flex-wrap"},h&&r.createElement("img",{src:h,className:"h-32 md:h-64 self-center mx-4 my-4"}),u&&r.createElement("img",{src:u,className:"h-32 md:h-64 self-center mx-4 my-4"}),p&&r.createElement("img",{src:p,className:"h-32 md:h-64 self-center mx-4 my-4"})),r.createElement("div",{className:"text-xl md:text-3xl font-bold my-4"},a),r.createElement("div",{className:"text-lg md:text-2xl"},d),r.createElement("div",{className:"mt-8"},m))))};t.default=()=>{const[e,t]=r.useState(!1),[a,i]=r.useState(l.Z),[o,W]=r.useState("lexis"),[M,I]=r.useState("Ground Floor (#0)"),[B,O]=r.useState(!1),[Z,H]=r.useState(!1);let j=r.useRef(null);const G=()=>{i(l.Z),I("Ground Floor (#0)")},K=()=>{i(s.Z),I("First Floor (#1)")},J=()=>{i(c.Z),I("Second Floor (#2)")},q=()=>{i(m.Z),I("Fifth Floor (#5)")},U={lexis:{name:"Lexis",handler:()=>{G(),W("lexis"),t(!0)}},giftShop:{name:"Gift Shop",handler:()=>{G(),W("giftShop"),t(!0)}},nodeCafe:{name:"Node Cafe",handler:()=>{G(),W("nodeCafe"),t(!0)}},yard0:{name:"Yard 0",handler:()=>{G(),W("yard0"),t(!0)}},yard1:{name:"Yard 1",handler:()=>{G(),W("yard1"),t(!0)}},yard2:{name:"Yard 2",handler:()=>{G(),W("yard2"),t(!0)}},mainEnterence:{name:"Main Enterance",handler:()=>{G(),W("main-enterence"),t(!0)}},registration:{name:"Registration",handler:()=>{G(),W("registration"),t(!0)}},restaurant:{name:"Restaurant",handler:()=>{G(),W("restaurant"),t(!0)}},mckinsey:{name:"McKinsey",handler:()=>{K(),W("mckinsey"),t(!0)}},communitySpace1:{name:"First Floor Community Space",handler:()=>{K(),W("community-space-first-floor"),t(!0)}},communitySpace2:{name:"Second Floor Community Space",handler:()=>{J(),W("community-space-second-floor"),t(!0)}},artExhibition:{name:"Art Exhibition",handler:()=>{q(),W("artExhibition"),t(!0)}},library:{name:"Library",handler:()=>{K(),W("library"),t(!0)}},alice:{name:"Alice",handler:()=>{J(),W("alice"),t(!0)}},wellnessRoom:{name:"Wellness & Planeterium",handler:()=>{q(),W("wellnessRoom"),t(!0)}},cinema:{name:"Cinema",handler:()=>{q(),W("cinema"),t(!0)}},cinebar:{name:"Cinebar",handler:()=>{q(),W("cinebar"),t(!0)}}};return r.useEffect((()=>{const e=new IntersectionObserver((e=>{let[t]=e;return t.intersectionRatio<1?H(!0):H(!1)}),{threshold:[1]});return j.current&&e.observe(j.current),()=>{j.current&&e.unobserve(j.current)}}),[j]),r.createElement(n.Z,null,r.createElement("div",{className:"textbox"},r.createElement("h1",{className:"my-4 underline text-secondary font-ocra"},"<<S<CHEDULE"),r.createElement("div",{className:""},r.createElement("p",{className:"mt-4"},"Welcome to ",r.createElement(d.Z,null),"! If you have the chance, please claim your badge early during preregistration at the venue to avoid long queues in the evening."),r.createElement("div",{className:"flex items-center justify-center w-full sticky -top-1 py-4 text-center  "+(Z?"bg-white":""),ref:j},r.createElement("label",{for:"toogleA",className:"flex items-center cursor-pointer"},r.createElement("div",{className:"mr-3 "},"Hacker Essentials"),r.createElement("div",{className:"relative"},r.createElement("input",{id:"toogleA",type:"checkbox",className:"sr-only",onChange:()=>O((e=>!e))}),r.createElement("div",{className:"w-10 h-4 "+(B?"bg-red-500":"bg-gray-400")+" rounded-full shadow-inner"}),r.createElement("div",{className:"absolute w-6 h-6 rounded-full shadow -left-1 -top-1 transition "+(B?"translate-x-full bg-red-300":"bg-gray-200")})),r.createElement("div",{className:"ml-3 text-red-300"},"Hacker Extravaganza"))),r.createElement("h2",{className:"text-xl font-bold font-ocra mt-4"},"Friday, May 24"),r.createElement("p",{className:"mt-4"},r.createElement("ul",null,r.createElement(z,{dayStr:"2024-05-24",startTime:"12:00",endTime:"16:00",title:"Pre-registration",eventLocations:[U.giftShop]}),r.createElement(z,{dayStr:"2024-05-24",startTime:"16:00",title:"Registration",eventLocations:[U.giftShop]}),r.createElement(z,{dayStr:"2024-05-24",startTime:"16:00",title:"Doors open",eventLocations:[U.yard0]}),r.createElement(R,{dayStr:"2024-05-24",startTime:"16:30",endTime:"17:00",title:"Talk: We need Censorships",speakerName:"Fatemeh Fannizadeh (Swarm)",photo:S.default,eventLocations:[U.lexis]}),r.createElement(R,{dayStr:"2024-05-24",startTime:"17:00",endTime:"17:30",title:"Talk: Building for Big V Value",speakerName:"Nick Almond (FactoryDAO)",description:"Crypto was meant to be different. This was the technological frontier for a new world, away from the banks, centralised rent seeking and maximally extractive business models. So what happened? This talk lays out some home truths, discusses where we've gone wrong and what we can do to steer the industry into a better direction.",photo:C.default,eventLocations:[U.lexis]}),r.createElement(R,{dayStr:"2024-05-24",startTime:"17:30",endTime:"18:00",title:"Talk: Are there limits to the reach of US Sanctions laws?",description:"The US Treasury's decision to sanction Tornado Cash, including the immutable pool contracts, has set off a wave of criminal and civil litigation. Do these sanctions go too far, can similar sanctions be used to effectively outlaw crypto all together, and how can we fight back?",speakerName:"Peter van Valkenburg (Coin Center)",photo:F.default,eventLocations:[U.lexis]})," ",r.createElement(R,{dayStr:"2024-05-24",startTime:"18:00",endTime:"19:00",title:"Opening Ceremony",speakerName:"TBA",eventLocations:[U.lexis]}),r.createElement(z,{dayStr:"2024-05-24",startTime:"19:00",endTime:"23:59",title:"Hacking begins",className:"font-bold italic",eventLocations:[]}),r.createElement(z,{dayStr:"2024-05-24",startTime:"19:00",endTime:"19:30",title:"Hacker Team Finding Session",eventLocations:[U.yard0]}),r.createElement(z,{dayStr:"2024-05-24",startTime:"19:00",endTime:"21:00",title:"Dinner",eventLocations:[U.lexis]}),B&&r.createElement(z,{dayStr:"2024-05-24",isExtravaganza:!0,startTime:"19:00",endTime:"23:59",title:"Art Exhibition: co-create",eventLocations:[U.artExhibition]}),r.createElement(R,{dayStr:"2024-05-24",startTime:"19:30",endTime:"20:15",title:"Technical Workshop: Build an Ethereum dApp in 40 mins",speakerName:"Austin Griffith (Ethereum Foundation)",photo:u.default,eventLocations:[U.lexis]}),B&&r.createElement(z,{dayStr:"2024-05-24",startTime:"20:00",endTime:"21:00",title:"Privacy Corner: Project Ideation Session",isExtravaganza:!0,eventLocations:[U.library]}),r.createElement(R,{dayStr:"2024-05-24",startTime:"20:15",endTime:"21:00",title:"Technical Workshop: Re-inventing login with Sign-in-with-Ethereum",speakerName:"Pedro Gomes (WalletConnect)",description:r.createElement(r.Fragment,null,r.createElement("div",null,"We will learn how powerful SIWE can be used as a tool for building different use-cases such as identity, attestations, permissions and messaging. For example WalletConnect built this app called Web3Inbox to aggregate notifications for multiple dapps and it's based on SIWE. Additionally there are other systems where you can use attestations to build roots of trust with SIWE that generate CACAOs (CAIP-74) to build dapps offchain. Finally we are working on Session Keys which also uses SIWE to empower key delegation for transaction signing for Smart Accounts")),photo:v.default,eventLocations:[U.lexis]}),r.createElement(R,{dayStr:"2024-05-24",startTime:"21:00",endTime:"21:45",title:"Technical Workshop: Integrating RPCh in your Dapp to privately connect to RPC endpoints\n",speakerName:"Tino Breddin (HOPR)",description:"TBA",photo:y.default,eventLocations:[U.lexis]}),r.createElement(R,{dayStr:"2024-05-24",startTime:"21:45",endTime:"22:30",title:"Technical Workshop: Secure communications with Waku",speakerName:"Sergei Tikhomirov (Waku)",description:"TBA",photo:p.default,eventLocations:[U.lexis]}),r.createElement(R,{dayStr:"2024-05-24",startTime:"22:30",endTime:"23:15",title:"Technical Workshop: ZK vs TEE: Wat do (as a product builder)?",speakerName:"Odysseas (Phylax Systems), GregTheGreek (ChainSafe)",photo:f.default,photo2:E.default,description:r.createElement(r.Fragment,null,r.createElement("div",null,"This session delves into Trusted Execution Environments (TEEs) and Zero-Knowledge (ZK) for Ethereum product builders with limited technical depth in these areas. We will examine key considerations such as performance, trust assumptions, cost efficiency, and the complexity of integration to determine their suitability for privacy and verifiable computation in applications.")," ",r.createElement("br",null),r.createElement("div",null,"Participants will learn about the security vulnerabilities, scalability potential, and regulatory compliance aspects of each technology. The talk will also highlight the support available through developer ecosystems and the maturity of existing libraries and tools. By the end, attendees will be equipped to make informed decisions on which technology best meets their project's needs and understand the resources available for implementation.")),eventLocations:[U.lexis]}),r.createElement(R,{dayStr:"2024-05-24",startTime:"23:15",endTime:"23:59",title:"Technical Workshop: How to add ZKPs to your app (with Zupass)?",speakerName:"Richard Liu (0xPARC), Ivan Chub (0xPARC)",photo:g.default,photo2:T.default,description:r.createElement(r.Fragment,null,r.createElement("div",null,'No prior circom or ZK experience needed for this workshop, where we\'ll run through a simple example of a sybil-resistant app that requests a "proof of ETHBerlin hacker visa". Hackers may receive a *cryptographic surprise* during this workshop.')),eventLocations:[U.lexis]}),r.createElement(z,{dayStr:"2024-05-24",startTime:"23:59",endDayStr:"2024-05-25",endTime:"01:00",title:"Midnight Snack",eventLocations:[U.restaurant]}))),r.createElement("div",{className:"flex justify-center"},r.createElement("div",{className:"border-b-[1px] mb-8 mt-4 border-berlin-red opacity-40 w-full"})),r.createElement("h2",{className:"text-xl font-bold font-ocra"},"Saturday, May 25th"),r.createElement("p",{className:"mt-4"},"Happy hacking, no distractions!"),r.createElement("p",{className:"mt-4"},r.createElement(z,{dayStr:"2024-05-25",startTime:"00:00",endTime:"23:59",title:"Hacking",className:"font-bold italic",eventLocations:[]}),r.createElement(z,{dayStr:"2024-05-25",startTime:"09:00",endTime:"11:00",title:"Breakfast",eventLocations:[U.restaurant]}),B&&r.createElement(z,{dayStr:"2024-05-25",startTime:"10:00",endTime:"11:30",title:"Kundalini yoga",eventLocations:[U.wellnessRoom],isExtravaganza:!0}),r.createElement(R,{dayStr:"2024-05-25",startTime:"11:00",endTime:"13:00",title:"Project Pitches / Feedback Sessions",description:"Are you stuck, looking for another team member or want feedback on your idea? Join this session to pitch your project on stage or learn more about the projects others are working on!",eventLocations:[U.lexis]}),B&&r.createElement(z,{dayStr:"2024-05-25",startTime:"11:00",endTime:"23:59",title:"Art Exhibition: co-create",eventLocations:[U.artExhibition],isExtravaganza:!0}),B&&r.createElement(z,{dayStr:"2024-05-25",startTime:"12:00",endTime:"18:00",title:"Screenprinting and Matcha",eventLocations:[U.library],isExtravaganza:!0}),B&&r.createElement(R,{dayStr:"2024-05-25",startTime:"12:00",endTime:"13:20",isExtravaganza:!0,title:"Panel - Decentralized Art Organisation",speakerName:"Vincent Trasov, Benny Giang",description:r.createElement(r.Fragment,null,r.createElement("div",null,"Panel - Decentralized Art Organisation: With Vincent Trasov and Benny Giang; Moderated by Stina Gustafsson.")),eventLocations:[U.artExhibition]}),r.createElement(z,{dayStr:"2024-05-25",startTime:"13:00",endTime:"15:00",title:"Lunch",eventLocations:[U.restaurant]}),B&&r.createElement(z,{dayStr:"2024-05-25",startTime:"13:00",endTime:"15:00",title:"Reiki practitioner available",isExtravaganza:!0,eventLocations:[U.wellnessRoom]}),B&&r.createElement(R,{dayStr:"2024-05-25",startTime:"13:30",endTime:"14:50",isExtravaganza:!0,title:"Panel - Art after NFTs",speakerName:"Joan Heemskerk, Billy Rennekamp",description:r.createElement(r.Fragment,null,r.createElement("div",null,"Panel - Art after NFTs: With Joan Heemskerk and Billy Rennekamp; Moderated by María Paula Fernández.")),eventLocations:[U.artExhibition]}),r.createElement(z,{dayStr:"2024-05-25",startTime:"14:00",endTime:"17:00",title:"Mentoring Expert Office Hours",description:"Check mentor area for detailed schedule!",eventLocations:[U.nodeCafe]}),B&&r.createElement(z,{dayStr:"2024-05-25",startTime:"15:00",endTime:"16:30",title:"Sound healing practice",isExtravaganza:!0,eventLocations:[U.wellnessRoom]}),B&&r.createElement(z,{dayStr:"2024-05-25",startTime:"16:00",endTime:"17:00",title:"Privacy Corner: Project Pitches and Feedback Session",isExtravaganza:!0,eventLocations:[U.library]}),B&&r.createElement(z,{dayStr:"2024-05-25",startTime:"17:00",endTime:"19:00",title:"Yoga flow + Sound Bath",isExtravaganza:!0,eventLocations:[U.wellnessRoom]}),B&&r.createElement("div",{isExtravaganza:!0},r.createElement(z,{dayStr:"2024-05-25",startTime:"17:00",endDayStr:"2024-05-26",endTime:"01:00",title:"DJs in Courtyard 1",eventLocations:[U.yard0]}),r.createElement("div",{className:"ml-12"},r.createElement(z,{dayStr:"2024-05-25",startTime:"17:00",endTime:"19:00",title:r.createElement("span",{className:"inline-flex items-center"},"Jommi"," ",r.createElement("a",{href:"https://twitter.com/joakimhi",className:"ml-2 inline-block opacity-70 hover:opacity-100 text-berlin-red hover:text-berlin-red",target:"_blank",rel:"noopener noreferrer"},r.createElement(D.fWC,null))),eventLocations:[U.yard0]}),r.createElement(z,{dayStr:"2024-05-25",startTime:"19:00",endTime:"21:00",title:r.createElement("span",{className:"inline-flex items-center"},"Anna"," ",r.createElement("a",{href:"https://soundcloud.com/innermost3000",className:"ml-2 inline-block opacity-70 hover:opacity-100 text-berlin-red hover:text-berlin-red",target:"_blank",rel:"noopener noreferrer"},r.createElement(P.OSW,null)),r.createElement("a",{href:"https://twitter.com/annmehr",className:"ml-2 inline-block opacity-70 hover:opacity-100 text-berlin-red hover:text-berlin-red",target:"_blank",rel:"noopener noreferrer"},r.createElement(D.fWC,null))),eventLocations:[U.yard0]}),r.createElement(z,{dayStr:"2024-05-25",startTime:"21:00",endTime:"23:00",title:r.createElement("span",{className:"inline-flex items-center"},"Manu +"," ",r.createElement("a",{href:"https://twitter.com/blockravers",className:"ml-2 inline-flex items-center opacity-70 hover:opacity-100 text-berlin-red hover:text-berlin-red",target:"_blank",rel:"noopener noreferrer"},"@blockravers ",r.createElement(D.fWC,{className:"ml-2"}))),eventLocations:[U.yard0]}),r.createElement(z,{dayStr:"2024-05-25",endDayStr:"2024-05-26",startTime:"23:00",endTime:"01:00",title:r.createElement("span",{className:"inline-flex items-center"},"Manuel"," ",r.createElement("a",{href:"https://soundcloud.com/umcharra",className:"ml-2 inline-block opacity-70 hover:opacity-100 text-berlin-red hover:text-berlin-red",target:"_blank",rel:"noopener noreferrer"},r.createElement(P.OSW,null))),eventLocations:[U.yard0]}))),B&&r.createElement(r.Fragment,null,r.createElement(z,{dayStr:"2024-05-25",startTime:"19:15",endTime:"01:40",endDayStr:"2024-05-26",title:"Cinema",eventLocations:[U.cinema],isExtravaganza:!0}),r.createElement("div",{className:"ml-12"},r.createElement(z,{dayStr:"2024-05-25",startTime:"17:15",endTime:"18:35",title:"Terms and Conditions May Apply (Documentary, 2013)",eventLocations:[U.cinema],isExtravaganza:!0}),r.createElement(z,{dayStr:"2024-05-25",startTime:"18:45",endTime:"20:12",title:"All Creatures Welcome (Documentary, 2018)",eventLocations:[U.cinema],isExtravaganza:!0}),r.createElement(z,{dayStr:"2024-05-25",startTime:"20:15",endTime:"22:21",title:"Sneakers (Comedy/Crime, 1992)",eventLocations:[U.cinema],isExtravaganza:!0}),r.createElement(z,{dayStr:"2024-05-25",startTime:"22:30",endTime:"23:51",title:"Idiocracy (Comedy/SciFi, 2006)",eventLocations:[U.cinema],isExtravaganza:!0}),r.createElement(z,{dayStr:"2024-05-25",startTime:"23:59",endTime:"01:40",endDayStr:"2024-05-26",title:"Sans Soleil (Documentary, 1983)",eventLocations:[U.cinema],isExtravaganza:!0}))),r.createElement(z,{dayStr:"2024-05-25",startTime:"19:00",endTime:"21:00",title:"Dinner",eventLocations:[U.restaurant]}),r.createElement(z,{dayStr:"2024-05-25",startTime:"23:59",endDayStr:"2024-05-26",endTime:"01:00",title:"Midnight Snack",eventLocations:[U.restaurant]})),r.createElement("div",{className:"flex justify-center"},r.createElement("div",{className:"border-b-[1px] mb-8 mt-4 border-berlin-red opacity-40 w-full"})),r.createElement("h2",{className:"text-xl font-bold font-ocra"},"Sunday, May 26th"),r.createElement("p",{className:"mt-4"},"Don't forget to submit your projects by 11:30 am Berlin time!"),r.createElement("p",{className:"mt-4"},r.createElement("ul",null,r.createElement(z,{dayStr:"2024-05-26",startTime:"00:00",endTime:"11:00",title:"Hacking (Submission deadline at 11:30 am)",className:"font-bold italic",eventLocations:[]}),r.createElement(z,{dayStr:"2024-05-26",startTime:"09:00",endTime:"11:00",title:"Breakfast",eventLocations:[U.restaurant]}),B&&r.createElement(z,{dayStr:"2024-05-26",startTime:"10:00",endTime:"10:45",title:"Active/dance meditation",isExtravaganza:!0,eventLocations:[U.wellnessRoom]}),B&&r.createElement(z,{dayStr:"2024-05-26",startTime:"10:45",endTime:"11:30",title:"Vibro Acoustic massage 1:1 first slot",isExtravaganza:!0,eventLocations:[U.wellnessRoom]}),r.createElement(z,{dayStr:"2024-05-26",startTime:"11:30",title:"PROJECT SUBMISSION DEADLINE",className:"font-bold italic",eventLocations:[]}),B&&r.createElement(z,{dayStr:"2024-05-26",startTime:"11:45",endTime:"12:30",title:"Vibro acoustic massage 1:1 2nd slot",isExtravaganza:!0,eventLocations:[U.wellnessRoom]}),r.createElement(z,{dayStr:"2024-05-26",startTime:"12:00",endTime:"16:30",title:"Hackathon Project Judging",eventLocations:[U.mckinsey]}),r.createElement(z,{dayStr:"2024-05-26",startTime:"13:00",endTime:"15:00",title:"Lunch",eventLocations:[U.restaurant]}),r.createElement(z,{dayStr:"2024-05-26",startTime:"14:00",title:"Stage opening",eventLocations:[U.lexis]}),r.createElement(R,{dayStr:"2024-05-26",startTime:"14:05",endTime:"14:35",title:"Talk: Ethevacuations: Crypto in a humanitarian crisis",speakerName:"Kat (EthEvacuations), Joshua Dávila (The Blockchain Socialist)",description:"Kat recently left her crypto job to start Ethevacuations when the ongoing conflict in Gaza began as she learned that crypto was a useful tool to help those suffering under the bombardment. Kat will be interviewed by Joshua Dávila to talk about her experience and the reality of using crypto to help those evacuate from Gaza during one of the most difficult humanitarian crises imaginable. Crypto was made for this and there are important lessons to be had.",photo:w.default,photo2:k.default,eventLocations:[U.lexis]}),r.createElement(R,{dayStr:"2024-05-26",startTime:"14:40",endTime:"15:10",title:"Talk: Information flow control a.k.a. privacy is not the concept your are looking for",speakerName:"Christopher Goes (Anoma)",eventLocations:[U.lexis]}),r.createElement(R,{dayStr:"2024-05-26",startTime:"15:15",endTime:"15:45",title:"Talk: Anarchy, Truth and Justice",description:"We are building systems that resist coercion and promote freedom. We are not the first people in history to try that, so what happened before?\nThis talk will look at some historical attempts to create systems and societies that do not depend on government or institutional power, from the Diggers to the Free Software movement.\nThen we will look at tools and techniques we can use to govern and sustain crypto-economic systems and talk about how to increase their impact and protect them against bribery, cooption and destruction.",speakerName:"Edmund Edgar (RealityETH)",photo:x.default,eventLocations:[U.lexis]}),r.createElement(R,{dayStr:"2024-05-26",startTime:"15:50",endTime:"16:20",title:"Talk: The Silent Strings of Proof of Personhood",description:r.createElement(r.Fragment,null,r.createElement("p",null,"Experiments in Proof of Personhood—where each person has a single, unique identity—have increasingly been touted as a mechanism for tracing information provenance, distributing Universal Basic Income, and facilitating democratic governance over systems of artificial intelligence."),r.createElement("p",null," ","This talk chronicles Idena's experiment in Proof of Personhood from launch in August 2019 to a crisis in May 2022. We show how despite verifying humans, hidden pools rapidly emerged—some cooperative, but most controlled by “puppeteers” who, at best, remunerated participants for periodically proving their uniqueness in exchange for access to their secret keys and controlling their accounts. Instead of fostering an egalitarian network of unique identities, the protocol fractured into hidden subnetworks vying for control over an economic pie with economies of scale trending towards oligopoly, undermining the protocol's security and ambitions for democratic governance (one-person, one-vote) and UBI rewards (one-person, one reward). By giving humans economic incentives to periodically differentiate themselves from bots, the protocol gave more informed, resourceful humans financial incentives to puppeteer less informed humans like bots.")),speakerName:"Puja Ohlhaver (Lawyer & Researcher), Mikhail Nikulin (Idena)",photo:A.default,photo2:L.default,eventLocations:[U.lexis]}),r.createElement(R,{dayStr:"2024-05-26",startTime:"16:25",endTime:"16:55",title:"Talk: The Fight for Privacy",speakerName:"Ameen Soleimani (0xbow)",photo:b.default,eventLocations:[U.lexis]}),r.createElement(z,{dayStr:"2024-05-26",startTime:"16:30",title:"Upper floors close",eventLocations:[]}),r.createElement(R,{dayStr:"2024-05-26",startTime:"17:00",endTime:"17:30",title:"Talk: The Challenge of Decentralised Communication",description:r.createElement(r.Fragment,null,r.createElement("p",null,"Decentralised communication tools are at least 10x harder to build than their mainstream centralised equivalents, and in a world where Discord, Slack, Telegram and WhatsApp have billions of dollars of funding and have created incredibly polished products, it can be hard for decentralised alternatives to compete. However: centralisation lasts until the next Elon, whereas decentralisation can last forever."),r.createElement("p",null,"In this talk, I'll explain the challenges we've hit in building Matrix to compete with the mainstream alternatives, how we're solving them, why it's taken so long, and why it's more important than ever to keep the ideal of decentralised communication alive.")),speakerName:"Matthew Hodgson (Matrix)",photo:N.default,eventLocations:[U.lexis]}),r.createElement(z,{dayStr:"2024-05-26",startTime:"17:30",endTime:"19:00",title:"Closing Ceremony",eventLocations:[U.lexis]}),r.createElement(z,{dayStr:"2024-05-26",startTime:"19:00",endTime:"20:00",title:"Closing aperitif, snacks & mingle with DJ",eventLocations:[U.yard0]}),r.createElement("div",{className:"ml-12"},r.createElement(z,{dayStr:"2024-05-26",startTime:"19:00",endTime:"20:00",title:r.createElement("span",{className:"inline-flex items-center"},"YaNKeY"," ",r.createElement("a",{href:"https://on.soundcloud.com/cEYw4",className:"ml-2 inline-block opacity-70 hover:opacity-100 text-berlin-red hover:text-berlin-red",target:"_blank",rel:"noopener noreferrer"},r.createElement(P.OSW,null))),eventLocations:[U.yard0]})),r.createElement(z,{dayStr:"2024-05-26",startTime:"20:00",title:"End of hackathon, doors close",eventLocations:[]}))))),r.createElement(h.Z,{isOpen:e,handleCloseModal:e=>{e.stopPropagation(),t(!1)},activeMapName:M,activeMap:a,activeRoomClass:o}))}},9184:function(e,t,a){t.Z=a.p+"static/fifthFloor-8d4d588027419cbbf2d27adefdf24d94.png"},228:function(e,t,a){t.Z=a.p+"static/firstFloor-be9e98072542a54b1af3d6b0c55a0d67.png"},8595:function(e,t,a){t.Z=a.p+"static/fourthFloor-9a24ba25d9cda07aeeaa36d0f69a47f2.png"},4787:function(e,t,a){t.Z=a.p+"static/groundFloor-6e95a15afe1ecd4784bd401f60b45cf6.png"},9515:function(e,t,a){t.Z=a.p+"static/secondFloor-b5962086a073150c890aa04414996fe3.png"},6048:function(e,t,a){t.Z=a.p+"static/thirdFloor-90f87766b51f1e5f35e530f632f37bef.png"}}]);
//# sourceMappingURL=component---src-pages-schedule-jsx-457eea8a1ea5f51acd91.js.map