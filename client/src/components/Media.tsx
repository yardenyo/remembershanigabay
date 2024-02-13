import { useEffect } from "react";
import { Link } from "react-router-dom";
import MediaGallery from "@/components/MediaGallery";
import { useGetAllMediaQuery } from "@/features/media/mediaApiSlice";

type Props = {
  view?: boolean;
  rows?: number;
  pageNumber?: number;
  setRecords?: (records: number) => void;
};

const Media = ({ view = false, rows, pageNumber, setRecords }: Props) => {
  const payload = {
    sortBy: "createdAt",
    sortOrder: 0,
    resultsPerPage: !view ? 9 : rows || 9,
    page: pageNumber || 1,
  };

  const { data: response, isLoading } = useGetAllMediaQuery(payload);
  const mediaItems = response?.data?.media || [];

  useEffect(() => {
    if (response) {
      setRecords && setRecords(response?.data?.count);
    }
  }, [response, setRecords]);

  return (
    <section>
      <div className="py-8 container mx-auto">
        <div className="text-center text-3xl font-semibold mb-4">מדיה</div>
        <div className="title-underline" />
        <MediaGallery isLoading={isLoading} mediaItems={mediaItems} />
        {!view && (
          <div className="flex justify-center px-8">
            <button className="btn btn-primary">
              <Link to="/media">כל המדיה</Link>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Media;
