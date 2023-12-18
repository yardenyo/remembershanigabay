import { Link } from "react-router-dom";

const Story = () => {
  return (
    <div className="flex flex-col py-8">
      <div className="title text-center text-3xl font-semibold">
        הסיפור של שני
      </div>
      <div className="w-full flex flex-col-reverse xl:flex-row justify-center items-center p-4 gap-4">
        <div className="xl:w-1/2 w-full flex justify-center items-center">
          <div className="2xl:w-3/4 w-full space-y-4">
            <div className="xl:text-2xl text-lg">
              ילדה שמחה וחייכנית עם צחוק מתגלגל שכל מטרה שהציבה לעצמה בחיים
              הצליחה להשיג. מעצמאות מגיל קטן ועד סיום תואר במשפטים במכללה למנהל
              בהצטיינות. שני היתה הילדה הכי מגניבה עלי האדמות, כזו שמילאה באור
              כל מקום שנכנסה אליו ובשניה היתה הופכת למרכז העניינים גם אם לפני
              רגע אף אחד לא הכיר אותה. אהבה לטייל בעולם ולגלות תרבויות חדשות,
              אהבה אפילו לטייל לבד לגלות את עצמה ולהכיר חברים חדשים. גלשה והלכה
              לים בכל הזדמנות שיכלה, שרה מגיל קטן בלי הפסקה, תרמה המון לאיכות
              הסביבה ולמציאת אומנה ואימוץ לכלבים, גידלה את אלפא הכלב שאהבה כמו
              ילד קטן ובעיקר נהנתה וניצלה כל שניה ודקה בחיים, מסתם לשבת בבית
              ולשתות כוס יין מול סדרה בטלוויזיה, לערבי מוזיקה ושירה עם חברים ועד
              למסיבות ופסטיבלים כל סוף שבוע שני.
            </div>
            <div>
              <button className="btn btn-primary w-full xl:w-auto">
                <Link to="/story">הסיפור כולו כאן</Link>
              </button>
            </div>
          </div>
        </div>
        <div className="xl:w-1/2 w-full flex justify-center items-center">
          <div className="xl:w-3/4 w-full flex justify-center items-center border border-black border-opacity-20">
            <img
              src="https://res.cloudinary.com/dweltcoxk/image/upload/v1702904393/%D7%AA%D7%9E%D7%95%D7%A0%D7%94_%D7%A9%D7%9C_WhatsApp_2023-12-10_%D7%91%D7%A9%D7%A2%D7%94_18.33.32_575e6838_trpokf.jpg"
              alt="shani"
              className="p-4 hover:scale-105 transition duration-500 ease-in-out pointer-events-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;
