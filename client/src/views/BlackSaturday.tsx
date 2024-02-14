import { Timeline } from "primereact/timeline";
import BlackSaturdayEvents from "@/constants/BlackSaturday";

const BlackSaturday = () => {
  const cardContent = (event: {
    title: string;
    place: string;
    time: string;
    description: string;
  }) => {
    return (
      <div
        className="p-8 border rounded-lg shadow-lg bg-white flex flex-col gap-4"
        dir="rtl"
      >
        <div className="wrapper">
          <div className="text-2xl font-semibold text-red-500">
            {event.title}
          </div>
          <div className="text-lg">{event.place}</div>
        </div>
        <div className="wrapper">
          <div className="text-lg">{event.time}</div>
          <div className="text-lg">{event.description}</div>
        </div>
      </div>
    );
  };

  const customizedMarker = () => {
    return (
      <div className="custom-marker p-2">
        <i className="pi pi-circle-on text-red-500" />
      </div>
    );
  };
  return (
    <section>
      <div className="flex flex-col py-8 container mx-auto">
        <div className="title text-center text-3xl font-semibold">
          השבת השחורה
        </div>
        <div className="title-underline" />
        <div className="hidden lg:flex flex-col-reverse lg:flex-row-reverse justify-center items-center p-8 gap-4">
          <Timeline
            value={BlackSaturdayEvents}
            marker={customizedMarker}
            align="alternate"
            className="w-full py-8"
            content={cardContent}
            dir="ltr"
          />
        </div>
        <div className="justify-center lg:hidden">
          <div className="p-8 flex flex-col gap-4" dir="rtl">
            {BlackSaturdayEvents.map((event, index) => (
              <div
                key={index}
                className="border rounded-lg shadow-lg bg-white flex flex-col gap-4 p-4"
              >
                <div className="wrapper">
                  <div className="text-2xl font-semibold text-red-500">
                    {event.title}
                  </div>
                  <div className="text-lg">{event.place}</div>
                </div>
                <div className="wrapper">
                  <div className="text-lg">{event.time}</div>
                  <div className="text-lg">{event.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlackSaturday;
