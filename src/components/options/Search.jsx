import { useState } from "react";
import { FiSearch } from "react-icons/fi";

const Search = ({ searchFilter, setSearchFilter }) => {
  const [focus, setFocus] = useState(false);

  const handleInput = (e) => {
    setSearchFilter(e.target.value);
  };

  return (
    <div
      className="z-10 flex justify-start items-center bg-headerbg border border-slate-500 px-1 rounded-md transition-all duration-100"
      style={{ borderColor: focus ? "#91b4ed" : null }}
    >
      <FiSearch size={18} className="opacity-90 text-slate-200" />
      <input
        type="search"
        placeholder="Vyhledat"
        className="bg-headerbg focus:outline-none px-1 py-0.5 w-[158px]"
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={() => {
          setFocus(false);
        }}
        onChange={handleInput}
        value={searchFilter}
      />
    </div>
  );
};

export default Search;
