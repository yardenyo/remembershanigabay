import MediaComponent from "@/components/Media";
import { useState } from "react";
import { Paginator } from "primereact/paginator";

const Media = () => {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(9);
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
      <MediaComponent
        view
        rows={rows}
        pageNumber={pageNumber}
        setRecords={setRecords}
      />
      <Paginator
        first={first}
        rows={rows}
        totalRecords={records}
        rowsPerPageOptions={[9, 18, 27]}
        onPageChange={onPageChange}
        dir="ltr"
      />
    </div>
  );
};

export default Media;
