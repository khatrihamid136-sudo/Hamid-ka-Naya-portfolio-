import React from 'react';
import {
  Sparkles,
  LayoutGrid,
  Megaphone,
  Box,
  FileText,
  Video,
  Globe,
  Users,
  Star,
  CheckCircle2,
  TrendingUp,
  Layers,
  Wrench,
  Monitor,
  Palette,
  Package,
  ArrowRight,
  ArrowUpRight,
  Send,
  Mail,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  X,
  Menu,
  Lock,
  Edit3,
  Trash2,
  Plus,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Award
} from 'lucide-react';

interface DynamicIconProps {
  name: string;
  className?: string;
  size?: number;
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({ name, className = "w-5 h-5", size }) => {
  const normalized = name.toLowerCase().replace(/[^a-z0-9]/g, '');

  switch (normalized) {
    case 'sparkle':
    case 'sparkles':
      return <Sparkles className={className} size={size} />;
    case 'layoutgrid':
    case 'grid':
      return <LayoutGrid className={className} size={size} />;
    case 'megaphone':
    case 'ad':
    case 'advertising':
      return <Megaphone className={className} size={size} />;
    case 'box':
    case 'package':
    case 'packaging':
      return <Box className={className} size={size} />;
    case 'filetext':
    case 'file':
    case 'print':
      return <FileText className={className} size={size} />;
    case 'video':
    case 'youtube':
    case 'play':
      return <Video className={className} size={size} />;
    case 'globe':
    case 'web':
    case 'internet':
      return <Globe className={className} size={size} />;
    case 'users':
    case 'user':
    case 'clients':
      return <Users className={className} size={size} />;
    case 'star':
    case 'rating':
      return <Star className={className} size={size} />;
    case 'check':
    case 'checkcircle':
    case 'checkcircle2':
      return <CheckCircle2 className={className} size={size} />;
    case 'trendingup':
    case 'growth':
      return <TrendingUp className={className} size={size} />;
    case 'layers':
      return <Layers className={className} size={size} />;
    case 'wrench':
    case 'tool':
    case 'tools':
      return <Wrench className={className} size={size} />;
    case 'monitor':
      return <Monitor className={className} size={size} />;
    case 'palette':
      return <Palette className={className} size={size} />;
    case 'award':
      return <Award className={className} size={size} />;
    default:
      return <Sparkles className={className} size={size} />;
  }
};
