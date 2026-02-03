import { supabase } from '@/integrations/supabase/client';

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string | null;
  image: string;
  text: string;
}

export const fetchTestimonials = async (): Promise<Testimonial[]> => {
  const { data, error } = await supabase
    .from('testimonials')
    .select('id, name, role, company, image_url, text')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }

  return data.map(testimonial => ({
    id: testimonial.id,
    name: testimonial.name,
    role: testimonial.role,
    company: testimonial.company,
    image: testimonial.image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=random`,
    text: testimonial.text
  }));
};

export const testimonials = [
  {
    text: "The Chicken Rolls are absolutely divine! They're the perfect balance of spice and flavor. My family can't get enough of them.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=faces",
    name: "Priya Sharma",
    role: "Foodie",
  },
  {
    text: "I ordered the Mutton Biryani for a family gathering and everyone was impressed. The aroma and taste were exceptional!",
    image: "https://images.unsplash.com/photo-1567532939604-b6b5b0e1607d?w=150&h=150&fit=crop&crop=faces",
    name: "Rajesh Patel",
    role: "Corporate Client",
  },
  {
    text: "As a vegetarian, I was thrilled to find such delicious Paneer Tikka Rolls. The spices are just right!",
    image: "https://images.unsplash.com/photo-1563375853373-15b7816d3c3d?w=150&h=150&fit=crop&crop=faces",
    name: "Ananya Desai",
    role: "Food Blogger",
  },
  {
    text: "The Chicken Biryani was the highlight of our Friday dinner. Everyone asked where I got it from - Jabbrr Afghani is the best!",
    image: "https://images.unsplash.com/photo-1549476464-37392f717541?w=150&h=150&fit=crop&crop=faces",
    name: "Meera Iyer",
    role: "Mother of Two",
  },
  {
    text: "I've tried Rolls from many places, but Jabbrr Afghani stands out for freshness and authenticity. Their Double Egg Roll is unmatched!",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=150&h=150&fit=crop&crop=faces",
    name: "Vikram Singh",
    role: "Food Critic",
  },
  {
    text: "Excellent customer service and fast delivery. The food arrived hot and well-packaged. Will definitely order again!",
    image: "https://images.unsplash.com/photo-1567532939604-b6b5b0e1607d?w=150&h=150&fit=crop&crop=faces",
    name: "Sunita Reddy",
    role: "Regular Customer",
  },
  {
    text: "The Veg Biryani was a hit at our office party. Flavorful, aromatic, and perfectly cooked rice. Highly recommended!",
    image: "https://images.unsplash.com/photo-1519351414974-61d8e594c5d6?w=150&h=150&fit=crop&crop=faces",
    name: "Arjun Malhotra",
    role: "Event Planner",
  },
  {
    text: "I appreciate the quality ingredients. It's clear that these rolls are made with care and love. My kids love them!",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=faces",
    name: "Kavita Nair",
    role: "Health-Conscious Parent",
  },
  {
    text: "The Afghani Chicken is the best I've ever had - tender, juicy, and perfectly spiced. It reminds me of authentic street food!",
    image: "https://images.unsplash.com/photo-1549476464-37392f717541?w=150&h=150&fit=crop&crop=faces",
    name: "Deepak Bose",
    role: "Food Lover",
  },
];