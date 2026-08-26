import React, { useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, Cpu, Activity, Database } from 'lucide-react';

const VideoModal = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [activeTab, setActiveTab] = useState('pipeline');
  const [progress, setProgress] = useState(35);

  useEffect(() => {
    let timer;
    if (isOpen && isPlaying) {
      timer = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 200);
    }
    return () => clearInterval(timer);
  }, [isOpen, isPlaying]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-4xl rounded-[24px] bg-[#0B0B0B] border border-[#252525] shadow-[0_0_60px_rgba(255,31,38,0.3)] overflow-hidden z-10 transition-all my-8">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#252525] bg-[#111111]">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#FF1F26] animate-ping" />
            <span className="text-sm font-semibold text-white tracking-wide">
              NeverquiT AI Platform Walkthrough (Live Architecture Demo)
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#050505] border border-[#252525] text-[#A8A8A8] hover:text-white hover:border-[#FF1F26] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close video"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="relative aspect-video bg-[#050505] overflow-hidden flex flex-col justify-between p-6 sm:p-8">
          <div className="absolute inset-0 bg-grid-pattern opacity-30" />
          <div className="absolute inset-0 bg-radial-hero opacity-80" />

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-[#111111]/80 border border-[#252525] text-xs font-mono text-[#FF3030]">
              <Cpu className="w-3.5 h-3.5 text-[#FF1F26]" />
              <span>CLUSTER: NQ-GPU-NODE-09</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-[#111111]/80 border border-[#252525] text-xs font-mono text-[#A8A8A8]">
              <Activity className="w-3.5 h-3.5 text-[#FF1F26]" />
              <span>LATENCY: 14ms (p99)</span>
            </div>
          </div>

          <div className="relative z-10 my-auto text-center">
            {activeTab === 'pipeline' && (
              <div className="space-y-4 max-w-lg mx-auto">
                <div className="inline-flex p-4 rounded-2xl bg-[#111111] border border-[#FF1F26]/40 shadow-[0_0_30px_rgba(255,31,38,0.25)]">
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-12 h-12 rounded-xl bg-[#FF1F26]/10 flex items-center justify-center text-[#FF1F26]">
                      <Database className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs text-[#737373] uppercase font-mono">Real-Time Autonomous Pipeline</div>
                      <div className="text-base font-bold text-white">Continuous Model Self-Optimization</div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-12 h-1.5 rounded-full bg-[#252525] overflow-hidden"
                    >
                      <div
                        className="h-full bg-[#FF1F26] transition-all duration-300"
                        style={{ width: `${(progress * i) % 100}%` }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'neural' && (
              <div className="p-6 rounded-2xl bg-[#111111]/90 border border-[#FF1F26]/50 max-w-md mx-auto shadow-[0_0_30px_rgba(255,31,38,0.3)]">
                <div className="text-sm font-bold text-white mb-2">Neural Decision Engine Active</div>
                <div className="text-xs text-[#A8A8A8] mb-4">Processing 42,000 requests/sec across distributed multi-region clusters.</div>
                <div className="grid grid-cols-3 gap-2 text-left">
                  <div className="p-2 rounded bg-[#050505] border border-[#252525]">
                    <div className="text-[10px] text-[#737373]">Accuracy</div>
                    <div className="text-sm font-bold text-[#FF1F26]">99.94%</div>
                  </div>
                  <div className="p-2 rounded bg-[#050505] border border-[#252525]">
                    <div className="text-[10px] text-[#737373]">Uptime</div>
                    <div className="text-sm font-bold text-white">100.0%</div>
                  </div>
                  <div className="p-2 rounded bg-[#050505] border border-[#252525]">
                    <div className="text-[10px] text-[#737373]">Cost Saved</div>
                    <div className="text-sm font-bold text-[#FF1F26]">68%</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'agents' && (
              <div className="p-6 rounded-2xl bg-[#111111]/90 border border-[#FF1F26]/50 max-w-md mx-auto shadow-[0_0_30px_rgba(255,31,38,0.3)]">
                <div className="text-sm font-bold text-white mb-2">Autonomous Agent Swarm</div>
                <div className="space-y-2 text-left text-xs">
                  <div className="flex items-center justify-between p-2 rounded bg-[#050505]">
                    <span className="text-white">Customer Support Agent</span>
                    <span className="text-[#FF1F26] font-mono">RESOLVED (1.2s)</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-[#050505]">
                    <span className="text-white">Data Cleaning Agent</span>
                    <span className="text-[#FF1F26] font-mono">STREAMING</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-[#050505]">
                    <span className="text-white">Predictive Analytics Agent</span>
                    <span className="text-white font-mono">STANDBY</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="relative z-10 space-y-3">
            <div 
              className="w-full h-1.5 bg-[#252525] rounded-full overflow-hidden cursor-pointer group"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                setProgress((clickX / rect.width) * 100);
              }}
            >
              <div 
                className="h-full bg-gradient-to-r from-[#FF1F26] to-[#FF3030] relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 shadow-md" />
              </div>
            </div>

            <div className="flex items-center justify-between text-white text-xs">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-8 h-8 rounded-lg bg-[#111111] border border-[#252525] hover:border-[#FF1F26] flex items-center justify-center text-white transition-colors cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-[#FF1F26]" />}
                </button>

                <button 
                  onClick={() => setIsMuted(!isMuted)}
                  className="w-8 h-8 rounded-lg bg-[#111111] border border-[#252525] hover:border-[#FF1F26] flex items-center justify-center text-[#A8A8A8] hover:text-white transition-colors cursor-pointer"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#FF1F26]" />}
                </button>

                <span className="text-[#737373] font-mono">01:24 / 03:45</span>
              </div>

              <div className="hidden sm:flex items-center gap-1 bg-[#111111] p-1 rounded-lg border border-[#252525]">
                <button
                  onClick={() => setActiveTab('pipeline')}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                    activeTab === 'pipeline' ? 'bg-[#FF1F26] text-white' : 'text-[#A8A8A8] hover:text-white'
                  }`}
                >
                  Pipeline
                </button>
                <button
                  onClick={() => setActiveTab('neural')}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                    activeTab === 'neural' ? 'bg-[#FF1F26] text-white' : 'text-[#A8A8A8] hover:text-white'
                  }`}
                >
                  Neural Core
                </button>
                <button
                  onClick={() => setActiveTab('agents')}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                    activeTab === 'agents' ? 'bg-[#FF1F26] text-white' : 'text-[#A8A8A8] hover:text-white'
                  }`}
                >
                  Agent Swarm
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#FF1F26]/20 text-[#FF3030] border border-[#FF1F26]/40">
                  4K ULTRA HD
                </span>
                <Maximize2 className="w-4 h-4 text-[#737373] hover:text-white cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
