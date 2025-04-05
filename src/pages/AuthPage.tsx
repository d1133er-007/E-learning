import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";
import { BookOpen } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/ui/page-transition";

export default function AuthPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const isSignup = location.pathname === "/signup";
  const [activeTab, setActiveTab] = useState(isSignup ? "signup" : "login");
  const { user, error, clearError, formSubmitting } = useAuth();

  // Show loading toast when form is submitting
  useEffect(() => {
    if (formSubmitting) {
      toast.loading("Processing your request...");
    }
  }, [formSubmitting]);

  // Handle successful authentication
  useEffect(() => {
    if (user) {
      toast.dismiss(); // Dismiss any loading toasts
      toast.success("Authentication successful", {
        description: `Welcome back, ${user.email}!`,
        duration: 3000,
      });
      navigate("/dashboard"); // Redirect to dashboard
    }
  }, [user, navigate]);

  // Handle authentication errors
  useEffect(() => {
    if (error) {
      toast.dismiss(); // Dismiss any loading toasts
      toast.error("Authentication failed", {
        description: error,
        duration: 5000,
      });
      clearError();
    }
  }, [error, clearError]);

  // Update URL when tab changes
  useEffect(() => {
    const path = activeTab === "signup" ? "/signup" : "/login";
    if (location.pathname !== path) {
      navigate(path, { replace: true });
    }
  }, [activeTab, navigate, location.pathname]);

  return (
    <PageTransition className="bg-slate-50 flex flex-col items-center justify-center p-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="flex items-center justify-center mb-6"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <BookOpen className="h-10 w-10 text-primary mr-2" />
          <h1 className="text-2xl font-bold">IELTS & PTE Prep</h1>
        </motion.div>

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
      </motion.div>
    </PageTransition>
  );
}
