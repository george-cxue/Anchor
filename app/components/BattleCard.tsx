'use client';

import React from 'react';
import {
  Shield,
  Target,
  DollarSign,
  Printer,
  ArrowRight,
  AlertCircle,
  CheckCircle,
  Minus
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

export default function BattleCard() {
  const {
    state,
    setOpeningAnchor,
    getCalculatedAnchor,
  } = useNegotiation();

  const calculatedAnchor = getCalculatedAnchor();
  const displayAnchor = state.openingAnchor !== null ? state.openingAnchor : calculatedAnchor;

  const highPriorityIssues = state.issues.filter(i => i.priority === 'high');
  const lowPriorityIssues = state.issues.filter(i => i.priority === 'low');
  const mediumPriorityIssues = state.issues.filter(i => i.priority === 'medium');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/20 flex items-center justify-center">
            <Shield className="w-6 h-6 text-[var(--accent)]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[var(--foreground)]">Battle Card</h2>
            <p className="text-[var(--muted)]">Your game-day quick reference</p>
          </div>
        </div>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 bg-[var(--accent)] text-white rounded-lg font-medium hover:bg-[var(--accent-hover)] transition-colors print:hidden"
        >
          <Printer className="w-4 h-4" />
          Print to PDF
        </button>
      </div>

      {/* Key Numbers - Big and Bold */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Walk-Away Number */}
        <div className="bg-gradient-to-br from-[var(--danger)]/20 to-[var(--danger)]/5 border border-[var(--danger)]/30 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-5 h-5 text-[var(--danger)]" />
            <span className="text-sm font-medium text-[var(--danger)]">WALK-AWAY NUMBER</span>
          </div>
          <div className="text-4xl md:text-5xl font-bold font-mono text-[var(--foreground)]">
            {state.reservationPrice > 0 ? formatCurrency(state.reservationPrice) : '—'}
          </div>
          <p className="text-sm text-[var(--muted)] mt-2">
            Do not accept anything below this number
          </p>
        </div>

        {/* Opening Anchor */}
        <div className="bg-gradient-to-br from-[var(--success)]/20 to-[var(--success)]/5 border border-[var(--success)]/30 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-[var(--success)]" />
            <span className="text-sm font-medium text-[var(--success)]">OPENING ANCHOR</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-[var(--muted)]" />
              <input
                type="number"
                value={state.openingAnchor !== null ? state.openingAnchor : calculatedAnchor || ''}
                onChange={(e) => setOpeningAnchor(e.target.value ? Number(e.target.value) : null)}
                placeholder={calculatedAnchor.toString()}
                className="w-full text-3xl md:text-4xl font-bold font-mono pl-14 py-3 bg-transparent border-2 border-[var(--success)]/30 rounded-lg focus:border-[var(--success)]"
              />
            </div>
          </div>
          <p className="text-sm text-[var(--muted)] mt-2">
            Default: 110% of reservation ({formatCurrency(calculatedAnchor)})
          </p>
        </div>
      </div>

      {/* Trade List */}
      <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-[var(--accent)]" />
          Trade List
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* High Priority - Must Have */}
          <div className="bg-[var(--danger)]/5 border border-[var(--danger)]/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 rounded-full bg-[var(--danger)]" />
              <span className="font-medium text-[var(--danger)]">Must Have</span>
            </div>
            {highPriorityIssues.length === 0 ? (
              <p className="text-sm text-[var(--muted)] italic">No high priority items</p>
            ) : (
              <ul className="space-y-2">
                {highPriorityIssues.map(issue => (
                  <li key={issue.id} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-[var(--danger)]" />
                    <span>{issue.name || 'Unnamed issue'}</span>
                    <span className="ml-auto font-mono text-xs text-[var(--muted)]">{issue.points}pts</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Medium Priority - Nice to Have */}
          <div className="bg-[var(--warning)]/5 border border-[var(--warning)]/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 rounded-full bg-[var(--warning)]" />
              <span className="font-medium text-[var(--warning)]">Nice to Have</span>
            </div>
            {mediumPriorityIssues.length === 0 ? (
              <p className="text-sm text-[var(--muted)] italic">No medium priority items</p>
            ) : (
              <ul className="space-y-2">
                {mediumPriorityIssues.map(issue => (
                  <li key={issue.id} className="flex items-center gap-2 text-sm">
                    <Minus className="w-4 h-4 text-[var(--warning)]" />
                    <span>{issue.name || 'Unnamed issue'}</span>
                    <span className="ml-auto font-mono text-xs text-[var(--muted)]">{issue.points}pts</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Low Priority - Can Trade */}
          <div className="bg-[var(--muted)]/5 border border-[var(--muted)]/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 rounded-full bg-[var(--muted)]" />
              <span className="font-medium text-[var(--muted)]">Can Trade Away</span>
            </div>
            {lowPriorityIssues.length === 0 ? (
              <p className="text-sm text-[var(--muted)] italic">No low priority items</p>
            ) : (
              <ul className="space-y-2">
                {lowPriorityIssues.map(issue => (
                  <li key={issue.id} className="flex items-center gap-2 text-sm">
                    <ArrowRight className="w-4 h-4 text-[var(--muted)]" />
                    <span>{issue.name || 'Unnamed issue'}</span>
                    <span className="ml-auto font-mono text-xs text-[var(--muted)]">{issue.points}pts</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {state.issues.length === 0 && (
          <div className="text-center py-8 text-[var(--muted)]">
            <p>No issues defined yet.</p>
            <p className="text-sm">Add issues in the Internal Analysis tab.</p>
          </div>
        )}
      </div>

      {/* If/Then Scripts Table */}
      <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-[var(--accent)]" />
          Response Scripts
        </h3>

        {state.ifThenScripts.length === 0 ? (
          <div className="text-center py-8 text-[var(--muted)]">
            <p>No scripts defined yet.</p>
            <p className="text-sm">Add If/Then scripts in the Strategy Tools tab.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--card-border)]">
                  <th className="text-left py-3 px-4 font-medium text-[var(--warning)]">If They Say...</th>
                  <th className="w-12"></th>
                  <th className="text-left py-3 px-4 font-medium text-[var(--success)]">Then I Say...</th>
                </tr>
              </thead>
              <tbody>
                {state.ifThenScripts.map((script) => (
                  <tr key={script.id} className="border-b border-[var(--card-border)]/50 hover:bg-[var(--background)]">
                    <td className="py-3 px-4 align-top">
                      <span className="text-[var(--foreground)]">
                        &quot;{script.trigger || <span className="italic text-[var(--muted)]">Empty trigger</span>}&quot;
                      </span>
                    </td>
                    <td className="py-3 text-center">
                      <ArrowRight className="w-4 h-4 text-[var(--muted)] mx-auto" />
                    </td>
                    <td className="py-3 px-4 align-top">
                      <span className="text-[var(--foreground)]">
                        &quot;{script.response || <span className="italic text-[var(--muted)]">Empty response</span>}&quot;
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Stats Footer */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg p-4 text-center">
          <div className="text-2xl font-bold font-mono text-[var(--accent)]">
            {formatCurrency(state.batnaOptions.reduce((sum, opt) => sum + (opt.value * (opt.probability / 100)), 0))}
          </div>
          <div className="text-xs text-[var(--muted)]">Weighted BATNA</div>
        </div>
        <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg p-4 text-center">
          <div className="text-2xl font-bold font-mono text-[var(--accent)]">
            {state.issues.length}
          </div>
          <div className="text-xs text-[var(--muted)]">Issues Defined</div>
        </div>
        <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg p-4 text-center">
          <div className="text-2xl font-bold font-mono text-[var(--accent)]">
            {state.ifThenScripts.length}
          </div>
          <div className="text-xs text-[var(--muted)]">Response Scripts</div>
        </div>
        <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg p-4 text-center">
          <div className="text-2xl font-bold font-mono text-[var(--accent)]">
            {state.estimatedCounterpartReservation > 0 && state.reservationPrice > 0
              ? state.estimatedCounterpartReservation >= state.reservationPrice
                ? 'YES'
                : 'NO'
              : '—'
            }
          </div>
          <div className="text-xs text-[var(--muted)]">ZOPA Exists</div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body {
            background: white !important;
            color: black !important;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
