import Event from "@/components/HomePage/Event";
import { Link } from "react-router-dom";
import { useGetAllEventsQuery } from "@/features/events/eventsApiSlice";
import { IEvent } from "@/types/events";
import { useEffect } from "react";

type Props = {
  view?: boolean;
  rows?: number;
  pageNumber?: number;
  setRecords?: (value: number) => void;
};

const Events = ({ view, rows, pageNumber, setRecords }: Props) => {
  const payload = {
    sortBy: "date",
    sortOrder: 0,
    resultsPerPage: !view ? 3 : rows || 6,
    page: pageNumber || 1,
    showPastRecords: !view ? false : true,
  };

  const { data: response, isLoading } = useGetAllEventsQuery(payload);
  const EventsList = response?.data?.events || [];

  useEffect(() => {
    if (response) {
      setRecords && setRecords(response?.data?.count);
    }
  }, [response, setRecords]);

  if (isLoading || !EventsList.length) return null;

  return (
    <section>
      <div className="flex flex-col py-8 container mx-auto">
        <div className="title text-center text-3xl font-semibold">
          {view ? "כל האירועים" : "אירועים קרובים"}
        </div>
        <div className="title-underline" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-8 gap-8">
          {!isLoading &&
            EventsList.slice().map((event: IEvent) => (
              <Event key={event._id} {...event} />
            ))}
        </div>
        {!view && (
          <div className="flex justify-center px-8">
            <Link to="/events">
              <button className="btn btn-primary">כל האירועים</button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Events;
