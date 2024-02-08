import { useState, useEffect } from "react";
import { Tooltip } from "primereact/tooltip";

const BackgroundSound = () => {
  const [isDivVisible, setDivVisible] = useState(true);

  const toggleDivVisibility = () => {
    setDivVisible(!isDivVisible);
  };

  useEffect(() => {
    const youtubeIcon = document.querySelector(".pi-youtube");
    if (youtubeIcon) {
      youtubeIcon.dispatchEvent(new Event("mouseenter"));
    }
  }, []);

  return (
    <div>
      <div
        className={
          isDivVisible
            ? "fixed bottom-14 right-5 z-50 border border-black border-opacity-10 p-4"
            : "hidden"
        }
      >
        <iframe
          className="w-full lg:w-[550px] h-full lg:h-[300px]"
          src="https://www.youtube.com/embed/MnQz0P4F30I?autoplay=1&mute=1&loop=1"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;"
          frameBorder="0"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>

      <i
        onClick={toggleDivVisibility}
        className={`pi pi-youtube fixed bottom-2 right-5 z-50 text-5xl ${
          isDivVisible ? "text-red-500 hover:text-red-600" : "text-black"
        } transition duration-500 ease-in-out cursor-pointer`}
      ></i>
      <Tooltip
        target=".pi-youtube"
        position="left"
        content={isDivVisible ? "לחץ כדי להסתיר" : "לחץ כדי להציג"}
      />
    </div>
  );
};

export default BackgroundSound;
