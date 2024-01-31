type Props = {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
};

const Event = ({ title, description, date, time, location, image }: Props) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-md hover:scale-105 transition duration-500 ease-in-out w-full">
      <img
        className="w-full h-72 object-cover"
        src={
          image ||
          "https://res.cloudinary.com/dweltcoxk/image/upload/v1699290993/assets/zb3phjr1bvhgns50gird.png"
        }
        alt={title}
      />
      <div className="flex flex-col gap-2 p-4">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex items-center">
          <p className="text-gray-700 font-bold">{location}</p>
        </div>
        <div className="flex items-center">
          <p className="text-gray-700 font-bold">
            {new Date(date).toLocaleDateString()} בשעה {time}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Event;
