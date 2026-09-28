import ReactModal from "react-modal";
import React, { useEffect } from "react";

// One floor's map with one room highlighted, in a dialog named after the room.
// The highlight holds still (.venue-map-room in global.css).
const VenueMapModal = ({
  isOpen,
  handleCloseModal,
  activeMapName,
  activeMap,
  activeRoomClass,
  roomName,
}) => {
  // While the dialog is open, react-modal hides the page from assistive tech.
  useEffect(() => {
    ReactModal.setAppElement("#___gatsby");
  }, []);

  return (
    <ReactModal
      isOpen={isOpen}
      aria={{ labelledby: "map-title" }}
      overlayClassName="fixed inset-0 z-40 flex items-center justify-center p-4 bg-[rgba(0,0,0,0.45)]"
      className="relative w-full max-w-[1100px] max-h-full overflow-y-auto bg-white text-black font-bundessans p-6 outline-none"
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      onRequestClose={handleCloseModal}
    >
      <button
        type="button"
        onClick={handleCloseModal}
        aria-label="Close map"
        className="absolute top-3 right-3 w-11 h-11 border border-black bg-white material-symbols-outlined !text-2xl !leading-none"
      >
        close
      </button>
      <p className="font-ocra text-[13px] leading-[18px] mb-1">
        {activeMapName}
      </p>
      <h2 id="map-title" className="text-2xl font-bold mb-4 mr-14">
        {roomName}
      </h2>
      <div className="relative">
        <img src={activeMap} alt={`${activeMapName} map`} />
        <div className={`${activeRoomClass} venue-map-room`} />
      </div>
      <p className="text-sm text-gray-700 mt-3 mb-0">
        The highlighted area marks {roomName}.
      </p>
    </ReactModal>
  );
};

export default VenueMapModal;
