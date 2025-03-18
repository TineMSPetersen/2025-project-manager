import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const PriceSettings = () => {
  const { backendUrl, token } = useContext(AppContext);

  const [label, setLabel] = useState("");
  const [value, setValue] = useState(0);

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post( backendUrl + '/api/commission/newtype', {label, value}, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })

    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div>
      <h1 className="text-5xl mb-15">Change Price Information</h1>
      <div>
        <p className="text-2xl mb-4">Add Commission Types:</p>
        <form onSubmit={onSubmitHandler}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <label className="text-xl" htmlFor="label">
              Commission Type Label:
              <input
                onChange={(e) => setLabel(e.target.value)}
                value={label}
                id="label"
                className="block mt-2 text-base"
                type="text"
                placeholder="Headshot, Flat colors, e.t.c."
              />
            </label>
            <label className="text-xl" htmlFor="value">
              Price:
              <input
                onChange={(e) => setValue(e.target.value)}
                value={value}
                id="value"
                className="block mt-2 text-base"
                type="text"
                placeholder="Price in prefered currency"
              />
            </label>

              <button className="mt-20 bg-linear-to-b from-[#FF0036] to-[#321234] w-[300px] py-4 rounded-xl outline-2 outline-[#FF0036]">
                Add New Type
              </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PriceSettings;
