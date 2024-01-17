import Testimonial from "@/components/Testimonial";
import { Carousel } from "primereact/carousel";
import Memories from "@/constants/Memories";

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
