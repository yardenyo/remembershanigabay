const Story = () => {
  return (
    <section>
      <div className="flex flex-col py-8 container mx-auto">
        <div className="title text-center text-3xl font-semibold">
          <span className="text-red-500">שני</span> גבאי
        </div>
        <div className="title-underline" />
        <div className="w-full flex flex-col-reverse lg:flex-row justify-center items-center p-8 gap-4">
          <div className="xl:w-3/4 w-full flex justify-center items-center">
            <div className="w-full space-y-4">
              <div className="xl:text-2xl text-lg">
                שני הייתה ילדה שמחה וחייכנית עם צחוק מתגלגל שכל מטרה שהציבה
                לעצמה בחיים הצליחה להשיג. מעצמאות מגיל קטן ועד סיום תואר במשפטים
                במכללה למנהל בהצטיינות. היא הייתה הילדה הכי מגניבה עלי האדמות,
                כזו שמילאה באור כל מקום שנכנסה אליו ובשנייה הייתה הופכת למרכז
                העניינים גם אם לפני רגע אף אחד לא הכיר אותה. אהבה לטייל בעולם
                ולגלות תרבויות חדשות, אהבה אפילו לטייל לבד ולגלות את עצמה ולהכיר
                חברים חדשים. גלשה והלכה לים בכל הזדמנות שיכלה, שרה מגיל קטן בלי
                הפסקה, תרמה המון לאיכות הסביבה ולמציאת אומנה ואימוץ לכלבים,
                גידלה את אלפא הכלב שאהבה כמו ילד קטן ובעיקר נהנתה וניצלה כל רגע
                בחיים, מסתם לשבת בבית ולשתות כוס יין מול סדרה בטלוויזיה, לערבי
                מוזיקה ושירה עם חברים ועד למסיבות ופסטיבלים כל סוף שבוע שני. לא
                סתם הסלוגן שלה בחיים היה – "No Time For Drama". היא באמת חיה בלי
                לחשוב על המחר, אלא רק להנות מהרגע.
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center lg:justify-end items-center">
            <div className="xl:w-3/4 w-full flex justify-center items-center border border-black border-opacity-5">
              <img
                src="https://res.cloudinary.com/dweltcoxk/image/upload/v1705159244/IMG_20180222_093118_405_aubfet.jpg"
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

export default Story;
