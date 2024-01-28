import Event from "@/components/Event";
import EventsList from "@/constants/Events";
import { Link } from "react-router-dom";

type Props = {
  adminRoute?: boolean;
};

const Events = ({ adminRoute = false }: Props) => {
  return (
    <div className="flex flex-col py-8 container mx-auto">
      {!adminRoute && (
        <div className="title text-center text-3xl font-semibold">
          לוח אירועים
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-8 gap-8">
        {EventsList.slice()
          .reverse()
          .map((event, index) => (
            <Event key={index} {...event} adminRoute />
          ))}
      </div>
      {!adminRoute && (
        <div className="flex justify-center px-8">
          <button className="btn btn-primary w-full lg:w-auto">
            <Link to="/events">כל האירועים</Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default Events;
