import Testimonial from "@/components/Testimonial";
import { Carousel } from "primereact/carousel";
import { useState } from "react";

const MemoryBook = () => {
  const [testimonials] = useState([
    {
      name: "מיכל גבאי",
      title: "אמה של שני",
      quote:
        "שני חיה את החיים בדיוק כפי שחלמה ורצתה. שני חיה לפי הסלוגן הקבוע שלה - 'No time for drama'. זו היתה דרך החיים שלה. לא עניין אותה כמה כסף יש לה בבנק, או מתי צריך ללכת לישון כי קמים מוקדם לעבודה.\n\n" +
        "את שני עניין נטו דבר אחד, להנות בחיים. היא ניצלה כל דקה, טסה לכל מקום שרצתה, יצאה לבלות ללא הפסקה, הלכה לים בכל סופש ועשתה פשוט מה שבא לה.\n\n" +
        "כמה שזה היה נכון, ואיזה מזל שהיא עשתה את זה. תמיד חייה על הקצה, חוותה כל רגע בדיוק כמו שרצתה ולא הגבילה את עצמה בגלל אחרים, כאילו ידעה תמיד שהחיים כל כך קצרים וצריך לנצל כל רגע.\n\n" +
        "בגדול, שני השיגה כל מה שרצתה בחיים. היא חלמה מגיל קטן להיות עורכת דין והשיגה זאת בהצטיינות. חלמה לטוס לפסטיבלים בעולם והיתה בטומורולנד כבר לפני צבא ובעוד מאות מסיבות ופסטיבלים בארץ ובעולם. חלמה לעבור לגור באזור המרכז והספיקה לגור עם שותפות כבר בכמה דירות בתל אביב.",
      image:
        "https://res.cloudinary.com/dweltcoxk/image/upload/v1705167590/DSC_7045_g2lpgd.jpg",
    },
    {
      name: "ניצן גבאי",
      title: "אחותה של שני",
      quote:
        "אחותי\nאני אוהבת אותך\nאני מתגעגעת אלייך\nמבטיחה לספר לכולם עלייך\nהמלאכית הכי מיוחדת בגן עדן👼🏼",
      image:
        "https://res.cloudinary.com/dweltcoxk/image/upload/v1705510185/DSC_6788_Original_b1i2vi.jpg",
    },
    {
      name: "אביאל גבאי",
      title: "אחיה של שני",
      quote:
        "להיות אחיך הגדול\nהיתה המתנה הכי גדולה שקיבלתי בחיי\nמתגעגע אלייך כל כך 💔",
      image:
        "https://res.cloudinary.com/dweltcoxk/image/upload/v1705510330/NI1_1736_qlj4i2.jpg",
    },
  ]);

  return (
    <div className="border-t border-black border-opacity-5">
      <div className="flex flex-col py-8 container mx-auto">
        <div className="title text-center text-3xl font-semibold">
          ספר הזכרונות
        </div>
        <Carousel
          value={testimonials}
          numScroll={1}
          className="mt-8"
          itemTemplate={(testimonial) => (
            <Testimonial
              name={testimonial.name}
              title={testimonial.title}
              quote={testimonial.quote}
              image={testimonial.image}
            />
          )}
          dir="ltr"
        ></Carousel>
      </div>
    </div>
  );
};

export default MemoryBook;
