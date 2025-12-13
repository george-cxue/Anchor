'use client';

import React from 'react';
import {
  Calculator,
  Plus,
  Trash2,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Percent,
  MessageSquare
} from 'lucide-react';
import { useNegotiation } from '../context/NegotiationContext';

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export default function StrategyTools() {
  const {
    state,
    updateEVScenario,
    calculateEV,
    addIfThenScript,
    updateIfThenScript,
    removeIfThenScript,
  } = useNegotiation();

  const ev = calculateEV();
  const { bestCaseValue, bestCaseProbability, worstCaseValue, worstCaseProbability } = state.evScenario;

  // For comparison: Calculate EV of walking away (using BATNA)
  const getWeightedBATNA = () => {
    return state.batnaOptions.reduce((sum, opt) => {
      return sum + (opt.value * (opt.probability / 100));
    }, 0);
  };

  const batnaEV = getWeightedBATNA();
  const dealIsBetter = ev > batnaEV;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/20 flex items-center justify-center">
          <Calculator className="w-6 h-6 text-[var(--accent)]" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[var(--foreground)]">Strategy Tools</h2>
          <p className="text-[var(--muted)]">Calculate expected values and prepare your responses</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* EV Calculator */}
        <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-[var(--accent)]" />
            <h3 className="text-lg font-semibold">Expected Value Calculator</h3>
          </div>

          <p className="text-sm text-[var(--muted)] mb-6">
            Compare Deal vs. No Deal scenarios using probability-weighted outcomes.
          </p>

          <div className="space-y-6">
            {/* Best Case */}
            <div className="bg-[var(--success)]/5 border border-[var(--success)]/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-[var(--success)]" />
                <span className="font-medium text-[var(--success)]">Best Case Scenario</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[var(--muted)] mb-1">Value ($)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
                    <input
                      type="number"
                      value={bestCaseValue || ''}
                      onChange={(e) => updateEVScenario('bestCaseValue', Number(e.target.value))}
                      placeholder="0"
                      className="w-full pl-9 font-mono"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-[var(--muted)] mb-1">Probability (%)</label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={bestCaseProbability || ''}
                      onChange={(e) => updateEVScenario('bestCaseProbability', Number(e.target.value))}
                      placeholder="50"
                      className="w-full pr-8 font-mono"
                    />
                    <Percent className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
                  </div>
                </div>
              </div>
              <div className="mt-3 text-right text-sm">
                <span className="text-[var(--muted)]">Weighted: </span>
                <span className="font-mono text-[var(--success)]">
                  {formatCurrency(bestCaseValue * (bestCaseProbability / 100))}
                </span>
              </div>
            </div>

            {/* Worst Case */}
            <div className="bg-[var(--danger)]/5 border border-[var(--danger)]/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <TrendingDown className="w-4 h-4 text-[var(--danger)]" />
                <span className="font-medium text-[var(--danger)]">Worst Case Scenario</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[var(--muted)] mb-1">Value ($)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
                    <input
                      type="number"
                      value={worstCaseValue || ''}
                      onChange={(e) => updateEVScenario('worstCaseValue', Number(e.target.value))}
                      placeholder="0"
                      className="w-full pl-9 font-mono"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-[var(--muted)] mb-1">Probability (%)</label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={worstCaseProbability || ''}
                      onChange={(e) => updateEVScenario('worstCaseProbability', Number(e.target.value))}
                      placeholder="50"
                      className="w-full pr-8 font-mono"
                    />
                    <Percent className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
                  </div>
                </div>
              </div>
              <div className="mt-3 text-right text-sm">
                <span className="text-[var(--muted)]">Weighted: </span>
                <span className="font-mono text-[var(--danger)]">
                  {formatCurrency(worstCaseValue * (worstCaseProbability / 100))}
                </span>
              </div>
            </div>

            {/* Formula Display */}
            <div className="bg-[var(--background)] rounded-lg p-4">
              <div className="text-xs text-[var(--muted)] mb-2">Formula:</div>
              <div className="font-mono text-sm text-[var(--foreground)]/80">
                EV = (Best × P₁) + (Worst × P₂)
              </div>
              <div className="font-mono text-sm text-[var(--foreground)]/80 mt-1">
                EV = ({formatCurrency(bestCaseValue)} × {bestCaseProbability}%) + ({formatCurrency(worstCaseValue)} × {worstCaseProbability}%)
              </div>
            </div>

            {/* Results */}
            <div className="border-t border-[var(--card-border)] pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-[var(--accent)]/10 rounded-lg">
                  <div className="text-xs text-[var(--muted)] mb-1">Deal EV</div>
                  <div className="text-2xl font-bold font-mono text-[var(--accent)]">
                    {formatCurrency(ev)}
                  </div>
                </div>
                <div className="text-center p-4 bg-[var(--muted)]/10 rounded-lg">
                  <div className="text-xs text-[var(--muted)] mb-1">BATNA EV (No Deal)</div>
                  <div className="text-2xl font-bold font-mono text-[var(--foreground)]">
                    {formatCurrency(batnaEV)}
                  </div>
                </div>
              </div>

              {(ev > 0 || batnaEV > 0) && (
                <div className={`mt-4 p-3 rounded-lg text-center ${
                  dealIsBetter
                    ? 'bg-[var(--success)]/10 text-[var(--success)]'
                    : 'bg-[var(--warning)]/10 text-[var(--warning)]'
                }`}>
                  <span className="font-medium">
                    {dealIsBetter
                      ? `Deal is better by ${formatCurrency(ev - batnaEV)}`
                      : batnaEV > ev
                        ? `BATNA is better by ${formatCurrency(batnaEV - ev)}`
                        : 'Both options have equal value'
                    }
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* If/Then Scripting */}
        <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[var(--accent)]" />
              <h3 className="text-lg font-semibold">If/Then Scripting</h3>
            </div>
            <button
              onClick={addIfThenScript}
              className="flex items-center gap-1 px-3 py-1.5 bg-[var(--accent)] text-white rounded-lg text-sm font-medium hover:bg-[var(--accent-hover)] transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Script
            </button>
          </div>

          <p className="text-sm text-[var(--muted)] mb-4">
            Prepare your responses to common counterpart moves.
          </p>

          {state.ifThenScripts.length === 0 ? (
            <div className="text-center py-12 text-[var(--muted)]">
              <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No scripts defined yet</p>
              <p className="text-sm">Add If/Then scenarios to prepare your responses</p>
            </div>
          ) : (
            <div className="space-y-4">
              {state.ifThenScripts.map((script, index) => (
                <div
                  key={script.id}
                  className="bg-[var(--background)] rounded-lg p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--accent)]/20 flex items-center justify-center text-xs font-medium text-[var(--accent)]">
                      {index + 1}
                    </div>
                    <div className="flex-1 space-y-3">
                      <div>
                        <label className="flex items-center gap-1 text-xs font-medium text-[var(--warning)] mb-1">
                          <span>IF they say...</span>
                        </label>
                        <textarea
                          value={script.trigger}
                          onChange={(e) => updateIfThenScript(script.id, 'trigger', e.target.value)}
                          placeholder="e.g., 'That's our final offer'"
                          rows={2}
                          className="w-full resize-none text-sm"
                        />
                      </div>
                      <div className="flex justify-center">
                        <ArrowRight className="w-4 h-4 text-[var(--muted)]" />
                      </div>
                      <div>
                        <label className="flex items-center gap-1 text-xs font-medium text-[var(--success)] mb-1">
                          <span>THEN I say...</span>
                        </label>
                        <textarea
                          value={script.response}
                          onChange={(e) => updateIfThenScript(script.id, 'response', e.target.value)}
                          placeholder="e.g., 'I appreciate you sharing that. Help me understand what constraints are limiting flexibility here.'"
                          rows={2}
                          className="w-full resize-none text-sm"
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => removeIfThenScript(script.id)}
                      className="flex-shrink-0 p-1.5 text-[var(--muted)] hover:text-[var(--danger)] hover:bg-[var(--danger)]/10 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quick Templates */}
          {state.ifThenScripts.length > 0 && (
            <div className="mt-4 pt-4 border-t border-[var(--card-border)]">
              <div className="text-xs text-[var(--muted)] mb-2">Quick Add Common Scenarios:</div>
              <div className="flex flex-wrap gap-2">
                {[
                  { trigger: 'Take it or leave it', response: 'I understand this feels final. Before we decide, can we explore if there are any creative alternatives?' },
                  { trigger: 'We need an answer today', response: 'I want to make sure we both get the best outcome. What\'s driving this timeline?' },
                  { trigger: 'That\'s not in our budget', response: 'I hear that. What would need to be true for the budget to accommodate this?' },
                ].map((template, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      addIfThenScript();
                      // Small delay to let state update
                      setTimeout(() => {
                        const scripts = state.ifThenScripts;
                        if (scripts.length > 0) {
                          const lastId = scripts[scripts.length - 1].id;
                          updateIfThenScript(lastId, 'trigger', template.trigger);
                          updateIfThenScript(lastId, 'response', template.response);
                        }
                      }, 0);
                    }}
                    className="text-xs px-2 py-1 bg-[var(--card-border)] hover:bg-[var(--accent)]/20 rounded transition-colors"
                  >
                    &quot;{template.trigger}&quot;
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
