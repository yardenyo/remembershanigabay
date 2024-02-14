const Story = () => {
  const timeLine = [
    {
      year: "1997",
      text: "שני נולדה ב29/11/1997 בבית החולים בני ציון בחיפה",
      image:
        "https://res.cloudinary.com/dweltcoxk/image/upload/v1705159244/IMG_20180222_093118_405_aubfet.jpg",
    },
    {
      year: "2003",
      text: "ניתוח עיניים ראשון להצלת הראייה (הראשונה בארץ)",
      image:
        "https://res.cloudinary.com/dweltcoxk/image/upload/v1705159244/IMG_20180222_093118_405_aubfet.jpg",
    },
    {
      year: "2004",
      text: "שני נכנסת לבית ספר יסודי",
      image:
        "https://res.cloudinary.com/dweltcoxk/image/upload/v1705159244/IMG_20180222_093118_405_aubfet.jpg",
    },
  ];

  return (
    <section>
      <div className="flex flex-col py-8 container mx-auto">
        <div className="title text-center text-3xl font-semibold">
          הסיפור של <span className="text-red-500">שני</span>
        </div>
        <div className="title-underline" />
        <div className="timeline-wrapper flex gap-12 justify-center py-8 lg:py-20">
          <div className="">
            <div className="timeline">
              {timeLine.map((item, index) => {
                return (
                  <div key={index} className="timeline-item">
                    <div className="timeline-item-image h-[500px] flex gap-4 justify-center">
                      {index % 2 === 0 ? (
                        <img
                          src={item.image}
                          alt="shani"
                          className="p-4 hover:scale-105 transition duration-500 ease-in-out"
                        />
                      ) : (
                        <div className="flex flex-col items-end justify-center gap-4 w-full">
                          <h2 className="text-5xl text-red-500">{item.year}</h2>
                          <p className="text-xl text-gray-400">{item.text}</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-[2px] border-r-4 border-red-200"></div>
          <div className="timeline-wrapper flex gap-4">
            <div className="w-full">
              <div className="timeline">
                {timeLine.map((item, index) => {
                  return (
                    <div key={index} className="timeline-item">
                      <div className="timeline-item-image h-[500px] flex gap-4 justify-center">
                        {index % 2 === 0 ? (
                          <div className="flex flex-col items-start justify-center gap-4 w-full">
                            <h2 className="text-5xl text-red-500">
                              {item.year}
                            </h2>
                            <p className="text-xl text-gray-500">{item.text}</p>
                          </div>
                        ) : (
                          <img
                            src={item.image}
                            alt="shani"
                            className="p-4 hover:scale-105 transition duration-500 ease-in-out"
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
