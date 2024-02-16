import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeXmark } from "@fortawesome/free-solid-svg-icons";
import { faVolumeUp } from "@fortawesome/free-solid-svg-icons";

const BackgroundSound = () => {
  const [isVideoPlaying, setVideoPlaying] = useState(false);

  const toggleVideoPlaying = () => {
    setVideoPlaying(!isVideoPlaying);
  };

  return (
    <div className="hidden lg:block">
      {isVideoPlaying && (
        <iframe
          className="w-0 h-0"
          src={`https://www.youtube.com/embed/MnQz0P4F30I?&loop=1&autoplay=${
            isVideoPlaying ? 1 : 0
          }`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;"
          frameBorder="0"
          allowFullScreen
          loading="lazy"
        ></iframe>
      )}

      <FontAwesomeIcon
        icon={!isVideoPlaying ? faVolumeXmark : faVolumeUp}
        onClick={toggleVideoPlaying}
        className="fixed bottom-3 right-6 z-50 text-4xl transition duration-500 ease-in-out cursor-pointer"
      />
    </div>
  );
};

export default BackgroundSound;
