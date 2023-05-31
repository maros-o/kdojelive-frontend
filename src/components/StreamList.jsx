import { useState, useEffect } from "react";
import StreamItem from "./StreamItem";
import { motion } from "framer-motion";

const numberOfStreams = 16;

const StreamList = ({ streams, bottomObserver }) => {
  const [streamsLimit, setStreamsLimit] = useState(0);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const handleObserver = (entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        setStreamsLimit((prev) => prev + numberOfStreams);
      }
    };

    const observer = new IntersectionObserver(handleObserver, observerOptions);
    observer.observe(bottomObserver.current);

    return () => observer.disconnect();
  }, []);

  const limitedStreams = streams.slice(0, streamsLimit);

  return (
    <div className="flex w-full justify-center">
      <div className="flex flex-col">
        <div className="flex flex-wrap justify-center max-w-[1200px] w-full">
          {limitedStreams.map((stream, idx) => {
            return (
              <motion.div
                key={idx}
                animate={{ scale: 1 }}
                initial={{ scale: 0 }}
                transition={{
                  duration: 0.2,
                  delay: (idx - (streamsLimit - numberOfStreams)) * 0.06,
                }}
              >
                <StreamItem stream={stream} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StreamList;
