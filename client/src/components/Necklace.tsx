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
                  נועה החברה הכי טובה של שני במיזם "שרשרת שני" -
                </div>
                <div>
                  שני נרצחה כשיצאה לעבוד במסיבת ״הנובה״ בשבת השחורה ב7.10.23.
                </div>
                <div>זו השרשרת שענדה.</div>
                <div className="font-semibold text-red-500">
                  כל ההכנסות מרכישת השרשרת ילכו למיזם הנצחה לזכרה.
                </div>
                <div>
                  השרשרת עשויה כסף 925/ ציפוי זהב 14K ומגיעה באורך 45 סמ + תוספת
                  5 סמ הארכה.
                </div>
                <div>עמידה במים ומגיעה עם אחריות לשנה.</div>
              </div>
              <div>
                <button className="btn btn-primary w-full lg:w-auto">
                  <Link
                    to="https://nuni-jewelry.co.il/products/shani?variant=47513922634049"
                    target="_blank"
                  >
                    לרכישה
                  </Link>
                </button>
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
