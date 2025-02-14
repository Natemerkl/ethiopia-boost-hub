
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import CampaignsList from "@/pages/CampaignsList";
import CampaignDetails from "@/pages/CampaignDetails";
import CreateCampaign from "@/pages/CreateCampaign";
import AdminDashboard from "@/pages/AdminDashboard";
import HowItWorks from "@/pages/HowItWorks";
import About from "@/pages/About";
import Testimonials from "@/pages/Testimonials";
import AuthLayout from "@/pages/auth/AuthLayout";
import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen pt-16">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/campaigns" element={<CampaignsList />} />
              <Route path="/campaigns/create" element={<CreateCampaign />} />
              <Route path="/campaigns/:id" element={<CampaignDetails />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/about" element={<About />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/auth" element={<AuthLayout />}>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <Toaster />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
