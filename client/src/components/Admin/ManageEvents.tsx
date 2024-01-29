import {
  useGetAllEventsQuery,
  useDeleteEventMutation,
} from "@/features/events/eventsApiSlice";
import { IEvent } from "@/types/events";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import useToast from "@/hooks/useToast";

const ManageEvents = () => {
  const payload = {
    sortBy: "createdAt",
    sortOrder: 1,
    resultsPerPage: 3,
  };
  const { data: response, refetch } = useGetAllEventsQuery(payload);
  const EventsList = response?.data || [];

  const toast = useToast();

  const [deleteEvent] = useDeleteEventMutation();

  const handleDelete = async (id: string) => {
    try {
      await deleteEvent(id).unwrap();
      refetch();
      toast.toastSuccess("האירוע נמחק בהצלחה");
    } catch (error) {
      console.log(error);
    }
  };

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <span className="text-xl text-900 font-bold">האירועים שלך</span>
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
    return (
      <span className="flex justify-end">
        ...{rowData.description.substring(0, 50)}
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
          onClick={() => handleDelete(rowData._id)}
        >
          מחק
        </button>
        <button className="btn btn-primary">ערוך</button>
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
    </div>
  );
};

export default ManageEvents;
