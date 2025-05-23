
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  return (
    <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-2">
        <div className="bg-blueprint/10 p-3 rounded-lg inline-flex mb-3">
          <Icon className="h-6 w-6 text-blueprint" />
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-600">{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
