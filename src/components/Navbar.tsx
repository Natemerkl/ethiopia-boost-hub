
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";

export default function Navbar() {
  const { user, isAdmin, signOut } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-primary">
            YegnaBoost 🚀
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/campaigns"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Browse Campaigns
            </Link>
            <Link
              to="/how-it-works"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              How It Works
            </Link>
            <Link
              to="/about"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link
              to="/testimonials"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Testimonials
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Button asChild variant="outline">
                  <Link to="/campaigns/create">Start Campaign 🎯</Link>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    {isAdmin && (
                      <DropdownMenuItem asChild>
                        <Link to="/admin">Admin Dashboard 🎯</Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem asChild>
                      <Link to="/profile">My Profile 👤</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/campaigns">My Campaigns 📊</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => signOut()}
                    >
                      Sign Out 👋
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button asChild variant="ghost">
                  <Link to="/auth/login">Log In 👋</Link>
                </Button>
                <Button asChild>
                  <Link to="/auth/signup">Sign Up 🚀</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
