import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { ICommissionInfo } from "../types";
import { assets } from "../assets/assets";

const PriceSettings = () => {
  const { backendUrl, token } = useContext(AppContext);

  const [typeLabel, setTypeLabel] = useState("");
  const [typeValue, setTypeValue] = useState(0);
  const [extrachar, setExtrachar] = useState(0);

  const [feeLabel, setFeeLabel] = useState("");
  const [feeValue, setFeeValue] = useState(0);
  const [feeType, setFeeType] = useState("flat");

  const [commissionInfo, setCommissionInfo] = useState<ICommissionInfo>({
    types: [],
    fees: [],
    currency: "USD",
  });

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

  const newCommissionType = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post(
        backendUrl + "/api/commission/newtype",
        { label: typeLabel, value: typeValue, add_character: extrachar },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTypeLabel("");
      setTypeValue(0);
      setExtrachar(0);
      fetchCommissionInfo();
    } catch (error) {
      console.log(error);
    }
  };

  const newCommissionFee = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post(
        backendUrl + "/api/commission/newfee",
        { type: feeType, label: feeLabel, value: feeValue },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchCommissionInfo();
      setFeeLabel("");
      setFeeValue(0);
      setFeeType("flat");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCommissionType = async (index: number) => {

    try {
      await axios.post(backendUrl + '/api/commission/removetype', {index}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      fetchCommissionInfo();
    } catch (error) {
      console.log(error);
    }
  }

  const deleteCommissionFee = async (index: number) => {

    try {
      await axios.post(backendUrl + '/api/commission/removefee', {index}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      fetchCommissionInfo();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1 className="text-5xl mb-15">Change Price Information</h1>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div>
          <p className="text-2xl mb-4">Commission Types:</p>
          <div>
            {commissionInfo.types &&
              commissionInfo.types.map((item, index) => (
                <div className="flex gap-5 align-middle" key={index}>
                  <p>
                    {item.label} - {commissionInfo.currency} {item.value}
                  </p>
                  <img onClick={() => deleteCommissionType(index)} src={assets.close} className="w-4 h-4 cursor-pointer" alt="close" />
                </div>
              ))}
          </div>
        </div>
        <form onSubmit={newCommissionType}>
          <p className="text-2xl mb-4">Add New Commission Type:</p>
          <div className="flex flex-col gap-10">
            <label className="text-xl" htmlFor="label">
              Commission Type Label:
              <input
                onChange={(e) => setTypeLabel(e.target.value)}
                value={typeLabel}
                id="label"
                className="block mt-2 text-base"
                type="text"
                placeholder="Headshot, Flat colors, e.t.c."
              />
            </label>
            <label className="text-xl" htmlFor="value">
              Price:
              <input
                onChange={(e) => setTypeValue(Number(e.target.value) || 0)}
                value={typeValue}
                id="value"
                className="block mt-2 text-base"
                type="number"
              />
            </label>
            <label className="text-xl" htmlFor="extrachar">
              Add character price:
              <input
                onChange={(e) => setExtrachar(Number(e.target.value) || 0)}
                value={extrachar}
                id="value"
                className="block mt-2 text-base"
                type="number"
              />
            </label>
            <button className="bg-linear-to-b from-[#FF0036] to-[#321234] w-[300px] py-4 rounded-xl outline-2 outline-[#FF0036]">
              Add New Type
            </button>
          </div>
        </form>
      </div>
      <hr className="my-20" />
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div>
          <p className="text-2xl mb-4">Commission Fees:</p>
          <div>
            {commissionInfo.fees &&
              commissionInfo.fees.map((item, index) => (
                <div className="flex gap-5 align-middle" key={index}>
                  <p>
                    {item.label} - {commissionInfo.currency} {item.value}
                  </p>
                  <img onClick={() => deleteCommissionFee(index)} src={assets.close} className="w-4 h-4 cursor-pointer" alt="close" />
                </div>
              ))}
          </div>
        </div>
        <form onSubmit={newCommissionFee}>
          <p className="text-2xl mb-4">Add New Commission Fee:</p>
          <div className="flex flex-col gap-10">
            <label className="text-xl" htmlFor="type">
              Commission Fee Type:
              <select
                value={feeType}
                onChange={(e) => setFeeType(e.target.value)}
                name="type"
                id="fee-type"
              >
                <option value="">Select Fee Type</option>
                <option value="flat">Flat Rate</option>
                <option value="percentage">Percentage</option>
              </select>
            </label>
            <label className="text-xl" htmlFor="label">
              Commission Fee Label:
              <input
                onChange={(e) => setFeeLabel(e.target.value)}
                value={feeLabel}
                id="label"
                className="block mt-2 text-base"
                type="text"
                placeholder="Headshot, Flat colors, e.t.c."
              />
            </label>
            <label className="text-xl" htmlFor="value">
              Price:
              <input
                onChange={(e) => setFeeValue(Number(e.target.value) || 0)}
                value={feeValue}
                id="value"
                className="block mt-2 text-base"
                type="text"
                placeholder="Price in prefered currency"
              />
            </label>
            <button className="bg-linear-to-b from-[#FF0036] to-[#321234] w-[300px] py-4 rounded-xl outline-2 outline-[#FF0036]">
              Add New Fee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PriceSettings;
