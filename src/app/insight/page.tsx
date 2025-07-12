import Fade from "@/components/common/Fade";
import { LayoutBlank } from "@/layouts";

const Insight = () => {
  return (
    <LayoutBlank>
      <div className="text-center h-screen">
        <div className="flex items-center justify-center h-full">
          <Fade direction="up">
            <p className="text-[#203368]">
              Hello Welcome To Insight Student Dormitory
            </p>
          </Fade>
        </div>
      </div>
    </LayoutBlank>
  );
};

export default Insight;
