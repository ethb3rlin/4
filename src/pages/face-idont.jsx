import Layout from "../components/Layout";
import React, { useState, useRef, useEffect } from "react";
import SEO from "../components/seo";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import "../styles/sliders.css";
import { FaUpload } from "react-icons/fa";

// The line colors, each with the name a swatch reads out (issue 50).
const COLORS = [
  ["#FFD200", "Yellow"],
  ["#E65B54", "Red"],
  ["#394DFF", "Blue"],
  ["#23CD76", "Green"],
];

// A step's label, in OCR-A like every label and button here (issue 51).
const STEP = "font-ocra text-[15px] leading-5 mb-2.5";

const FaceRecognition = () => {
  const imgRef = useRef(null);
  const [crop, setCrop] = useState({
    x: 0,
    y: 0,
    unit: "px",
    width: 50,
    height: 50,
  });
  const [image, setImage] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [resultImage, setResultImage] = useState(null);

  const [lineThickness, setLineThickness] = useState(2);
  const [pointSize, setPointSize] = useState(3);
  const [selectedColor, setSelectedColor] = useState("#FFD200"); // New state variable for selected color

  const [errorMessage, setErrorMessage] = useState(""); // New state variable for error messages
  const [isLoading, setIsLoading] = useState(false);
  const [isFaceLoading, setIsFaceLoading] = useState(false);

  // Set imageSrc always when image changes
  useEffect(() => {
    if (!image) {
      setImageSrc(null);
    } else {
      const imageUrl = URL.createObjectURL(image);
      setImageSrc(imageUrl);
    }
  }, [image]);

  // set crop to full image when img loads
  const onImgLoad = ({ target: img }) => {
    const { width, height } = img;
    setCrop((prev) => ({ ...prev, width, height }));
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      if (e.target.files.length > 1) return alert("Only select 1 file");
      setImage(e.target.files[0]);
    } else {
      alert("No file selected");
    }
  };

  const getCroppedImg = () => {
    const htmlImg = imgRef.current;
    const canvas = document.createElement("canvas");
    const scaleX = htmlImg.naturalWidth / htmlImg.width;
    const scaleY = htmlImg.naturalHeight / htmlImg.height;
    canvas.width = crop.width * scaleX;
    canvas.height = crop.height * scaleY;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("No 2d context");
    }

    ctx.drawImage(
      htmlImg,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error("Canvas is empty");
          return;
        }
        blob.name = "croppedImage.jpeg";
        resolve(blob);
      }, "image/jpeg");
    });
  };

  const handleReset = () => {
    setImage(null);
    setResultImage(null);
    setCrop({
      x: 0,
      y: 0,
      unit: "px",
      width: 50,
      height: 50,
    });
    setLineThickness(2);
    setPointSize(3);
    setSelectedColor("#FFD200"); // Reset the color to default
    setErrorMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!crop.width || !crop.height) return; // Ensure crop dimensions are valid

    setErrorMessage(""); // Clear any existing error messages

    const croppedImage = await getCroppedImg();
    const formData = new FormData();
    formData.append("file", croppedImage, "croppedImage.jpeg");

    const params = new URLSearchParams({
      line_thickness: lineThickness,
      point_size: pointSize,
      color: selectedColor, // Add the selected color here
    });
    // const baseUrl = "http://localhost:8080";
    const baseUrl =
      "https://europe-west4-ethberlin-dystopian-faces.cloudfunctions.net/dystopian-faces-test";
    const endpoint = `${baseUrl}/?${params.toString()}`;

    try {
      setIsLoading(true); // Start loading
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });
      setIsLoading(false); // Stop loading

      // Check if the response is not OK (non-2xx HTTP status code)
      if (!response.ok) {
        // Try to parse the response as JSON to get the error message
        let errorMessage = "Error processing the request";
        try {
          const errorResponse = await response.json();
          errorMessage = errorResponse.error || "Unknown error occurred";
          setErrorMessage(errorMessage);
        } catch (jsonError) {
          console.error("Error parsing the error response as JSON:", jsonError);
        }
        return;
      }

      const resultBlob = await response.blob();
      const resultImageUrl = URL.createObjectURL(resultBlob);
      setResultImage(resultImageUrl);
      setErrorMessage(""); // Clear any existing error messages
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage(error.message); // Update the state with the error message
    }
  };

  const handleRandomFace = async () => {
    setIsFaceLoading(true); // Start loading indicator
    try {
      const response = await fetch(
        "https://europe-west4-ethberlin-dystopian-faces.cloudfunctions.net/random-faces"
      );
      if (!response.ok) throw new Error("Failed to fetch a random face");
      const blob = await response.blob();
      setImage(blob);
      setErrorMessage("");
    } catch (error) {
      console.error("Error fetching a random face:", error);
      setErrorMessage(error.message);
    } finally {
      setIsFaceLoading(false);
    }
  };

  // Choose a face, adjust, generate: the steps in their order (issue 49).
  return (
    <Layout>
      <div className="textbox">
        <h1 className="mb-2 font-ocra text-berlin-red">
          &lt;&lt;F&lt;ACE IDON'T
        </h1>
        <p>Generate your ETHBerlin04 profile picture.</p>
        {errorMessage && (
          <p
            role="alert"
            className="text-rose-800 font-bold border border-rose-800 px-3 py-2"
          >
            {errorMessage}
          </p>
        )}
        <div className="grid gap-10 items-start lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-7">
            <section>
              <h2 className={STEP}>1 · CHOOSE A FACE</h2>
              {/* Hidden from view, not from the keyboard: its focus shows on the drop area. */}
              <input
                type="file"
                id="fileInput"
                className="sr-only peer"
                name="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              {!imageSrc ? (
                <label
                  htmlFor="fileInput"
                  className="flex flex-col items-center justify-center gap-2 w-full aspect-square max-h-[360px] border-2 border-dashed border-berlin-red-text bg-gray-200/30 hover:bg-gray-200/70 text-berlin-red-text cursor-pointer font-ocra text-sm peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-black peer-focus-visible:outline-offset-2"
                >
                  <FaUpload aria-hidden="true" className="text-3xl" />
                  UPLOAD A PHOTO
                </label>
              ) : (
                <div className="overflow-hidden relative">
                  <ReactCrop
                    crop={crop}
                    onChange={(newCrop) => setCrop(newCrop)}
                  >
                    <img
                      src={imageSrc}
                      ref={imgRef}
                      onLoad={onImgLoad}
                      alt="Your chosen face"
                      style={{ maxWidth: "100%" }}
                    />
                  </ReactCrop>
                </div>
              )}
              <div className="flex flex-wrap items-center gap-2 mt-2.5">
                <button
                  type="button"
                  onClick={handleRandomFace}
                  className="border border-black px-3 py-2 font-ocra text-sm"
                >
                  {isFaceLoading ? "LOADING…" : "RANDOM FACE"}
                </button>
                <span className="text-xs text-gray-600">
                  Random faces from{" "}
                  <a
                    href="https://thispersondoesnotexist.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    thispersondoesnotexist.com
                  </a>
                </span>
              </div>
            </section>
            <section>
              <h2 className={STEP}>2 · ADJUST</h2>
              <label className="block mb-4">
                Line thickness: {lineThickness}
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={lineThickness}
                  onChange={(e) =>
                    setLineThickness(parseInt(e.target.value, 10))
                  }
                  className="slider block mt-3.5"
                />
              </label>
              <label className="block mb-4">
                Point size: {pointSize}
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={pointSize}
                  onChange={(e) => setPointSize(parseInt(e.target.value, 10))}
                  className="slider block mt-3.5"
                />
              </label>
              <div
                role="group"
                aria-label="Line color"
                className="flex items-center flex-wrap gap-2.5"
              >
                <span>Line color:</span>
                {COLORS.map(([color, name]) => (
                  <button
                    key={color}
                    type="button"
                    aria-label={name}
                    aria-pressed={selectedColor === color}
                    title={name}
                    onClick={() => setSelectedColor(color)}
                    className="w-8 h-8 rounded-full"
                    style={{
                      backgroundColor: color,
                      boxShadow:
                        selectedColor === color
                          ? "0 0 0 3px #fff, 0 0 0 5px #000"
                          : "none",
                    }}
                  />
                ))}
              </div>
            </section>
            <section>
              <h2 className={STEP}>3 · GENERATE</h2>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  disabled={isLoading || !image}
                  className="bg-berlin-red text-black font-ocra text-[15px] leading-5 px-[18px] py-3 disabled:opacity-50"
                >
                  {isLoading ? "GENERATING…" : "GENERATE"}
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="underline px-1 py-2.5"
                >
                  Reset
                </button>
                {!imageSrc && (
                  <span className="text-sm text-gray-600">
                    Choose a face first.
                  </span>
                )}
              </div>
            </section>
          </form>

          <div>
            <h2 className={STEP}>RESULT</h2>
            {resultImage ? (
              <>
                <img src={resultImage} alt="Your generated profile picture" />
                <a
                  href={resultImage}
                  download="resultImage.jpeg"
                  className="inline-block mt-3"
                >
                  Download
                </a>
              </>
            ) : (
              <div className="aspect-square max-h-[360px] border border-black/20 flex items-center justify-center text-gray-600 text-sm">
                The result will appear here
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const Head = () => <SEO title="Face IDon't · ETHBerlin04" />;

export default FaceRecognition;
