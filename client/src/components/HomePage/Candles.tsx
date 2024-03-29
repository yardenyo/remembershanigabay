import Lottie from "react-lottie";
import Candle from "@/lotties/candle.json";
import { Link } from "react-router-dom";
import { useGetAllCandlesQuery } from "@/features/candles/candlesApiSlice";
import CreateCandle from "@/components/HomePage/CreateCandle";
import { useEffect } from "react";
import { Skeleton } from "primereact/skeleton";

type Props = {
  view?: boolean;
  rows?: number;
  pageNumber?: number;
  setRecords?: (records: number) => void;
};

const Candles = ({ view = false, rows, pageNumber, setRecords }: Props) => {
  const payload = {
    sortBy: "createdAt",
    sortOrder: 0,
    resultsPerPage: !view ? 3 : rows || 5,
    page: pageNumber || 1,
  };
  const { data: response, refetch, isLoading } = useGetAllCandlesQuery(payload);
  const candles = response?.data?.candles || [];

  useEffect(() => {
    if (response) {
      setRecords && setRecords(response?.data?.count);
    }
  }, [response, setRecords]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Candle,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const formattedDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <section>
      <div className="flex flex-col py-8 container mx-auto">
        <div className="title text-center text-3xl font-semibold">
          נרות <span className="text-red-500">לשני</span>
        </div>
        <div className="title-underline" />
        {view && <CreateCandle refetch={refetch} />}
        <div className="flex flex-col gap-4 py-8">
          {isLoading ? (
            <Skeleton width="100%" height="200px" className="lg:block" />
          ) : (
            candles.map(
              (
                candle: { name: string; createdAt: string; text: string },
                i: number
              ) => (
                <div
                  className="flex gap-4 lg:items-center border-b border-black/5"
                  key={i}
                >
                  <div className="pointer-events-none hidden lg:block">
                    <Lottie options={defaultOptions} height={200} width={200} />
                  </div>
                  <div className="flex flex-col justify-start p-4 px-8 lg:px-4 gap-2 lg:gap-0">
                    <div className="wrapper flex items-center">
                      <div className="pointer-events-none lg:hidden">
                        <Lottie
                          options={defaultOptions}
                          height={100}
                          width={100}
                        />
                      </div>
                      <div className="wrapper">
                        <div className="text-2xl font-semibold">
                          {candle.name}
                        </div>
                        <div className="text-xl font-semibold text-red-500">
                          {formattedDate(candle.createdAt)}
                        </div>
                      </div>
                    </div>
                    <div className="text-lg font-semibold overflow-y-scroll max-h-20">
                      {candle.text}
                    </div>
                  </div>
                </div>
              )
            )
          )}
        </div>
        {!view && (
          <div className="lg:flex lg:justify-center px-8">
            <Link to="/memorial-candles">
              <button className="btn btn-primary">הדלקת נר</button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Candles;
