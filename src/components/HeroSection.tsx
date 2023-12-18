const HeroSection = () => {
  return (
    <div className="h-[80vh] flex flex-col md:flex-row border border-black shadow-lg">
      <div className="w-full md:w-1/2">
        <img
          src="https://res.cloudinary.com/dweltcoxk/image/upload/v1702896957/%D7%9C%D7%9C%D7%90_%D7%A9%D7%9D_kw2vxi.png"
          alt="shani's picture"
          className="object-cover h-[80vh] md:h-full w-full"
        />
      </div>
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-4">
        <div className="text-3xl font-semibold">זוכרים את שני גבאי ז"ל</div>
        <div className="text-xl">אתר הנצחה לזכרה של שני גבאי הי"ד</div>
      </div>
    </div>
  );
};

export default HeroSection;
