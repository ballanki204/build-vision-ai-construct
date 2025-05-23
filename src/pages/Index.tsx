
import React from 'react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FeatureCard from '@/components/FeatureCard';
import ModelViewer from '@/components/ModelViewer';
import { 
  Building2, 
  BrainCircuit, 
  Box, 
  FileDown, 
  Paintbrush, 
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="blueprint-bg py-16 lg:py-24">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                Transform 2D Blueprints Into Interactive 3D Models
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Our AI-powered platform converts architectural blueprints into detailed 3D construction models in minutes, not hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="group">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline">
                  View Demo
                </Button>
              </div>
              <div className="mt-8 flex items-center">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-8 w-8 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs font-medium">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium">Trusted by 2,000+ architects and builders</p>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 h-[400px] lg:h-[500px] bg-white/50 backdrop-blur rounded-xl shadow-xl overflow-hidden">
              <ModelViewer />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 lg:py-24">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features for Your Construction Projects</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform provides everything you need to visualize, collaborate, and export your architectural designs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={BrainCircuit}
              title="AI Blueprint Analysis"
              description="Our advanced AI algorithms accurately detect and interpret architectural elements from your 2D blueprints."
            />
            <FeatureCard 
              icon={Box}
              title="Interactive 3D Models"
              description="Explore your designs in beautiful 3D with intuitive controls. Rotate, zoom, and inspect every detail."
            />
            <FeatureCard 
              icon={Paintbrush}
              title="Customization Tools"
              description="Modify materials, dimensions, and structural elements without needing 3D modeling expertise."
            />
            <FeatureCard 
              icon={FileDown}
              title="Export Options"
              description="Export your models in various formats (OBJ, STL, FBX) for use in other software or 3D printing."
            />
            <FeatureCard 
              icon={Building2}
              title="Project Management"
              description="Organize your architectural projects in one place with version history and collaboration features."
            />
            <FeatureCard 
              icon={ArrowRight}
              title="Instant Revisions"
              description="Make changes to your design and see them reflected instantly in the 3D model preview."
            />
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our streamlined process takes you from blueprint to 3D model in just three simple steps.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blueprint/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blueprint">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Upload Blueprint</h3>
              <p className="text-gray-600">
                Upload your architectural blueprint in JPG, PNG, PDF, or DXF format.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blueprint/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blueprint">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">AI Processing</h3>
              <p className="text-gray-600">
                Our AI algorithms analyze your blueprint and generate a detailed 3D model.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blueprint/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blueprint">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Customize & Export</h3>
              <p className="text-gray-600">
                Modify your 3D model as needed and export it in your preferred format.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/convert">
              <Button size="lg" className="group">
                Try It Now
                <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-blueprint text-white">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Architectural Designs?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of architects and construction professionals who are saving time and improving client presentations with our 3D model generator.
            </p>
            <Link to="/signup">
              <Button size="lg" variant="secondary" className="text-blueprint">
                Create Free Account
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
