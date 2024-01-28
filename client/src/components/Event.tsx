type Props = {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  adminRoute?: boolean;
};

const Event = ({
  title,
  description,
  date,
  time,
  location,
  image,
  adminRoute,
}: Props) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-md hover:scale-105 transition duration-500 ease-in-out">
      <img className="w-full h-48 object-cover" src={image} alt={title} />
      <div className="flex flex-col gap-2 p-4">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex items-center">
          <p className="text-gray-700">{location}</p>
        </div>
        <div className="flex items-center">
          <p className="text-gray-700">
            {date} ב {time}
          </p>
        </div>
        {adminRoute && (
          <div className="flex gap-4">
            <button className="w-1/2 btn btn-primary p-2 rounded-md">
              ערוך
            </button>
            <button className="w-1/2 btn btn-secondary p-2 rounded-md">
              מחק
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Event;
