export const WrapContainerHome = () => {
  return (
    <div className="w-[90%] h-60 px-4 relative">
      <div
        className="
      absolute top-1/2 
      left-4 lg:left-auto lg:right-4 
      transform -translate-y-1/2
      flex flex-col 
      items-start lg:items-end 
      gap-2 
      text-left lg:text-right"
      >
        <span
          className="text-white text-base lg:text-[20px] font-bold leading-tight"
          style={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.8)" }}
        >
          Asrama Mahasiswa Gorontalo Lenteng Agung
        </span>

        <p
          className="text-white text-sm lg:text-base leading-tight"
          style={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.8)" }}
        >
          “Tempat Tinggal Nyaman dan Bersahabat Untuk Mahasiswa Gorontalo Di
          Jakarta“
        </p>
        <div className="relative group w-full max-w-[160px] sm:w-40">
          <button
            onClick={(e) => e.preventDefault()}
            className="flex items-center justify-center w-full 
           bg-gradient-to-r from-[rgba(1,96,114,0.7)] to-[rgba(44,112,91,0.7)] 
           text-white backdrop-blur-sm 
           px-4 py-2 lg:py-[10px]
           rounded-lg shadow hover:shadow-md 
           transition cursor-not-allowed select-none"
          >
            <span className="text-sm sm:text-base font-semibold text-white flex items-center gap-1">
              Contact Us
            </span>
          </button>

          <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 pointer-events-none z-10">
            <div className="relative bg-gray-900 text-white text-sm px-5 py-3 rounded-lg shadow-xl whitespace-nowrap">
              <span className="block font-medium tracking-wide">
                Akan Datang 🚫
              </span>
              <div className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 w-3 h-3 bg-gray-900 rotate-45 z-[-1] shadow-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
