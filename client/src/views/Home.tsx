import Events from "@/components/Events";
import Story from "@/components/Story";
import Organization from "@/components/Organization";
import MemoryBook from "@/components/MemoryBook";
import Media from "@/components/Media";
import Necklace from "@/components/Necklace";
import Candles from "@/components/Candles";
import Donation from "@/components/Donation";
import Contact from "@/components/Contact";

const Home = () => {
  return (
    <main className="flex flex-col">
      <Events />
      <Story />
      <Organization />
      <MemoryBook />
      <Media />
      <Necklace />
      <Candles />
      <Donation />
      <Contact />
    </main>
  );
};

export default Home;
