"use strict";(self.webpackChunkethberlin=self.webpackChunkethberlin||[]).push([[96],{1002:function(e,t,a){a.r(t);var n=a(3911),r=a(7294),i=a(3253),o=a.n(i),l=a(4787),s=a(228),c=a(9515),m=(a(6048),a(8595),a(9184)),d=a(7336),h=a(2722),u=a(7650),p=a(3762),f=a(1784),y=a(1606),E=a(1689),b=a(4636),g=a(8009),v=a(9765),T=a(1104),x=a(7222),k=a(7557),S=a(4449),w=a(7361),N=a(5593),L=a(8085),C=a(756),F=a(2488),A=a(4931),D=a(2091),P=a(8908);const W=new Date,I=e=>{let{title:t,eventLocations:a,dayStr:n,endDayStr:i,startTime:o,endTime:l,className:s}=e;const c=new Date(n+"T"+o+":00+02:00"),m=l?new Date(i||n+"T"+l+":00+02:00"):c;return r.createElement("li",{className:(W>m?"text-gray-700":W>c?"font-bold animate-pulse-faster":s)+" list-none text-lg"},r.createElement("span",{className:"fake-bold"},r.createElement("span",{className:"text-berlin-red opacity-50"},"> "),o+(l?"-"+l:"")+" -")," ",t," ",a.map((e=>r.createElement("button",{className:(W>m?"text-gray-700":W>c?"font-bold animate-pulse-faster":"text-berlin-red")+" text-sm",onClick:()=>{e.handler()}},r.createElement("span",{className:"align-middle"},r.createElement("span",{class:"material-symbols-outlined text-sm mr-0.5 ml-1"},"my_location")),r.createElement("span",{className:"underline"},e.name)))))},M=e=>{let{className:t,title:a,eventLocations:n,dayStr:i,endDayStr:l,startTime:s,endTime:c,description:m,speakerName:d,photo:h,photo2:u,photo3:p}=e;const[f,y]=r.useState(!1),E=new Date(i+"T"+s+":00+02:00"),b=c?new Date(l||i+"T"+c+":00+02:00"):E;return r.createElement("div",null,r.createElement(I,{title:a,eventLocations:n,dayStr:i,endDayStr:l,startTime:s,endTime:c,className:t}),r.createElement("div",{className:"ml-8 -mt-2 mb-4 text-sm "+(W>b?"text-gray-700":W>E?"font-bold animate-pulse-faster":"")+" "+t},r.createElement("span",null,r.createElement("span",{className:"text-xs text-berlin-red opacity-50 mr-0.5"},"> "),d),r.createElement("button",{onClick:()=>y(!0),className:"underline "+(W>b?"text-gray-700":"text-gray-500")+" mx-2"},"More Info")),r.createElement(o(),{isOpen:f,style:{overlay:{position:"fixed",top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(255, 255, 255, 0.5)"},content:{zIndex:40,backgroundColor:"rgba(0, 0, 0, 0.9)",margin:"auto"}},overlayClassName:"flex items-center z-40 px-4 md:px-16 lg:px-32 xl:px-48 transition-all duration-200 ease-in-out py-8 max-h-screen",className:"flex flex-col items-center justify-center max-h-full",shouldCloseOnEsc:!0,shouldCloseOnOverlayClick:!0,onRequestClose:e=>{e.stopPropagation(),y(!1)},closeTimeoutMS:500},r.createElement("div",{className:"p-8 font-w95 text-center overflow-y-auto max-w-4xl"},r.createElement("div",{className:"flex justify-end"},r.createElement("button",{className:"text-4xl text-berlin-red",onClick:()=>y(!1)},"X")),r.createElement("div",{className:"flex flex-row justify-center p-4 flex-wrap"},h&&r.createElement("img",{src:h,className:"h-32 md:h-64 self-center mx-4 my-4"}),u&&r.createElement("img",{src:u,className:"h-32 md:h-64 self-center mx-4 my-4"}),p&&r.createElement("img",{src:p,className:"h-32 md:h-64 self-center mx-4 my-4"})),r.createElement("div",{className:"text-xl md:text-3xl font-bold my-4"},a),r.createElement("div",{className:"text-lg md:text-2xl"},d),r.createElement("div",{className:"mt-8"},m))))};t.default=()=>{const[e,t]=r.useState(!1),[a,i]=r.useState(l.Z),[o,W]=r.useState("lexis"),[R,B]=r.useState("Ground Floor (#0)"),[O,Z]=r.useState(!1),[H,j]=r.useState(!1);let G=r.useRef(null);const J=()=>{i(l.Z),B("Ground Floor (#0)")},K=()=>{i(s.Z),B("First Floor (#1)")},q=()=>{i(c.Z),B("Second Floor (#2)")},z=()=>{i(m.Z),B("Fifth Floor (#5)")},V={lexis:{name:"Lexis",handler:()=>{J(),W("lexis"),t(!0)}},creatorsLab:{name:"Creator's Lab",handler:()=>{J(),W("creators-lab"),t(!0)}},nodeCafe:{name:"Node Cafe",handler:()=>{J(),W("nodeCafe"),t(!0)}},yard0:{name:"Yard 0",handler:()=>{J(),W("yard0"),t(!0)}},yard1:{name:"Yard 1",handler:()=>{J(),W("yard1"),t(!0)}},yard2:{name:"Yard 2",handler:()=>{J(),W("yard2"),t(!0)}},mainEnterence:{name:"Main Enterance",handler:()=>{J(),W("main-enterence"),t(!0)}},registration:{name:"Registration",handler:()=>{J(),W("registration"),t(!0)}},restaurant:{name:"Restaurant",handler:()=>{J(),W("restaurant"),t(!0)}},mckinsey:{name:"McKinsey",handler:()=>{K(),W("mckinsey"),t(!0)}},communitySpace1:{name:"First Floor Community Space",handler:()=>{K(),W("community-space-first-floor"),t(!0)}},communitySpace2:{name:"Second Floor Community Space",handler:()=>{q(),W("community-space-second-floor"),t(!0)}},artExhibition:{name:"Art Exhibition",handler:()=>{z(),W("artExhibition"),t(!0)}},xrRoom:{name:"XR Room",handler:()=>{J(),W("xrRoom"),t(!0)}},alice:{name:"Alice",handler:()=>{q(),W("alice"),t(!0)}},persius:{name:"Persius",handler:()=>{z(),W("persius"),t(!0)}},cinema:{name:"Cinema",handler:()=>{z(),W("cinema"),t(!0)}}};return r.useEffect((()=>{const e=new IntersectionObserver((e=>{let[t]=e;return t.intersectionRatio<1?j(!0):j(!1)}),{threshold:[1]});return G.current&&e.observe(G.current),()=>{G.current&&e.unobserve(G.current)}}),[G]),r.createElement(n.Z,null,r.createElement("div",{className:"textbox max-w-xl"},r.createElement("h1",{className:"my-4 underline text-secondary font-ocra"},"<<S<CHEDULE"),r.createElement("div",{className:""},r.createElement("p",{className:"mt-4"},"Welcome to ",r.createElement(d.Z,null),"! If you have the chance, please claim your badge early during the day outside the venue to avoid long queues in the evening."),r.createElement("p",null,"This is a just an OVERVIEW of the schedule. Full schedule will be released."," "),r.createElement("div",{className:"flex items-center justify-center w-full sticky -top-1 py-4 text-center  "+(H?"bg-white":""),ref:G},r.createElement("label",{for:"toogleA",className:"flex items-center cursor-pointer"},r.createElement("div",{className:"mr-3 "},"Hacker Essentials"),r.createElement("div",{className:"relative"},r.createElement("input",{id:"toogleA",type:"checkbox",className:"sr-only",onChange:()=>Z((e=>!e))}),r.createElement("div",{className:"w-10 h-4 "+(O?"bg-red-500":"bg-gray-400")+" rounded-full shadow-inner"}),r.createElement("div",{className:"absolute w-6 h-6 rounded-full shadow -left-1 -top-1 transition "+(O?"translate-x-full bg-red-300":"bg-gray-200")})),r.createElement("div",{className:"ml-3 text-red-300"},"Hacker Extravaganza"))),r.createElement("h2",{className:"text-xl font-bold font-ocra mt-4"},"Friday, May 24"),r.createElement("p",{className:"mt-4"},r.createElement("ul",null,r.createElement(I,{dayStr:"2024-05-24",startTime:"12:00",endTime:"16:00",title:"Pre-registration",eventLocations:[]}),r.createElement(I,{dayStr:"2024-05-24",startTime:"16:00",title:"Registration",eventLocations:[]}),r.createElement(I,{dayStr:"2024-05-24",startTime:"16:00",title:"Doors open",eventLocations:[]}),r.createElement(M,{dayStr:"2024-05-24",startTime:"16:30",endTime:"17:00",title:"Talk: Title TBA",speakerName:"Fatemeh Fannizadeh (Swarm)",photo:k.default,eventLocations:[V.lexis]}),r.createElement(M,{dayStr:"2024-05-24",startTime:"17:00",endTime:"17:30",title:"Talk: Building for Big V Value",speakerName:"Nick Almond (FactoryDAO)",description:"Crypto was meant to be different. This was the technological frontier for a new world, away from the banks, centralised rent seeking and maximally extractive business models. So what happened? This talk lays out some home truths, discusses where we've gone wrong and what we can do to steer the industry into a better direction.",photo:C.default,eventLocations:[V.lexis]}),r.createElement(M,{dayStr:"2024-05-24",startTime:"17:30",endTime:"18:00",title:"Talk: Are there limits to the reach of US Sanctions laws?",description:"The US Treasury's decision to sanction Tornado Cash, including the immutable pool contracts, has set off a wave of criminal and civil litigation. Do these sanctions go too far, can similar sanctions be used to effectively outlaw crypto all together, and how can we fight back?",speakerName:"Peter van Valkenburg (Coin Center)",photo:F.default,eventLocations:[V.lexis]})," ",r.createElement(M,{dayStr:"2024-05-24",startTime:"18:00",endTime:"19:00",title:"Opening Ceremony",speakerName:"TBA",eventLocations:[V.lexis]}),r.createElement(I,{dayStr:"2024-05-24",startTime:"19:00",endTime:"23:59",title:"Hacking begins",className:"font-bold italic",eventLocations:[]}),r.createElement(I,{dayStr:"2024-05-24",startTime:"19:00",endTime:"19:30",title:"Hacker Team Finding Session",eventLocations:[V.lexis]}),r.createElement(I,{dayStr:"2024-05-24",startTime:"19:00",endTime:"21:00",title:"Dinner",eventLocations:[V.lexis]}),O&&r.createElement(I,{dayStr:"2024-05-24",className:"text-berlin-red",startTime:"19:00",endTime:"23:59",title:"Art Exhibition: Co-Create",eventLocations:[V.artExhibition]}),r.createElement(M,{dayStr:"2024-05-24",startTime:"19:30",endTime:"20:15",title:"Technical Workshop: Build an Ethereum dApp in 40 mins",speakerName:"Austin Griffith (Ethereum Foundation)",photo:u.default,eventLocations:[V.lexis]}),r.createElement(M,{dayStr:"2024-05-24",startTime:"20:15",endTime:"21:00",title:"Technical Workshop: Re-inventing login with Sign-in-with-Ethereum",speakerName:"Pedro Gomes (WalletConnect)",description:r.createElement(r.Fragment,null,r.createElement("div",null,"We will learn how powerful SIWE can be used as a tool for building different use-cases such as identity, attestations, permissions and messaging. For example WalletConnect built this app called Web3Inbox to aggregate notifications for multiple dapps and it’s based on SIWE. Additionally there are other systems where you can use attestations to build roots of trust with SIWE that generate CACAOs (CAIP-74) to build dapps offchain. Finally we are working on Session Keys which also uses SIWE to empower key delegation for transaction signing for Smart Accounts")),photo:b.default,eventLocations:[V.lexis]}),r.createElement(M,{dayStr:"2024-05-24",startTime:"21:00",endTime:"21:45",title:"Technical Workshop: Integrating RPCh in your Dapp to privately connect to RPC endpoints\n",speakerName:"Tino Breddin (HOPR)",description:"TBA",photo:f.default,eventLocations:[V.lexis]}),r.createElement(M,{dayStr:"2024-05-24",startTime:"21:45",endTime:"22:30",title:"Technical Workshop: Secure communications with Waku",speakerName:"Sergei Tikhomirov (Waku)",description:"TBA",photo:p.default,eventLocations:[V.lexis]}),r.createElement(M,{dayStr:"2024-05-24",startTime:"22:30",endTime:"23:15",title:"Technical Workshop: ZK vs TEE: Wat do (as a product builder)?",speakerName:"Odysseas (Phylax Systems), GregTheGreek (ChainSafe)",photo:y.default,photo2:E.default,description:r.createElement(r.Fragment,null,r.createElement("div",null,"This session delves into Trusted Execution Environments (TEEs) and Zero-Knowledge (ZK) for Ethereum product builders with limited technical depth in these areas. We will examine key considerations such as performance, trust assumptions, cost efficiency, and the complexity of integration to determine their suitability for privacy and verifiable computation in applications.")," ",r.createElement("br",null),r.createElement("div",null,"Participants will learn about the security vulnerabilities, scalability potential, and regulatory compliance aspects of each technology. The talk will also highlight the support available through developer ecosystems and the maturity of existing libraries and tools. By the end, attendees will be equipped to make informed decisions on which technology best meets their project's needs and understand the resources available for implementation.")),eventLocations:[V.lexis]}),r.createElement(M,{dayStr:"2024-05-24",startTime:"23:15",endTime:"23:59",title:"Technical Workshop: How to add ZKPs to your app (with Zupass)?",speakerName:"Richard Liu (0xPARC), Ivan Chub (0xPARC)",photo:g.default,photo2:v.default,description:r.createElement(r.Fragment,null,r.createElement("div",null,'No prior circom or ZK experience needed for this workshop, where we\'ll run through a simple example of a sybil-resistant app that requests a "proof of ETHBerlin hacker visa". Hackers may receive a *cryptographic surprise* during this workshop.')),eventLocations:[V.lexis]}),r.createElement(I,{dayStr:"2024-05-24",startTime:"23:59",endDayStr:"2024-05-25",endTime:"01:00",title:"Midnight Snack",eventLocations:[V.restaurant]}))),r.createElement("div",{className:"flex justify-center"},r.createElement("div",{className:"border-b-[1px] mb-8 mt-4 border-berlin-red opacity-40 w-full"})),r.createElement("h2",{className:"text-xl font-bold font-ocra"},"Saturday, May 25th"),r.createElement("p",{className:"mt-4"},"Happy hacking, no distractions!"),r.createElement("p",{className:"mt-4"},r.createElement(I,{dayStr:"2024-05-25",startTime:"00:00",endTime:"23:59",title:"Hacking",className:"font-bold italic",eventLocations:[]}),r.createElement(I,{dayStr:"2024-05-25",startTime:"09:00",endTime:"11:00",title:"Breakfast",eventLocations:[V.restaurant]}),r.createElement(M,{dayStr:"2024-05-25",startTime:"11:00",endTime:"13:00",title:"Project Pitches / Feedback Sessions",description:"Are you stuck, looking for another team member or want feedback on your idea? Join this session to pitch your project on stage or learn more about the projects others are working on!",eventLocations:[V.lexis]}),O&&r.createElement(I,{dayStr:"2024-05-25",startTime:"11:00",endTime:"23:59",className:"text-berlin-red",title:"Art Exhibition: Co-Create",eventLocations:[V.artExhibition]}),O&&r.createElement(M,{dayStr:"2024-05-25",startTime:"12:00",endTime:"13:20",className:"text-berlin-red",title:"Panel - Decentralized Art Organisation",speakerName:"Vincent Trasov, Benny Giang",description:r.createElement(r.Fragment,null,r.createElement("div",null,"Panel - Decentralized Art Organisation: With Vincent Trasov and Benny Giang; Moderated by Stina Gustafsson.")),eventLocations:[V.artExhibition]}),O&&r.createElement(M,{dayStr:"2024-05-25",startTime:"13:30",endTime:"14:50",className:"text-berlin-red",title:"Panel - Art after NFTs",speakerName:"Joan Heemskerk, Billy Rennekamp",description:r.createElement(r.Fragment,null,r.createElement("div",null,"Panel - Art after NFTs: With Joan Heemskerk and Billy Rennekamp; Moderated by María Paula Fernández.")),eventLocations:[V.artExhibition]}),r.createElement(I,{dayStr:"2024-05-25",startTime:"13:00",endTime:"15:00",title:"Lunch",eventLocations:[V.restaurant]}),r.createElement(I,{dayStr:"2024-05-25",startTime:"14:00",endTime:"17:00",title:"Mentoring Expert Office Hours",description:"Check mentor area for detailed schedule!",eventLocations:[V.nodeCafe]}),r.createElement(I,{dayStr:"2024-05-25",startTime:"17:00",endDayStr:"2024-05-26",endTime:"01:00",title:"DJs in Courtyard 1",eventLocations:[V.yard0]}),r.createElement(I,{dayStr:"2024-05-25",startTime:"17:00",endTime:"19:00",title:r.createElement("span",{className:"inline-flex items-center"},"Jommi"," ",r.createElement("a",{href:"https://twitter.com/joakimhi",className:"ml-2 inline-block opacity-70 hover:opacity-100 text-berlin-red hover:text-berlin-red",target:"_blank",rel:"noopener noreferrer"},r.createElement(D.fWC,null))),eventLocations:[V.yard0],className:"ml-12"}),r.createElement(I,{dayStr:"2024-05-25",startTime:"19:00",endTime:"21:00",title:r.createElement("span",{className:"inline-flex items-center"},"Anna"," ",r.createElement("a",{href:"https://soundcloud.com/innermost3000",className:"ml-2 inline-block opacity-70 hover:opacity-100 text-berlin-red hover:text-berlin-red",target:"_blank",rel:"noopener noreferrer"},r.createElement(P.OSW,null)),r.createElement("a",{href:"https://twitter.com/annmehr",className:"ml-2 inline-block opacity-70 hover:opacity-100 text-berlin-red hover:text-berlin-red",target:"_blank",rel:"noopener noreferrer"},r.createElement(D.fWC,null))),eventLocations:[V.yard0],className:"ml-12"}),r.createElement(I,{dayStr:"2024-05-25",startTime:"21:00",endTime:"23:00",title:r.createElement("span",{className:"inline-flex items-center"},"Manu +"," ",r.createElement("a",{href:"https://twitter.com/blockravers",className:"ml-2 inline-flex items-center opacity-70 hover:opacity-100 text-berlin-red hover:text-berlin-red",target:"_blank",rel:"noopener noreferrer"},"@blockravers ",r.createElement(D.fWC,{className:"ml-2"}))),eventLocations:[V.yard0],className:"ml-12"}),r.createElement(I,{dayStr:"2024-05-25",endDayStr:"2024-05-26",startTime:"23:00",endTime:"01:00",title:r.createElement("span",{className:"inline-flex items-center"},"Manuel"," ",r.createElement("a",{href:"https://soundcloud.com/umcharra",className:"ml-2 inline-block opacity-70 hover:opacity-100 text-berlin-red hover:text-berlin-red",target:"_blank",rel:"noopener noreferrer"},r.createElement(P.OSW,null))),eventLocations:[V.yard0],className:"ml-12"}),r.createElement(I,{dayStr:"2024-05-25",startTime:"19:00",endTime:"21:00",title:"Dinner",eventLocations:[V.restaurant]}),r.createElement(I,{dayStr:"2024-05-25",startTime:"23:59",endDayStr:"2024-05-26",endTime:"01:00",title:"Midnight Snack",eventLocations:[V.restaurant]})),r.createElement("div",{className:"flex justify-center"},r.createElement("div",{className:"border-b-[1px] mb-8 mt-4 border-berlin-red opacity-40 w-full"})),r.createElement("h2",{className:"text-xl font-bold font-ocra"},"Sunday, May 26th"),r.createElement("p",{className:"mt-4"},"Don't forget to submit your projects by 11:30 am Berlin time!"),r.createElement("p",{className:"mt-4"},r.createElement("ul",null,r.createElement(I,{dayStr:"2024-05-26",startTime:"00:00",endTime:"11:00",title:"Hacking (Submission deadline at 11:30 am)",className:"font-bold italic",eventLocations:[]}),r.createElement(I,{dayStr:"2024-05-26",startTime:"09:00",endTime:"11:00",title:"Breakfast",eventLocations:[V.restaurant]}),r.createElement(I,{dayStr:"2024-05-26",startTime:"11:30",title:"PROJECT SUBMISSION DEADLINE",className:"font-bold italic",eventLocations:[]}),r.createElement(I,{dayStr:"2024-05-26",startTime:"12:00",endTime:"16:30",title:"Hackathon Project Judging",eventLocations:[V.mckinsey]}),r.createElement(I,{dayStr:"2024-05-26",startTime:"13:00",endTime:"15:00",title:"Lunch",eventLocations:[V.restaurant]}),r.createElement(I,{dayStr:"2024-05-26",startTime:"14:00",title:"Stage opening",eventLocations:[V.lexis]}),r.createElement(M,{dayStr:"2024-05-26",startTime:"14:05",endTime:"14:35",title:"Talk: Ethevacuations: Crypto in a humanitarian crisis",speakerName:"Kat (EthEvacuations), Joshua Dávila (The Blockchain Socialist)",description:"Kat recently left her crypto job to start Ethevacuations when the ongoing conflict in Gaza began as she learned that crypto was a useful tool to help those suffering under the bombardment. Kat will be interviewed by Joshua Dávila to talk about her experience and the reality of using crypto to help those evacuate from Gaza during one of the most difficult humanitarian crises imaginable. Crypto was made for this and there are important lessons to be had.",photo:w.default,photo2:S.default,eventLocations:[V.lexis]}),r.createElement(M,{dayStr:"2024-05-26",startTime:"14:40",endTime:"15:10",title:"Talk: Information flow control a.k.a. privacy is not the concept your are looking for",speakerName:"Christopher Goes (Anoma)",eventLocations:[V.lexis]}),r.createElement(M,{dayStr:"2024-05-26",startTime:"15:15",endTime:"15:45",title:"Talk: Anarchy, Truth and Justice",description:"We are building systems that resist coercion and promote freedom. We are not the first people in history to try that, so what happened before?\nThis talk will look at some historical attempts to create systems and societies that do not depend on government or institutional power, from the Diggers to the Free Software movement.\nThen we will look at tools and techniques we can use to govern and sustain crypto-economic systems and talk about how to increase their impact and protect them against bribery, cooption and destruction.",speakerName:"Edmund Edgar (RealityETH)",photo:x.default,eventLocations:[V.lexis]}),r.createElement(M,{dayStr:"2024-05-26",startTime:"15:50",endTime:"16:20",title:"Talk: The Silent Strings of Proof of Personhood",description:r.createElement(r.Fragment,null,r.createElement("p",null,"Experiments in Proof of Personhood—where each person has a single, unique identity—have increasingly been touted as a mechanism for tracing information provenance, distributing Universal Basic Income, and facilitating democratic governance over systems of artificial intelligence."),r.createElement("p",null," ","This talk chronicles Idena’s experiment in Proof of Personhood from launch in August 2019 to a crisis in May 2022. We show how despite verifying humans, hidden pools rapidly emerged—some cooperative, but most controlled by “puppeteers” who, at best, remunerated participants for periodically proving their uniqueness in exchange for access to their secret keys and controlling their accounts. Instead of fostering an egalitarian network of unique identities, the protocol fractured into hidden subnetworks vying for control over an economic pie with economies of scale trending towards oligopoly, undermining the protocol’s security and ambitions for democratic governance (one-person, one-vote) and UBI rewards (one-person, one reward). By giving humans economic incentives to periodically differentiate themselves from bots, the protocol gave more informed, resourceful humans financial incentives to puppeteer less informed humans like bots.")),speakerName:"Puja Ohlhaver (Lawyer & Researcher), Mikhail Nikulin (Idena)",photo:A.default,photo2:L.default,eventLocations:[V.lexis]}),r.createElement(M,{dayStr:"2024-05-26",startTime:"16:25",endTime:"16:55",title:"Talk: Title TBA",speakerName:"Ameen Soleimani (0xbow)",photo:T.default,eventLocations:[V.lexis]}),r.createElement(M,{dayStr:"2024-05-26",startTime:"17:00",endTime:"17:30",title:"Talk: The Challenge of Decentralised Communication",description:r.createElement(r.Fragment,null,r.createElement("p",null,"Decentralised communication tools are at least 10x harder to build than their mainstream centralised equivalents, and in a world where Discord, Slack, Telegram and WhatsApp have billions of dollars of funding and have created incredibly polished products, it can be hard for decentralised alternatives to compete. However: centralisation lasts until the next Elon, whereas decentralisation can last forever."),r.createElement("p",null,"In this talk, I'll explain the challenges we've hit in building Matrix to compete with the mainstream alternatives, how we're solving them, why it's taken so long, and why it's more important than ever to keep the ideal of decentralised communication alive.")),speakerName:"Matthew Hodgson (Matrix)",photo:N.default,eventLocations:[V.lexis]}),r.createElement(I,{dayStr:"2024-05-26",startTime:"17:30",endTime:"19:00",title:"Closing Ceremony",eventLocations:[V.lexis]}),r.createElement(I,{dayStr:"2024-05-26",startTime:"19:00",endTime:"20:00",title:"Closing aperitif, snacks & mingle with DJ",eventLocations:[V.yard0]}),r.createElement(I,{dayStr:"2024-05-26",startTime:"20:00",title:"End of hackathon, doors close",eventLocations:[]}))))),r.createElement(h.Z,{isOpen:e,handleCloseModal:e=>{e.stopPropagation(),t(!1)},activeMapName:R,activeMap:a,activeRoomClass:o}))}},9184:function(e,t,a){t.Z=a.p+"static/fifthFloor-6dc147d73bcb5502b4843f6ef45c1a81.png"},228:function(e,t,a){t.Z=a.p+"static/firstFloor-40005b3ded32f04558d7184cf1b4db48.png"},8595:function(e,t,a){t.Z=a.p+"static/fourthFloor-a546bb8ae3bd92f2d3cf397a628592e5.png"},4787:function(e,t,a){t.Z=a.p+"static/groundFloor-aa5688aa3d7359340764a0a66270ac8c.png"},9515:function(e,t,a){t.Z=a.p+"static/secondFloor-b5962086a073150c890aa04414996fe3.png"},6048:function(e,t,a){t.Z=a.p+"static/thirdFloor-55d040ac1a61dbe808e42bcdad639ea9.png"}}]);
//# sourceMappingURL=component---src-pages-schedule-jsx-740d8718124b06c90326.js.map