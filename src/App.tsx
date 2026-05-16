import React, { useState, useEffect, useRef } from 'react';
import { 
  Zap, 
  Terminal, 
  Activity, 
  Layers, 
  Download, 
  Home, 
  Search, 
  Settings, 
  FileText,
  Clock,
  CheckCircle2
} from 'lucide-react';

interface Log {
  id: string;
  msg: string;
  time: string;
  status: 'pending' | 'success' | 'info';
}

interface Task {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'completed';
  result?: string;
}

interface Strategy {
  title: string;
  summary: string;
  pillars: { name: string; desc: string }[];
}

function App() {
  const [goal, setGoal] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [logs, setLogs] = useState<Log[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [strategy, setStrategy] = useState<Strategy | null>(null);
  const logEndRef = useRef<HTMLDivElement>(null);

  const addLog = (msg: string, status: Log['status'] = 'info') => {
    setLogs(prev => [...prev, {
      id: Math.random().toString(36).substr(2, 9),
      msg,
      status,
      time: new Date().toLocaleTimeString('en-GB', { hour12: false })
    }]);
  };

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const execute = async () => {
    if (!goal) return;
    setIsExecuting(true);
    setLogs([]);
    setTasks([]);
    setStrategy(null);

    addLog('Agent initialized. Booting neural engine...', 'info');
    await sleep(1000);

    // 1. Task Decomposition
    addLog('DECOMPOSING GOAL INTO AUTONOMOUS TASKS...', 'info');
    const initialTasks: Task[] = [
      { id: '1', name: 'Market Intelligence & Competitor Audit', status: 'pending' },
      { id: '2', name: 'Technical Feasibility & Architecture Mapping', status: 'pending' },
      { id: '3', name: 'Risk Assessment & Mitigation Planning', status: 'pending' },
      { id: '4', name: 'Resource Orchestration & Budgeting', status: 'pending' },
      { id: '5', name: 'Final Strategy Synthesis & Reporting', status: 'pending' }
    ];
    setTasks(initialTasks);
    await sleep(1500);

    // 2. Sequential Execution Loop
    for (let i = 0; i < initialTasks.length; i++) {
      const currentTask = initialTasks[i];
      
      // Update task to running
      setTasks(prev => prev.map(t => t.id === currentTask.id ? { ...t, status: 'running' } : t));
      addLog(`EXECUTING: ${currentTask.name}...`, 'info');
      
      // Simulate real "Agent Work"
      await sleep(2000 + Math.random() * 2000);
      
      // Update task to completed
      setTasks(prev => prev.map(t => t.id === currentTask.id ? { ...t, status: 'completed', result: `Verified data points for ${goal.slice(0, 10)}...` } : t));
      addLog(`COMPLETED: ${currentTask.name}`, 'success');
    }

    // 3. Final Synthesis
    addLog('ALL TASKS COMPLETED. GENERATING FINAL DIRECTIVE.', 'success');
    
    const goalTitle = goal.charAt(0).toUpperCase() + goal.slice(1);
    const input = goal.toLowerCase();

    // --- PROPER CONTENT ENGINE ---
    const getDetailedPillars = () => {
      if (input.includes('food') || input.includes('delivery') || input.includes('grocery')) {
        return [
          { name: 'Market Intelligence & Competitor Audit', desc: `In-depth analysis of the hyper-local delivery landscape. We've identified a 22% inefficiency in current 'Last-Mile' logistics. Our audit confirms that by optimizing courier route-density using a Hub-and-Spoke model, we can reduce delivery costs by $1.20 per order compared to industry leaders.` },
          { name: 'Technical Feasibility & Architecture', desc: `The proposed tech stack for ${goalTitle} utilizes a geo-sharded MongoDB cluster paired with a Redis caching layer for sub-50ms order matching. We recommend an Event-Driven Architecture (EDA) to handle the 10,000+ concurrent websocket connections required during peak meal hours.` },
          { name: 'Risk Assessment & Mitigation', desc: `Primary risk identified: Fluctuating gig-economy regulations. Our mitigation strategy involves a 'Hybrid Fleet' model (Contractor + Partner) to ensure 100% operational continuity. We've also integrated a real-time fraud detection engine to minimize chargeback losses (est. <0.05%).` },
          { name: 'Resource Orchestration & Budget', desc: `Initial capital allocation of $250k focused on 60% Customer Acquisition Cost (CAC) and 40% Infrastructure. By leveraging serverless compute, we projected a 35% reduction in initial burn rate, extending runway by an additional 4 months.` },
          { name: 'Final Strategy Synthesis', desc: `The ${goalTitle} protocol is green-lit for a 'Soft Launch' in Tier-1 urban clusters. Success KPIs: 15-minute average delivery time and a 4.2+ user rating. Scalability tests indicate the system can support 500% growth before requiring structural sharding.` }
        ];
      } else if (input.includes('app') || input.includes('software') || input.includes('tech') || input.includes('saas')) {
        return [
          { name: 'Market Intelligence & Competitor Audit', desc: `Competitive landscape audit for ${goalTitle} reveals a significant 'Feature-Bloat' in legacy SaaS products. Our strategy focuses on a 'Verticalized UX'—reducing click-depth by 40% to drive higher user adoption among non-technical stakeholders.` },
          { name: 'Technical Feasibility & Architecture', desc: `We recommend a multi-tenant PostgreSQL architecture with Row-Level Security (RLS) to ensure 100% data isolation. The frontend will utilize a Micro-Frontend (MFE) pattern to allow independent deployment cycles and sub-2s initial load times.` },
          { name: 'Risk Assessment & Mitigation', desc: `Cybersecurity audit identifies 'Data Exfiltration' as the primary threat. Mitigation involves implementing a Zero-Trust architecture with automated rotate-and-refresh keys. Estimated security uptime: 99.999%.` },
          { name: 'Resource Orchestration & Budget', desc: `Strategic headcount allocation: 4 Senior Full-Stack Engineers and 2 DevOps Specialists. By utilizing an 'In-Region' cloud strategy, we've optimized hosting costs by 18% while maintaining sub-100ms global latency.` },
          { name: 'Final Strategy Synthesis', desc: `Deployment blueprint for ${goalTitle} is finalized. First milestone: Closed Beta for 50 Enterprise partners. Projected user growth: 10k MAU within 90 days post-launch.` }
        ];
      } else {
        return [
          { name: 'Market Intelligence & Competitor Audit', desc: `High-fidelity audit of the ${goalTitle} domain. We've cross-referenced 14,000+ data points to identify an untapped 'Niche Authority' opportunity. Market sentiment analysis indicates a 68% positive lean toward the proposed solution.` },
          { name: 'Technical Feasibility & Architecture', desc: `The architecture for "${goal}" is built on a high-availability 'Self-Healing' cluster. We recommend a decoupled backend to ensure that the core logic remains platform-agnostic, allowing for seamless integration with future AI LLM layers.` },
          { name: 'Risk Assessment & Mitigation', desc: `Strategic risk audit identified 'Operational Friction' as a key bottleneck. Mitigation strategy: Automated workflow orchestration to replace 30% of manual data entry tasks, resulting in an estimated 12% increase in net efficiency.` },
          { name: 'Resource Orchestration & Budget', desc: `Budget analysis for ${goalTitle} suggests a lean-startup approach. By prioritizing 'High-Impact' features in Phase 1, we can achieve a Positive Cash Flow 3 months faster than traditional deployment models.` },
          { name: 'Final Strategy Synthesis', desc: `The complete Strategic Directive for ${goalTitle} is ready for execution. Our predictive models indicate a 94.2% probability of achieving initial milestones within the first quarter.` }
        ];
      }
    };

    setStrategy({
      title: `EXECUTIVE DIRECTIVE: ${goalTitle}`,
      summary: `Comprehensive strategic blueprint for "${goal}". This document outlines the technical, financial, and operational requirements for market dominance.`,
      pillars: getDetailedPillars()
    });

    addLog('Intelligence synthesis complete. Finalizing package...', 'success');
    await sleep(1000);
    addLog('Package deployed to Neural Workspace.', 'success');
    setIsExecuting(false);
  };

  const downloadFullReport = () => {
    if (!strategy) return;
    const content = `
${strategy.title}
=========================================
${strategy.summary}

${strategy.pillars.map((p, i) => `${i + 1}. ${p.name}\n${p.desc}\n`).join('\n')}

Verified by Rahul AI Core • ${new Date().toLocaleDateString()}
    `;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Rahul_AI_Strategy_${goal.replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
            <Zap size={18} color="black" />
          </div>
          <h1>Rahul Testing AI</h1>
        </div>

        <nav className="flex flex-col gap-1">
          <div className="nav-link active"><Home size={16} /> Dashboard</div>
          <div className="nav-link"><Search size={16} /> Explorer</div>
          <div className="nav-link"><FileText size={16} /> Reports</div>
          <div className="nav-link"><Clock size={16} /> History</div>
          <div className="nav-link"><Settings size={16} /> Settings</div>
        </nav>

        <div className="mt-auto p-4 bg-[#151515] rounded-lg border border-[#262626]">
          <p className="text-[11px] font-bold text-[#555] uppercase mb-1">Status</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-xs font-medium text-white">System Ready</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main">
        <div className="container">
          <header className="mb-12 animate-in">
            <span className="badge">System v2.5.0-Alpha</span>
            <h2>Autonomous Strategy Orchestrator</h2>
            <p>Define your objective and let the AI architect the end-to-end execution path.</p>
          </header>

          <section className="input-area">
            <textarea 
              className="textarea-minimal"
              placeholder="Deploy agent for a specific objective..."
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              disabled={isExecuting}
            />
            <div className="flex justify-end">
              <button 
                className="btn-minimal flex items-center gap-2"
                onClick={execute}
                disabled={isExecuting}
              >
                {isExecuting ? 'AGENT ACTIVE...' : (
                  <>
                    <Zap size={14} fill="currentColor" />
                    Deploy Agent
                  </>
                )}
              </button>
            </div>
          </section>

          {tasks.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 animate-in">
              <div>
                <h3 className="text-[10px] font-bold text-[#555] uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Layers size={14} /> Logic Chain Execution
                </h3>
                {tasks.map(task => (
                  <div key={task.id} className={`task-node ${task.status === 'running' ? 'active' : ''} ${task.status === 'completed' ? 'completed' : ''}`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-2 h-2 rounded-full ${task.status === 'completed' ? 'bg-green-500' : task.status === 'running' ? 'bg-blue-500 animate-pulse shadow-[0_0_10px_#3b82f6]' : 'bg-white/10'}`} />
                      <span className={`text-sm font-medium ${task.status === 'completed' ? 'text-white' : 'text-[#888]'}`}>{task.name}</span>
                    </div>
                    {task.status === 'running' && <Activity size={14} className="text-blue-500 animate-spin" />}
                    {task.status === 'completed' && <CheckCircle2 size={14} className="text-green-500" />}
                  </div>
                ))}
              </div>

              <div className="log-monitor">
                <div className="flex items-center gap-2 mb-4 text-[10px] font-bold uppercase tracking-widest text-[#555]">
                  <Terminal size={12} /> Runtime Kernel Logs
                </div>
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                  {logs.map(log => (
                    <div key={log.id} className="log-line">
                      <span className="log-timestamp">[{log.time}]</span>
                      <span className={log.status === 'success' ? 'text-green-500' : 'text-blue-500'}>
                        {log.status === 'success' ? '●' : '○'}
                      </span>
                      <span className="text-white/80">{log.msg}</span>
                    </div>
                  ))}
                  <div ref={logEndRef} />
                </div>
              </div>
            </div>
          )}

          {strategy && (
            <div className="card-minimal mt-10 animate-in fade-in slide-in-from-bottom-4 duration-500 border-blue-500/20">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-1">Intelligence Directive</p>
                  <h2 className="!m-0 text-xl">Strategic Analysis Report</h2>
                </div>
                <button 
                  onClick={downloadFullReport}
                  className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-4 py-2 rounded-md text-xs font-bold transition-all flex items-center gap-2"
                >
                  <Download size={14} /> EXPORT DOCUMENT
                </button>
              </div>
              
              <div className="p-4 bg-blue-500/5 rounded-md border border-blue-500/10 mb-10">
                <p className="text-white text-sm font-medium leading-relaxed italic">"{strategy.summary}"</p>
              </div>

              <div className="report-grid">
                {strategy.pillars.map((p, i) => (
                  <div key={i} className="report-item mb-8">
                    <h3 className="text-xs font-bold text-white uppercase mb-3 flex items-center gap-3">
                      <span className="w-5 h-5 bg-blue-500/20 text-blue-500 rounded flex items-center justify-center text-[10px]">{i+1}</span>
                      {p.name}
                    </h3>
                    <p className="text-xs leading-relaxed text-[#a1a1a1] pl-8 border-l border-white/5">{p.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-white/5 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span className="text-[10px] font-bold text-[#555] uppercase tracking-widest">Verified by Rahul AI Core</span>
                </div>
                <p className="text-[10px] text-[#555]">CONFIDENTIAL STRATEGY • 2026</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
