import React from 'react';
import { BadgeCheck, HandPlatter, ShieldCheck, Truck } from 'lucide-react';
import { motion } from 'framer-motion';

const DeliverySection = () => {
    return (
        <section className="py-20 bg-background text-center w-full">
            <div className="container mx-auto px-4 flex flex-col items-center justify-center space-y-12">

                {/* Headings */}
                <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h3 className="text-xs md:text-sm tracking-[0.25em] text-primary uppercase font-orange-avenue font-normal">
                        SAME DAY DELIVERY IN DELHI
                    </h3>
                    <h2 className="text-2xl md:text-4xl lg:text-5xl text-foreground uppercase tracking-wide leading-tight max-w-4xl mx-auto font-orange-avenue font-normal">
                        SAVOUR THE RICHNESS,<br className="hidden md:block" /> ANYTIME
                    </h2>
                </motion.div>

                {/* Partners */}
                <motion.div
                    className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-90"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/b/bd/Zomato_Logo.svg"
                        alt="Zomato"
                        className="h-8 md:h-10 w-auto object-contain transition-all duration-300 hover:scale-110 brightness-0 invert"
                    />
                    <img
                        src="https://upload.wikimedia.org/wikipedia/en/thumb/d/d4/Swiggy_Logo.svg/500px-Swiggy_Logo.svg.png"
                        alt="Swiggy"
                        className="h-8 md:h-10 w-auto object-contain transition-all duration-300 hover:scale-110 brightness-0 invert"
                    />
                </motion.div>

                {/* Divider - Matches image line separation */}
                <div className="w-full max-w-[200px] border-t border-border"></div>

                {/* Features Grid */}
                <motion.div
                    className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 w-full max-w-5xl mx-auto pt-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                >
                    {/* Certified Halal */}
                    <div className="flex flex-col items-center space-y-4">
                        <div className="w-16 h-16 rounded-full bg-muted/20 flex items-center justify-center mb-2">
                            <BadgeCheck className="w-8 h-8 text-primary stroke-[1.5]" />
                        </div>
                        <span className="text-xs md:text-sm tracking-[0.15em] text-muted-foreground uppercase font-orange-avenue font-normal text-center">
                            Certified Halal
                        </span>
                    </div>

                    {/* Hand Rolled */}
                    <div className="flex flex-col items-center space-y-4">
                        <div className="w-16 h-16 rounded-full bg-muted/20 flex items-center justify-center mb-2">
                            <HandPlatter className="w-8 h-8 text-primary stroke-[1.5]" />
                        </div>
                        <span className="text-xs md:text-sm tracking-[0.15em] text-muted-foreground uppercase font-medium font-orange-avenue text-center">
                            Hand Rolled
                        </span>
                    </div>

                    {/* Secure Payments */}
                    <div className="flex flex-col items-center space-y-4">
                        <div className="w-16 h-16 rounded-full bg-muted/20 flex items-center justify-center mb-2">
                            <ShieldCheck className="w-8 h-8 text-primary stroke-[1.5]" />
                        </div>
                        <span className="text-xs md:text-sm tracking-[0.15em] text-muted-foreground uppercase font-medium font-orange-avenue text-center">
                            Secure Payments
                        </span>
                    </div>

                    {/* Door-step Delivery */}
                    <div className="flex flex-col items-center space-y-4">
                        <div className="w-16 h-16 rounded-full bg-muted/20 flex items-center justify-center mb-2">
                            <Truck className="w-8 h-8 text-primary stroke-[1.5]" />
                        </div>
                        <span className="text-xs md:text-sm tracking-[0.15em] text-muted-foreground uppercase font-medium font-orange-avenue text-center">
                            Door-step delivery
                        </span>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default DeliverySection;
