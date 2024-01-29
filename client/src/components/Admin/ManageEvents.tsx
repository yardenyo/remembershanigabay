import {
  useGetAllEventsQuery,
  useDeleteEventMutation,
} from "@/features/events/eventsApiSlice";
import { IEvent } from "@/types/events";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import useToast from "@/hooks/useToast";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { useState } from "react";
import EventDialog from "@/components/EventDialog";

const ManageEvents = () => {
  const payload = {
    sortBy: "createdAt",
    sortOrder: 1,
  };
  const { data: response, refetch } = useGetAllEventsQuery(payload);
  const EventsList = response?.data || [];

  const toast = useToast();

  const [deleteEvent] = useDeleteEventMutation();

  const [visible, setVisible] = useState(false);
  const [create, setCreate] = useState(false);
  const [eventID, setEventID] = useState("");

  const handleDelete = async (id: string) => {
    try {
      await deleteEvent(id).unwrap();
      refetch();
      toast.toastSuccess("האירוע נמחק בהצלחה");
    } catch (error) {
      toast.toastError("משהו השתבש, נסה שנית");
    }
  };

  const confirmDelete = (id: string) => {
    confirmDialog({
      message: "האם אתה בטוח שברצונך למחוק את האירוע?",
      header: "מחיקת אירוע",
      icon: "pi pi-exclamation-triangle",
      accept: () => handleDelete(id),
      reject: () => {},
    });
  };

  const header = (
    <div className="flex flex-row-reverse justify-between items-center">
      <div className="text-xl text-900 font-bold">אירועים</div>
      <button
        className="btn btn-primary"
        onClick={() => {
          setCreate(true);
          setVisible(true);
        }}
      >
        הוסף אירוע
      </button>
    </div>
  );
  const footer = `סה"כ ${EventsList.length} אירועים`;

  const TitleBodyTemplate = (rowData: IEvent) => {
    return (
      <span className="font-semibold flex justify-end">{rowData.title}</span>
    );
  };

  const ImageBodyTemplate = (rowData: IEvent) => {
    return (
      <div className="flex justify-end">
        <img
          className="w-20 h-20 rounded-md"
          src={rowData.image}
          alt={rowData.title}
        />
      </div>
    );
  };

  const DateBodyTemplate = (rowData: IEvent) => {
    return (
      <span className="flex justify-end">
        {new Date(rowData.date).toLocaleDateString()}
      </span>
    );
  };

  const DescriptionBodyTemplate = (rowData: IEvent) => {
    const truncatedDescription = rowData.description.substring(0, 50);

    return (
      <span className="flex justify-end">
        {truncatedDescription.length < rowData.description.length ? (
          <>...{truncatedDescription}</>
        ) : (
          truncatedDescription
        )}
      </span>
    );
  };

  const TimeBodyTemplate = (rowData: IEvent) => {
    return <span className="flex justify-end">{rowData.time}</span>;
  };

  const LocationBodyTemplate = (rowData: IEvent) => {
    return <span className="flex justify-end">{rowData.location}</span>;
  };

  const ActionBodyTemplate = (rowData: IEvent) => {
    return (
      <div className="flex justify-end gap-4">
        <button
          className="btn btn-danger"
          onClick={() => confirmDelete(rowData._id)}
        >
          מחק
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            setCreate(false);
            setEventID(rowData._id);
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
        ניהול אירועים
      </div>
      <DataTable
        value={EventsList}
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
        <Column field="location" header="מיקום" body={LocationBodyTemplate} />
        <Column
          field="description"
          header="תיאור"
          body={DescriptionBodyTemplate}
        />
        <Column field="time" header="שעה" body={TimeBodyTemplate} />
        <Column field="date" header="תאריך" body={DateBodyTemplate} />
        <Column field="title" header="שם האירוע" body={TitleBodyTemplate} />
      </DataTable>
      <EventDialog
        create={create}
        visible={visible}
        setVisible={setVisible}
        refetch={refetch}
        eventID={eventID}
      />
      <ConfirmDialog />
    </div>
  );
};

export default ManageEvents;
