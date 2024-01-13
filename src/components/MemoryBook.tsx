import Testimonial from "@/components/Testimonial";

const MemoryBook = () => {
  return (
    <div className="border-t border-black border-opacity-5">
      <div className="flex flex-col py-8 container mx-auto">
        <div className="title text-center text-3xl font-semibold">
          ספר הזכרונות
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Testimonial
            name="מיכל גבאי"
            title="אמה של שני"
            quote="אנחנו מתגעגעים אלייך כל כך
            הלב שורף, המחשבות לא עוזבות לדקה
            קשה להאמין ובלתי אפשרי לקלוט
            שאת לא פה.
            אוהבים אותך מלאכית שלנו
            תמיד איתנו בלב❤️‍🩹"
            image="https://res.cloudinary.com/dweltcoxk/image/upload/v1705167590/DSC_7045_g2lpgd.jpg"
          />
          <Testimonial
            name="ניצן גבאי"
            title="אחותה של שני"
            quote="אחותי
            אני אוהבת אותך
            אני מתגעגעת אלייך
            מבטיחה לספר לכולם עלייך
            המלאכית הכי מיוחדת בגן עדן👼🏼"
            image="https://res.cloudinary.com/dweltcoxk/image/upload/v1705166541/NI1_1349_lq0yec.jpg"
          />
          <Testimonial
            name="אביאל גבאי"
            title="אחיה של שני"
            quote="להיות אחיך הגדול
            היתה המתנה הכי גדולה שקיבלתי בחיי
            מתגעגע אלייך כל כך 💔"
            image="https://res.cloudinary.com/dweltcoxk/image/upload/v1705166655/NI1_1743_lwzadz.jpg"
          />
        </div>
      </div>
    </div>
  );
};

export default MemoryBook;
