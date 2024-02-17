import { Link } from "react-router-dom";
import { Carousel } from "primereact/carousel";

const Necklace = () => {
  const images = [
    "https://res.cloudinary.com/dweltcoxk/image/upload/v1705772002/9_c5kil6.webp",
    "https://res.cloudinary.com/dweltcoxk/image/upload/v1705772002/6_cpoq03.webp",
    "https://res.cloudinary.com/dweltcoxk/image/upload/v1705772002/4_vbdcoi.webp",
    "https://res.cloudinary.com/dweltcoxk/image/upload/v1705772001/8_wkwjqg.webp",
    "https://res.cloudinary.com/dweltcoxk/image/upload/v1705772001/2_dnzrfo.webp",
    "https://res.cloudinary.com/dweltcoxk/image/upload/v1705772001/1_ejomyw.webp",
    "https://res.cloudinary.com/dweltcoxk/image/upload/v1705772001/5_u8hk6h.webp",
  ];

  return (
    <section id="necklace">
      <div className="flex flex-col py-8 container mx-auto">
        <div className="title text-center text-3xl font-semibold">
          שרשרת <span className="text-red-500">שני</span>
        </div>
        <div className="title-underline" />
        <div className="w-full flex flex-col-reverse lg:flex-row-reverse justify-center items-center p-8 gap-4">
          <div className="xl:w-3/4 w-full flex justify-center items-center">
            <div className="w-full space-y-4">
              <div className="xl:text-2xl text-lg flex flex-col">
                <div className="font-semibold">
                  נועה (צורפת במקצועה), אחת החברות הכי טובות של שני, יצאה במיזם
                  "שרשרת שני" להנצחתה.
                </div>
                <div>
                  באותה שבת שחורה, שני ענדה את השרשרת שקנתה מחברתה נועה עד הרגע
                  האחרון, ובלעדיי השרשרת, היינו יכולים לחיות בחוסר ודאות עד עצם
                  היום הזה.
                </div>
                <div className="font-semibold text-red-500">
                  כל ההכנסות מרכישת השרשרת ילכו למיזמי הנצחה לזכרה.
                </div>
                <div>
                  השרשרת עשויה כסף 925/ ציפוי זהב 14K ומגיעה באורך 45 סמ + תוספת
                  5 סמ הארכה.
                </div>
                <div>עמידה במים ומגיעה עם אחריות לשנה.</div>
              </div>
              <div>
                <Link
                  to="https://nuni-jewelry.co.il/products/shani?variant=47513922634049"
                  target="_blank"
                >
                  <button className="btn btn-primary">לרכישה</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center lg:justify-start items-center">
            <div className="xl:w-3/4 w-full flex justify-center items-center border border-black border-opacity-5">
              <Carousel
                value={images}
                numScroll={1}
                numVisible={2}
                circular
                className="mt-8"
                itemTemplate={(image) => (
                  <img src={image} alt="" className="w-full p-2" />
                )}
                dir="ltr"
              ></Carousel>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Necklace;
