import { useState } from "react";
import Impressum from "./Impressum";

function App() {
  const [showImpressum, setShowImpressum] = useState(false);
  return (
    <div className="bg-black text-white font-sans">
      <div className="min-h-screen  flex flex-col text-center">
        {showImpressum ? (
          <Impressum />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center">
            <header className="flex text-[64pt]">
              <div>ETHBerlin<sup>3</sup></div>
            </header>
            <div>
              <div className="mb-4">
                <span className="text-xl">ETHBerlin, to the power of 3.</span>
              </div>
              <div>September 16-18, 2022</div>
              <div>Factory G&ouml;rlitzer Park</div>
            </div>
          </div>
        )}
        <footer className="">
          <div className="mb-2">Department of Decentralization</div>
          <div>
            {" "}
            <a href="https://office.ethberl.in/pad/#/2/pad/view/YY5CtWD3j+15ro-1itD78Pz0v2wd-9vUurTXdUyH7mc/embed/" rel="noreferrer" target ="_blank" className="underline">
              hacker manifesto
            </a>{" "}|{" "}
            <a href="https://matrix.to/#/%23ethberlin:matrix.org" rel="noreferrer" target ="_blank" className="underline">
              matrix space
            </a>{" "}|{" "}
            <a href="mailto:henlo@ethberlin.ooo" rel="noreferrer" target ="_blank" className="underline">
              email us
            </a>{" "}
          </div>
          <button
            onClick={() => setShowImpressum(!showImpressum)}
            className="text-sm text-gray-600"
          >
            Impressum
          </button>
        </footer>
      </div>
    </div>
  );
}

export default App;
