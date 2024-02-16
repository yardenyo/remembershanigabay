export type TestimonialType = {
  _id: string;
  name: string;
  title: string;
  image: string;
  quote: string;
};

type Props = {
  testimonial: TestimonialType;
  isActive: boolean;
  onClick: () => void;
};

const Testimonial = ({ testimonial, isActive, onClick }: Props) => (
  <div
    className={`flex items-center gap-4 p-4 ${
      isActive
        ? "bg-red-200 shadow-lg rounded-md"
        : "hover:bg-red-50 cursor-pointer rounded-md"
    }`}
    onClick={onClick}
  >
    <div className="w-24 h-24 rounded-full overflow-hidden">
      <img
        src={
          testimonial.image ||
          "https://res.cloudinary.com/dweltcoxk/image/upload/v1699290993/assets/zb3phjr1bvhgns50gird.png"
        }
        alt={testimonial.name}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="w-1/2">
      <div className="font-bold text-xl">{testimonial.name}</div>
      <div className="text-gray-600">{testimonial.title}</div>
    </div>
  </div>
);

export default Testimonial;
