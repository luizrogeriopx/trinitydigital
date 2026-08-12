import {
  BarChart3,
  Code2,
  Gauge,
  Globe,
  LifeBuoy,
  Megaphone,
  PenLine,
  Plug,
  Rocket,
  Search,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Target,
  TrendingUp,
  Workflow,
  type LucideIcon,
} from "lucide-react";

const icones: Record<string, LucideIcon> = {
  BarChart3,
  Code2,
  Gauge,
  Globe,
  LifeBuoy,
  Megaphone,
  PenLine,
  Plug,
  Rocket,
  Search,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Target,
  TrendingUp,
  Workflow,
};

export function Icon({ name, className }: { name: string; className?: string }) {
  const Component = icones[name] ?? Sparkles;
  return <Component className={className} aria-hidden="true" />;
}
