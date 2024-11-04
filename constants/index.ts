// NAVIGATION
export const NAV_LINKS = [
  { href: '/', key: 'home', label: 'Home' },
  { href: '/pricing', key: 'pricing', label: 'Pricing' },
  { href: '/FAQ', key: 'FAQs', label: 'FAQs' },
  { href: '/testimonials', key: 'testimonials', label: 'Testimonials' },
  { href: '/', key: 'contact_us', label: 'Contact Us' },
];

// CAMP SECTION
export const PEOPLE_URL = [
  '/person1.jpg',
  '/person2.JPG',
  '/person3.jpg',
  '/person4.jpg',
];

// FEATURES SECTION
export const FEATURES = [
  {
    title: 'Personalized Meal Plans',
    icon: '/bowl-icon.png',
    variant: 'green',
    description:
      'Customized meal plans tailored to your lifestyle, goals, and dietary needs. Every meal is a step toward a healthier you.',
  },
  {
    title: 'Progress Tracking & Goals',
    icon: '/calendar.svg',
    variant: 'green',
    description:
      "Set wellness goals, track your progress, and celebrate achievements. Stay motivated with real-time insights.",
  },
  {
    title: 'Expert Guidance',
    icon: '/tech.svg',
    variant: 'green',
    description:
      'Access trusted advice from our qualified nutritionists, providing support and answers whenever you need them.',
  },
  {
    title: 'Fresh Recipes & Tips',
    icon: '/recipe.png',
    variant: 'orange',
    description:
      'Enjoy an ever-growing library of healthy recipes and wellness tips, keeping your journey enjoyable and informed.',
  },
];

// FOOTER SECTION
export const FOOTER_LINKS = [
  {
    title: 'Learn More',
    links: [
      { label: 'Pricing', url: '/pricing' },
      { label: 'FAQs', url: '/FAQ' },
      { label: 'Privacy Policy', url: '/privacy' },
      { label: 'Contact Us', url: '/contact' },
    ],
  },
  {
    title: 'Our Community',
    links: [
      { label: 'Testimonials', url: '/testimonials' },
      { label: 'About Us', url: '/about' },
    ],
  },
];

export const FOOTER_CONTACT_INFO = {
  title: 'Contact Us',
  links: [
    { label: 'Phone', value: '+91 971 772 2199' },
    { label: 'Email', value: 'nutreyvibes@gmail.com' },
  ],
};

export const SOCIALS = {
  title: 'Follow Us',
  links: [
    { label: 'Instagram', url: 'https://www.instagram.com/nutreyvibes/', icon: '/instagram.svg' },
    { label: 'YouTube', url: 'https://www.youtube.com/@nutreyvibes', icon: '/youtube.svg' },
  ],
};

export const FAQ_DATA = [
  {
    question: "What is NutreyVibes, and how does it work?",
    answer: "NutreyVibes is a personalized nutrition and wellness service designed to help you achieve a healthier lifestyle. We create customized meal plans based on your goals, dietary preferences, and health needs, and provide ongoing support through weekly check-ins, progress tracking, and access to our expert nutritionists."
  },
  {
    question: "How do I get started with NutreyVibes?",
    answer: "Getting started is easy! Simply choose a plan that fits your needs, and book an initial consultation. During this consultation, we'll discuss your goals, lifestyle, and any specific health concerns to design a tailored plan that works for you."
  },
  {
    question: "What if I have dietary restrictions or specific health conditions?",
    answer: "Our meal plans are fully customizable. Whether you have food allergies, dietary preferences (like vegetarian or vegan), or specific health conditions, we take these into account to create a plan that's both effective and safe for you."
  },
  {
    question: "What kind of support will I receive?",
    answer: "We provide ongoing support through weekly follow-up calls, regular progress tracking, and 24/7 chat access for quick questions or advice. You'll also receive monthly progress reports and access to exclusive wellness resources and recipes."
  },
  {
    question: "Are detox diets included in the plans?",
    answer: "Yes, detox diets are included as part of our services. We provide safe, nutritionist-approved detox plans to help you cleanse and refresh your system, which can be integrated into your overall wellness plan."
  },
  {
    question: "How often are meal plans updated?",
    answer: "Meal plans are regularly adjusted based on your progress, feedback, and any changes in your goals or lifestyle. Typically, updates are made during weekly or monthly check-ins to ensure your plan stays effective and enjoyable."
  },
  {
    question: "What results can I expect?",
    answer: "Results vary based on individual goals and commitment, but many clients experience increased energy, improved health markers, weight management, and overall better well-being within a few months. We focus on sustainable, long-term results rather than quick fixes."
  },
  {
    question: "Is NutreyVibes suitable for weight loss?",
    answer: "Absolutely. Our personalized plans are designed to support a range of goals, including weight loss, muscle gain, energy boosting, and overall health improvement. We help you achieve these goals in a sustainable, healthy way."
  },
  {
    question: "Do you offer group or family plans?",
    answer: "Yes, we do! We encourage family and friends to join the wellness journey together. Contact us to learn more about our group and family plan options for a more customized approach."
  },
  {
    question: "How is NutreyVibes different from other diet plans?",
    answer: "NutreyVibes provides a holistic approach, combining personalized nutrition, real-time support, and expert guidance. Our plans are tailored to fit your unique lifestyle, making it easier to maintain and enjoy your wellness journey. Plus, we prioritize sustainable changes that make a lasting impact."
  },
  {
    question: "How do I access NutreyVibes' resources and community?",
    answer: "When you sign up for a plan, you'll receive access to our exclusive wellness resources, including recipes, wellness tips, and a supportive community. This community offers a space to share experiences, ask questions, and find motivation on your journey."
  },
  {
    question: "What is included in the monthly progress report?",
    answer: "Our monthly reports include insights on your health metrics, progress towards your goals, areas of improvement, and suggested adjustments to keep you on track. These reports are a valuable way to stay motivated and informed about your wellness journey."
  },
  {
    question: "What if I'm not satisfied with my plan?",
    answer: "Your satisfaction is our priority. If you feel that the plan isn't working for you, let us know, and we'll work together to make adjustments. We're committed to providing you with a plan that meets your needs and goals."
  },
  {
    question: "How do I contact NutreyVibes for additional questions?",
    answer: "You can reach us via phone at +91 971 772 2199 or email at nutreyvibes@gmail.com. We're here to answer any questions you may have and help you get started on your wellness journey!"
  }
]

export interface Testimonial {
  content: string;
  author: string;
  position: string;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    content: "NutreyVibes has completely changed the way I approach food and wellness. The personalized meal plans are easy to follow and delicious, making it simple to stick to my goals. The weekly check-ins and expert advice have kept me motivated, and I’ve never felt healthier or more energetic! Highly recommend for anyone looking to make a lasting change.",
    author: "Ayushi",
    position: "@ayushiish16",
    avatar: "/person2.JPG"
  },
  {
    content: "I've tried a recipe for disaster with countless diets, but nothing felt sustainable until now. The personalized approach was the icing on the cake, and the weekly follow-ups kept me from biting off more than I could chew without feeling pressured. The recipes are simple, tasty, and fit seamlessly into my lifestyle like a well-oiled machine. I've never felt more balanced and confident about my health – it's the cherry on top!",
    author: "Kashni",
    position: "@busy.wittymom",
    avatar: "/person4.jpg"
  },
  {
    content: "Dealing with PCOD was like being stuck in a never-ending loop of frustration, but when i started taking diet from Preeti ma’am, it was like someone finally hit the reset button. She is like a health ninja - she sliced through my struggles, whipped up a personalized meal plan, and voila! My symptoms started doing the disappearing act. It was ridiculously refreshing to have someone cheering me on and helping me take control of my health, and honestly, this whole journey has been a wild, wonderful ride!!",
    author: "Nupur",
    position: "@nupsiiee",
    avatar: "/person1.jpg"
  },
  {
    content: "Preeti aunty’s guidance helped me stay committed to achieving my dream body when I felt like giving up. She showed me that my diet wasn't aligned with my goals and introduced me to a balanced diet, revealing areas for improvement I had previously overlooked. Working with Nutreyvibes has been a thoroughly satisfying and enjoyable experience! Much love ❤",
    author: "Yukti",
    position: "@yuktiiiii_",
    avatar: "/person3.jpg"
  },
]