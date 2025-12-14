"use client";
import {
  Anchor,
  Users,
  Calculator,
  Shield,
  ChevronRight,
  Target,
  BookOpen,
} from "lucide-react";

export type TabType =
  | "internal"
  | "counterpart"
  | "strategy"
  | "battlecard"
  | "reflection";

interface SidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

interface NavItem {
  id: TabType;
  label: string;
  sublabel: string;
  icon: React.ElementType;
  color: string;
  hoverColor: string;
}

const navItems: NavItem[] = [
  {
    id: "internal",
    label: "Internal Analysis",
    sublabel: "Know Thyself",
    icon: Target,
    color: "var(--blue)",
    hoverColor: "#1a6fc7",
  },
  {
    id: "counterpart",
    label: "Counterpart Analysis",
    sublabel: "Know The Enemy",
    icon: Users,
    color: "var(--purple)",
    hoverColor: "#7851a3",
  },
  {
    id: "strategy",
    label: "Strategy Tools",
    sublabel: "The Math",
    icon: Calculator,
    color: "var(--green)",
    hoverColor: "#0b6159",
  },
  {
    id: "battlecard",
    label: "Battle Card",
    sublabel: "Game Day",
    icon: Shield,
    color: "var(--orange)",
    hoverColor: "#b8610a",
  },
  {
    id: "reflection",
    label: "Reflection",
    sublabel: "Learn & Share",
    icon: BookOpen,
    color: "var(--pink)",
    hoverColor: "#d1478b",
  },
];

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside className="w-72 bg-card-bg border-r border-card-border flex flex-col h-screen">
      {/* Logo/Header */}
      <div className="p-6 border-b border-card-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
            <Anchor className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">Anchor</h1>
            <p className="text-xs text-muted">Negotiation Prep Tool</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              style={{
                backgroundColor: isActive ? item.color : "transparent",
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-left group ${
                isActive
                  ? "text-white shadow-sm"
                  : "text-foreground hover:bg-hover-bg"
              }`}
            >
              <Icon
                className="w-5 h-5 transition-colors"
                style={{ color: isActive ? "white" : item.color }}
              />
              <div className="flex-1">
                <div className="font-medium text-sm">{item.label}</div>
                <div
                  className={`text-xs ${
                    isActive ? "text-white/80" : "text-muted"
                  }`}
                >
                  {item.sublabel}
                </div>
              </div>
              <ChevronRight
                className={`w-4 h-4 transition-transform ${
                  isActive
                    ? "translate-x-1"
                    : "opacity-0 group-hover:opacity-100"
                }`}
              />
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-card-border">
        <div className="text-xs text-muted text-center">
          Negotiation Strategy Dashboard
        </div>
      </div>
    </aside>
  );
}
