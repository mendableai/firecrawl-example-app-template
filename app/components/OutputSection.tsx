import React, { forwardRef } from "react";
import Card from "./Card";

interface OutputSectionProps {
  title?: string;
  children?: React.ReactNode;
  className?: string;
  id?: string;
}

const OutputSection = forwardRef<HTMLDivElement, OutputSectionProps>(
  (
    {
      title = "Analysis Results",
      children,
      className = "",
      id = "output-section",
    },
    ref,
  ) => {
    return (
      <section
        ref={ref}
        id={id}
        className={`pt-12 pb-24 px-4 flex flex-col items-center justify-start ${className}`}>
        <div className='w-full max-w-4xl mx-auto'>
          <h2 className='text-2xl md:text-3xl font-bold mb-6 text-center'>
            {title}
          </h2>

          <Card className='shadow-lg border-orange-100/70 overflow-hidden bg-white/40'>
            <div className='p-4 md:p-6'>
              {children || (
                <div className='flex flex-col items-center justify-center py-12 text-center'>
                  <div className='animate-pulse mb-4'></div>
                  <h3 className='text-xl font-medium mb-2'>Sample Output</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Commodi eligendi aperiam nesciunt perferendis sequi autem
                    dolores, illum veritatis sint alias neque porro doloremque
                    maiores pariatur provident! Blanditiis vel sit perspiciatis.
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </section>
    );
  },
);

OutputSection.displayName = "OutputSection";

export default OutputSection;
