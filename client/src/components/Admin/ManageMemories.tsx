import {
  useGetAllMemoriesQuery,
  useDeleteMemoryMutation,
} from "@/features/memories/memoriesApiSlice";
import { IMemory } from "@/types/memories";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import useToast from "@/hooks/useToast";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { useState } from "react";
import MemoryDialog from "@/components/Dialogs/MemoryDialog";

const ManageMemories = () => {
  return <div>ManageMemories</div>;
};

export default ManageMemories;
