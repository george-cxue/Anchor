'use client';

import React from 'react';
import {
  Target,
  Users,
  Calculator,
  Shield,
  ChevronRight
} from 'lucide-react';

export type TabType = 'internal' | 'counterpart' | 'strategy' | 'battlecard';

interface SidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

interface NavItem {
  id: TabType;
  label: string;
  sublabel: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  {
    id: 'internal',
    label: 'Internal Analysis',
    sublabel: 'Know Thyself',
    icon: Target
  },
  {
    id: 'counterpart',
    label: 'Counterpart Analysis',
    sublabel: 'Know The Enemy',
    icon: Users
  },
  {
    id: 'strategy',
    label: 'Strategy Tools',
    sublabel: 'The Math',
    icon: Calculator
  },
  {
    id: 'battlecard',
    label: 'Battle Card',
    sublabel: 'Game Day',
    icon: Shield
  },
];

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside className="w-72 bg-[var(--card-bg)] border-r border-[var(--card-border)] flex flex-col h-screen">
      {/* Logo/Header */}
      <div className="p-6 border-b border-[var(--card-border)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[var(--accent)] flex items-center justify-center">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-[var(--foreground)]">NegotiateIQ</h1>
            <p className="text-xs text-[var(--muted)]">Strategic Prep Tool</p>
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
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-left group ${
                isActive
                  ? 'bg-[var(--accent)] text-white'
                  : 'text-[var(--foreground)] hover:bg-[var(--card-border)]'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-[var(--muted)]'}`} />
              <div className="flex-1">
                <div className="font-medium text-sm">{item.label}</div>
                <div className={`text-xs ${isActive ? 'text-blue-100' : 'text-[var(--muted)]'}`}>
                  {item.sublabel}
                </div>
              </div>
              <ChevronRight className={`w-4 h-4 transition-transform ${
                isActive ? 'translate-x-1' : 'opacity-0 group-hover:opacity-100'
              }`} />
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[var(--card-border)]">
        <div className="text-xs text-[var(--muted)] text-center">
          Negotiation Strategy Dashboard
        </div>
      </div>
    </aside>
  );
}
