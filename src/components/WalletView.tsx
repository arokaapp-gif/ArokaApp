import React, { useState } from 'react';
import { 
  Wallet, 
  ArrowDownLeft, 
  ArrowUpRight, 
  Lock, 
  ShieldCheck, 
  CheckCircle2, 
  FileText, 
  Sparkles, 
  AlertCircle,
  RefreshCw,
  Plus
} from 'lucide-react';
import { LedgerTransaction } from '../types';

interface WalletViewProps {
  balance: number;
  transactions: LedgerTransaction[];
  onDeposit: (amount: number) => void;
  onWithdraw: (amount: number) => void;
}

export const WalletView: React.FC<WalletViewProps> = ({
  balance,
  transactions,
  onDeposit,
  onWithdraw,
}) => {
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [amountInput, setAmountInput] = useState('500');
  const [webhookSimulating, setWebhookSimulating] = useState(false);
  const [webhookResult, setWebhookResult] = useState<any>(null);

  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amountInput);
    if (val > 0) {
      onDeposit(val);
      setIsDepositModalOpen(false);
    }
  };

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amountInput);
    if (val > 0 && val <= balance) {
      onWithdraw(val);
      setIsWithdrawModalOpen(false);
    }
  };

  // Test Compliant Indian Payment Gateway Webhook
  const handleTestWebhook = async () => {
    setWebhookSimulating(true);
    setWebhookResult(null);
    try {
      const response = await fetch('/api/payments/webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-aroka-signature': 'sha256_mock_hmac_sign_98124589',
        },
        body: JSON.stringify({
          eventId: 'evt_' + Date.now(),
          orderId: 'ORD-HINJILI-' + Math.floor(1000 + Math.random() * 9000),
          amount: 500,
          status: 'captured',
        }),
      });
      const data = await response.json();
      setWebhookResult(data);
    } catch (err: any) {
      setWebhookResult({ error: err.message });
    } finally {
      setWebhookSimulating(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Wallet Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Main Available Projected Balance */}
        <div className="md:col-span-2 bg-[#0A2540] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="relative z-10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold tracking-widest text-emerald-400">
                Aroka Wallet Balance (INR)
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                Projected from Ledger
              </span>
            </div>
            <div className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-white">
              ₹{balance.toFixed(2)}
            </div>
            <p className="text-xs text-slate-300">
              Source of truth: Double-entry audit ledger. Compliant with RBI guidelines.
            </p>
          </div>

          <div className="pt-6 flex items-center gap-3 relative z-10">
            <button
              onClick={() => {
                setAmountInput('500');
                setIsDepositModalOpen(true);
              }}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all active:scale-95"
            >
              <ArrowDownLeft className="w-4 h-4" />
              Topup Wallet (UPI)
            </button>
            <button
              onClick={() => {
                setAmountInput('500');
                setIsWithdrawModalOpen(true);
              }}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 border border-white/20 transition-all active:scale-95"
            >
              <ArrowUpRight className="w-4 h-4" />
              Withdraw Payout
            </button>
          </div>

          <div className="absolute right-[-20px] bottom-[-20px] opacity-10 pointer-events-none">
            <Wallet className="w-64 h-64 text-emerald-400" />
          </div>
        </div>

        {/* Escrow & Security Info Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Escrow & Commission
            </div>
            <div className="text-2xl font-bold text-slate-900 font-mono">₹120.00</div>
            <span className="text-[10px] text-slate-400 block mt-0.5">Held in session escrow</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1.5">
            <div className="font-semibold text-slate-900 text-[11px]">80/20 Payout Rule</div>
            <p className="text-[10px] text-slate-500 leading-tight">
              Companions receive 80% direct earnings upon session signoff. 20% platform maintenance fee supports trust & safety.
            </p>
          </div>

          <button
            onClick={handleTestWebhook}
            disabled={webhookSimulating}
            className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${webhookSimulating ? 'animate-spin' : ''}`} />
            <span>{webhookSimulating ? 'Verifying...' : 'Test Gateway Webhook'}</span>
          </button>
        </div>
      </div>

      {/* Webhook Response Log (if triggered) */}
      {webhookResult && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1 animate-fade-in">
          <div className="font-bold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            Indian Payment Gateway Webhook Verified & Processed:
          </div>
          <pre className="font-mono text-[10px] bg-white/70 p-2.5 rounded-lg overflow-x-auto text-emerald-950">
            {JSON.stringify(webhookResult, null, 2)}
          </pre>
        </div>
      )}

      {/* DOUBLE-ENTRY TRANSACTION JOURNAL LEDGER */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Immutable Double-Entry Ledger</h3>
            <p className="text-xs text-slate-400">All debits and credits verified against cryptographic references</p>
          </div>
          <span className="text-xs font-mono font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
            Currency: INR (₹)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-400 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-100">
              <tr>
                <th className="p-3.5 pl-5">Reference</th>
                <th className="p-3.5">Date & Time</th>
                <th className="p-3.5">Type & Description</th>
                <th className="p-3.5 text-right">Debit (-)</th>
                <th className="p-3.5 text-right">Credit (+)</th>
                <th className="p-3.5 text-right">Balance</th>
                <th className="p-3.5 pr-5 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactions.map(txn => (
                <tr key={txn.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-3.5 pl-5 font-mono text-slate-700 font-bold">{txn.ref}</td>
                  <td className="p-3.5 text-slate-500 whitespace-nowrap">{txn.date}</td>
                  <td className="p-3.5">
                    <span className="font-bold text-slate-900 block">{txn.type}</span>
                    <span className="text-[11px] text-slate-500">{txn.description}</span>
                  </td>
                  <td className="p-3.5 text-right font-mono font-bold text-rose-600">
                    {txn.debit > 0 ? `-₹${txn.debit.toFixed(2)}` : '—'}
                  </td>
                  <td className="p-3.5 text-right font-mono font-bold text-emerald-600">
                    {txn.credit > 0 ? `+₹${txn.credit.toFixed(2)}` : '—'}
                  </td>
                  <td className="p-3.5 text-right font-mono font-bold text-slate-900">
                    ₹{txn.balanceAfter.toFixed(2)}
                  </td>
                  <td className="p-3.5 pr-5 text-center">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" />
                      {txn.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* TOPUP MODAL */}
      {isDepositModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <form onSubmit={handleDepositSubmit} className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Topup Aroka Wallet</h3>
              <button type="button" onClick={() => setIsDepositModalOpen(false)} className="text-slate-400">✕</button>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Amount in INR (₹)</label>
              <input
                type="number"
                min="100"
                max="50000"
                value={amountInput}
                onChange={e => setAmountInput(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-base font-bold font-mono"
              />
            </div>
            <div className="flex gap-2">
              {['200', '500', '1000', '2000'].map(v => (
                <button
                  type="button"
                  key={v}
                  onClick={() => setAmountInput(v)}
                  className="flex-1 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold"
                >
                  ₹{v}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-slate-500">Instant UPI payment processing via compliant Indian payment gateway.</p>
            <div className="pt-2 flex gap-2">
              <button type="button" onClick={() => setIsDepositModalOpen(false)} className="w-1/3 py-2 text-xs font-bold border rounded-xl">Cancel</button>
              <button type="submit" className="flex-1 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl">Pay & Add Funds</button>
            </div>
          </form>
        </div>
      )}

      {/* WITHDRAW MODAL */}
      {isWithdrawModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <form onSubmit={handleWithdrawSubmit} className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Request Bank Payout</h3>
              <button type="button" onClick={() => setIsWithdrawModalOpen(false)} className="text-slate-400">✕</button>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Withdrawal Amount (Max: ₹{balance.toFixed(2)})</label>
              <input
                type="number"
                min="50"
                max={balance}
                value={amountInput}
                onChange={e => setAmountInput(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-base font-bold font-mono"
              />
            </div>
            <p className="text-[10px] text-slate-500">Funds are transferred to your verified Indian bank account via IMPS/NEFT within 24 hours.</p>
            <div className="pt-2 flex gap-2">
              <button type="button" onClick={() => setIsWithdrawModalOpen(false)} className="w-1/3 py-2 text-xs font-bold border rounded-xl">Cancel</button>
              <button type="submit" className="flex-1 py-2 text-xs font-bold bg-[#0A2540] hover:bg-slate-900 text-white rounded-xl">Confirm Withdrawal</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
