import { Timeline } from "primereact/timeline";
import BlackSaturdayEvents from "@/constants/BlackSaturday";

const BlackSaturday = () => {
  const titleContent = (event: {
    title: string;
    place: string;
    time: string;
    description: string;
  }) => {
    return (
      <div className="flex flex-col justify-center items-center m-4" dir="rtl">
        <div className="flex flex-col justify-center items-center h-60 w-full border bg-[#1B1B1B] text-white rounded-md shadow-md">
          <div className="text-2xl font-semibold text-red-500">
            {event.title}
          </div>
          <div className="text-lg">{event.place}</div>
          <div className="text-lg">{event.time}</div>
        </div>
      </div>
    );
  };

  const oppositeContent = (event: {
    title: string;
    place: string;
    time: string;
    description: string;
  }) => {
    return (
      <div className="flex flex-col justify-center m-4" dir="rtl">
        <div className="px-12 py-4 flex flex-col justify-center h-60">
          <div className="text-xl">{event.description}</div>
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
        <div className="flex justify-center text-xl">07/10/2023</div>
        <div className="hidden xl:flex flex-col-reverse xl:flex-row-reverse justify-center items-center p-8 gap-4">
          <Timeline
            value={BlackSaturdayEvents}
            opposite={oppositeContent}
            marker={customizedMarker}
            className="w-full py-8"
            content={titleContent}
            dir="ltr"
          />
        </div>
        <div className="justify-center xl:hidden">
          <div className="py-8 px-4 flex flex-col gap-4" dir="rtl">
            {BlackSaturdayEvents.map((event, index) => (
              <div key={index}>
                <div
                  key={index}
                  className="border flex flex-col gap-4 p-4 rounded-md shadow-md bg-[#1B1B1B] text-white"
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
                {index !== BlackSaturdayEvents.length - 1 && (
                  <div className="custom-marker p-2 flex justify-center items-center">
                    <i className="pi pi-arrow-down text-red-500" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlackSaturday;
