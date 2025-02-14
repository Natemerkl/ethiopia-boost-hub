
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Abebe Bekele",
      role: "Education Campaign",
      image: "https://i.pravatar.cc/150?img=1",
      content: "YegnaBoost helped me raise funds for my community school project. The support was overwhelming! 🏫",
      rating: 5
    },
    {
      name: "Sara Mekonnen",
      role: "Healthcare Initiative",
      image: "https://i.pravatar.cc/150?img=2",
      content: "Thanks to this platform, we were able to fund medical supplies for our local clinic. Amazing community! 🏥",
      rating: 5
    },
    {
      name: "Daniel Tesfaye",
      role: "Tech Startup",
      image: "https://i.pravatar.cc/150?img=3",
      content: "The platform is user-friendly and the support team is incredible. Highly recommended! 💻",
      rating: 5
    },
    {
      name: "Hirut Alemayehu",
      role: "Community Project",
      image: "https://i.pravatar.cc/150?img=4",
      content: "YegnaBoost made it easy to share our story and connect with supporters worldwide. Thank you! 🌍",
      rating: 5
    },
    {
      name: "Yonas Haile",
      role: "Arts & Culture",
      image: "https://i.pravatar.cc/150?img=5",
      content: "Successfully funded our cultural festival through this platform. Great experience! 🎨",
      rating: 4
    },
    {
      name: "Bethlehem Assefa",
      role: "Environmental Campaign",
      image: "https://i.pravatar.cc/150?img=6",
      content: "The impact we've made through YegnaBoost is incredible. Together we're making Ethiopia greener! 🌱",
      rating: 5
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Success Stories 💫</h1>
        <p className="text-lg text-gray-600">
          Hear from our amazing community of campaign creators and supporters
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-600">{testimonial.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <div className="max-w-2xl mx-auto bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Your Campaign? 🚀</h2>
          <p className="text-gray-600 mb-6">
            Join our community of successful fundraisers and make your dreams a reality
          </p>
          <button className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-dark transition-colors">
            Start Fundraising Now ✨
          </button>
        </div>
      </div>
    </div>
  );
}
