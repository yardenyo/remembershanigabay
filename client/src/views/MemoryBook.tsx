import { useEffect, useState } from "react";
import { Paginator } from "primereact/paginator";
import { useGetAllMemoriesQuery } from "@/features/memories/memoriesApiSlice";
import Testimonial, {
  TestimonialType,
} from "@/components/Testimonial/Testimonial";
import Quote from "@/components/Testimonial/Quote";

const MemoryBook = () => {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(3);
  const [pageNumber, setPageNumber] = useState(0);
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);

  const onPageChange = (event: {
    first: number;
    rows: number;
    page: number;
  }) => {
    setFirst(event.first);
    setRows(event.rows);
    setPageNumber(event.page + 1);
  };

  const {
    data: response,
    isLoading,
    isError,
  } = useGetAllMemoriesQuery({
    sortBy: "createdAt",
    sortOrder: 0,
    resultsPerPage: rows || 3,
    page: pageNumber || 1,
  });

  const memories = response?.data?.memories || [];

  useEffect(() => {
    if (response) {
      setActiveTestimonialIndex(0);
    }
  }, [response, setRows]);

  const handleTestimonialClick = (index: number) => {
    setActiveTestimonialIndex(index);
  };

  if (isError) {
    return <div>Error loading memories</div>;
  }

  if (isLoading || !memories.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="py-8 container mx-auto">
      <div className="text-center text-3xl font-semibold mb-4">
        ספר זיכרונות
      </div>
      <div className="title-underline" />
      <div className="flex gap-12 py-20">
        <div className="w-1/2">
          {memories.map((memory: TestimonialType, index: number) => (
            <div key={memory._id} className="mb-4">
              <Testimonial
                testimonial={memory}
                isActive={index === activeTestimonialIndex}
                onClick={() => handleTestimonialClick(index)}
              />
            </div>
          ))}
        </div>
        <Quote quote={memories[activeTestimonialIndex]?.quote} />
      </div>
      <Paginator
        first={first}
        rows={rows}
        totalRecords={response?.data?.count || 0}
        rowsPerPageOptions={[3, 6, 9]}
        onPageChange={onPageChange}
        dir="ltr"
      />
    </div>
  );
};

export default MemoryBook;
