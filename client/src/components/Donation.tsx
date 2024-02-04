const Donation = () => {
  return (
    <section>
      <div className="flex flex-col py-8 container mx-auto" id="donate">
        <div className="title text-center text-3xl font-semibold">
          תרומה לעמותה
        </div>
        <div className="title-underline" />
        <div className="flex flex-col gap-4 py-8">
          <div className="flex flex-col justify-start p-4 gap-2 lg:gap-0 text-center lg:text-right">
            <div className="text-2xl font-semibold text-red-500">
              עזרו לנו להנציח את שני גבאי ז"ל
            </div>
            <div className="xl:text-2xl text-lg flex flex-col gap-8">
              <div className="wrapper font-semibold">
                <div>
                  עמותת "חוט השני" מקיימת פעילות חינוכית וחברתית בזיכרון שני
                  גבאי ז"ל.
                </div>
                <div>
                  תרומתכם תאפשר לנו להמשיך ולהפיץ את המסר של שני ולהנציח אותו.
                </div>
              </div>
              <div className="wrapper flex flex-col gap-4">
                <button className="btn btn-primary w-full lg:w-1/5">
                  <a
                    href="https://www.paypal.com/paypalme/RememberShaniGabay"
                    target="_blank"
                  >
                    תרומה ב-PayPal
                  </a>
                </button>
                <button className="btn btn-primary w-full lg:w-1/5">
                  <a
                    href="https://payboxapp.page.link/URaKqFphJ3bV4HHv6"
                    target="_blank"
                  >
                    תרומה ב-PayBox
                  </a>
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
      </div>
    </section>
  );
};

export default Donation;
