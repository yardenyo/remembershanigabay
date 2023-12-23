import Story from "@/components/Story";
import Organization from "@/components/Organization";
import Media from "@/components/Media";

const Home = () => {
  return (
    <main className="flex flex-col">
      <Story />
      <Organization />
      <Media />
    </main>
  );
};

export default Home;
