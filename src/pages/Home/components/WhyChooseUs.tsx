import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Truck, Clock, Award, ArrowRight, CheckCircle, Users, Zap, ChefHat, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    icon: Shield,
    title: 'Premium Quality Meat',
    description: 'We use only the finest cuts of meat and fresh ingredients, marinated to perfection for that authentic Afghani taste.',
    color: 'from-orange-400 to-red-500',
    bgColor: 'bg-background',
    textColor: 'text-primary'
  },
  {
    icon: ChefHat,
    title: 'Authentic Recipes',
    description: 'Our chefs use traditional Afghani recipes passed down through generations to create exceptionally flavorful rolls and biryani.',
    color: 'from-blue-400 to-blue-500',
    bgColor: 'bg-background',
    textColor: 'text-primary'
  },
  {
    icon: Clock,
    title: 'Hot & Fresh',
    description: 'We ensure your food is prepared fresh upon order and delivered financing hot to your doorstep.',
    color: 'from-purple-400 to-purple-500',
    bgColor: 'bg-background',
    textColor: 'text-primary'
  },
  {
    icon: Heart,
    title: 'Taste You Love',
    description: '100% satisfaction guarantee. If you\'re not delighted with our flavors, we\'ll make it right.',
    color: 'from-green-400 to-emerald-500',
    bgColor: 'bg-background',
    textColor: 'text-primary'
  },
];

const WhyChooseUs = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-10 left-10 w-96 h-96 bg-primary/3 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-80 h-80 bg-red-500/3 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center bg-primary/10 backdrop-blur-sm border border-primary/20 text-primary px-6 py-3 rounded-full text-sm font-instrument font-normal shadow-lg mb-6">
            <CheckCircle className="w-4 h-4 mr-2" />
            Why Choose Us
          </div>

          <h2 className="text-xl md:text-2xl lg:text-3xl text-foreground mb-6 font-instrument font-normal">
            Why{' '}
            <span className="text-primary">
              Jabbrr Afghani
            </span>
            ?
          </h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-instrument font-normal">
            We're committed to delivering the finest rolls and biryani with premium quality meat,
            exceptional service, and guaranteed satisfaction.
          </p>
        </motion.div>

        {/* Enhanced Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
              whileHover={{ y: -8 }}
            >
              <div className="bg-card rounded-3xl p-8 text-center shadow-sm hover:shadow-2xl transition-all duration-300 border border-border group-hover:border-primary/50 relative overflow-hidden h-full">
                {/* Hover Gradient Overlay */}
                <div className={`absolute inset-0 ${feature.bgColor} opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-3xl`} />

                <div className="relative z-10">
                  <motion.div
                    className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <feature.icon className="w-10 h-10 text-white" />
                  </motion.div>

                  <h3 className={`text-xl mb-4 group-hover:${feature.textColor} transition-colors font-instrument font-normal`}>
                    {feature.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors font-instrument font-normal">
                    {feature.description}
                  </p>
                </div>

                {/* Decorative Corner */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced CTA Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="bg-card rounded-3xl p-8 md:p-16 shadow-xl border border-border relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }} />
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center bg-primary/10 backdrop-blur-sm border border-primary/20 text-primary px-6 py-3 rounded-full text-sm font-instrument font-normal shadow-lg mb-8">
                <Users className="w-4 h-4 mr-2" />
                Join 10,000+ Happy Foodies
              </div>

              <h3 className="text-2xl md:text-3xl text-foreground mb-6 font-instrument font-normal">
                Ready to Indulge in Jabbrr Afghani?
              </h3>

              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed font-instrument font-normal">
                Join thousands of satisfied customers who trust Jabbrr Afghani for their cravings
                and enjoy premium quality food with guaranteed satisfaction.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <motion.button
                  onClick={() => navigate('/menu')}
                  className="group bg-primary hover:bg-primary/90 text-white px-10 py-5 rounded-2xl font-normal text-lg shadow-xl font-instrument"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-center">
                    <Zap className="w-6 h-6 mr-3" />
                    Order Your Meal
                    <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.button>

                <motion.button
                  onClick={() => navigate('/about')}
                  className="bg-background text-foreground px-10 py-5 rounded-2xl font-normal text-lg border-2 border-border hover:border-primary shadow-lg transition-all duration-300 font-instrument"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Learn About Our Story
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;