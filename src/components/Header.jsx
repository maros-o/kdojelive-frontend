import React from "react";

const Header = () => {
  return (
    <div className="bg-headerbg h-[64px] flex justify-center items-center">
      <div className="max-w-[1200px] w-full flex justify-between items-center">
        <h1 className="text-[32px] text-white/95 font-bold px-2">
          <a href="." className="hover:underline">
            kdoje.live
          </a>
        </h1>
      </div>
    </div>
  );
};

export default Header;
