import { useState } from "react";

const Media = () => {
  const mediaItems = [
    "https://res.cloudinary.com/dweltcoxk/image/upload/v1702895279/FB_IMG_1550732452057_gx445b.jpg",
    "https://res.cloudinary.com/dweltcoxk/image/upload/v1702223978/build_uessvo.webp",
    "https://res.cloudinary.com/dweltcoxk/image/upload/v1703343937/kever_cjrtln.png",
    "https://res.cloudinary.com/dweltcoxk/image/upload/v1703343937/kever_cjrtln.png",
    "https://res.cloudinary.com/dweltcoxk/image/upload/v1703343937/kever_cjrtln.png",
    "https://res.cloudinary.com/dweltcoxk/image/upload/v1703343937/kever_cjrtln.png",
    "https://res.cloudinary.com/dweltcoxk/image/upload/v1703343937/kever_cjrtln.png",
    "https://res.cloudinary.com/dweltcoxk/image/upload/v1703343937/kever_cjrtln.png",
    "https://res.cloudinary.com/dweltcoxk/image/upload/v1703343937/kever_cjrtln.png",
  ];

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="border-t border-black border-opacity-20">
      <div className="py-8 container mx-auto">
        <div className="text-center text-3xl font-semibold mb-4">מדיה</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
          {mediaItems.map((mediaItem, index) => (
            <div key={index} className="flex justify-center">
              <img
                src={mediaItem}
                alt=""
                className="cursor-pointer hover:scale-105 transition duration-500 ease-in-out"
                onClick={() => openModal(mediaItem)}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <button className="btn btn-primary">כל המדיה</button>
        </div>
        {selectedImage && (
          <div
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center"
            onClick={closeModal}
          >
            <div
              className="max-w-3xl w-full p-4 bg-white rounded-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selectedImage} alt="" className="w-full h-auto" />
              <button
                className="absolute top-4 right-4 text-white text-xl"
                onClick={closeModal}
              >
                סגור
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Media;
