import { Link } from "react-router-dom";

const Organization = () => {
  return (
    <section>
      <div className="flex flex-col py-8 container mx-auto">
        <div className="title text-center text-3xl font-semibold">
          חוט ה<span className="text-red-500">שני</span>
        </div>
        <div className="title-underline" />
        <div className="w-full flex flex-col-reverse lg:flex-row-reverse justify-center items-center p-8 gap-4">
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
                <button className="btn btn-primary">
                  <Link to="/story">עוד על הפרוייקט</Link>
                </button>
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
      </div>
    </section>
  );
};

export default Organization;
