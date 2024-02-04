import EventsComponent from "@/components/Events";
import { useState } from "react";
import { Paginator } from "primereact/paginator";

const Events = () => {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(6);
  const [records, setRecords] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);

  const onPageChange = (event: {
    first: number;
    rows: number;
    page: number;
  }) => {
    setFirst(event.first);
    setRows(event.rows);
    setPageNumber(event.page + 1);
  };

  return (
    <div>
      <EventsComponent
        view
        rows={rows}
        pageNumber={pageNumber}
        setRecords={setRecords}
      />
      <Paginator
        first={first}
        rows={rows}
        totalRecords={records}
        rowsPerPageOptions={[6, 12, 24]}
        onPageChange={onPageChange}
        dir="ltr"
      />
    </div>
  );
};

export default Events;
