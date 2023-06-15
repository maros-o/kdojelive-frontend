import { useEffect, useState, useRef } from "react";
import { FiChevronDown } from "react-icons/fi";

const OrderBy = ({ orderBy, setOrderBy, ORDER_BY_OPTIONS }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [focus, setFocus] = useState(false);

  const componentRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
        setFocus(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={componentRef} className="z-10 text-white/80">
      <div className="flex justify-center items-center gap-2">
        <div className="">Seřadit podle</div>
        <div
          className="flex justify-start items-center bg-headerbg border border-slate-500 px-1 py-0.5 rounded-md cursor-pointer"
          style={{ borderColor: focus ? "#91b4ed" : null }}
          onClick={() => {
            setShowDropdown((prev) => !prev);
            setFocus((prev) => !prev);
          }}
          onAbort={() => {
            setShowDropdown(false);
            setFocus(false);
          }}
          onBlur={() => {
            setShowDropdown(false);
            setFocus(false);
          }}
        >
          <div className="px-1 text-white/80 select-none min-w-[134px]">
            {orderBy}
          </div>
          <FiChevronDown size={17} />
        </div>
      </div>
      {showDropdown ? (
        <div className="absolute flex flex-col bg-headerbg border border-slate-500 rounded-md mt-1 ms-[96px] w-[163px]">
          {Object.entries(ORDER_BY_OPTIONS).map(([key, value]) => {
            if (value === orderBy) {
              return null;
            }
            return (
              <div
                key={key}
                className={`px-2 pb-1 py-0.5 text-white/80 cursor-pointer hover:text-white/90 transition-all duration-100 `}
                onClick={() => {
                  setOrderBy(value);
                  setShowDropdown(false);
                  setFocus(false);
                }}
              >
                {value}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default OrderBy;
