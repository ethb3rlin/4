import React from "react";
import SEO from "../components/seo";
import Layout from "../components/Layout";

const Impressum = () => {
  return (
    <Layout>
      <div className="textbox max-w-[760px]">
        <h1 className="text-secondary font-ocra">
          CONTACT &amp; &lt;&lt;I&lt;MPRESSUM
        </h1>
        <p className="mt-4 mb-2">
          Thoughts, questions, input or inquiries? We look forward to hearing
          from you!
        </p>
        <ul className="mb-8">
          <li>
            send us an email:{" "}
            <a href="mailto:contact@ethberlin.org">
              contact@ethberlin.org
            </a>{" "}
          </li>
          <li>
            join our{" "}
            <a href="https://matrix.to/#/%23ethberlin:dod.ngo">matrix space</a>
          </li>
        </ul>
        <div lang="de" className="text-sm">
          <h2 className="text-xl font-bold">Impressum</h2>
          <div className="">Angaben gem&auml;&szlig; &sect; 5 TMG</div>
          <div className="mt-4">
            Goerli Dezentral gGmbH, Mariannenstra&szlig;e 9-10, 10999 Berlin
          </div>
          <div className="mt-4">
            Handelsregister: HRB 207663 B, Registergericht: Amtsgericht
            Charlottenburg, Berlin, Umsatzsteuer-ID: DE325917754
          </div>
          <div className="mt-4">
            Vertreten durch A. Schoedon, E-Mail:{" "}
            <a href="mailto:schoedon@ethberlin.org">schoedon@ethberlin.org</a>
          </div>
          <div lang="en" className="mt-4">
            Goerli Dezentral gGmbH is a non-profit organization serving
            tax-privileged purposes, according to the articles of association.
            The organization meets the statutory requirements under &sect;&sect;
            51, 59, 60, and 61 AO.
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const Head = () => <SEO title="Contact & Impressum · ETHBerlin04" />;

export default Impressum;
