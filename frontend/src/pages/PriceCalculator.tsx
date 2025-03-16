import { useState } from "react";
import { assets, commissionTypes, commissionFees } from "../assets/assets";
import { NavLink } from "react-router-dom";

const PriceCalculator = () => {
  const [optionsOpen, setOptionsOpen] = useState(false);

  return (
    <div>
      <h1 className="text-5xl mb-15">Price Calculator</h1>
      <form className="flex flex-col gap-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <p className="text-2xl mb-5">Commission Type:</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {commissionTypes.map((item) => (
                <div className="flex gap-2">
                  <input
                    type="radio"
                    id={item._id.toString()}
                    name="commission type"
                    value={item.value}
                  ></input>
                  <label>
                    {item.label} - ${item.value}
                  </label>
                </div>
              ))}
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
            />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <p className="text-2xl mb-5">Commission Type:</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {commissionFees.map((item) => (
                <div className="flex gap-2">
                  <input
                    type="radio"
                    id={item._id.toString()}
                    name="commission fees"
                    value={item.value}
                  ></input>
                  <label>
                    {item.label} - ${item.value}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <button className="mt-20 bg-linear-to-b from-[#FF0036] to-[#321234] w-[300px] py-4 rounded-xl outline-2 outline-[#FF0036]">
            Get Price Quote
          </button>
        </div>
      </form>

      {optionsOpen ? (
        <div className="bg-linear-to-b from-[#321234] to-[#140D2B] absolute right-0 bottom-0 rounded-l-md rounded-t-md pt-15 pb-20 px-15 z-20">
          <ul className="flex flex-col gap-8">
            <NavLink to={'/pricesettings'}>
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
