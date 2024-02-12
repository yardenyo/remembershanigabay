import { Skeleton } from "primereact/skeleton";

type Props = {
  isLoading?: boolean;
  mediaItems: { type: string; title: string; url: string }[];
  toggleDialog: (mediaItem: string, title: string, isOpen: boolean) => void;
};

const MediaGallery = ({
  isLoading = true,
  mediaItems,
  toggleDialog,
}: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
      {isLoading ? (
        Array.from({ length: 9 }).map((_, index) => (
          <Skeleton key={index} width="100%" height="300px" />
        ))
      ) : mediaItems.length > 0 ? (
        mediaItems.map((mediaItem, index) => (
          <div key={index} className="flex justify-center">
            {mediaItem.type === "image" ? (
              <img
                src={mediaItem.url}
                alt=""
                className="cursor-pointer hover:scale-105 transition duration-500 ease-in-out w-full h-[300px] object-cover"
                onClick={() =>
                  toggleDialog(mediaItem.url, mediaItem.title, true)
                }
              />
            ) : (
              <div className="relative">
                <video
                  src={mediaItem.url}
                  className="cursor-pointer hover:scale-105 transition duration-500 ease-in-out w-full h-[300px] object-cover"
                  onClick={() =>
                    toggleDialog(mediaItem.url, mediaItem.title, true)
                  }
                />
              </div>
            )}
          </div>
        ))
      ) : (
        <p>אין מדיה.</p>
      )}
    </div>
  );
};

export default MediaGallery;
