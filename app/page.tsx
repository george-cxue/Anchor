'use client';

import { useState } from 'react';
import { NegotiationProvider } from './context/NegotiationContext';
import Sidebar, { TabType } from './components/Sidebar';
import InternalAnalysis from './components/InternalAnalysis';
import CounterpartAnalysis from './components/CounterpartAnalysis';
import StrategyTools from './components/StrategyTools';
import BattleCard from './components/BattleCard';
import Reflection from './components/Reflection';

function NegotiationApp() {
  const [activeTab, setActiveTab] = useState<TabType>('internal');

  const renderContent = () => {
    switch (activeTab) {
      case 'internal':
        return <InternalAnalysis />;
      case 'counterpart':
        return <CounterpartAnalysis />;
      case 'strategy':
        return <StrategyTools />;
      case 'battlecard':
        return <BattleCard />;
      case 'reflection':
        return <Reflection />;
      default:
        return <InternalAnalysis />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-6xl">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <NegotiationProvider>
      <NegotiationApp />
    </NegotiationProvider>
  );
}
