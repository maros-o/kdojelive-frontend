import { useEffect, useState, useRef } from "react";
import { FiChevronDown } from "react-icons/fi";
import ScrollToBottom from "react-scroll-to-bottom";

const Categories = ({ streams, setCategoryFilter }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [categories, setCategories] = useState([]);
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

  useEffect(() => {
    const categoryPopularity = {};

    streams.forEach((stream) => {
      if (stream.category in categoryPopularity) {
        categoryPopularity[stream.category] += 1;
      } else {
        categoryPopularity[stream.category] = 1;
      }
    });

    const sortedCategories = [];
    for (const category in categoryPopularity) {
      sortedCategories.push({
        name: category,
        popularity: categoryPopularity[category],
      });
    }
    sortedCategories.sort((a, b) => {
      return b.popularity - a.popularity;
    });

    const newCategories = { "Vybrat vše": true };

    sortedCategories.forEach((category) => {
      if (category.name !== "" && category.name !== "null") {
        newCategories[category.name] = true;
      }
    });

    setCategories(newCategories);
  }, [streams]);

  useEffect(() => {
    const activeCategories = new Set();

    Object.entries(categories).forEach(([category, active]) => {
      if (active) {
        activeCategories.add(category);
      }
    });

    setCategoryFilter(activeCategories);
  }, [categories, setCategoryFilter]);

  const handleCheckbox = (category) => {
    if (category === "Vybrat vše") {
      const value = !categories["Vybrat vše"];

      const newCategories = { ...categories };
      for (const category in newCategories) {
        newCategories[category] = value;
      }
      setCategories(newCategories);
      return;
    }

    const newCategories = { ...categories };
    newCategories["Vybrat vše"] = false;
    newCategories[category] = !newCategories[category];
    setCategories(newCategories);
  };

  return (
    <div ref={componentRef} className="z-20 cursor-pointer">
      <div
        className="flex justify-start items-center bg-headerbg border border-slate-500 px-1 py-0.5 rounded-md"
        style={{ borderColor: focus ? "#91b4ed" : null }}
        onClick={() => {
          setShowDropdown((prev) => !prev);
          setFocus((prev) => !prev);
        }}
      >
        <div className="px-1 text-white/80 select-none">Kategorie</div>
        <FiChevronDown size={17} />
      </div>
      {showDropdown ? (
        <div className="absolute flex flex-col bg-headerbg border border-slate-500 rounded-md mt-1 h-[248px]">
          <ScrollToBottom
            className="message-container hide-scrollbar"
            mode="top"
          >
            {Object.entries(categories).map(([category, active]) => {
              return (
                <div
                  key={category}
                  className="px-1 py-0.5 text-white/80 m-0.5 truncate max-w-[244px] select-none hover:text-white/90 transition-all duration-100"
                  onClick={() => {
                    handleCheckbox(category);
                  }}
                >
                  <input
                    type="checkbox"
                    checked={active}
                    className="me-3"
                    onChange={() => {
                      handleCheckbox(category);
                    }}
                  />
                  <span
                    className={`${
                      category === "Vybrat vše" ? "font-semibold" : null
                    }`}
                  >
                    {category}
                  </span>
                </div>
              );
            })}
          </ScrollToBottom>
        </div>
      ) : null}
    </div>
  );
};

export default Categories;
