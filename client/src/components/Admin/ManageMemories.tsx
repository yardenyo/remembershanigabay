import {
  useGetAllMemoriesQuery,
  useDeleteMemoryMutation,
} from "@/features/memories/memoriesApiSlice";
import { IMemory } from "@/types/memories";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import useToast from "@/hooks/useToast";
import { confirmDialog } from "primereact/confirmdialog";
import { useState } from "react";
import MemoryDialog from "@/components/Dialogs/MemoryDialog";

const ManageMemories = () => {
  const payload = {
    sortBy: "createdAt",
    sortOrder: 0,
  };
  const { data: response, refetch } = useGetAllMemoriesQuery(payload);
  const MemoriesList = response?.data?.memories || [];

  const toast = useToast();

  const [deleteMemory] = useDeleteMemoryMutation();

  const [visible, setVisible] = useState(false);
  const [create, setCreate] = useState(false);
  const [memoryID, setMemoryID] = useState("");

  const handleDelete = async (id: string) => {
    try {
      await deleteMemory(id).unwrap();
      refetch();
      toast.toastSuccess("הזכרון נמחק בהצלחה");
    } catch (error) {
      toast.toastError("משהו השתבש, נסה שנית");
    }
  };

  const confirmDelete = (id: string) => {
    confirmDialog({
      message: "האם אתה בטוח שברצונך למחוק את הזכרון?",
      header: "מחיקת זכרון",
      icon: "pi pi-exclamation-triangle",
      accept: () => handleDelete(id),
      reject: () => {},
    });
  };

  const header = (
    <div className="flex flex-row-reverse justify-between items-center">
      <div className="text-xl text-900 font-bold">זכרונות</div>
      <button
        className="btn-table btn-primary"
        onClick={() => {
          setCreate(true);
          setVisible(true);
        }}
      >
        הוסף זכרון
      </button>
    </div>
  );

  const footer = `מציג ${MemoriesList.length} זכרונות`;

  const TitleBodyTemplate = (rowData: IMemory) => {
    return (
      <span className="font-semibold flex justify-end">{rowData.title}</span>
    );
  };

  const ImageBodyTemplate = (rowData: IMemory) => {
    return (
      <div className="flex justify-end">
        <img
          className="w-20 h-20 rounded-md border-2 border-gray-300"
          src={
            rowData.image ||
            "https://res.cloudinary.com/dweltcoxk/image/upload/v1699290993/assets/zb3phjr1bvhgns50gird.png"
          }
          alt={rowData.title}
        />
      </div>
    );
  };

  const QuoteBodyTemplate = (rowData: IMemory) => {
    const truncatedQuote = rowData.quote.slice(0, 50);

    return (
      <div className="flex justify-end">
        {truncatedQuote.length < rowData.quote.length ? (
          <>...{truncatedQuote}</>
        ) : (
          truncatedQuote
        )}
      </div>
    );
  };

  const NameBodyTemplate = (rowData: IMemory) => {
    return <span className="flex justify-end">{rowData.name}</span>;
  };

  const ActionBodyTemplate = (rowData: IMemory) => {
    return (
      <div className="flex justify-end gap-4">
        <button
          className="btn-table btn-danger"
          onClick={() => confirmDelete(rowData._id)}
        >
          מחק
        </button>
        <button
          className="btn-table btn-primary"
          onClick={() => {
            setCreate(false);
            setMemoryID(rowData._id);
            setVisible(true);
          }}
        >
          ערוך
        </button>
      </div>
    );
  };

  return (
    <div className="flex flex-col py-8 container mx-auto">
      <div className="title text-center text-3xl font-semibold mb-8">
        ניהול זכרונות
      </div>
      <DataTable
        value={MemoriesList}
        header={header}
        footer={footer}
        className="p-datatable-striped p-datatable-gridlines p-datatable-sm"
        rowHover
        paginator
        rows={5}
        currentPageReportTemplate="{currentPage} מתוך {totalPages}"
        rowsPerPageOptions={[5, 10, 20]}
        dir="ltr"
      >
        <Column field="actions" header="פעולות" body={ActionBodyTemplate} />
        <Column field="image" header="תמונה" body={ImageBodyTemplate} />
        <Column field="quote" header="ציטוט" body={QuoteBodyTemplate} />
        <Column field="title" header="קרבה" body={TitleBodyTemplate} />
        <Column field="name" header="שם" body={NameBodyTemplate} />
      </DataTable>
      <MemoryDialog
        create={create}
        visible={visible}
        setVisible={setVisible}
        refetch={refetch}
        memoryID={memoryID}
      />
    </div>
  );
};

export default ManageMemories;
