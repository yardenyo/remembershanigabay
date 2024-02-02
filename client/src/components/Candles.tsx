import Lottie from "react-lottie";
import Candle from "@/lotties/candle.json";
import { Link } from "react-router-dom";
import { useGetAllCandlesQuery } from "@/features/candles/candlesApiSlice";
import CreateCandle from "@/components/CreateCandle";

type Props = {
  view: boolean;
};

const Candles = ({ view = false }: Props) => {
  const payload = {
    sortBy: "createdAt",
    sortOrder: 0,
    resultsPerPage: !view ? 3 : 5,
  };
  const { data: response, refetch } = useGetAllCandlesQuery(payload);
  const candles = response?.data || [];

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
          {candles.map(
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
                <div className="pointer-events-none lg:hidden">
                  <Lottie options={defaultOptions} height={100} width={100} />
                </div>
                <div className="flex flex-col justify-start p-4 gap-2 lg:gap-0">
                  <div className="text-2xl font-semibold">{candle.name}</div>
                  <div className="text-xl font-semibold text-red-500">
                    {formattedDate(candle.createdAt)}
                  </div>
                  <div className="text-lg font-semibold overflow-y-scroll max-h-20">
                    {candle.text}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
        {!view && (
          <div className="flex justify-center px-8">
            <button className="btn btn-primary w-full lg:w-auto">
              <Link to="/memorial-candles">הדלקת נר</Link>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Candles;
