import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import hero5 from '@/assets/2.jpeg';
import hero3 from '@/assets/3.jpeg';

const HeritageScroll = () => {
    // Scroll progress for the entire section
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"]
    });

    // Content Data based on user images
    const content = [
        {
            id: 1,
            title: "TRUST",
            subtitle: "#TrustInTaste",
            text: "Trust in Jabbrr Afghani's commitment to authentic flavors; in the tribute we pay to traditional recipes; in our ingredients and processes; in what we deliver; and in each other."
        },
        {
            id: 2,
            title: "AUTHENTICITY",
            subtitle: "",
            text: "Passionate about honouring traditions while embracing modern tastes. We celebrate the joy of good food, offering the finest Rolls and Biryani."
        },
        {
            id: 3,
            title: "OUR PROMISE",
            subtitle: "Every single time!",
            text: "An authentic taste of Afghani heritage."
        }
    ];

    return (
        <section ref={targetRef} className="relative bg-background">
            <div className="flex flex-col lg:flex-row">

                {/* Left Side - Sticky Image (The Process/Craft) */}
                <div className="lg:w-1/2 h-screen sticky top-0 overflow-hidden z-0">
                    <div className="absolute inset-0 bg-black/10 z-10" />
                    <img
                        src={hero5}
                        alt="Artisan crafting authentic food"
                        className="w-full h-full object-cover"
                    />
                    {/* Optional: Add a subtle overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent z-10" />
                </div>

                {/* Right Side - Scrollable Text with Background */}
                <div className="lg:w-1/2 relative bg-background">

                    {/* Fixed Background for the Right Side */}
                    <div className="absolute inset-0 z-0 overflow-hidden">
                        <img
                            src={hero3}
                            alt="Background Texture"
                            className="w-full h-full object-cover opacity-10 blur-sm scale-110 mix-blend-overlay"
                        />
                        <div className="absolute inset-0 bg-background/95" />
                    </div>

                    {/* Scrollable Text Columns */}
                    <div className="relative z-10">
                        {content.map((item, index) => (
                            <div
                                key={item.id}
                                className="h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 border-l border-primary/10"
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
                                >
                                    {/* Small Accent Line */}
                                    <div className="w-12 h-[2px] bg-primary mb-6" />

                                    <h2 className="text-xl md:text-2xl lg:text-3xl font-instrument font-normal text-white mb-4 tracking-wide leading-tight uppercase">
                                        {item.title}
                                    </h2>

                                    {item.subtitle && (
                                        <p className="text-primary font-instrument font-normal tracking-[0.2em] uppercase text-sm mb-6">
                                            {item.subtitle}
                                        </p>
                                    )}

                                    <p className="text-muted-foreground text-lg md:text-xl font-light leading-relaxed max-w-md">
                                        {item.text}
                                    </p>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeritageScroll;
