import Testimonial, {
  TestimonialType,
} from "@/components/Testimonial/Testimonial";
import { useGetAllMemoriesQuery } from "@/features/memories/memoriesApiSlice";
import { Skeleton } from "primereact/skeleton";
import { Paginator } from "primereact/paginator";
import { useEffect, useState } from "react";
import Quote from "@/components/Testimonial/Quote";
import { Link } from "react-router-dom";

type Props = {
  view?: boolean;
};

const MemoryBook = ({ view = false }: Props) => {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(3);
  const [pageNumber, setPageNumber] = useState(0);
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);

  const { data: response, isLoading } = useGetAllMemoriesQuery({
    sortBy: "createdAt",
    sortOrder: 1,
    resultsPerPage: rows || 3,
    page: pageNumber || 1,
  });

  const memories = response?.data?.memories || [];

  useEffect(() => {
    if (response) {
      setActiveTestimonialIndex(0);
    }
  }, [response, setRows]);

  const onPageChange = (event: {
    first: number;
    rows: number;
    page: number;
  }) => {
    setFirst(event.first);
    setRows(event.rows);
    setPageNumber(event.page + 1);
  };

  const handleTestimonialClick = (index: number) => {
    setActiveTestimonialIndex(index);
  };

  return (
    <section>
      <div className="flex flex-col py-8 container mx-auto">
        <div className="text-center text-3xl font-semibold mb-4">
          ספר זיכרונות
        </div>
        <div className="title-underline" />
        <div className="flex flex-col lg:flex-row gap-12 lg:py-20">
          <div className="w-full lg:w-1/2 p-4 lg:p-0">
            {!isLoading
              ? memories.map((memory: TestimonialType, index: number) => (
                  <div key={memory._id} className="mb-4">
                    <Testimonial
                      testimonial={memory}
                      isActive={index === activeTestimonialIndex}
                      onClick={() => handleTestimonialClick(index)}
                    />
                    <div className="flex lg:hidden justify-center">
                      {index === activeTestimonialIndex && (
                        <Quote quote={memory.quote} />
                      )}
                    </div>
                  </div>
                ))
              : Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="mb-4">
                    <Skeleton shape="rectangle" width="100%" height="150px" />
                  </div>
                ))}
          </div>
          {!isLoading ? (
            <div className="w-full lg:w-1/2 hidden lg:flex">
              <Quote quote={memories[activeTestimonialIndex]?.quote} />
            </div>
          ) : (
            <Skeleton width="50%" height="500px" />
          )}
        </div>
        {view ? (
          <Paginator
            first={first}
            rows={rows}
            totalRecords={response?.data?.count || 0}
            onPageChange={onPageChange}
            dir="ltr"
          />
        ) : (
          <div className="flex justify-center px-8">
            <button className="btn btn-primary">
              <Link to="/memory-book">כל הזכרונות</Link>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default MemoryBook;
