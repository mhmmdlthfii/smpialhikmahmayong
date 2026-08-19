import React from 'react';
import * as LucideIcons from 'lucide-react';

interface DynamicIconProps {
  name: string;
  className?: string;
  size?: number;
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({ name, className = 'w-5 h-5', size = 20 }) => {
  // Normalize name to PascalCase
  const iconName = name
    ? name.charAt(0).toUpperCase() + name.slice(1).replace(/-([a-z])/g, (g) => g[1].toUpperCase())
    : 'HelpCircle';

  const IconComponent = (LucideIcons as any)[iconName] || (LucideIcons as any)[name] || LucideIcons.Globe;

  return <IconComponent className={className} size={size} />;
};
