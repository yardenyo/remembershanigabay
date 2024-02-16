import { Link } from "react-router-dom";

type Props = {
  view?: boolean;
};

const Organization = ({ view = false }: Props) => {
  const organizationActions = [
    {
      title: "הקמת פינות זכרון",
      description: "במקומות ששני אהבה בעמק יזרעאל, עמק השלום ובגליל התחתון",
    },
    {
      title: "שיפוץ גינת כלבים ביקנעם",
      description: "במקום ששני אהבה ללכת עם אלפא הכלב שלה",
    },
    {
      title: "תמיכה בעמותות להצלת בעלי חיים",
      description: "כולל רכישת אוכל וציוד לבעלי חיים",
    },
    {
      title: "חלוקת מאפרות ניידות בחופים ובשמורות הטבע",
      description: "למען שמירה על איכות הסביבה והטבע",
    },
    {
      title: "ימי התנדבות מאורגנים לניקיון חופים",
      description: "בשיתוף עם רשות הטבע והגנים",
    },
  ];
  return (
    <section>
      <div className="flex flex-col py-8 container mx-auto">
        <div className="title text-center text-3xl font-semibold">
          חוט ה<span className="text-red-500">שני</span>
        </div>
        <div className="title-underline" />
        <div className="w-full flex flex-col-reverse lg:flex-row-reverse justify-center items-center px-8 py-16 gap-4">
          <div className="xl:w-3/4 w-full flex justify-center items-center">
            <div className="w-full space-y-4">
              <div className="xl:text-2xl text-lg">
                <span className="text-3xl">”</span>
                <span>
                  כְּחוּט הַשָּׁנִי (גבאי) שִׂפְתֹתַיִךְ וּמִדְבָּרֵיךְ נָאוֶה
                  כְּפֶלַח הָרִמּוֹן רַקָּתֵךְ מִבַּעַד לְצַמָּתֵךְ
                </span>
                <span className="text-3xl">”</span>
              </div>
              <div className="xl:text-2xl text-lg">
                כך נכתב בשיר השירים על ידי שלמה המלך. פירוש המושג – "חוט השני"
                זהו רעיון / קו מנחה המצוי בבסיס יצירה. הקו המנחה של שני לאורך
                חייה היה נתינה ודאגה לאחר, לטבע, לבעלי החיים ולעולם טוב יותר. את
                הקסם שלה, ואת האהבה והאור שפיזרה אפשר היה להרגיש כ-חוט השני בכל
                מקום שאליו הגיעה. העמותה הוקמה במטרה להנציח את שני המלאכית שלנו,
                שהלכה לעולמה בטרם עת בשבת השחורה ב7.10.23, במסיבת "Nova" בחניון
                רעים, ומטרות העמותה הן להנחיל את מורשתה של שני ולייצר שרשרת של
                מעשים טובים לזכרה ולטובת העולם שכל כך אהבה.
              </div>
              <div>
                {!view && (
                  <button className="btn btn-primary">
                    <Link to="/organization">עוד על הפרויקט</Link>
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center lg:justify-start items-center">
            <div className="xl:w-3/4 w-full flex justify-center items-center border border-black border-opacity-5">
              <img
                src="https://res.cloudinary.com/dweltcoxk/image/upload/v1702904393/%D7%AA%D7%9E%D7%95%D7%A0%D7%94_%D7%A9%D7%9C_WhatsApp_2023-12-10_%D7%91%D7%A9%D7%A2%D7%94_18.33.32_575e6838_trpokf.jpg"
                alt="shani"
                className="p-4 hover:scale-105 transition duration-500 ease-in-out"
              />
            </div>
          </div>
        </div>
        {view && (
          <div className="flex flex-col gap-8 p-8">
            <div className="title text-2xl flex justify-center items-center text-center">
              העמותה פועלת להנצחתה ולזכרה בדרכים הבאות
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {organizationActions.map((action, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-center items-center p-4 border border-black border-opacity-5 text-center"
                >
                  <div className="title text-2xl text-red-500">
                    {action.title}
                  </div>
                  <div className="text-center xl:text-2xl text-lg">
                    {action.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Organization;
