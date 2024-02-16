import OrganizationComponent from "@/components/HomePage/Organization";
import Donation from "@/components/HomePage/Donation";

const Organization = () => {
  return (
    <div>
      <OrganizationComponent view={true} />
      <Donation />
    </div>
  );
};

export default Organization;
