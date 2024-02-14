import CandlesComponent from "@/components/HomePage/Candles";
import { useState } from "react";
import { Paginator } from "primereact/paginator";

const Candles = () => {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);
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
      <CandlesComponent
        view
        rows={rows}
        pageNumber={pageNumber}
        setRecords={setRecords}
      />
      <Paginator
        first={first}
        rows={rows}
        totalRecords={records}
        rowsPerPageOptions={[5, 10, 20, 50]}
        onPageChange={onPageChange}
        dir="ltr"
      />
    </div>
  );
};

export default Candles;
