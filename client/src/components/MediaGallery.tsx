import { Skeleton } from "primereact/skeleton";
import { Dialog } from "primereact/dialog";
import { useState } from "react";

type Props = {
  isLoading?: boolean;
  mediaItems: { type: string; title: string; url: string }[];
};

const MediaGallery = ({ isLoading = true, mediaItems }: Props) => {
  const [selectedItem, setSelectedItem] = useState<{
    title: string;
    url: string;
    type: string;
  } | null>(null);
  const [visible, setVisible] = useState<boolean>(false);

  const toggleDialog = (
    item: { title: string; url: string; type: string } | null
  ) => {
    setSelectedItem(item);
    setVisible(!!item);
  };

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
                  toggleDialog({
                    title: mediaItem.title,
                    url: mediaItem.url,
                    type: mediaItem.type,
                  })
                }
              />
            ) : mediaItem.type === "video" ? (
              <div className="relative">
                <video
                  src={mediaItem.url}
                  className="cursor-pointer hover:scale-105 transition duration-500 ease-in-out w-full h-[300px] object-cover"
                  onClick={() =>
                    toggleDialog({
                      title: mediaItem.title,
                      url: mediaItem.url,
                      type: mediaItem.type,
                    })
                  }
                />
              </div>
            ) : (
              <p>קובץ לא נתמך</p>
            )}
          </div>
        ))
      ) : (
        <p>אין מדיה.</p>
      )}

      <Dialog
        header={
          selectedItem?.title && (
            <div className="text-lg lg:text-xl">{selectedItem.title}</div>
          )
        }
        visible={visible}
        blockScroll
        draggable={false}
        onHide={() => toggleDialog(null)}
      >
        {selectedItem?.type === "image" ? (
          <img
            src={selectedItem.url}
            alt=""
            className="w-full h-auto max-h-[80vh]"
          />
        ) : selectedItem?.type === "video" ? (
          <video
            src={selectedItem.url}
            controls
            className="w-full h-auto max-h-[80vh]"
          />
        ) : (
          <p>קובץ לא נתמך</p>
        )}
      </Dialog>
    </div>
  );
};

export default MediaGallery;
