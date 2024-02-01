type Props = {
  name: string;
  title: string;
  quote: string;
  image?: string;
};

const Testimonial = ({ name, title, quote, image }: Props) => {
  return (
    <div
      className="relative p-4 flex-col md:flex md:flex-row border gap-4 overflow-hidden"
      dir="rtl"
    >
      <div className="absolute -bottom-5 -left-5 w-32 h-32 bg-gradient-to-br from-[#FF0000] to-[#FF7878] rounded-full blur-3xl opacity-75"></div>

      <div className="flex-shrink-0 w-full md:w-1/3">
        <img
          src={image}
          alt=""
          className="max-w-full h-full object-center border"
        />
      </div>

      <div className="flex flex-col flex-grow">
        <div className="text-5xl lg:text-7xl bg-gradient-to-r from-[#FF0000] to-[#FF7878] inline-block text-transparent bg-clip-text font-bold">
          ”
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-xl font-semibold">{name}</div>
          <div className="text-lg font-semibold">{title}</div>
          <div className="text-base h-44 overflow-y-scroll pl-4">{quote}</div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
