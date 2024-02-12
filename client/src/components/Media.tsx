import { useState } from "react";
import { Link } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import mediaItems from "@/constants/Media";
import MediaGallery from "@/components/MediaGallery";

type Props = {
  view?: boolean;
  rows?: number;
  pageNumber?: number;
  setRecords?: (records: number) => void;
};

const Media = ({ view = false, rows, pageNumber, setRecords }: Props) => {
  const payload = {
    sortBy: "createdAt",
    sortOrder: 1,
    resultsPerPage: !view ? 9 : rows || 9,
    page: pageNumber || 1,
  };

  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );
  const [selectedTitle, setSelectedTitle] = useState<string | undefined>(
    undefined
  );
  const [visible, setVisible] = useState<boolean>(false);

  const toggleDialog = (
    image: string | undefined = undefined,
    title: string | undefined = undefined,
    visibility: boolean
  ) => {
    setSelectedImage(image);
    setSelectedTitle(title);
    setVisible(visibility);
  };

  const headerElement = (
    <div className="text-lg lg:text-xl">{selectedTitle}</div>
  );

  return (
    <section>
      <div className="py-8 container mx-auto">
        <div className="text-center text-3xl font-semibold mb-4">מדיה</div>
        <div className="title-underline" />
        <MediaGallery mediaItems={mediaItems} toggleDialog={toggleDialog} />
        {!view && (
          <div className="flex justify-center px-8">
            <button className="btn btn-primary">
              <Link to="/media">כל המדיה</Link>
            </button>
          </div>
        )}
        <Dialog
          header={headerElement}
          visible={visible}
          blockScroll
          draggable={false}
          onHide={() => {
            toggleDialog(undefined, undefined, false);
          }}
        >
          <img
            src={selectedImage}
            alt=""
            className="w-full h-auto max-h-[80vh]"
          />
        </Dialog>
      </div>
    </section>
  );
};

export default Media;
