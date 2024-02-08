import { useSignoutMutation } from "@/features/auth/authApiSlice";
import ManageEvents from "@/components/Admin/ManageEvents";
import ManageMemories from "@/components/Admin/ManageMemories";

const AdminDashboard = () => {
  const [signout] = useSignoutMutation();
  const handleSignout = async () => {
    await signout({});
    window.location.href = "/";
  };

  return (
    <div className="flex flex-col items-center justify-center p-10 container mx-auto">
      <div className="md:flex-row flex flex-col items-center justify-between w-full gap-4">
        <h1 className="text-3xl font-bold">לוח בקרה למנהל</h1>
        <button className="btn btn-primary" onClick={handleSignout}>
          התנתק
        </button>
      </div>
      <div className="w-full flex flex-col items-center justify-center gap-4 py-4">
        <ManageEvents />
        <ManageMemories />
      </div>
    </div>
  );
};

export default AdminDashboard;
