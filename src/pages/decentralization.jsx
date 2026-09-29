import Layout from "../components/Layout";
import React from "react";
import SEO from "../components/seo";

// The Department of Decentralization lives at dod.ngo. This address sends
// visitors there; the link is for a browser that does not follow the refresh.
const decentralization = () => (
  <Layout>
    <div className="textbox max-w-[760px]">
      <h1 className="my-4 text-secondary font-ocra [overflow-wrap:anywhere]">
        DEPARTMENT OF &lt;&lt;D&lt;ECENTRALIZATION
      </h1>
      <p>
        The Department of Decentralization lives at{" "}
        <a href="https://dod.ngo">dod.ngo</a>.
      </p>
    </div>
  </Layout>
);

export const Head = () => (
  <>
    <SEO title="Department of Decentralization · ETHBerlin04" />
    <meta httpEquiv="refresh" content="0; url=https://dod.ngo" />
    <link rel="canonical" href="https://dod.ngo" />
  </>
);

export default decentralization;
