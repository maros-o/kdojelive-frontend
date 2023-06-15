import { useEffect, useState, useRef } from "react";
import "./index.css";
import Header from "./components/Header";
import StreamList from "./components/StreamList";
import StreamOptions from "./components/StreamOptions";

const getStreams = async () => {
  const response = await fetch(
    "https://kdojelive-backend-production.up.railway.app/streams",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  const data = await response.json();

  if (response.status == 200) {
    return data;
  }
  return [];
};

const App = () => {
  const [streams, setStreams] = useState([]);
  const [filteredStreams, setFilteredStreams] = useState([]);
  const bottomObserver = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getStreams();
      setStreams(data);
    };

    const interval = setInterval(() => {
      fetchData();
    }, 1000 * 5 * 60);

    fetchData();

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="bg-mainbg w-full h-full min-h-screen">
      <Header />
      <div className="absolute w-full mt-4 z-0">
        <div className="text-center text-white/60 tracking-wide sm:block hidden">
          cz/sk streamy na jedné stránce
        </div>
      </div>
      <StreamOptions streams={streams} setFilteredStreams={setFilteredStreams} />
      <StreamList streams={filteredStreams} bottomObserver={bottomObserver} />
      <div ref={bottomObserver} />
    </div>
  );
};

export default App;
