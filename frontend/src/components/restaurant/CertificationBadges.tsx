import React from 'react';
import { Badge } from '@/components/ui/badge';

interface Certifications {
  halal: boolean;
  kosher: boolean;
  vegan: boolean;
  vegetarian: boolean;
}

interface CertificationBadgesProps {
  certifications: Certifications;
}

export function CertificationBadges({ certifications }: CertificationBadgesProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {certifications.halal && (
        <Badge className="bg-green-100 text-green-800">
          ☪️ Halal Certified
        </Badge>
      )}
      {certifications.kosher && (
        <Badge className="bg-blue-100 text-blue-800">
          ✡️ Kosher Certified
        </Badge>
      )}
      {certifications.vegan && (
        <Badge className="bg-purple-100 text-purple-800">
          🌱 Vegan
        </Badge>
      )}
      {certifications.vegetarian && (
        <Badge className="bg-yellow-100 text-yellow-800">
          🥬 Vegetarian
        </Badge>
      )}
    </div>
  );
}