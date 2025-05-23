
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center blueprint-bg">
      <div className="text-center bg-white p-10 rounded-lg shadow-lg max-w-md">
        <Building2 className="h-16 w-16 text-blueprint mx-auto mb-4" />
        <h1 className="text-5xl font-bold mb-4 text-gray-900">404</h1>
        <p className="text-xl text-gray-600 mb-6">
          Oops! We couldn't find the blueprint for this page.
        </p>
        <Link to="/">
          <Button size="lg" className="w-full">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
