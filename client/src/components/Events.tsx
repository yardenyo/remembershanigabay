import Event from "@/components/Event";
import { Link } from "react-router-dom";
import { useGetAllEventsQuery } from "@/features/events/eventsApiSlice";
import { IEvent } from "@/types/events";

const Events = () => {
  const payload = {
    sortBy: "date",
    sortOrder: 0,
    resultsPerPage: 3,
  };
  const { data: response } = useGetAllEventsQuery(payload);
  const EventsList = response?.data || [];
  return (
    <section>
      <div className="flex flex-col py-8 container mx-auto">
        <div className="title text-center text-3xl font-semibold">
          אירועים קרובים
        </div>
        <div className="title-underline" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-8 gap-8">
          {EventsList.slice()
            .reverse()
            .map((event: IEvent) => (
              <Event key={event._id} {...event} />
            ))}
        </div>
        <div className="flex justify-center px-8">
          <button className="btn btn-primary w-full lg:w-auto">
            <Link to="/events">כל האירועים</Link>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Events;
