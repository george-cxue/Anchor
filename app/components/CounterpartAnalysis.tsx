'use client';
import {
  Users,
  Eye,
  Lock,
  Target,
  TrendingUp,
  TrendingDown,
  DollarSign
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

export default function CounterpartAnalysis() {
  const {
    state,
    updateCounterpartProfile,
    setEstimatedCounterpartReservation,
  } = useNegotiation();

  const myReservation = state.reservationPrice;
  const theirReservation = state.estimatedCounterpartReservation;

  // Calculate ZOPA (Zone of Possible Agreement)
  // Assuming "you" are the seller and "they" are the buyer:
  // ZOPA exists when their max (reservation) >= your min (reservation)
  // For flexibility, we'll show ZOPA when there's any overlap
  const hasZOPA = myReservation > 0 && theirReservation > 0 && theirReservation >= myReservation;
  const surplus = hasZOPA ? theirReservation - myReservation : 0;
  const gap = !hasZOPA && myReservation > 0 && theirReservation > 0
    ? myReservation - theirReservation
    : 0;

  // Calculate visualization positions (normalized 0-100)
  const maxValue = Math.max(myReservation, theirReservation, 1) * 1.3;
  const myPosition = (myReservation / maxValue) * 100;
  const theirPosition = (theirReservation / maxValue) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/20 flex items-center justify-center">
          <Users className="w-6 h-6 text-[var(--accent)]" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[var(--foreground)]">Counterpart Analysis</h2>
          <p className="text-[var(--muted)]">Understand their motivations and find the deal zone</p>
        </div>
      </div>

      {/* Iceberg Profiler */}
      <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-[var(--accent)]" />
          <h3 className="text-lg font-semibold">The Iceberg Profiler</h3>
        </div>

        <p className="text-sm text-[var(--muted)] mb-6">
          Look beneath the surface. What people say is only 10% of what drives them.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Positions - Visible */}
          <div className="relative">
            <div className="absolute -top-3 left-4 px-2 bg-[var(--card-bg)]">
              <div className="flex items-center gap-1.5 text-sm font-medium text-[var(--accent)]">
                <Eye className="w-4 h-4" />
                <span>Positions</span>
              </div>
            </div>
            <div className="border border-[var(--accent)]/30 rounded-xl p-4 pt-6">
              <p className="text-xs text-[var(--muted)] mb-2">What they say they want</p>
              <textarea
                value={state.counterpartProfile.positions}
                onChange={(e) => updateCounterpartProfile('positions', e.target.value)}
                placeholder="e.g., 'We can only offer $X for this role...'"
                rows={4}
                className="w-full resize-none py-2 px-3"
              />
            </div>
          </div>

          {/* Interests - Hidden */}
          <div className="relative">
            <div className="absolute -top-3 left-4 px-2 bg-[var(--card-bg)]">
              <div className="flex items-center gap-1.5 text-sm font-medium text-[var(--warning)]">
                <Target className="w-4 h-4" />
                <span>Interests</span>
              </div>
            </div>
            <div className="border border-[var(--warning)]/30 rounded-xl p-4 pt-6">
              <p className="text-xs text-[var(--muted)] mb-2">What they actually want</p>
              <textarea
                value={state.counterpartProfile.interests}
                onChange={(e) => updateCounterpartProfile('interests', e.target.value)}
                placeholder="e.g., 'They need to fill this position quickly, reduce turnover...'"
                rows={4}
                className="w-full resize-none py-2 px-3"
              />
            </div>
          </div>

          {/* Constraints - Deep */}
          <div className="relative">
            <div className="absolute -top-3 left-4 px-2 bg-[var(--card-bg)]">
              <div className="flex items-center gap-1.5 text-sm font-medium text-[var(--danger)]">
                <Lock className="w-4 h-4" />
                <span>Constraints</span>
              </div>
            </div>
            <div className="border border-[var(--danger)]/30 rounded-xl p-4 pt-6">
              <p className="text-xs text-[var(--muted)] mb-2">Why they can&apos;t say yes</p>
              <textarea
                value={state.counterpartProfile.constraints}
                onChange={(e) => updateCounterpartProfile('constraints', e.target.value)}
                placeholder="e.g., 'Budget freeze, internal equity concerns, approval process...'"
                rows={4}
                className="w-full resize-none py-2 px-3"
              />
            </div>
          </div>
        </div>

        {/* Iceberg Visual */}
        <div className="mt-6 flex justify-center">
          <div className="relative w-48 h-32">
            {/* Water line */}
            <div className="absolute top-8 left-0 right-0 h-px bg-[var(--accent)] opacity-50" />
            <div className="absolute top-8 left-2 text-xs text-[var(--accent)]">Surface</div>

            {/* Above water */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-8 bg-gradient-to-b from-[var(--accent)]/40 to-[var(--accent)]/20 rounded-t-full" />

            {/* Below water */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-32 h-24 bg-gradient-to-b from-[var(--warning)]/30 via-[var(--danger)]/20 to-[var(--danger)]/10 rounded-b-full opacity-60" />
          </div>
        </div>
      </div>

      {/* ZOPA Visualizer */}
      <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-[var(--accent)]" />
          <h3 className="text-lg font-semibold">ZOPA Visualizer</h3>
        </div>

        <p className="text-sm text-[var(--muted)] mb-6">
          Zone of Possible Agreement - Where a deal can happen.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Your Reservation */}
          <div className="bg-[var(--background)] rounded-lg p-4">
            <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
              Your Reservation Price
            </label>
            <div className="text-2xl font-bold font-mono text-[var(--accent)]">
              {myReservation > 0 ? formatCurrency(myReservation) : 'Not set'}
            </div>
            <p className="text-xs text-[var(--muted)] mt-1">
              Set in Internal Analysis tab
            </p>
          </div>

          {/* Their Estimated Reservation */}
          <div className="bg-[var(--background)] rounded-lg p-4">
            <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
              Estimated Counterpart Reservation
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted)]" />
              <input
                type="number"
                value={theirReservation || ''}
                onChange={(e) => setEstimatedCounterpartReservation(Number(e.target.value))}
                placeholder="Their walk-away number"
                className="w-full text-lg py-3 pl-10 pr-3 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Visual Bar */}
        {(myReservation > 0 || theirReservation > 0) && (
          <div className="space-y-4">
            {/* Value axis labels */}
            <div className="flex justify-between text-xs text-[var(--muted)]">
              <span>$0</span>
              <span>{formatCurrency(maxValue)}</span>
            </div>

            {/* Visual representation */}
            <div className="relative h-24 bg-[var(--background)] rounded-xl overflow-hidden">
              {/* Grid lines */}
              <div className="absolute inset-0 flex">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 border-r border-[var(--card-border)]/30"
                  />
                ))}
              </div>

              {/* ZOPA or Gap Zone */}
              {myReservation > 0 && theirReservation > 0 && (
                hasZOPA ? (
                  // Green ZOPA zone
                  <div
                    className="absolute top-4 bottom-4 bg-[var(--success)]/30 border-2 border-[var(--success)] rounded-lg flex items-center justify-center"
                    style={{
                      left: `${myPosition}%`,
                      width: `${theirPosition - myPosition}%`,
                    }}
                  >
                    <div className="text-center">
                      <span className="text-xs font-bold text-[var(--success)]">ZOPA</span>
                      <div className="text-sm font-mono text-[var(--success)]">
                        {formatCurrency(surplus)} surplus
                      </div>
                    </div>
                  </div>
                ) : (
                  // Red negative zone (gap)
                  <div
                    className="absolute top-4 bottom-4 bg-[var(--danger)]/30 border-2 border-dashed border-[var(--danger)] rounded-lg flex items-center justify-center"
                    style={{
                      left: `${theirPosition}%`,
                      width: `${myPosition - theirPosition}%`,
                    }}
                  >
                    <div className="text-center">
                      <span className="text-xs font-bold text-[var(--danger)]">NEGATIVE ZONE</span>
                      <div className="text-sm font-mono text-[var(--danger)]">
                        {formatCurrency(gap)} gap
                      </div>
                    </div>
                  </div>
                )
              )}

              {/* Your reservation marker */}
              {myReservation > 0 && (
                <div
                  className="absolute top-0 bottom-0 w-1 bg-[var(--accent)]"
                  style={{ left: `${myPosition}%` }}
                >
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-[var(--accent)] rounded-full" />
                  <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <div className="text-xs font-medium text-[var(--accent)]">You</div>
                    <div className="text-xs font-mono text-[var(--foreground)]">
                      {formatCurrency(myReservation)}
                    </div>
                  </div>
                </div>
              )}

              {/* Their reservation marker */}
              {theirReservation > 0 && (
                <div
                  className="absolute top-0 bottom-0 w-1 bg-[var(--warning)]"
                  style={{ left: `${theirPosition}%` }}
                >
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-[var(--warning)] rounded-full" />
                  <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <div className="text-xs font-medium text-[var(--warning)]">Them</div>
                    <div className="text-xs font-mono text-[var(--foreground)]">
                      {formatCurrency(theirReservation)}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Spacer for labels below bars */}
            <div className="h-8" />

            {/* Status message */}
            <div className={`flex items-center gap-3 p-4 rounded-lg ${
              hasZOPA
                ? 'bg-[var(--success)]/10 border border-[var(--success)]/30'
                : myReservation > 0 && theirReservation > 0
                  ? 'bg-[var(--danger)]/10 border border-[var(--danger)]/30'
                  : 'bg-[var(--muted)]/10 border border-[var(--muted)]/30'
            }`}>
              {hasZOPA ? (
                <>
                  <TrendingUp className="w-5 h-5 text-[var(--success)]" />
                  <div>
                    <p className="font-medium text-[var(--success)]">Deal Zone Found!</p>
                    <p className="text-sm text-[var(--foreground)]/80">
                      There&apos;s {formatCurrency(surplus)} of value to split. Aim to capture most of this surplus.
                    </p>
                  </div>
                </>
              ) : myReservation > 0 && theirReservation > 0 ? (
                <>
                  <TrendingDown className="w-5 h-5 text-[var(--danger)]" />
                  <div>
                    <p className="font-medium text-[var(--danger)]">No Overlap - Negative Zone</p>
                    <p className="text-sm text-[var(--foreground)]/80">
                      There&apos;s a {formatCurrency(gap)} gap. You&apos;ll need to create value, adjust expectations, or walk away.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <Target className="w-5 h-5 text-[var(--muted)]" />
                  <div>
                    <p className="font-medium text-[var(--muted)]">Enter Both Values</p>
                    <p className="text-sm text-[var(--foreground)]/80">
                      Set your reservation price and estimate theirs to visualize the ZOPA.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
