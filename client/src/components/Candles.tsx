import Lottie from "react-lottie";
import Candle from "@/lotties/candle.json";
import { Link } from "react-router-dom";
import { useGetAllCandlesQuery } from "@/features/candles/candlesApiSlice";

const Candles = () => {
  const payload = {
    sortBy: "createdAt",
    sortOrder: 1,
  };
  const { data: response } = useGetAllCandlesQuery(payload);
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
        <div className="flex flex-col gap-4 py-8">
          {candles.map(
            (candle: { name: string; createdAt: string; text: string }) => (
              <div className="flex gap-4 items-center border-b">
                <div className="pointer-events-none">
                  <Lottie options={defaultOptions} height={200} width={200} />
                </div>
                <div className="flex flex-col justify-start p-4">
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
        <div className="flex justify-center">
          <button className="btn btn-primary">
            <Link to="/memorial-candles">הדלקת נר</Link>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Candles;
