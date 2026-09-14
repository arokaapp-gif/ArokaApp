import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  Activity, 
  FileCheck, 
  AlertTriangle, 
  Lock, 
  Server, 
  Database, 
  Cpu, 
  Sparkles, 
  PhoneCall, 
  Send, 
  Check, 
  X,
  CreditCard,
  FileText
} from 'lucide-react';
import { AdminRole, SystemHealthComponent } from '../types';
import { SYSTEM_HEALTH_METRICS } from '../data/mockData';

interface AdminPortalViewProps {
  onExitAdmin: () => void;
}

export const AdminPortalView: React.FC<AdminPortalViewProps> = ({ onExitAdmin }) => {
  const [activeRole, setActiveRole] = useState<string>('Owner');
  const [activeTab, setActiveTab] = useState<'overview' | 'health' | 'moderation' | 'kyc' | 'audit'>('overview');

  const [pendingKyc, setPendingKyc] = useState([
    { id: 'kyc-1', name: 'Rohan Jena', role: 'Study Buddy (Physics)', city: 'Hinjilicut', doc: 'Aadhaar (Masked) + Degree', date: 'Today' },
    { id: 'kyc-2', name: 'Mamata Padhy', role: 'Elder Companion', city: 'Ganjam', doc: 'Voter ID + Police Clearance', date: 'Yesterday' },
  ]);

  const [pendingReports, setPendingReports] = useState([
    { id: 'rep-1', target: 'Listing #LIST-088', reason: 'Suspected duplicate phone listing', reporter: '@user_981', status: 'Needs Review' },
    { id: 'rep-2', target: 'Clip #CLIP-042', reason: 'Unverified commercial music', reporter: '@user_112', status: 'Pending Review' },
  ]);

  const [auditLogs] = useState([
    { id: 'log-1', admin: 'Subham (Owner)', action: 'KYC_APPROVED', target: 'usr-201 (Soumya Mentor)', time: '10 mins ago', ip: '192.168.1.1' },
    { id: 'log-2', admin: 'TrustSafety_Agent', action: 'POST_FLAG_RESOLVED', target: 'post-103', time: '1 hour ago', ip: '10.0.4.22' },
    { id: 'log-3', admin: 'DevOps_Lead', action: 'POSTGIS_INDEX_OPTIMIZED', target: 'listings_gist_idx', time: '3 hours ago', ip: '10.0.1.1' },
    { id: 'log-4', admin: 'Finance_Officer', action: 'PAYOUT_SETTLED', target: 'TXN-AROKA-98210', time: '5 hours ago', ip: '10.0.2.8' },
  ]);

  const rbacRoles: AdminRole[] = [
    { name: 'Owner', description: 'Full root access to finance, ledger, and roles', permissions: ['ALL'] },
    { name: 'Admin', description: 'Operational management & user lifecycle', permissions: ['USERS', 'CONTENT', 'BAZAR'] },
    { name: 'Support', description: 'Tickets and basic customer care', permissions: ['TICKETS', 'BASIC_VIEW'] },
    { name: 'Finance', description: 'Double-entry ledger, payouts, refund approvals', permissions: ['FINANCE', 'LEDGER', 'PAYOUTS'] },
    { name: 'Trust & Safety', description: 'Reports, moderation queues, ban enforcement', permissions: ['REPORTS', 'KYC', 'MODERATION'] },
    { name: 'Content Moderator', description: 'Post, clips, stories review', permissions: ['CONTENT_MOD'] },
    { name: 'AI Operator', description: 'Prompts, knowledge retrieval & model logs', permissions: ['AI_CONFIG', 'TOOLS'] },
    { name: 'DevOps', description: 'Infrastructure, PostGIS health, Redis & queues', permissions: ['INFRA', 'SYSTEM_HEALTH'] },
  ];

  const handleApproveKyc = (id: string) => {
    setPendingKyc(prev => prev.filter(k => k.id !== id));
    alert('KYC Verified and Approved! Companion profile active.');
  };

  const handleDismissReport = (id: string) => {
    setPendingReports(prev => prev.filter(r => r.id !== id));
    alert('Report dismissed after review.');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Top Admin Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-500/30">
            <Lock className="w-3.5 h-3.5" />
            https://admin.arokaapp.in (RBAC Protected)
          </div>
          <h1 className="text-2xl font-black">Aroka Central Administration Portal</h1>
          <p className="text-xs text-slate-400">
            Current Operator Role: <strong className="text-emerald-400">{activeRole}</strong> • Hinjilicut Master Node
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Role switcher */}
          <div className="bg-slate-800 p-1 rounded-xl border border-slate-700 flex items-center gap-1 text-xs">
            <span className="text-[10px] text-slate-400 font-bold px-2">Role:</span>
            <select
              value={activeRole}
              onChange={e => setActiveRole(e.target.value)}
              className="bg-transparent border-none text-emerald-400 font-bold text-xs focus:outline-hidden cursor-pointer"
            >
              {rbacRoles.map(r => (
                <option key={r.name} value={r.name} className="text-slate-900">
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={onExitAdmin}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700"
          >
            Exit to App
          </button>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200 scrollbar-none">
        {[
          { id: 'overview', name: 'Dashboard' },
          { id: 'health', name: 'System Health (Observability)' },
          { id: 'moderation', name: 'Trust & Safety Reports' },
          { id: 'kyc', name: 'Companion KYC Review' },
          { id: 'audit', name: 'Immutable Audit Logs' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-[#0A2540] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* TAB CONTENT: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-semibold block">Total Active Users</span>
              <span className="text-2xl font-black text-slate-900 font-mono">4,192</span>
              <span className="text-[10px] text-emerald-600 font-bold block mt-1">+14% this week</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-semibold block">Bazar Active Listings</span>
              <span className="text-2xl font-black text-slate-900 font-mono">318</span>
              <span className="text-[10px] text-slate-400 font-medium block mt-1">Ganjam District</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-semibold block">Verified Companions</span>
              <span className="text-2xl font-black text-slate-900 font-mono">48</span>
              <span className="text-[10px] text-emerald-600 font-bold block mt-1">100% KYC Approved</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-semibold block">24h Voice Calls (8249892208)</span>
              <span className="text-2xl font-black text-slate-900 font-mono">142</span>
              <span className="text-[10px] text-emerald-600 font-bold block mt-1">94% Solved by AI</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Active Role Permissions</h3>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <span className="font-bold text-slate-900">{activeRole} Level Privileges:</span>
                <p className="text-slate-600 mt-1">
                  {rbacRoles.find(r => r.name === activeRole)?.description}
                </p>
                <div className="flex gap-1.5 mt-2 flex-wrap">
                  {rbacRoles.find(r => r.name === activeRole)?.permissions.map(p => (
                    <span key={p} className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Hinjilicut Market Gateway</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Platform operating under Supabase Auth (Email + Password only). Phone numbers are strictly never used as login credentials.
              </p>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
                <ShieldCheck className="w-4 h-4" />
                <span>Zero WhatsApp API dependence • Zero SMS OTP reliance</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: SYSTEM HEALTH & OBSERVABILITY */}
      {activeTab === 'health' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Platform Observability & Metrics</h3>
              <p className="text-xs text-slate-400">Real-time status of all 9 Aroka production components</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
              All Systems Operational
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {SYSTEM_HEALTH_METRICS.map(comp => (
              <div key={comp.name} className="p-4 flex items-center justify-between hover:bg-slate-50/60 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">{comp.name}</span>
                    <span className="text-[11px] text-slate-500">{comp.details}</span>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-right text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Latency</span>
                    <span className="font-mono font-bold text-slate-800">{comp.latencyMs}ms</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Uptime</span>
                    <span className="font-mono font-bold text-emerald-700">{comp.uptime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: TRUST & SAFETY REPORTS */}
      {activeTab === 'moderation' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-5 space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Trust & Safety Moderation Queue</h3>
          <p className="text-xs text-slate-500">Human review queue for user-submitted flags and AI-assisted safety triggers</p>

          <div className="space-y-3">
            {pendingReports.map(rep => (
              <div key={rep.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-900 block">{rep.target}</span>
                  <span className="text-xs text-rose-600 font-medium">{rep.reason}</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Reported by {rep.reporter}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDismissReport(rep.id)}
                    className="px-3 py-1.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold"
                  >
                    Dismiss
                  </button>
                  <button
                    onClick={() => {
                      setPendingReports(prev => prev.filter(r => r.id !== rep.id));
                      alert('Target quarantined and warned.');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold"
                  >
                    Quarantine
                  </button>
                </div>
              </div>
            ))}
            {pendingReports.length === 0 && (
              <div className="text-center py-6 text-xs text-slate-400">
                Moderation queue is clean. No outstanding reports!
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB CONTENT: COMPANION KYC REVIEW */}
      {activeTab === 'kyc' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-5 space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Companion KYC Verification Applications</h3>
          <p className="text-xs text-slate-500">
            Verify identity documents and qualifications before activating Companion booking profiles.
          </p>

          <div className="space-y-3">
            {pendingKyc.map(k => (
              <div key={k.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{k.name}</span>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">{k.role}</span>
                  </div>
                  <span className="text-xs text-slate-500 block mt-1">Submitted: {k.doc} ({k.city})</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPendingKyc(prev => prev.filter(item => item.id !== k.id))}
                    className="p-2 rounded-xl text-rose-600 hover:bg-rose-50"
                    title="Reject KYC"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleApproveKyc(k.id)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    Approve KYC
                  </button>
                </div>
              </div>
            ))}
            {pendingKyc.length === 0 && (
              <div className="text-center py-6 text-xs text-slate-400">
                All companion applications reviewed and up to date!
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB CONTENT: IMMUTABLE AUDIT LOGS */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">Security & Administrative Audit Trail</h3>
            <p className="text-xs text-slate-400">Cryptographically recorded actions across administrative roles</p>
          </div>
          <div className="divide-y divide-slate-100 text-xs">
            {auditLogs.map(log => (
              <div key={log.id} className="p-4 flex items-center justify-between hover:bg-slate-50">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{log.admin}</span>
                    <span className="font-mono text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-bold">
                      {log.action}
                    </span>
                  </div>
                  <span className="text-slate-500 text-[11px]">Target: {log.target}</span>
                </div>
                <div className="text-right text-[11px] text-slate-400 font-mono">
                  <span>{log.time}</span>
                  <span className="block text-[10px]">IP: {log.ip}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
