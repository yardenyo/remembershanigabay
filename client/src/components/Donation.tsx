import { Link } from "react-router-dom";

const Donation = () => {
  return (
    <section>
      <div className="flex flex-col py-8 container mx-auto" id="donate">
        <div className="title text-center text-3xl font-semibold">
          תרומה לעמותה
        </div>
        <div className="title-underline" />
        <div className="w-full flex flex-col-reverse lg:flex-row justify-center items-center p-8 gap-4">
          <div className="xl:w-3/4 w-full flex justify-center items-center">
            <div className="w-full space-y-4">
              <div className="text-2xl font-semibold text-red-500 text-center lg:text-right">
                עזרו לנו להנציח את שני גבאי ז"ל
              </div>
              <div className="flex flex-col gap-8 text-center lg:text-right">
                <div className="wrapper font-semibold xl:text-2xl text-lg">
                  <div>
                    עמותת "חוט השני" מקיימת פעילות חינוכית וחברתית בזיכרון שני
                    גבאי ז"ל.
                  </div>
                  <div>
                    תרומתכם תאפשר לנו להמשיך ולהפיץ את המסר של שני ולהנציח אותו.
                  </div>
                </div>
                <div className="wrapper flex gap-4">
                  <button className="btn btn-primary">
                    <Link
                      to="https://www.paypal.com/paypalme/RememberShaniGabay"
                      target="_blank"
                    >
                      תרומה ב-PayPal
                    </Link>
                  </button>
                  <button className="btn btn-secondary">
                    <Link
                      to="https://payboxapp.page.link/URaKqFphJ3bV4HHv6"
                      target="_blank"
                    >
                      תרומה ב-PayBox
                    </Link>
                  </button>
                </div>
                <div className="wrapper">
                  <div className="font-semibold">העברה בנקאית:</div>
                  <div>בנק לאומי סניף 912</div>
                  <div>מספר חשבון: 377100/73</div>
                  <div>
                    עמותת חוט השני הינה עמותה רשומה מס' 580409191, תרומה ל"חוט
                    השני" מקנה זיכוי מס על פי סעיף 46 (א) לפקודת מס הכנסה.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center lg:justify-end items-center">
            <div className="xl:w-3/4 w-full flex justify-center items-center border border-black border-opacity-5">
              <img
                src="https://res.cloudinary.com/dweltcoxk/image/upload/v1707153749/%D7%AA%D7%9E%D7%95%D7%A0%D7%94_%D7%A9%D7%9C_WhatsApp__2024-02-04_%D7%91%D7%A9%D7%A2%D7%94_20.33.24_9815fe6f_inme2o.jpg"
                alt="donation"
                className="p-4 hover:scale-105 transition duration-500 ease-in-out"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Donation;
