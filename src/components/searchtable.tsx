"use client"

import { useState } from 'react';
import { FiSearch } from "react-icons/fi";
import { addToCart } from "@/redux/shoppingSlice";
import { useDispatch, useSelector } from "react-redux";
import Container from "@/components/container";
import { Flora, StateProps } from "../../type";

const SearchTable = () => {
  const { floraData } = useSelector((state: StateProps) => state?.shopping);
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState('');
  const convertToFlora = (data: any): Flora => ({
    _id: data.id,
    lt_name: data.latin_name,
    eng_name: data.english_name,
    pt_type: data.plant_type,
    ed_ible: data.edi_bility,
    flow_ering: data.flower_ing,
    ev_ergreen: data.ever_green,
  });
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();  
  
    try {
      // Send the query to the API route
      const response = await fetch('/api/searchflora', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, selectedOption }), // Send user input to the API route
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setResults(data); // Set the response data in state to display it
    } catch (err: any) {
      setError(err.message);
    }
  };
  const [selectedOption, setSelectedOption] = useState("englishnam");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedOption(event.target.value);
  };

  return (
    <Container>
    <div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg mx-auto w-full">
      <div>
        <form onSubmit={handleSubmit} className="w-full bg-white hidden md:flex items-center gap-x-1 border-[1px] border-lightText/50 rounded-full px-5 py-0 focus-within:border-orange-600 group">
          <div className="flex grow">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Find a plant species..."
              className="border-white grow"
            />
          </div>
          <div className="">
            <FiSearch className="text-gray-500 group-focus-within:text-darkText duration-200" />
          </div>
          <div className="">
            <button type="submit" className="bg-black hover:bg-slate-950 rounded-full text-xs text-slate-100 hover:text-white flex items-center justify-center gap-x-1 px-3 py-1.5 border-[2px] border-gray-400 hover:border-orange-600 duration-200 relative">Search</button>
          </div>
        </form>
      </div>
      <br />
      <table className="table-auto border-collapse border border-gray-400 w-full text-left">
      <thead>
        <tr>
          <th className="border border-gray-300 px-2 py-2">No</th>
          <th className="border border-gray-300 px-2 py-2"><label><input type="radio" value="latinnam" checked={selectedOption === "latinnam"} onChange={handleChange}/> Latin Name</label></th>
          <th className="border border-gray-300 px-2 py-2"><label><input type="radio" value="engnam" checked={selectedOption === "englishnam"} onChange={handleChange}/> English Name</label></th>
          <th className="border border-gray-300 px-2 py-2">Type Plant</th>
          <th className="border border-gray-300 px-2 py-2">Edible</th>
          <th className="border border-gray-300 px-2 py-2">flowering Months</th>
          <th className="border border-gray-300 px-2 py-2">Evergreen</th>
          <th className="border border-gray-300 px-2 py-2">Add</th>
        </tr>
      </thead>
      <tbody>
        {results.map((florum) => (
          <tr key={florum.id}>
            <td className="border border-gray-300 px-2 py-2">{florum.id}</td>
            <td className="border border-gray-300 px-2 py-2">{florum.latin_name}</td>
            <td className="border border-gray-300 px-2 py-2">{florum?.english_name}</td>
            <td className="border border-gray-300 px-2 py-2">{florum?.plant_type}</td>
            <td className="border border-gray-300 px-2 py-2">{florum?.edi_bility}</td>
            <td className="border border-gray-300 px-2 py-2">{florum?.flower_ing}</td>
            <td className="border border-gray-300 px-2 py-2">{florum?.ever_green}</td>
            <td className="border border-gray-300 px-2 py-2">
            <button onClick={() => {const mappedFlora = convertToFlora(florum); dispatch(addToCart(mappedFlora)); console.log("Adding to cart:", mappedFlora)}} 
              className="btn btn-outline rounded-full bg-darkText text-slate-100 px-1 py-1 text-sm flex items-center border-[2px] border-gray-400 hover:border-orange-600 duration-200 relative">
              add
            </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
    </Container>
  );
};

export default SearchTable;