import { useState } from "react";

const StreamItem = ({ stream }) => {
  const [hover, setHover] = useState(false);

  return (
    <div className="mb-5 mx-2 text-white max-w-[284px] w-full">
      <div
        className={`flex flex-col ${hover ? "cursor-pointer" : null}`}
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
      >
        <div className="relative overflow-hidden">
          <a href={stream.stream_url} target="_blank">
            <div
              className={`border border-black/20 drop-shadow-lg rounded-md ${
                hover ? "scale-110" : null
              } transition-all duration-500`}
              style={{
                backgroundImage: `url(${stream.stream_thumbnail_url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "284px",
                height: "160px",
              }}
            ></div>
          </a>
          <div className="absolute text-[14px] py-[2px] px-[6px] bottom-[8px] left-[8px] bg-black/70 inline-block rounded-md text-white/90">
            <span className="tracking-wide font-medium">
              {stream.viewer_count}
            </span>{" "}
            diváků
          </div>
          <div
            className="absolute w-[30px] h-[30px] top-[8px] right-[8px]"
            style={{
              backgroundImage: `url(https://github.com/maros-o/kdojelive-frontend/tree/main/public/${stream.platform}logo.png)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              width: "26px",
              height: "26px",
              opacity: "0.9",
            }}
          ></div>
        </div>
        <div className="flex items-center mt-[7px]">
          <img
            src={stream.user_thumbnail_url}
            width={40}
            height={40}
            alt={stream.title}
            className="rounded-full"
          />
          <div className="ms-1.5 flex flex-col space-y-0 h-[40px]">
            <div
              className={`text-white/95 font-semibold text-[16px] truncate max-w-[242px] h-[20px] transition-all duration-300`}
              style={{ color: hover ? "#9cc7ff" : "rgb(255, 255, 255, 0.95)" }}
            >
              {stream.title}
            </div>
            <div className="text-white/70 h-[20px]">{stream.user_name}</div>
          </div>
        </div>
      </div>
      {stream.category ? (
        <div className="mt-[7px] text-[14px] border rounded-lg inline-block px-[7px] pb-[2px] truncate border-[#212530] bg-[#2e3342] text-white/90 w-min">
          {stream.category}
        </div>
      ) : null}
    </div>
  );
};

export default StreamItem;
