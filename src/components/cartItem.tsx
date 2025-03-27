import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flora, StateProps } from "../../type";
import { deletePlant } from "@/redux/shoppingSlice";
import dynamic from "next/dynamic";

const Mint = dynamic(() => import("../components/mint").then((mod) => mod.default), { ssr: false });

const CartItem = () => {
  const { floraData } = useSelector((state: StateProps) => state?.shopping);
  const dispatch = useDispatch();
  return (
    <div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg mx-auto w-full">
      <Mint />
      <div className="items-center justify-between font-semibold bg-white rounded p-2 w-full">
        <p className="w-1/3">Plant Species</p>
      </div>
      <table className="table-auto w-full text-left">
      <thead>
        <tr>
          <th className="border border-gray-300 px-2 py-2">No</th>
          <th className="border border-gray-300 px-2 py-2">Latin Name</th>
          <th className="border border-gray-300 px-2 py-2">Type Plant</th>
          <th className="border border-gray-300 px-2 py-2">Edible</th>
          <th className="border border-gray-300 px-2 py-2">Flowering Months</th>
          <th className="border border-gray-300 px-2 py-2">Evergreen</th>
          <th className="border border-gray-300 px-2 py-2">Delete</th>
        </tr>
      </thead>
      <tbody>
        {floraData?.map((plantje: Flora) => (
          <tr key={plantje.lt_name}>
            <td className="border border-gray-300 px-2 py-2">{plantje._id}</td>
            <td className="border border-gray-300 px-2 py-2">{plantje.lt_name}</td>
            <td className="border border-gray-300 px-2 py-2">{plantje?.pt_type}</td>
            <td className="border border-gray-300 px-2 py-2">{plantje?.ed_ible}</td>
            <td className="border border-gray-300 px-2 py-2">{plantje?.flow_ering}</td>
            <td className="border border-gray-300 px-2 py-2">{plantje?.ev_ergreen}</td>
            <td className="border border-gray-300 px-2 py-2">
              <div onClick={() =>
              dispatch(deletePlant(plantje._id))

            }
            className="flex items-center cursor-pointer group"
          >
            <button className="bg-black hover:bg-slate-950 rounded-full text-slate-100 hover:text-white flex items-center justify-center gap-x-1 px-3 py-2 border-[2px] border-gray-400 hover:border-orange-600 duration-200 relative">
              delete
            </button></div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default CartItem;