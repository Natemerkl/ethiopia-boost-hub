
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tables } from "@/integrations/supabase/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export default function CampaignDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const { toast } = useToast();
  const [donationAmount, setDonationAmount] = useState("");

  const { data: campaign, isLoading } = useQuery({
    queryKey: ["campaign", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("campaigns")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as Tables<"campaigns">;
    },
  });

  const calculateProgress = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "ETB",
    }).format(amount);
  };

  const handleDonate = async () => {
    if (!user) {
      toast({
        title: "Error",
        description: "Please log in to make a donation",
        variant: "destructive",
      });
      return;
    }

    const amount = parseFloat(donationAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid donation amount",
        variant: "destructive",
      });
      return;
    }

    try {
      // Create the donation record
      const { error: donationError } = await supabase.from("donations").insert({
        campaign_id: id,
        donor_id: user.id,
        amount: amount,
        payment_status: "completed", // In a real app, this would be set after payment confirmation
      });

      if (donationError) throw donationError;

      // Update the campaign's current amount
      const { error: updateError } = await supabase.rpc("update_campaign_amount", {
        campaign_id: id,
        donation_amount: amount,
      });

      if (updateError) throw updateError;

      toast({
        title: "Success",
        description: "Thank you for your donation!",
      });
      
      setDonationAmount("");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (!campaign) return <div>Campaign not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/campaigns" className="text-primary hover:underline mb-4 block">
        ← Back to Campaigns
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {campaign.image_url && (
            <img
              src={campaign.image_url}
              alt={campaign.title}
              className="w-full h-96 object-cover rounded-lg mb-6"
            />
          )}
          <h1 className="text-3xl font-bold mb-4">{campaign.title}</h1>
          <p className="text-gray-600 mb-6">{campaign.description}</p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Progress</CardTitle>
              <CardDescription>Help us reach our goal!</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress
                value={calculateProgress(
                  campaign.current_amount,
                  campaign.goal_amount
                )}
                className="mb-4"
              />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Raised</span>
                  <span className="font-bold">
                    {formatCurrency(campaign.current_amount)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Goal</span>
                  <span>{formatCurrency(campaign.goal_amount)}</span>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  min="0"
                  step="0.01"
                />
                <Button className="w-full" onClick={handleDonate}>
                  Donate Now
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Campaign Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <span className="font-semibold">Category:</span>
                <span className="ml-2">{campaign.category}</span>
              </div>
              <div>
                <span className="font-semibold">End Date:</span>
                <span className="ml-2">
                  {new Date(campaign.end_date).toLocaleDateString()}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
