"use client";

import { WrapContainerHome } from "@/components/Home";
import { LayoutBlank } from "@/layouts";

export default function Home() {
  return (
    <LayoutBlank>
      <div className="w-full h-100 flex items-center justify-center mt-5 lg:mt-[10vh] z-[999]">
        <WrapContainerHome />
      </div>
    </LayoutBlank>
  );
}
