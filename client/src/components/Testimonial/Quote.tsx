type Props = {
  quote: string;
};

const Quote = ({ quote }: Props) => (
  <div className="w-1/2 flex items-center justify-center p-8 border h-auto shadow-lg rounded-md">
    <div>
      <div className="text-5xl text-red-400 font-bold">“</div>
      <div className="text-lg overflow-y-auto">{quote}</div>
    </div>
  </div>
);

export default Quote;
