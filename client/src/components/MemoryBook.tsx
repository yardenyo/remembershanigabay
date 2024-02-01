import Testimonial from "@/components/Testimonial";
import { Carousel } from "primereact/carousel";
import { Link } from "react-router-dom";
import { useGetAllMemoriesQuery } from "@/features/memories/memoriesApiSlice";
import { IMemory } from "@/types/memories";

const MemoryBook = () => {
  const payload = {
    sortBy: "date",
    sortOrder: 0,
  };
  const { data: response } = useGetAllMemoriesQuery(payload);
  const MemoriesList = response?.data || [];
  return (
    <div className="border-t border-black border-opacity-5">
      <div className="flex flex-col py-8 container mx-auto">
        <div className="title text-center text-3xl font-semibold">
          ספר הזכרונות
        </div>
        <Carousel
          value={MemoriesList}
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
