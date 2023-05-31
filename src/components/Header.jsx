import React from "react";

const Header = () => {
  return (
    <div className="bg-headerbg h-[64px] flex justify-center items-center">
      <div className="max-w-[1200px] w-full flex justify-between items-center px-2">
        <h1 className="text-[32px] text-white/95 font-bold flex gap-3">
          <img src="https://raw.githubusercontent.com/maros-o/kdojelive-frontend/main/public/peepo.webp" className="w-[72px] h-[50px] mt-2 rounded"/>
          <a href="." className="hover:underline mt-1.5">
            kdoje.live
          </a>
        </h1>
        <div className="text-white/40 tracking-wide">
          made by{" "}
          <a
            href="https://github.com/maros-o"
            target="_blank"
            className="underline underline-offset-2 hover:text-slate-400"
          >
            Maroso
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
