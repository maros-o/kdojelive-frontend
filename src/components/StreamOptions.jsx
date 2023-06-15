import React, { useEffect, useState } from "react";
import Categories from "./options/Categories";
import Search from "./options/Search";
import OrderBy from "./options/OrderBy";

const ORDER_BY_OPTIONS = {
  DESC: "Diváků (sestupně)",
  ASC: "Diváků (vzestupně)",
};

const filterBySearch = (streams, searchFilterRaw, orderBy, categoryFilter) => {
  let filteredStreams = [...streams];


  switch (orderBy) {
    case ORDER_BY_OPTIONS.DESC:
      filteredStreams.sort((a, b) => {
        return b.viewer_count - a.viewer_count;
      });
      break;
    case ORDER_BY_OPTIONS.ASC:
      filteredStreams.sort((a, b) => {
        return a.viewer_count - b.viewer_count;
      });
      break;
    default:
      break;
  }

  filteredStreams = filteredStreams.filter((stream) => {
    return categoryFilter.has(stream.category);
  });

  const searchFilter = searchFilterRaw.trim().toLowerCase();
  if (searchFilter === "") {
    return filteredStreams;
  }

  return filteredStreams.filter((stream) => {
    return (
      stream.title.toLowerCase().includes(searchFilter) ||
      stream.user_name.toLowerCase().includes(searchFilter) ||
      stream.category?.toLowerCase().includes(searchFilter)
    );
  });
};

const StreamOptions = ({ streams, setFilteredStreams }) => {
  const [searchFilter, setSearchFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState(new Set());
  const [orderBy, setOrderBy] = useState(ORDER_BY_OPTIONS.DESC);

  useEffect(() => {
    let filteredStreams = filterBySearch(streams, searchFilter, orderBy, categoryFilter);
    setFilteredStreams(filteredStreams);
  }, [searchFilter, categoryFilter, orderBy, streams]);

  return (
    <div className="flex w-full justify-center mb-3 mt-4 text-[15px]">
      <div className="flex flex-wrap max-w-[1200px] w-full text-white/90 px-2">
        <div className="flex w-full flex-col gap-3 items-center sm:flex-row sm:justify-between sm:items-center">
          <div className="flex justify-start items-center gap-2">
            <Categories streams={streams} setCategoryFilter={setCategoryFilter} />
            <Search
              searchFilter={searchFilter}
              setSearchFilter={setSearchFilter}
            />
          </div>
          <OrderBy
            orderBy={orderBy}
            setOrderBy={setOrderBy}
            ORDER_BY_OPTIONS={ORDER_BY_OPTIONS}
          />
        </div>
      </div>
    </div>
  );
};

export default StreamOptions;
