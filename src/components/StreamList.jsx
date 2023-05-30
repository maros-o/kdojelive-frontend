import { useState } from "react";
import StreamItem from "./StreamItem";
import { motion } from "framer-motion";

const numberOfStreams = 16

const StreamList = ({streams}) => {
  const [streamsLimit, setStreamsLimit] = useState(numberOfStreams);

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
                transition={{ duration: 0.2, delay: (idx - (streamsLimit - numberOfStreams)) * 0.06 }}
              >
                <StreamItem stream={stream} />
              </motion.div>
            );
          })}
        </div>
        {streamsLimit < streams.length && (
          <div className="flex justify-center w-full">
            <button
              className="bg-headerbg text-white/70 rounded-md px-3 py-1.5 mt-5 mb-8 hover:bg-slate-800 transition-all duration-200"
              onClick={() => setStreamsLimit(streamsLimit + 16)}
            >
              načíst další
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StreamList;
