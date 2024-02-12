import {
  useGetAllMediaQuery,
  useDeleteMediaMutation,
} from "@/features/media/mediaApiSlice";
import { IMedia } from "@/types/media";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import useToast from "@/hooks/useToast";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { useState } from "react";
// import MediaDialog from "@/components/Dialogs/MediaDialog";

const ManageMedia = () => {
  const payload = {
    sortBy: "createdAt",
    sortOrder: 1,
  };

  const { data: response, refetch } = useGetAllMediaQuery(payload);
  const MediaList = response?.data?.media || [];

  const toast = useToast();

  const [deleteMedia] = useDeleteMediaMutation();

  const [visible, setVisible] = useState(false);
  const [create, setCreate] = useState(false);
  const [mediaID, setMediaID] = useState("");

  const handleDelete = async (id: string) => {
    try {
      await deleteMedia(id).unwrap();
      refetch();
      toast.toastSuccess("מדיה נמחקה בהצלחה");
    } catch (error) {
      toast.toastError("משהו השתבש, נסה שנית");
    }
  };

  const confirmDelete = (id: string) => {
    confirmDialog({
      message: "האם אתה בטוח שברצונך למחוק את המדיה?",
      header: "מחיקת מדיה",
      icon: "pi pi-exclamation-triangle",
      accept: () => handleDelete(id),
      reject: () => {},
    });
  };

  const header = (
    <div className="flex flex-row-reverse justify-between items-center">
      <div className="text-xl text-900 font-bold">מדיה</div>
      <button
        className="btn-table btn-primary"
        onClick={() => {
          setCreate(true);
          setVisible(true);
        }}
      >
        הוסף מדיה
      </button>
    </div>
  );

  const footer = `סה"כ ${MediaList.length} מדיה`;

  const TitleBodyTemplate = (rowData: IMedia) => {
    return (
      <span className="font-semibold flex justify-end">{rowData.title}</span>
    );
  };

  const MediaTypeBodyTemplate = (rowData: IMedia) => {
    return (
      <div className="flex justify-end">
        {rowData.type === "image" ? (
          <img
            className="w-20 h-20 rounded-md border-2 border-gray-300"
            src={
              rowData.url ||
              "https://res.cloudinary.com/dweltcoxk/image/upload/v1699290993/assets/zb3phjr1bvhgns50gird.png"
            }
            alt={rowData.title}
          />
        ) : rowData.type === "video" ? (
          <video
            className="w-20 h-20 rounded-md border-2 border-gray-300"
            controls
          >
            <source src={rowData.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : null}
      </div>
    );
  };

  const ActionBodyTemplate = (rowData: IMedia) => {
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
            setMediaID(rowData._id);
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
        ניהול מדיה
      </div>
      <DataTable
        value={MediaList}
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
        <Column
          field="url"
          header="תצוגה מקדימה"
          body={MediaTypeBodyTemplate}
        />
        <Column field="title" header="כותרת המדיה" body={TitleBodyTemplate} />
      </DataTable>
      {/* <EventDialog
        create={create}
        visible={visible}
        setVisible={setVisible}
        refetch={refetch}
        eventID={eventID}
      /> */}
      <ConfirmDialog />
    </div>
  );
};

export default ManageMedia;
