import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Menu, X, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.nav
      className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm border-b border-border"
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <motion.div className="flex items-center" variants={itemVariants}>
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">EduPrep</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {[
              { name: "Courses", to: "/courses" },
              { name: "Practice Tests", to: "/tests" },
              { name: "Live Classes", to: "/classes" },
              { name: "About", to: "/about" },
            ].map((item) => (
              <motion.div key={item.name} variants={itemVariants}>
                <Link
                  to={item.to}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <motion.div variants={itemVariants}>
              <Button variant="ghost" asChild>
                <Link to="/login">Log in</Link>
              </Button>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Button asChild>
                <Link to="/signup">Sign up</Link>
              </Button>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Button variant="outline" asChild>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden bg-background border-b border-border",
          isOpen ? "block" : "hidden",
        )}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {[
            { name: "Dashboard", to: "/dashboard" },
            { name: "Courses", to: "/courses" },
            { name: "Practice Tests", to: "/tests" },
            { name: "Live Classes", to: "/classes" },
            { name: "About", to: "/about" },
          ].map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-4 pb-3 border-t border-border">
            <div className="flex items-center px-5 space-x-3">
              <Button variant="ghost" asChild className="w-full justify-start">
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  Log in
                </Link>
              </Button>
            </div>
            <div className="mt-3 px-2">
              <Button asChild className="w-full">
                <Link to="/signup" onClick={() => setIsOpen(false)}>
                  Sign up
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
