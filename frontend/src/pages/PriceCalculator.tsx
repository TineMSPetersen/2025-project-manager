import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { ICommissionInfo } from "../types";

const PriceCalculator = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [commissionInfo, setCommissionInfo] = useState<ICommissionInfo>({
    types: [],
    fees: [],
    currency: "USD",
  });
  const [optionsOpen, setOptionsOpen] = useState(false);

  const [typePrice, setTypePrice] = useState(0);
  const [characterAmount, setCharacterAmount] = useState(1);
  const [feePrices, setFeePrices] = useState<number[]>([]);
  const [addCharaterPrice, setAddCharacterPrice] = useState(0);
  const [quote, setQuote] = useState(0);

  const fetchCommissionInfo = async () => {
    try {
      const response = await axios.post(
        backendUrl + "/api/commission/get",
        {}, // No need to send userId manually anymore
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        const info = response.data.commissionData.commission_info || [];
        setCommissionInfo(info);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCommissionInfo();
  }, []);

  useEffect(() => {
    const calculateFees = () => {
      return feePrices.reduce((acc, val) => acc + val, 0);
    };

    const total =
      typePrice + (characterAmount - 1) * addCharaterPrice + calculateFees();
    setQuote(total);
  }, [typePrice, characterAmount, addCharaterPrice, feePrices]);

  return (
    <div>
      <h1 className="text-5xl mb-15">Price Calculator</h1>
      <form className="flex flex-col gap-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <p className="text-2xl mb-5">Commission Type:</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {commissionInfo.types.length < 1 ? (<div>
                <p>You don't have any commission types yet</p>
                <NavLink to={"/pricesettings"} className="underline mt-2 cursor-pointer">Add commission types</NavLink>
              </div>) :
              commissionInfo.types &&
                commissionInfo.types.map((item) => (
                  <div key={item.label} className="flex gap-2">
                    <input
                      type="radio"
                      name="commission type"
                      value={item.value}
                      onChange={() => {
                        setTypePrice(Number(item.value));
                        setAddCharacterPrice(item.add_character || 0);
                      }}
                    />
                    <label>
                      {item.label} - ${item.value}
                    </label>
                  </div>
                ))
              }
            </div>
          </div>
          <div>
            <label className="text-2xl" htmlFor="characteramount">
              Character Amount:
            </label>
            <input
              className="block text-xl mt-5 w-full outline-white outline-1 py-4 px-6 rounded-xl"
              placeholder="1"
              type="number"
              name="Character amount"
              id="characteramount"
              onChange={(e) => setCharacterAmount(Number(e.target.value) || 1)}
              value={characterAmount}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <p className="text-2xl mb-5">Extra Fees:</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {commissionInfo.types.length < 1 ? (<div>
              <p>You don't have any commission fees yet</p>
              <NavLink to={"/pricesettings"} className="underline mt-2 cursor-pointer">Add commission fees</NavLink>
            </div>
              
            ) :
              commissionInfo.fees &&
                commissionInfo.fees.map((item) => (
                  <div key={item.label} className="flex gap-2">
                    <input
                      type="checkbox"
                      name="commission fees"
                      value={item.value}
                      onChange={(e) => {
                        const value = Number(item.value);
                        if (e.target.checked) {
                          setFeePrices((prev) => [...prev, value]);
                        } else {
                          setFeePrices((prev) =>
                            prev.filter((fee) => fee !== value)
                          );
                        }
                      }}
                    />
                    <label>
                      {item.label} - ${item.value}
                    </label>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </form>

      {quote > 0 && (
        <div className="text-center">
          <p className="text-3xl mt-10">
            Your Quote: {commissionInfo.currency} {quote}
          </p>
          <p>Calculations:</p>
          <p> Base price: {typePrice} </p>
          <p>
            Extra character price: + {characterAmount - 1} * {addCharaterPrice}
          </p>
          <p>Fees: {feePrices.join(" + ")}</p>
          <p>
            Total: {typePrice} + {(characterAmount - 1) * addCharaterPrice} +{" "}
            {feePrices.join(" + ")}
          </p>
        </div>
      )}

      {optionsOpen ? (
        <div className="bg-linear-to-b from-[#321234] to-[#140D2B] absolute right-0 bottom-0 rounded-l-md rounded-t-md pt-15 pb-20 px-15 z-20">
          <ul className="flex flex-col gap-8">
            <NavLink to={"/pricesettings"}>
              <li className="flex gap-3">
                <img className="max-h-[28px]" src={assets.settings} alt="" />
                <p className="text-lg">Edit price information</p>
              </li>
            </NavLink>
            <hr />
          </ul>

          <img
            onClick={() => setOptionsOpen(false)}
            className="absolute bottom-5 right-5"
            src={assets.close}
            alt=""
          />
        </div>
      ) : null}

      <div
        onClick={() => setOptionsOpen(true)}
        className="bg-linear-to-b from-[#FF0036] to-[#321234] p-4 rounded-full outline-2 outline-[#FF0036] absolute bottom-5 right-5 z-10"
      >
        <img width={50} src={assets.options} alt="" />
      </div>
    </div>
  );
};

export default PriceCalculator;
