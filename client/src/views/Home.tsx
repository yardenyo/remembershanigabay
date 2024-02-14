import Events from "@/components/HomePage/Events";
import Story from "@/components/HomePage/Story";
import Organization from "@/components/HomePage/Organization";
import MemoryBook from "@/components/HomePage/MemoryBook";
import Media from "@/components/HomePage/Media";
import Necklace from "@/components/HomePage/Necklace";
import Candles from "@/components/HomePage/Candles";
import Donation from "@/components/HomePage/Donation";
import Contact from "@/components/HomePage/Contact";

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
