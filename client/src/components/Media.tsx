import { useState } from "react";
import { Link } from "react-router-dom";

const Media = () => {
  const mediaItems = [
    "https://res.cloudinary.com/dweltcoxk/image/upload/v1702895279/FB_IMG_1550732452057_gx445b.jpg",
    "https://res.cloudinary.com/dweltcoxk/image/upload/v1702223978/build_uessvo.webp",
    "https://res.cloudinary.com/dweltcoxk/image/upload/v1703343937/kever_cjrtln.png",
    "https://res.cloudinary.com/dweltcoxk/image/upload/v1703348099/1-138_ttv6fj.jpg",
    "https://res.cloudinary.com/dweltcoxk/image/upload/v1703348179/dbabd5ea-7c4b-4750-981f-80effdabdbed_vyztkh.jpg",
    "https://res.cloudinary.com/dweltcoxk/image/upload/v1703348183/DCDA262E-4448-49A5-84AE-70019CBC5E3A_dxdeqx.jpg",
    "https://res.cloudinary.com/dweltcoxk/image/upload/v1703348098/1-021_zntllm.jpg",
    "https://res.cloudinary.com/dweltcoxk/image/upload/v1703348097/OOP_7171_bz6u4p.jpg",
    "https://res.cloudinary.com/dweltcoxk/image/upload/v1703348177/4ab06f59-3e56-4ac0-accc-8f45d10a1a70_buzzqn.jpg",
  ];

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <section>
      <div className="py-8 container mx-auto">
        <div className="text-center text-3xl font-semibold mb-4">מדיה</div>
        <div className="title-underline" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
          {mediaItems.map((mediaItem, index) => (
            <div key={index} className="flex justify-center">
              <img
                src={mediaItem}
                alt=""
                className="cursor-pointer hover:scale-105 transition duration-500 ease-in-out w-full h-[300px] object-cover"
                onClick={() => openModal(mediaItem)}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-center px-8">
          <button className="btn btn-primary">
            <Link to="/media">כל המדיה</Link>
          </button>
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
              <img
                src={selectedImage}
                alt=""
                className="w-full h-auto max-h-[80vh]"
              />
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
    </section>
  );
};

export default Media;
