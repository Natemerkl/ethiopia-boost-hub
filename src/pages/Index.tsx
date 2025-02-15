
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
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

export default function Index() {
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

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
      <div className="py-24 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Empowering Ethiopian <span className="text-primary">Innovation</span>
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
          Join the movement to support and fund the next generation of Ethiopian creators, entrepreneurs, and changemakers.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button 
            asChild 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-white px-8 rounded-full"
          >
            <Link to="/campaigns/create">Start Your Campaign</Link>
          </Button>
          <Button 
            asChild 
            variant="outline" 
            size="lg"
            className="px-8 rounded-full"
          >
            <Link to="/campaigns">Explore Projects</Link>
          </Button>
        </div>
      </div>

      <div className="mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Campaigns</h2>
          <p className="text-gray-600">
            Discover innovative projects making a difference in Ethiopia
          </p>
        </div>

        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {campaigns?.map((campaign) => (
              <CarouselItem key={campaign.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Link to={`/campaigns/${campaign.id}`}>
                  <Card className="hover:shadow-lg transition-shadow overflow-hidden">
                    <CardContent className="p-0">
                      <img
                        src={campaign.image_url || "/placeholder.svg"}
                        alt={campaign.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-6">
                        <div className="text-primary text-sm mb-2">
                          {campaign.category}
                        </div>
                        <h3 className="font-semibold text-xl mb-2 line-clamp-2">
                          {campaign.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {campaign.description}
                        </p>
                        <Progress 
                          value={(campaign.current_amount / campaign.goal_amount) * 100}
                          className="mb-4 h-2 bg-gray-100"
                        />
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>{campaign.current_amount?.toLocaleString()} ETB raised</span>
                          <span>{Math.round((campaign.current_amount / campaign.goal_amount) * 100)}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="-left-12" />
            <CarouselNext className="-right-12" />
          </div>
        </Carousel>
      </div>
    </div>
  );
}
