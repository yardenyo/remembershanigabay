import Testimonial from "@/components/HomePage/Testimonial";
import { Carousel } from "primereact/carousel";
import { Link } from "react-router-dom";
import { useGetAllMemoriesQuery } from "@/features/memories/memoriesApiSlice";
import { Skeleton } from "primereact/skeleton";

const MemoryBook = () => {
  const payload = {
    sortBy: "date",
    sortOrder: 0,
  };
  const { data: response, isLoading } = useGetAllMemoriesQuery(payload);
  const MemoriesList = response?.data?.memories || [];

  const renderCarouselItem = (testimonial: {
    name: string;
    title: string;
    quote: string;
    image: string;
  }) => (
    <Testimonial
      name={testimonial.name}
      title={testimonial.title}
      quote={testimonial.quote}
      image={testimonial.image}
    />
  );

  return (
    <section>
      <div className="flex flex-col py-8 container mx-auto">
        <div className="title text-center text-3xl font-semibold">
          ספר הזכרונות
        </div>
        <div className="title-underline" />
        {isLoading ? (
          <div className="p-carousel mt-8 mb-8">
            <Skeleton width="100%" height="300px" />
          </div>
        ) : (
          <Carousel
            value={MemoriesList}
            numScroll={1}
            circular
            className="mt-8"
            itemTemplate={renderCarouselItem}
            dir="ltr"
          ></Carousel>
        )}
        <div className="flex justify-center px-8">
          <button className="btn btn-primary">
            <Link to="/memory-book">כל הזכרונות</Link>
          </button>
        </div>
      </div>
    </section>
  );
};

export default MemoryBook;
