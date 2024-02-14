import { Timeline } from "primereact/timeline";

const BlackSaturday = () => {
  const events = [
    {
      title: "פסטיבל נובה",
      place: "חניון רעים",
      time: "06:35",
      description: "שעת תחילת מתקפת החמאס והרקטות לאזור עוטף עזה.",
    },
    {
      title: "פסטיבל נובה",
      place: "חניון רעים",
      time: "06:37",
      description:
        "אמא של שני מקבלת הודעה קולית משני. שני מספרת שיש המון טילים והאדמה רועדת. שני, בן וגלי (חברי ילדות של שני) עולים לרכבה של שני ומתחילים לנסוע צפונה, לכיוון הבית, דרך כביש 232.",
    },
    {
      title: "בטוחים במיגונית",
      place: "צומת עלומים",
      time: "07:00",
      description:
        "אמא של שני מתקשרת אליה ושואלת לשלומה. שני מספרת שהיא במיגונית, יחד עם חבריה. מחכים שהצבע האדום יפסק וממשיכים בנסיעה הביתה.",
    },
  ];

  const cardContent = (event) => {
    return (
      <div
        className="p-12 border rounded-lg shadow-lg bg-white flex flex-col gap-4"
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
            value={events}
            marker={customizedMarker}
            align="alternate"
            className="w-full py-8 lg:py-16"
            content={cardContent}
            dir="ltr"
          />
        </div>
        <div className="justify-center lg:hidden">
          <div className="p-8 flex flex-col gap-4" dir="rtl">
            {events.map((event, index) => (
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
