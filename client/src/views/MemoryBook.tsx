import { useEffect, useState } from "react";
import { Paginator } from "primereact/paginator";
import { useGetAllMemoriesQuery } from "@/features/memories/memoriesApiSlice";

const Testimonial = ({ testimonial, isActive, onClick }) => (
  <div
    className={`flex items-center gap-4 p-4 ${
      isActive ? "bg-gray-200" : "hover:bg-gray-100 cursor-pointer"
    }`}
    onClick={onClick}
  >
    <div className={`w-24 h-24 rounded-full overflow-hidden`}>
      <img
        src={testimonial.image}
        alt={testimonial.name}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="w-1/2">
      <div className="font-bold text-xl">{testimonial.name}</div>
      <div className="text-gray-600">{testimonial.title}</div>
    </div>
  </div>
);

const Quote = ({ quote }) => (
  <div className="w-1/2 flex items-center justify-center p-8 border">
    <div>
      <div className="text-5xl text-red-400 font-bold">“</div>
      <div className="text-lg overflow-y-auto">{quote}</div>
    </div>
  </div>
);

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

  const handleTestimonialClick = (index) => {
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

      <div className="flex gap-4">
        <div className="w-1/2">
          {memories.map((memory, index) => (
            <div key={memory.id} className="mb-4">
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
