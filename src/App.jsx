import { useEffect, useState, useRef } from "react";
import "./index.css";
import Header from "./components/Header";
import StreamList from "./components/StreamList";

const getStreams = async () => {
  const response = await fetch(
    "https://kdojelive-backend-production.up.railway.app/streams",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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
      <StreamList streams={streams} bottomObserver={bottomObserver} />
      <div ref={bottomObserver} />
    </div>
  );
};

export default App;
