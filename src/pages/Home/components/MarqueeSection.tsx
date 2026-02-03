import React from 'react';

interface MarqueeSectionProps {
    items?: string[];
    duration?: string;
    className?: string; // Allow modifying size/padding via className
}

const MarqueeSection: React.FC<MarqueeSectionProps> = ({
    items = [
        "NEW ARRIVALS",
        "AUTHENTIC TASTE",
        "FRESH INGREDIENTS",
        "ROYAL BIRYANI",
        "SIGNATURE ROLLS",
        "JABBRR AFGHANI",
        "FRESHLY MADE"
    ],
    duration = "20s",
    className = "py-3" // Default padding
}) => {
    return (
        <div className={`w-full bg-primary overflow-hidden border-y border-primary/30 relative z-20 ${className}`}>
            <div className="flex w-fit animate-infinite-scroll">
                {/* First copy */}
                <div className="flex items-center space-x-12 px-6 flex-nowrap shrink-0">
                    {items.map((item, i) => (
                        <div key={`1-${i}`} className="flex items-center space-x-12 flex-nowrap shrink-0">
                            <span className="text-[10px] md:text-sm tracking-[0.3em] font-instrument font-normal text-white uppercase whitespace-nowrap">
                                {item}
                            </span>
                            <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                        </div>
                    ))}
                </div>
                {/* Second copy for seamless loop */}
                <div className="flex items-center space-x-12 px-6 flex-nowrap shrink-0">
                    {items.map((item, i) => (
                        <div key={`2-${i}`} className="flex items-center space-x-12 flex-nowrap shrink-0">
                            <span className="text-[10px] md:text-sm tracking-[0.3em] font-medium text-white uppercase whitespace-nowrap">
                                {item}
                            </span>
                            <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                        </div>
                    ))}
                </div>
                {/* Third copy to be safe */}
                <div className="flex items-center space-x-12 px-6 flex-nowrap shrink-0">
                    {items.map((item, i) => (
                        <div key={`3-${i}`} className="flex items-center space-x-12 flex-nowrap shrink-0">
                            <span className="text-[10px] md:text-sm tracking-[0.3em] font-medium text-white uppercase whitespace-nowrap">
                                {item}
                            </span>
                            <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                        </div>
                    ))}
                </div>
                {/* Fourth copy to be extra safe on huge screens */}
                <div className="flex items-center space-x-12 px-6 flex-nowrap shrink-0">
                    {items.map((item, i) => (
                        <div key={`4-${i}`} className="flex items-center space-x-12 flex-nowrap shrink-0">
                            <span className="text-[10px] md:text-sm tracking-[0.3em] font-medium text-white uppercase whitespace-nowrap">
                                {item}
                            </span>
                            <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                        </div>
                    ))}
                </div>
            </div>
            <style>{`
        @keyframes infinite-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-25%); }
        }
        .animate-infinite-scroll {
          display: flex;
          width: max-content;
          animation: infinite-scroll ${duration} linear infinite;
        }
        .animate-infinite-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
        </div>
    );
};


export default MarqueeSection;
