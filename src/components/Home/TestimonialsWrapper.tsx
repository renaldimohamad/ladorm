import React from "react";

interface TestimonialsWrapperProps {
  children: React.ReactNode;
}

export const TestimonialsWrapper: React.FC<TestimonialsWrapperProps> = ({
  children,
}) => {
  return (
    <div className="rounded-2xl shadow-md p-6 bg-white text-gray-800 flex flex-col min-h-[340px] sm:min-h-[200px] md:min-h-[380px]">
      {children}
    </div>
  );
};
