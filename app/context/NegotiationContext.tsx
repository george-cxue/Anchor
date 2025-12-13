'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

// Types
export interface BATNAOption {
  id: string;
  description: string;
  value: number;
  probability: number;
}

export interface NegotiableIssue {
  id: string;
  name: string;
  points: number;
  priority: 'high' | 'medium' | 'low';
}

export interface IfThenScript {
  id: string;
  trigger: string;
  response: string;
}

export interface CounterpartProfile {
  positions: string;
  interests: string;
  constraints: string;
}

export interface EVScenario {
  bestCaseValue: number;
  bestCaseProbability: number;
  worstCaseValue: number;
  worstCaseProbability: number;
}

export interface NegotiationState {
  // Module 1: Internal Analysis
  batnaOptions: BATNAOption[];
  reservationPrice: number;
  issues: NegotiableIssue[];

  // Module 2: Counterpart Analysis
  counterpartProfile: CounterpartProfile;
  estimatedCounterpartReservation: number;

  // Module 3: Strategy Tools
  evScenario: EVScenario;
  ifThenScripts: IfThenScript[];

  // Module 4: Battle Card
  openingAnchor: number | null;
}

interface NegotiationContextType {
  state: NegotiationState;
  // BATNA actions
  addBATNAOption: () => void;
  updateBATNAOption: (id: string, field: keyof BATNAOption, value: string | number) => void;
  removeBATNAOption: (id: string) => void;
  getWeightedBATNA: () => number;

  // Reservation Price
  setReservationPrice: (price: number) => void;

  // Issues actions
  addIssue: () => void;
  updateIssue: (id: string, field: keyof NegotiableIssue, value: string | number) => void;
  removeIssue: (id: string) => void;

  // Counterpart Profile
  updateCounterpartProfile: (field: keyof CounterpartProfile, value: string) => void;
  setEstimatedCounterpartReservation: (price: number) => void;

  // EV Scenario
  updateEVScenario: (field: keyof EVScenario, value: number) => void;
  calculateEV: () => number;

  // If/Then Scripts
  addIfThenScript: () => void;
  updateIfThenScript: (id: string, field: 'trigger' | 'response', value: string) => void;
  removeIfThenScript: (id: string) => void;

  // Battle Card
  setOpeningAnchor: (value: number | null) => void;
  getCalculatedAnchor: () => number;
}

const generateId = () => Math.random().toString(36).substring(2, 9);

const initialState: NegotiationState = {
  batnaOptions: [
    { id: generateId(), description: '', value: 0, probability: 50 }
  ],
  reservationPrice: 0,
  issues: [],
  counterpartProfile: {
    positions: '',
    interests: '',
    constraints: ''
  },
  estimatedCounterpartReservation: 0,
  evScenario: {
    bestCaseValue: 0,
    bestCaseProbability: 50,
    worstCaseValue: 0,
    worstCaseProbability: 50
  },
  ifThenScripts: [],
  openingAnchor: null
};

const NegotiationContext = createContext<NegotiationContextType | undefined>(undefined);

export function NegotiationProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<NegotiationState>(initialState);

  // BATNA actions
  const addBATNAOption = () => {
    setState(prev => ({
      ...prev,
      batnaOptions: [
        ...prev.batnaOptions,
        { id: generateId(), description: '', value: 0, probability: 50 }
      ]
    }));
  };

  const updateBATNAOption = (id: string, field: keyof BATNAOption, value: string | number) => {
    setState(prev => ({
      ...prev,
      batnaOptions: prev.batnaOptions.map(opt =>
        opt.id === id ? { ...opt, [field]: value } : opt
      )
    }));
  };

  const removeBATNAOption = (id: string) => {
    setState(prev => ({
      ...prev,
      batnaOptions: prev.batnaOptions.filter(opt => opt.id !== id)
    }));
  };

  const getWeightedBATNA = () => {
    return state.batnaOptions.reduce((sum, opt) => {
      return sum + (opt.value * (opt.probability / 100));
    }, 0);
  };

  // Reservation Price
  const setReservationPrice = (price: number) => {
    setState(prev => ({ ...prev, reservationPrice: price }));
  };

  // Issues actions
  const addIssue = () => {
    setState(prev => ({
      ...prev,
      issues: [
        ...prev.issues,
        { id: generateId(), name: '', points: 50, priority: 'medium' }
      ]
    }));
  };

  const updateIssue = (id: string, field: keyof NegotiableIssue, value: string | number) => {
    setState(prev => ({
      ...prev,
      issues: prev.issues.map(issue => {
        if (issue.id !== id) return issue;
        const updated = { ...issue, [field]: value };
        // Auto-calculate priority based on points
        if (field === 'points') {
          const points = value as number;
          if (points >= 70) updated.priority = 'high';
          else if (points >= 40) updated.priority = 'medium';
          else updated.priority = 'low';
        }
        return updated;
      })
    }));
  };

  const removeIssue = (id: string) => {
    setState(prev => ({
      ...prev,
      issues: prev.issues.filter(issue => issue.id !== id)
    }));
  };

  // Counterpart Profile
  const updateCounterpartProfile = (field: keyof CounterpartProfile, value: string) => {
    setState(prev => ({
      ...prev,
      counterpartProfile: { ...prev.counterpartProfile, [field]: value }
    }));
  };

  const setEstimatedCounterpartReservation = (price: number) => {
    setState(prev => ({ ...prev, estimatedCounterpartReservation: price }));
  };

  // EV Scenario
  const updateEVScenario = (field: keyof EVScenario, value: number) => {
    setState(prev => ({
      ...prev,
      evScenario: { ...prev.evScenario, [field]: value }
    }));
  };

  const calculateEV = () => {
    const { bestCaseValue, bestCaseProbability, worstCaseValue, worstCaseProbability } = state.evScenario;
    return (bestCaseValue * (bestCaseProbability / 100)) + (worstCaseValue * (worstCaseProbability / 100));
  };

  // If/Then Scripts
  const addIfThenScript = () => {
    setState(prev => ({
      ...prev,
      ifThenScripts: [
        ...prev.ifThenScripts,
        { id: generateId(), trigger: '', response: '' }
      ]
    }));
  };

  const updateIfThenScript = (id: string, field: 'trigger' | 'response', value: string) => {
    setState(prev => ({
      ...prev,
      ifThenScripts: prev.ifThenScripts.map(script =>
        script.id === id ? { ...script, [field]: value } : script
      )
    }));
  };

  const removeIfThenScript = (id: string) => {
    setState(prev => ({
      ...prev,
      ifThenScripts: prev.ifThenScripts.filter(script => script.id !== id)
    }));
  };

  // Battle Card
  const setOpeningAnchor = (value: number | null) => {
    setState(prev => ({ ...prev, openingAnchor: value }));
  };

  const getCalculatedAnchor = () => {
    return state.reservationPrice * 1.1; // 110% of reservation price
  };

  return (
    <NegotiationContext.Provider value={{
      state,
      addBATNAOption,
      updateBATNAOption,
      removeBATNAOption,
      getWeightedBATNA,
      setReservationPrice,
      addIssue,
      updateIssue,
      removeIssue,
      updateCounterpartProfile,
      setEstimatedCounterpartReservation,
      updateEVScenario,
      calculateEV,
      addIfThenScript,
      updateIfThenScript,
      removeIfThenScript,
      setOpeningAnchor,
      getCalculatedAnchor
    }}>
      {children}
    </NegotiationContext.Provider>
  );
}

export function useNegotiation() {
  const context = useContext(NegotiationContext);
  if (context === undefined) {
    throw new Error('useNegotiation must be used within a NegotiationProvider');
  }
  return context;
}
