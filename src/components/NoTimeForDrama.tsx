import Lottie from "react-lottie";
import Time from "@/lotties/time.json";

const NoTimeForDrama = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Time,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center pointer-events-none">
      <Lottie options={defaultOptions} height={400} width={400} />
      <h1 className="text-3xl font-bold text-center text-red-500 tracking-widest uppercase animate-bounce">
        No Time For Drama
      </h1>
      <h3 className="text-xl font-bold text-center tracking-widest uppercase animate-bounce">
        Shani Gabay
      </h3>
    </div>
  );
};

export default NoTimeForDrama;
