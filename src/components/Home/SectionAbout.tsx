import { CallToAction } from "@/ui/common/CallToAction";
import Fade from "../common/Fade";
import { useLanguage } from "../../../stores/useLengauage";

export const SectionAbout = () => {
  const { dictionary } = useLanguage();

  return (
    <section
      id="about"
      className="scroll-smooth mt-8 w-full px-4 py-20 bg-white text-black"
    >
      <div className="w-full flex flex-col items-center">
        <Fade direction="down">
          <h5 className="text-2xl font-semibold mb-8 ">About Us</h5>
        </Fade>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full max-w-6xl mx-auto">
          <div className="mb-4 sm:mb-0 relative">
            <Fade direction="left">
              <img
                src="/images/ladorm_family_photos.webp"
                alt="about.png"
                className="w-lg h-full rounded-xl shadow-md"
              />
              {/* Overlay gradasi */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent rounded-md"></div>
            </Fade>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col gap-8">
              <Fade direction="up">
                <h1 className="text-2xl font-bold mb-1 text-left leading-relaxed">
                  {dictionary.homeSectionAbout?.title}
                </h1>
              </Fade>
              {/* <Fade direction="down"> */}
              <span className="text-gray-500 mb-1 text-left leading-relaxed">
                {dictionary.homeSectionAbout?.desc}
              </span>
              {/* </Fade> */}
              <Fade direction="right">
                <CallToAction
                  className="bg-gradient-to-r from-[rgba(1,96,114,0.7)] to-[rgba(44,112,91,0.7)] text-white"
                  text="Learn More"
                />
              </Fade>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
