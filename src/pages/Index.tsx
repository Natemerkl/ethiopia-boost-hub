
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export default function Index() {
  const { data: campaigns } = useQuery({
    queryKey: ["featured-campaigns"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("campaigns")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(6);

      if (error) throw error;
      return data;
    }
  });

  return (
    <div className="container mx-auto px-4">
      <div className="py-16 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Discover fundraisers inspired by what you care about
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Join our crowdfunding platform where dreams become reality through community support
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button asChild size="lg">
            <Link to="/campaigns/create">Start Your Campaign</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/campaigns">Discover Projects</Link>
          </Button>
        </div>
      </div>

      <div className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Campaigns</h2>
          <Button variant="outline" asChild>
            <Link to="/campaigns">View All</Link>
          </Button>
        </div>

        <Carousel className="relative">
          <CarouselContent>
            {campaigns?.map((campaign) => (
              <CarouselItem key={campaign.id} className="md:basis-1/2 lg:basis-1/3">
                <Link to={`/campaigns/${campaign.id}`}>
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="relative">
                        <img
                          src={campaign.image_url || "/placeholder.svg"}
                          alt={campaign.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded text-sm">
                          {campaign.donation_count || 0} donations
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                          {campaign.title}
                        </h3>
                        <Progress 
                          value={(campaign.amount_raised / campaign.goal_amount) * 100}
                          className="mb-2"
                        />
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>ETB {campaign.amount_raised.toLocaleString()}</span>
                          <span>{Math.round((campaign.amount_raised / campaign.goal_amount) * 100)}% raised</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-16">
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Start a Campaign</h3>
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
            <h3 className="text-xl font-semibold mb-4">Support Others</h3>
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
  );
}
