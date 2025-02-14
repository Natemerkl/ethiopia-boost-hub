
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Sparkles, Globe } from "lucide-react";

export default function Index() {
  const features = [
    {
      icon: Heart,
      title: "Support Local Causes 💝",
      description: "Help Ethiopian projects and dreams come true"
    },
    {
      icon: Users,
      title: "Community Driven 🤝",
      description: "Join thousands making a difference"
    },
    {
      icon: Sparkles,
      title: "Easy to Start ✨",
      description: "Create your campaign in minutes"
    },
    {
      icon: Globe,
      title: "Global Impact 🌍",
      description: "Reach supporters worldwide"
    }
  ];

  return (
    <div className="container mx-auto px-4">
      <div className="py-16 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Empowering Ethiopian Dreams 🚀
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Join YegnaBoost, Ethiopia's premier crowdfunding platform where dreams become reality through community support ✨
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button asChild size="lg" className="animate-pulse">
            <Link to="/campaigns/create">Start Your Campaign 🎯</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/campaigns">Discover Projects 🔍</Link>
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {features.map((feature, index) => (
          <Card key={index} className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="max-w-4xl mx-auto text-center pb-16">
        <h2 className="text-3xl font-bold mb-8">Ready to Make a Difference? 💫</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Start a Campaign 🚀</h3>
              <p className="text-gray-600 mb-6">
                Share your story and start raising funds for your cause today
              </p>
              <Button asChild className="w-full">
                <Link to="/campaigns/create">Get Started</Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Support Others 💝</h3>
              <p className="text-gray-600 mb-6">
                Browse campaigns and support causes that matter to you
              </p>
              <Button asChild className="w-full">
                <Link to="/campaigns">Discover Now</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
