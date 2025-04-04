import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";
import { BookOpen } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export default function AuthPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const isSignup = location.pathname === "/signup";
  const [activeTab, setActiveTab] = useState(isSignup ? "signup" : "login");
  const { user, error, clearError } = useAuth();

  // Handle successful authentication
  useEffect(() => {
    if (user) {
      toast.success("Authentication successful", {
        description: "Welcome to IELTS & PTE Prep!",
        duration: 3000,
      });
      navigate("/");
    }
  }, [user, navigate]);

  // Handle authentication errors
  useEffect(() => {
    if (error) {
      toast.error("Authentication failed", {
        description: error,
        duration: 5000,
      });
      clearError();
    }
  }, [error, clearError]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-6">
          <BookOpen className="h-10 w-10 text-primary mr-2" />
          <h1 className="text-2xl font-bold">IELTS & PTE Prep</h1>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm />
          </TabsContent>
          <TabsContent value="signup">
            <SignupForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
