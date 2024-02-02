import CandlesComponent from "@/components/Candles";
import { useState } from "react";
import { Paginator } from "primereact/paginator";

const Candles = () => {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

  const onPageChange = (event: { first: number; rows: number }) => {
    console.log(event);
    setFirst(event.first);
    setRows(event.rows);
  };

  return (
    <div>
      <CandlesComponent view />
      <Paginator
        first={first}
        rows={rows}
        totalRecords={100}
        rowsPerPageOptions={[10, 20, 50]}
        onPageChange={onPageChange}
        dir="ltr"
      />
    </div>
  );
};

export default Candles;
