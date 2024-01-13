type Props = {
  name: string;
  title: string;
  quote: string;
  image?: string;
};

const Testimonial = ({ name, title, quote, image }: Props) => {
  return (
    <div className="relative p-4 flex border gap-4 h-[350px] overflow-hidden hover:scale-105 transition duration-500 ease-in-out">
      <div className="absolute -bottom-5 -left-5 w-32 h-32 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-full blur-3xl opacity-75"></div>

      <div className="w-1/2">
        <img
          src={image}
          alt=""
          className="w-full h-full object-cover border rounded-lg"
        />
      </div>

      <div className="relative w-1/2 flex flex-col justify-center">
        <div className="absolute top-0 text-5xl lg:text-7xl bg-gradient-to-r from-violet-500 to-fuchsia-500 inline-block text-transparent bg-clip-text font-bold">
          ”
        </div>

        <div className="flex flex-col mt-4">
          <div className="text-xl font-semibold">{name}</div>
          <div className="text-lg font-semibold">{title}</div>
          <div className="text-base">{quote}</div>
          <button className="btn btn-primary mt-4 w-1/2">קראו עוד</button>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
