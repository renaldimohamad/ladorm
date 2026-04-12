"use client";

import Fade from "@/components/common/Fade";
import { HiOutlineChatAlt2, HiOutlineHome, HiOutlineKey } from "react-icons/hi";
import { useLanguage } from "../../../stores/useLengauage";

export default function HowWeWork() {
  const { dictionary } = useLanguage();
  const content = dictionary?.homeHowWeWork;

  const steps = [
    {
      id: 1,
      title: content?.steps?.contact?.title,
      desc: content?.steps?.contact?.desc,
      icon: <HiOutlineChatAlt2 className="w-8 h-8 text-white" />,
    },
    {
      id: 2,
      title: content?.steps?.survey?.title,
      desc: content?.steps?.survey?.desc,
      icon: <HiOutlineHome className="w-8 h-8 text-white" />,
    },
    {
      id: 3,
      title: content?.steps?.move?.title,
      desc: content?.steps?.move?.desc,
      icon: <HiOutlineKey className="w-8 h-8 text-white" />,
    },
  ];

  return (
    <section className="w-full px-6 py-24 bg-background text-foreground relative z-10">
      <div className="max-w-6xl mx-auto">
        <Fade direction="up">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest text-[var(--primary)] uppercase mb-2">
              {content?.sectionLabel}
            </h2>
            <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              {content?.title}
            </h3>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {content?.desc}
            </p>
          </div>
        </Fade>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12 items-stretch">
          {steps.map((step, index) => (
            <Fade direction="up" delay={index * 150} key={step.id}>
              <div className="relative h-full flex flex-col justify-between items-center text-center p-8 rounded-2xl bg-muted/30 shadow-sm border border-border/50 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                
                {/* Connector line on Desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-[28%] -right-[25%] w-[50%] h-[2px] bg-gradient-to-r from-transparent via-[var(--border)] to-transparent z-0" />
                )}
                
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)] flex items-center justify-center shadow-lg mb-6 z-10 transition-transform hover:scale-110">
                    {step.icon}
                  </div>
                  
                  <h4 className="text-xl font-bold mb-3">{step.title}</h4>
                </div>

                <div className="mt-auto">
                  <p className="text-muted-foreground leading-relaxed">
                    {step.desc}
                  </p>
                </div>

              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}
