// Tooltip.tsx
import React from 'react';

type TooltipProps = {
  children: React.ReactNode;
  title: string;
};

const Tooltip = ({ children, title }: TooltipProps) => {
  return (
    <div className="relative group">
      {children}
      <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-sm rounded px-2 py-1 whitespace-no-wrap">
        {title}
      </div>
    </div>
  );
};

export default Tooltip;
