import { useLanguage } from "../../../stores/useLengauage";

export const CallToAction = () => {
  const { dictionary } = useLanguage();

  return (
    <div className="inline-block">
      <a
        href="#about"
        className="inline-flex items-center justify-center 
          bg-gradient-to-r from-[rgba(1,96,114,0.7)] to-[rgba(44,112,91,0.7)] 
          text-white backdrop-blur-sm 
          px-4 py-2 lg:py-[6px]
          rounded-md shadow hover:shadow-md 
          transition select-none text-sm sm:text-base whitespace-nowrap"
      >
        {dictionary.heroButtonLabels.callToAction}
      </a>
    </div>
  );
};
