import Testimonial from "@/components/Testimonial";
import Memories from "@/constants/Memories";
import { Carousel } from "primereact/carousel";
import { Link } from "react-router-dom";

const MemoryBook = () => {
  return (
    <div className="border-t border-black border-opacity-5">
      <div className="flex flex-col py-8 container mx-auto">
        <div className="title text-center text-3xl font-semibold">
          ספר הזכרונות
        </div>
        <Carousel
          value={Memories}
          numScroll={1}
          circular
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
        <div className="flex justify-center px-8">
          <button className="btn btn-primary w-full lg:w-auto">
            <Link to="/memory-book">כל הזכרונות</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemoryBook;
