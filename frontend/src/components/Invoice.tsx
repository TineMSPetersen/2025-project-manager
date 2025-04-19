import { useEffect, useState } from "react";

interface InvoiceProps {
  commissionType: string;
  typePrice: number;
  characterAmount: number;
  addCharaterPrice: number;
  feePrices: number[];
}

const Invoice = ({
  commissionType,
  typePrice,
  characterAmount,
  addCharaterPrice,
  feePrices,
}: InvoiceProps) => {
  const [quote, setQuote] = useState(0);

  useEffect(() => {
    const calculateFees = () => {
      return feePrices.reduce((acc, val) => acc + val, 0);
    };

    const total =
      typePrice + (characterAmount - 1) * addCharaterPrice + calculateFees();
    setQuote(total);
  }, [typePrice, characterAmount, addCharaterPrice, feePrices]);

  return (
    <div className="p-8 flex flex-col items-center ">
      <div className="p-8 bg-white border border-gray-200 outline-2 outline-[#FF0036]">
        <div className=" mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 ">Your Quote</h1>
          </div>
        </div>

        <table className="w-full mb-8 border-collapse text-black">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Type</th>
              <th className="border p-2 text-right">Character amount</th>
              <th className="border p-2 text-right">Price before fees</th>
              <th className="border p-2 text-right">Fees</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">{commissionType}</td>
              <td className="border p-2 text-right">{characterAmount}</td>
              <td className="border p-2 text-right">
                {typePrice + (characterAmount - 1) * addCharaterPrice}
              </td>
              <td className="border p-2 text-right">
                {feePrices.reduce((acc, val) => acc + val, 0)}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="flex justify-end text-black">
          <div className="w-64">
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>{quote}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Discount:</span>
              <span>None</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>${quote}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
