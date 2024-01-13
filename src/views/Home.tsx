import Story from "@/components/Story";
import Organization from "@/components/Organization";
import MemoryBook from "@/components/MemoryBook";
import Media from "@/components/Media";

const Home = () => {
  return (
    <main className="flex flex-col">
      <Story />
      <Organization />
      <MemoryBook />
      <Media />
    </main>
  );
};

export default Home;
