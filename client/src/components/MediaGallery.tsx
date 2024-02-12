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
      {!isLoading
        ? mediaItems.map((mediaItem, index) => (
            <div key={index} className="flex justify-center">
              <img
                src={mediaItem.url}
                alt=""
                className="cursor-pointer hover:scale-105 transition duration-500 ease-in-out w-full h-[300px] object-cover"
                onClick={() =>
                  toggleDialog(mediaItem.url, mediaItem.title, true)
                }
              />
            </div>
          ))
        : Array.from({ length: 9 }).map((_, index) => (
            <Skeleton key={index} width="100%" height="300px" />
          ))}
    </div>
  );
};

export default MediaGallery;
