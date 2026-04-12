import React from "react";

interface TestimonialsWrapperProps {
  children: React.ReactNode;
}

export const TestimonialsWrapper: React.FC<TestimonialsWrapperProps> = ({
  children,
}) => {
  return (
    <div className="rounded-2xl shadow-md border border-border/50 p-6 bg-card dark:bg-background/90 text-foreground flex flex-col min-h-[340px] sm:min-h-[200px] md:min-h-[380px] hover:shadow-lg transition-shadow">
      {children}
    </div>
  );
};
