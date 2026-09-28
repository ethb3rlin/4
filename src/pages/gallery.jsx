import Layout from "../components/Layout";
import React, { useEffect, useState } from "react";
import SEO from "../components/seo";
import { Gallery } from "react-grid-gallery";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

// A thumbnail is a button named after its photo (design review, issue 28).
// The tile's own click handler opens the lightbox, so a click or a key press
// on the button reaches it.
const Thumbnail = ({ imageProps: { src, style }, item }) => (
  <button
    type="button"
    aria-label={item.label}
    className="block focus-visible:outline-offset-[-4px]"
  >
    <img src={src} style={style} alt="" loading="lazy" />
  </button>
);

///////////////////////
//// MAIN COMPONENT ///
///////////////////////

const Photos = () => {
  const [index, setIndex] = useState(-1);
  const [images, setImages] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/department-of-decentralization/ethberlin-4-photos/main/images.json"
        );
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error("Error fetching images:", error);
        setFailed(true);
      }
    };

    fetchImages();
  }, []);

  const handleClick = (index, item) => setIndex(index);

  const count = images ? images.length : 0;
  const thumbswithSrc = (images || []).map((image, i) => {
    return {
      ...image,
      src: `https://raw.githubusercontent.com/Department-of-Decentralization/ethberlin-4-photos/main/images/thumbnails/${image.name}`,
      label: `Photo ${i + 1} of ${count} by Anton Tal, open full size`,
    };
  });

  const imagesWithSrc = (images || []).map((image, i) => {
    return {
      src: `https://raw.githubusercontent.com/Department-of-Decentralization/ethberlin-4-photos/main/images/${image.name}`,
      alt: `Photo ${i + 1} of ${count} by Anton Tal`,
    };
  });

  return (
    <Layout>
      <div className="textbox">
        <h1 className="mb-4 font-ocra text-berlin-red">&lt;&lt;G&lt;ALLERY</h1>
        <p>
          Photos of the event were provided by{" "}
          <a href="https://www.antontal.com/" target="_blank" rel="noreferrer">
            Anton Tal
          </a>
          , licensed{" "}
          <a
            href="https://creativecommons.org/licenses/by-sa/4.0/"
            target="_blank"
            rel="noreferrer"
          >
            CC BY-SA 4.0
          </a>
          . Please consider leaving Anton a donation: <code>antontal.eth</code>
        </p>

        {/* Loading, a failure with a way to the photos (issue 29), or the grid. */}
        {!images && !failed && (
          <p className="font-ocra text-sm">Loading photos…</p>
        )}
        {failed && (
          <p role="alert" className="font-ocra text-sm">
            The photo list could not be loaded.{" "}
            <a href="https://github.com/department-of-decentralization/ethberlin-4-photos">
              Browse the photos on GitHub
            </a>
            .
          </p>
        )}
        {images && (
          <div>
            <Gallery
              images={thumbswithSrc}
              onClick={handleClick}
              enableImageSelection={false}
              rowHeight={240}
              margin={4}
              thumbnailImageComponent={Thumbnail}
            />
          </div>
        )}
      </div>
      <Lightbox
        slides={imagesWithSrc}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        animation={{ fade: 330, swipe: 250 }}
        carousel={{
          finite: false,
          preload: 1,
          padding: "16px",
          spacing: "30%",
          imageFit: "contain",
        }}
        plugins={[Zoom]}
        zoom={{
          maxZoomPixelRatio: 1,
          zoomInMultiplier: 2,
          doubleTapDelay: 300,
          doubleClickDelay: 500,
          doubleClickMaxStops: 2,
          keyboardMoveDistance: 50,
          wheelZoomDistanceFactor: 150,
          pinchZoomDistanceFactor: 150,
          scrollToZoom: false,
        }}
      />
    </Layout>
  );
};

export const Head = () => <SEO title="Gallery · ETHBerlin04" />;

export default Photos;
