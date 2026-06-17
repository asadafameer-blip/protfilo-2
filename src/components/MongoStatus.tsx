import { useEffect, useState } from 'react';

interface MongoStats {
  status: string;
  host: string;
  port: number;
  databaseName: string;
  dbType: string;
  connectionsCount: number;
  queryLatency: string;
  lastSync: string;
  collections: {
    contacts: number;
    testimonials: number;
  };
  systemLogs: Array<{ timestamp: string; type: string; message: string }>;
}

export default function MongoStatus() {
  const [stats, setStats] = useState<MongoStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    let active = true;
    const fetchStatus = async () => {
      try {
        const res = await fetch('/api/mongodb/status');
        if (res.ok && active) {
          const data = await res.json();
          setStats(data);
        }
      } catch (err) {
        console.error('Error fetching MongoDB status:', err);
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchStatus();
    return () => {
      active = false;
    };
  }, [refreshTrigger]);

  return (
    <section id="database" className="relative py-20 px-6 max-w-5xl mx-auto font-sans">
      {/* Background glow shadow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full blur-[130px] bg-[#D4AF37]/5 pointer-events-none" />

      <div className="text-center mb-12">
        <span className="text-xs font-mono font-bold tracking-widest text-[#D4AF37] uppercase bg-[#D4AF37]/5 border border-[#D4AF37]/20 px-3.5 py-1.5 rounded-full inline-block">
          Full-Stack Architecture
        </span>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight mt-4">
          Integrated <span className="neon-text-cyan">Express.js & MongoDB</span> Realtime Engine
        </h2>
        <p className="text-gray-400 mt-3 max-w-lg mx-auto text-xs sm:text-sm leading-relaxed">
          Active cloud instances querying document storage schemas, logs, and client collections live in real-time.
        </p>
      </div>

      <div className="glass rounded-2xl border border-white/5 overflow-hidden shadow-2xl relative">
        {/* Terminal Header */}
        <div className="bg-[#0f0e0d] px-5 py-3.5 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/85 block" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/85 block" />
            <span className="w-3 h-3 rounded-full bg-green-500/85 block" />
            <span className="font-mono text-xs text-gray-500 ml-2 select-none">mongodb-shell://admin@sadaf-db</span>
          </div>
          <button
            onClick={() => {
              setLoading(true);
              setRefreshTrigger((prev) => prev + 1);
            }}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 hover:bg-[#D4AF37]/20 border border-white/10 hover:border-[#D4AF37]/30 text-gray-400 hover:text-white transition-all text-[11px] font-mono cursor-pointer"
            title="Refresh database records"
          >
            <i className={`fa-solid fa-arrows-rotate text-[10px] ${loading ? 'animate-spin' : ''}`} />
            REFRESH
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 bg-[#070606]/95 grid grid-cols-1 md:grid-cols-12 gap-6 font-mono text-xs">
          {/* Left: General Stats */}
          <div className="md:col-span-7 space-y-4">
            <h3 className="text-white font-display font-semibold text-sm tracking-wide flex items-center gap-2 border-b border-white/5 pb-2">
              <i className="fa-solid fa-database text-[#D4AF37]" />
              CLUSTER DESCRIPTION
            </h3>
            
            {loading ? (
              <div className="py-12 flex flex-col items-center justify-center text-gray-500 gap-3">
                <div className="w-6 h-6 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
                <span>Pinging MongoDB replicaSets...</span>
              </div>
            ) : stats ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-300">
                <div className="bg-black/40 p-3.5 rounded-xl border border-white/5">
                  <span className="text-gray-500 block uppercase text-[10px] tracking-wider mb-1">Database Provider</span>
                  <span className="text-white text-xs font-semibold">{stats.dbType}</span>
                </div>
                <div className="bg-black/40 p-3.5 rounded-xl border border-white/5">
                  <span className="text-gray-500 block uppercase text-[10px] tracking-wider mb-1">Target Cluster Host</span>
                  <span className="text-cyan-400 text-xs truncate block" title={stats.host}>{stats.host}</span>
                </div>
                <div className="bg-black/40 p-3.5 rounded-xl border border-white/5">
                  <span className="text-gray-500 block uppercase text-[10px] tracking-wider mb-1">Active Connections</span>
                  <span className="text-green-400 text-xs font-bold block">● {stats.connectionsCount} Client sessions</span>
                </div>
                <div className="bg-black/40 p-3.5 rounded-xl border border-white/5">
                  <span className="text-gray-500 block uppercase text-[10px] tracking-wider mb-1">Query Response Time</span>
                  <span className="text-yellow-400 text-xs font-bold block">{stats.queryLatency} (GCP Region API)</span>
                </div>
                <div className="bg-black/40 p-3.5 rounded-xl border border-white/5 sm:col-span-2 flex items-center justify-between">
                  <div>
                    <span className="text-gray-500 block uppercase text-[10px] tracking-wider mb-0.5">Database Name</span>
                    <span className="text-white text-xs font-semibold font-sans">{stats.databaseName}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-500 block uppercase text-[10px] tracking-wider mb-0.5">Last DB Write</span>
                    <span className="text-gray-400 text-[10px]">{new Date(stats.lastSync).toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-red-400">Database statistics offline.</p>
            )}
          </div>

          {/* Right: Collections and logs */}
          <div className="md:col-span-5 space-y-4">
            <h3 className="text-white font-display font-semibold text-sm tracking-wide flex items-center gap-2 border-b border-white/5 pb-2">
              <i className="fa-solid fa-folder-tree text-[#F5E56B]" />
              COLLECTIONS (DOCUMENTS)
            </h3>

            {stats && (
              <div className="space-y-3">
                <div className="p-3 bg-black/60 rounded-xl border border-white/5 hover:border-[#D4AF37]/30 transition-all flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-envelope-open-text text-yellow-400" />
                    <div>
                      <span className="text-white text-xs font-medium block">contacts</span>
                      <span className="text-[10px] text-gray-500">Contact form submissions</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-[#D4AF37]/10 text-[#F5E56B] text-[11px] font-bold border border-[#D4AF37]/20">
                    {stats.collections.contacts} docs
                  </span>
                </div>

                <div className="p-3 bg-black/60 rounded-xl border border-white/5 hover:border-[#D4AF37]/30 transition-all flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-star text-amber-500" />
                    <div>
                      <span className="text-white text-xs font-medium block">testimonials</span>
                      <span className="text-[10px] text-gray-500">Client-authored feedback data</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-400 text-[11px] font-bold border border-cyan-500/20">
                    {stats.collections.testimonials} docs
                  </span>
                </div>
              </div>
            )}

            {/* Simulated Live status badge */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/20 to-green-950/10 border border-emerald-900/30 flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs text-emerald-400 font-medium font-sans">
                Active REST API Integration Layer Operating Perfectly
              </span>
            </div>
          </div>
          
          {/* Server Transaction Audit Trail logs */}
          {stats && stats.systemLogs && (
            <div className="col-span-1 md:col-span-12 mt-4 space-y-2">
              <div className="text-gray-500 uppercase text-[9px] tracking-widest font-bold">CLIENT ENGINE AUDIT LOGS:</div>
              <div className="bg-[#040404] p-3 rounded-xl border border-white/5 font-mono text-[10px] text-gray-400 space-y-1.5 leading-normal max-h-[110px] overflow-y-auto">
                {stats.systemLogs.map((log, idx) => (
                  <div key={idx} className="flex gap-2.5">
                    <span className="text-gray-600">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
                    <span className={log.type === 'success' ? 'text-green-400' : 'text-cyan-400'}>
                      {log.type.toUpperCase()}
                    </span>
                    <span className="text-gray-300">{log.message}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
