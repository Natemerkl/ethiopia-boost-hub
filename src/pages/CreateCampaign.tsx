
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GiftIcon, Target, Calendar, Image, Folder, PenLine } from "lucide-react";

const categories = [
  { value: "Education", label: "Education 📚", icon: "🎓" },
  { value: "Healthcare", label: "Healthcare 🏥", icon: "⚕️" },
  { value: "Emergency", label: "Emergency 🚨", icon: "🆘" },
  { value: "Community", label: "Community 🤝", icon: "👥" },
  { value: "Business", label: "Business 💼", icon: "📈" },
  { value: "Creative", label: "Creative 🎨", icon: "🎯" },
  { value: "Other", label: "Other 🌟", icon: "✨" },
];

export default function CreateCampaign() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goalAmount: "",
    category: "",
    endDate: "",
    imageUrl: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Implement campaign creation logic
    setLoading(false);
    navigate("/campaigns");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Start Your Campaign 🚀</h1>
          <p className="text-lg text-gray-600">
            Create your fundraising campaign and start making a difference today ✨
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xl font-semibold text-primary mb-2">
                <PenLine className="h-6 w-6" />
                <span>Campaign Details 📝</span>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="title">Campaign Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="transition-all hover:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Give your campaign a catchy title ✨"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Campaign Story</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="min-h-[150px] transition-all hover:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Tell your story and inspire others to support your cause 💝"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xl font-semibold text-primary mb-2">
                <Target className="h-6 w-6" />
                <span>Funding Goals 🎯</span>
              </div>

              <div className="space-y-2">
                <Label htmlFor="goalAmount">Target Amount</Label>
                <Input
                  id="goalAmount"
                  name="goalAmount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.goalAmount}
                  onChange={handleChange}
                  className="transition-all hover:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Set your fundraising goal 💰"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Campaign Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, category: value }))
                  }
                >
                  <SelectTrigger className="transition-all hover:border-primary focus:ring-2 focus:ring-primary/20">
                    <SelectValue placeholder="Select a category 📂" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        <span className="flex items-center gap-2">
                          <span>{category.icon}</span>
                          {category.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xl font-semibold text-primary mb-2">
                <Image className="h-6 w-6" />
                <span>Campaign Media 🖼️</span>
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl">Campaign Image URL</Label>
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  type="url"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="transition-all hover:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Add an image to make your campaign stand out 🌄"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xl font-semibold text-primary mb-2">
                <Calendar className="h-6 w-6" />
                <span>Campaign Duration ⏳</span>
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]}
                  className="transition-all hover:border-primary focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 h-12 text-lg font-semibold"
              >
                {loading ? "Creating... ⏳" : "Launch Campaign 🚀"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/campaigns")}
                className="h-12 text-lg font-semibold"
              >
                Cancel ↩️
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
