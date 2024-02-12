type Props = {
  mediaItems: { type: string; title: string; url: string }[];
  toggleDialog: (mediaItem: string, title: string, isOpen: boolean) => void;
};

const MediaGallery = ({ mediaItems, toggleDialog }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
      {mediaItems.map((mediaItem, index) => (
        <div key={index} className="flex justify-center">
          <img
            src={mediaItem.url}
            alt=""
            className="cursor-pointer hover:scale-105 transition duration-500 ease-in-out w-full h-[300px] object-cover"
            onClick={() => toggleDialog(mediaItem.url, mediaItem.title, true)}
          />
        </div>
      ))}
    </div>
  );
};

export default MediaGallery;
