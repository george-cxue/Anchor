'use client';

import React from 'react';
import {
  Plus,
  Trash2,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  Percent,
  ListChecks,
  Target
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

export default function InternalAnalysis() {
  const {
    state,
    addBATNAOption,
    updateBATNAOption,
    removeBATNAOption,
    getWeightedBATNA,
    setReservationPrice,
    addIssue,
    updateIssue,
    removeIssue,
  } = useNegotiation();

  const weightedBATNA = getWeightedBATNA();
  const showWarning = state.reservationPrice > 0 && state.reservationPrice < weightedBATNA;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/20 flex items-center justify-center">
          <Target className="w-6 h-6 text-[var(--accent)]" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[var(--foreground)]">Internal Analysis</h2>
          <p className="text-[var(--muted)]">Know your alternatives and define your limits</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* BATNA Calculator */}
        <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[var(--accent)]" />
              <h3 className="text-lg font-semibold">BATNA Calculator</h3>
            </div>
            <button
              onClick={addBATNAOption}
              className="flex items-center gap-1 px-3 py-1.5 bg-[var(--accent)] text-white rounded-lg text-sm font-medium hover:bg-[var(--accent-hover)] transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Option
            </button>
          </div>

          <p className="text-sm text-[var(--muted)] mb-4">
            Best Alternative to Negotiated Agreement - Your backup options if the deal fails.
          </p>

          <div className="space-y-3">
            {/* Header Row */}
            <div className="grid grid-cols-12 gap-2 text-xs font-medium text-[var(--muted)] px-2">
              <div className="col-span-5">Description</div>
              <div className="col-span-2 text-right">Value ($)</div>
              <div className="col-span-2 text-right">Prob. (%)</div>
              <div className="col-span-2 text-right">Weighted</div>
              <div className="col-span-1"></div>
            </div>

            {state.batnaOptions.map((option, index) => {
              const weightedValue = option.value * (option.probability / 100);
              return (
                <div
                  key={option.id}
                  className="grid grid-cols-12 gap-2 items-center bg-[var(--background)] rounded-lg p-2"
                >
                  <div className="col-span-5">
                    <input
                      type="text"
                      value={option.description}
                      onChange={(e) => updateBATNAOption(option.id, 'description', e.target.value)}
                      placeholder={`Alternative ${index + 1}`}
                      className="w-full text-sm"
                    />
                  </div>
                  <div className="col-span-2">
                    <div className="relative">
                      <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-[var(--muted)]" />
                      <input
                        type="number"
                        value={option.value || ''}
                        onChange={(e) => updateBATNAOption(option.id, 'value', Number(e.target.value))}
                        placeholder="0"
                        className="w-full text-sm pl-6 text-right"
                      />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={option.probability || ''}
                        onChange={(e) => updateBATNAOption(option.id, 'probability', Number(e.target.value))}
                        placeholder="50"
                        className="w-full text-sm text-right pr-6"
                      />
                      <Percent className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-[var(--muted)]" />
                    </div>
                  </div>
                  <div className="col-span-2 text-right text-sm font-mono text-[var(--success)]">
                    {formatCurrency(weightedValue)}
                  </div>
                  <div className="col-span-1 flex justify-end">
                    <button
                      onClick={() => removeBATNAOption(option.id)}
                      disabled={state.batnaOptions.length === 1}
                      className="p-1.5 text-[var(--muted)] hover:text-[var(--danger)] hover:bg-[var(--danger)]/10 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Weighted BATNA Summary */}
          <div className="mt-4 pt-4 border-t border-[var(--card-border)]">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-[var(--muted)]">Weighted BATNA Value:</span>
              <span className="text-xl font-bold font-mono text-[var(--success)]">
                {formatCurrency(weightedBATNA)}
              </span>
            </div>
          </div>
        </div>

        {/* Reservation Price */}
        <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="w-5 h-5 text-[var(--accent)]" />
            <h3 className="text-lg font-semibold">Reservation Price</h3>
          </div>

          <p className="text-sm text-[var(--muted)] mb-4">
            Your walk-away number - the minimum/maximum value you will accept.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                Walk-Away Number
              </label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted)]" />
                <input
                  type="number"
                  value={state.reservationPrice || ''}
                  onChange={(e) => setReservationPrice(Number(e.target.value))}
                  placeholder="Enter your minimum acceptable value"
                  className="w-full text-lg pl-12 py-4 font-mono"
                />
              </div>
            </div>

            {showWarning && (
              <div className="flex items-start gap-3 bg-[var(--warning)]/10 border border-[var(--warning)]/30 rounded-lg p-4">
                <AlertTriangle className="w-5 h-5 text-[var(--warning)] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-[var(--warning)]">Warning</p>
                  <p className="text-sm text-[var(--foreground)]/80">
                    Your reservation price ({formatCurrency(state.reservationPrice)}) is lower than your weighted BATNA ({formatCurrency(weightedBATNA)}).
                    Consider why you would accept less than your alternatives offer.
                  </p>
                </div>
              </div>
            )}

            {state.reservationPrice > 0 && !showWarning && (
              <div className="flex items-start gap-3 bg-[var(--success)]/10 border border-[var(--success)]/30 rounded-lg p-4">
                <TrendingUp className="w-5 h-5 text-[var(--success)] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-[var(--success)]">Looks Good</p>
                  <p className="text-sm text-[var(--foreground)]/80">
                    Your reservation price is above your weighted BATNA. You have a solid negotiating position.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Issues & Positions */}
        <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl p-6 xl:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ListChecks className="w-5 h-5 text-[var(--accent)]" />
              <h3 className="text-lg font-semibold">Issues & Positions</h3>
            </div>
            <button
              onClick={addIssue}
              className="flex items-center gap-1 px-3 py-1.5 bg-[var(--accent)] text-white rounded-lg text-sm font-medium hover:bg-[var(--accent-hover)] transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Issue
            </button>
          </div>

          <p className="text-sm text-[var(--muted)] mb-4">
            Define the negotiable items and weight their importance (0-100 points).
          </p>

          {state.issues.length === 0 ? (
            <div className="text-center py-12 text-[var(--muted)]">
              <ListChecks className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No issues defined yet</p>
              <p className="text-sm">Add negotiable items like Salary, Equity, PTO, etc.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Header Row */}
              <div className="grid grid-cols-12 gap-4 text-xs font-medium text-[var(--muted)] px-2">
                <div className="col-span-5">Issue Name</div>
                <div className="col-span-3">Priority Points (0-100)</div>
                <div className="col-span-3">Priority Level</div>
                <div className="col-span-1"></div>
              </div>

              {state.issues.map((issue) => (
                <div
                  key={issue.id}
                  className="grid grid-cols-12 gap-4 items-center bg-[var(--background)] rounded-lg p-3"
                >
                  <div className="col-span-5">
                    <input
                      type="text"
                      value={issue.name}
                      onChange={(e) => updateIssue(issue.id, 'name', e.target.value)}
                      placeholder="e.g., Base Salary, Equity, PTO..."
                      className="w-full"
                    />
                  </div>
                  <div className="col-span-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={issue.points}
                        onChange={(e) => updateIssue(issue.id, 'points', Number(e.target.value))}
                        className="flex-1 h-2 bg-[var(--card-border)] rounded-lg appearance-none cursor-pointer accent-[var(--accent)]"
                      />
                      <span className="w-10 text-right font-mono text-sm">{issue.points}</span>
                    </div>
                  </div>
                  <div className="col-span-3">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        issue.priority === 'high'
                          ? 'bg-[var(--danger)]/20 text-[var(--danger)]'
                          : issue.priority === 'medium'
                          ? 'bg-[var(--warning)]/20 text-[var(--warning)]'
                          : 'bg-[var(--muted)]/20 text-[var(--muted)]'
                      }`}
                    >
                      {issue.priority === 'high' ? 'High Priority' : issue.priority === 'medium' ? 'Medium' : 'Low Priority'}
                    </span>
                  </div>
                  <div className="col-span-1 flex justify-end">
                    <button
                      onClick={() => removeIssue(issue.id)}
                      className="p-1.5 text-[var(--muted)] hover:text-[var(--danger)] hover:bg-[var(--danger)]/10 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {state.issues.length > 0 && (
            <div className="mt-4 pt-4 border-t border-[var(--card-border)]">
              <div className="flex items-center gap-4 text-sm">
                <span className="text-[var(--muted)]">Summary:</span>
                <span className="px-2 py-0.5 rounded bg-[var(--danger)]/20 text-[var(--danger)]">
                  {state.issues.filter(i => i.priority === 'high').length} High
                </span>
                <span className="px-2 py-0.5 rounded bg-[var(--warning)]/20 text-[var(--warning)]">
                  {state.issues.filter(i => i.priority === 'medium').length} Medium
                </span>
                <span className="px-2 py-0.5 rounded bg-[var(--muted)]/20 text-[var(--muted)]">
                  {state.issues.filter(i => i.priority === 'low').length} Low
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
