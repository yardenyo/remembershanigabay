import Event from "@/components/Event";
import { Link } from "react-router-dom";

const Events = () => {
  const events = [
    {
      title: "ההלוויה של שני",
      date: "23/11/2023",
      time: "15:00",
      location: "בית העלמין, יקנעם",
      description:
        "בצער רב וביגון קודר אנו מודיעים על הירצחה של שני גבאי הי״ד האהובים עלינו 💔",
      image:
        "https://res.cloudinary.com/dweltcoxk/image/upload/v1706030630/%D7%A6%D7%99%D7%9C%D7%95%D7%9D_%D7%9E%D7%A1%D7%9A_2024-01-23_192329_gtyptf.png",
    },
    {
      title: "אזכרת השלושים",
      date: "21/12/2023",
      time: "15:00",
      location: "בית העלמין, יקנעם",
      description:
        "במלאת 30 יום להירצחם של שני גבאי הי״ד, נעלה לגילוי המצבה ונתאחד לזכרם. כל מי שמעוניין מוזמן להצטרף אלינו 💔👼🏼",
      image:
        "https://res.cloudinary.com/dweltcoxk/image/upload/v1703343937/kever_cjrtln.png",
    },
  ];

  return (
    <div className="flex flex-col py-8 container mx-auto">
      <div className="title text-center text-3xl font-semibold">
        לוח אירועים
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-8 gap-8">
        {events
          .slice()
          .reverse()
          .map((event, index) => (
            <Event key={index} {...event} />
          ))}
      </div>
      <div className="flex justify-center px-8">
        <button className="btn btn-primary w-full lg:w-auto">
          <Link to="/events">כל האירועים</Link>
        </button>
      </div>
    </div>
  );
};

export default Events;
