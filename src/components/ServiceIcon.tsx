import {
  Briefcase,
  Globe,
  GraduationCap,
  Landmark,
  Stethoscope,
  Plane,
  Building2,
  Compass,
} from 'lucide-react';
import type { ServiceIconName } from '../data/services';

const iconMap = {
  Briefcase,
  Globe,
  GraduationCap,
  Landmark,
  Stethoscope,
  Plane,
  Building2,
  Compass,
};

export function ServiceIcon({
  name,
  className = 'w-5 h-5',
}: {
  name: ServiceIconName;
  className?: string;
}) {
  const Icon = iconMap[name] || Globe;
  return <Icon className={className} strokeWidth={1.75} aria-hidden="true" />;
}
