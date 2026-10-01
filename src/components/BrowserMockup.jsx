import React from 'react';
import { 
  Shield, 
  Search, 
  Heart, 
  Droplet, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Film, 
  Star, 
  GraduationCap, 
  CheckCircle2, 
  Lock,
  ExternalLink,
  Layers,
  Database
} from 'lucide-react';

/**
 * BrowserMockup Component
 * Renders an editorial browser window frame.
 * If `image` is passed, displays the real screenshot.
 * Otherwise, renders an authentic, responsive custom UI mockup for the given project.
 */
export default function BrowserMockup({ project }) {
  const { title, image, mockupType, liveUrl } = project;

  // Custom mock URL for the browser bar
  const getMockUrl = (type) => {
    switch (type) {
      case 'bloodlink':
        return 'https://bloodlink.org/donors/search?group=O-positive';
      case 'pocketflow':
        return 'https://pocketflow.app/dashboard/analytics';
      case 'moviediscovery':
        return 'https://moviedb-discovery.web.app/trending';
      case 'studentportal':
        return 'http://localhost/student-portal/dashboard.php';
      default:
        return 'https://project.local';
    }
  };

  return (
    <div className="w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800/90 shadow-2xl transition-all duration-300 group-hover:border-blue-500/40 group-hover:shadow-glow">
      {/* Browser Window Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800/80 text-xs select-none">
        {/* Window controls */}
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-500 transition-colors" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-500 transition-colors" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 transition-colors" />
        </div>

        {/* URL bar */}
        <div className="flex items-center justify-center space-x-1.5 px-3 py-1 rounded-md bg-slate-950/80 border border-slate-800/70 text-slate-400 font-mono text-[11px] max-w-[70%] truncate">
          <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
          <span className="truncate">{getMockUrl(mockupType)}</span>
        </div>

        {/* Action icons / badge */}
        <div className="flex items-center text-slate-500">
          <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 hidden sm:inline">
            Preview
          </span>
        </div>
      </div>

      {/* Browser Body */}
      <div className="relative aspect-[16/10] w-full bg-slate-950 overflow-hidden flex flex-col justify-between">
        {image ? (
          // If Muhammed adds an actual screenshot image
          <img 
            src={image} 
            alt={`${title} interface preview`} 
            className="w-full h-full object-cover object-top"
            loading="lazy"
          />
        ) : (
          // High-fidelity UI mockup representation
          <div className="p-4 sm:p-6 w-full h-full flex flex-col justify-between text-left select-none overflow-hidden">
            {mockupType === 'bloodlink' && <BloodLinkMockup />}
            {mockupType === 'pocketflow' && <PocketFlowMockup />}
            {mockupType === 'moviediscovery' && <MovieDiscoveryMockup />}
            {mockupType === 'studentportal' && <StudentPortalMockup />}
            {!['bloodlink', 'pocketflow', 'moviediscovery', 'studentportal'].includes(mockupType) && (
              <GenericProjectMockup project={project} />
            )}
          </div>
        )}

        {/* Discreet indicator helping Muhammed know how to replace */}
        <div className="absolute bottom-2 right-2 bg-slate-950/85 backdrop-blur-sm border border-slate-800/80 text-[10px] text-slate-400 px-2 py-0.5 rounded font-mono pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
          Custom screenshot: set in portfolioData.js
        </div>
      </div>
    </div>
  );
}

// 1. Blood Link Custom Mockup
function BloodLinkMockup() {
  return (
    <div className="flex flex-col h-full space-y-3 font-sans">
      {/* Top Bar inside Blood Link */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/60">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center">
            <Droplet className="w-4 h-4 fill-rose-500/30" />
          </div>
          <div>
            <span className="font-semibold text-white text-xs sm:text-sm">Blood Link</span>
            <span className="text-[10px] text-slate-400 block -mt-0.5">Emergency Donor Registry</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse" />
            Live Donors: 142
          </span>
        </div>
      </div>

      {/* Search Filter Strip */}
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="bg-slate-900/90 border border-slate-800 rounded p-2 flex items-center justify-between">
          <span className="text-slate-400 text-[11px]">Selected Group:</span>
          <span className="font-bold text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded">O+ Positive</span>
        </div>
        <div className="bg-slate-900/90 border border-slate-800 rounded p-2 flex items-center justify-between">
          <span className="text-slate-400 text-[11px]">District / City:</span>
          <span className="text-slate-200 font-medium truncate">Ernakulam</span>
        </div>
        <div className="bg-slate-900/90 border border-slate-800 rounded p-2 flex items-center justify-between">
          <span className="text-slate-400 text-[11px]">Status:</span>
          <span className="text-blue-400 font-medium">Verified Donors</span>
        </div>
      </div>

      {/* Donor Cards Grid */}
      <div className="grid grid-cols-2 gap-2 flex-1 overflow-hidden pt-1">
        <div className="bg-slate-900/70 border border-slate-800/70 rounded-lg p-2.5 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-white">Rahul K.</p>
              <p className="text-[10px] text-slate-400">General Hospital • 2.4 km</p>
            </div>
            <span className="text-xs font-bold text-rose-400 bg-rose-950/60 border border-rose-800/40 px-1.5 py-0.5 rounded">
              O+
            </span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-slate-800/50 text-[10px]">
            <span className="text-emerald-400 flex items-center">
              <CheckCircle2 className="w-3 h-3 mr-1" /> Ready to donate
            </span>
            <span className="text-slate-500 font-mono">Last: 90d ago</span>
          </div>
        </div>

        <div className="bg-slate-900/70 border border-slate-800/70 rounded-lg p-2.5 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-white">Ananya S.</p>
              <p className="text-[10px] text-slate-400">Aster Medcity • 4.1 km</p>
            </div>
            <span className="text-xs font-bold text-rose-400 bg-rose-950/60 border border-rose-800/40 px-1.5 py-0.5 rounded">
              O+
            </span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-slate-800/50 text-[10px]">
            <span className="text-emerald-400 flex items-center">
              <CheckCircle2 className="w-3 h-3 mr-1" /> Ready to donate
            </span>
            <span className="text-slate-500 font-mono">Verified Donor</span>
          </div>
        </div>
      </div>

      {/* API / Auth highlight footer */}
      <div className="px-2.5 py-1.5 rounded bg-blue-950/30 border border-blue-900/40 flex items-center justify-between text-[11px]">
        <span className="text-blue-300 font-mono text-[10px]">REST API: /api/v1/donors/query?blood=O_POS</span>
        <span className="text-slate-400 font-mono text-[10px]">JWT Authenticated</span>
      </div>
    </div>
  );
}

// 2. PocketFlow Custom Mockup
function PocketFlowMockup() {
  return (
    <div className="flex flex-col h-full space-y-3 font-sans">
      {/* Top Dashboard Bar */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">
            PF
          </div>
          <span className="font-semibold text-white text-xs sm:text-sm">PocketFlow Dashboard</span>
        </div>
        <span className="text-[11px] font-mono text-slate-400">September 2026</span>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-2">
          <span className="text-[10px] text-slate-400 block">Total Balance</span>
          <span className="text-sm font-bold text-white tracking-tight">₹42,850.00</span>
          <span className="text-[9px] text-emerald-400 flex items-center mt-0.5">
            +8.4% from last month
          </span>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-2">
          <span className="text-[10px] text-slate-400 block">Monthly Income</span>
          <span className="text-sm font-bold text-emerald-400 tracking-tight">₹55,000.00</span>
          <span className="text-[9px] text-slate-400 block mt-0.5">Direct Deposit</span>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-2">
          <span className="text-[10px] text-slate-400 block">Expenses</span>
          <span className="text-sm font-bold text-rose-400 tracking-tight">₹12,150.00</span>
          <span className="text-[9px] text-slate-400 block mt-0.5">22% of budget</span>
        </div>
      </div>

      {/* Visual Activity & Category Breakdown */}
      <div className="grid grid-cols-2 gap-2 flex-1">
        {/* Recent Transactions List */}
        <div className="bg-slate-900/60 border border-slate-800/60 rounded-lg p-2 flex flex-col justify-between">
          <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
            Recent Ledger
          </span>
          <div className="space-y-1.5 mt-1 text-[11px]">
            <div className="flex justify-between items-center">
              <span className="text-slate-300 truncate">Domain & Hosting</span>
              <span className="text-rose-400 font-mono text-[10px]">-₹1,120</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300 truncate">Freelance Milestone</span>
              <span className="text-emerald-400 font-mono text-[10px]">+₹15,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300 truncate">Course Material</span>
              <span className="text-rose-400 font-mono text-[10px]">-₹850</span>
            </div>
          </div>
        </div>

        {/* Budget Progress Bars */}
        <div className="bg-slate-900/60 border border-slate-800/60 rounded-lg p-2 flex flex-col justify-between">
          <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
            Category Budgets
          </span>
          <div className="space-y-2 mt-1">
            <div>
              <div className="flex justify-between text-[10px] text-slate-300 mb-0.5">
                <span>Tech & Tools</span>
                <span className="font-mono">65%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full w-[65%]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[10px] text-slate-300 mb-0.5">
                <span>Living Expenses</span>
                <span className="font-mono">38%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[38%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 3. Movie Discovery App Custom Mockup
function MovieDiscoveryMockup() {
  return (
    <div className="flex flex-col h-full space-y-3 font-sans">
      {/* Top Search & Filter Bar */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
        <div className="flex items-center space-x-2">
          <Film className="w-4 h-4 text-cyan-400" />
          <span className="font-semibold text-white text-xs sm:text-sm">CineScope Explorer</span>
        </div>
        <div className="flex items-center space-x-1.5 px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-300">
          <Search className="w-3 h-3 text-slate-500" />
          <span>Interstellar</span>
        </div>
      </div>

      {/* Featured Backdrop Banner */}
      <div className="relative rounded-lg overflow-hidden bg-gradient-to-r from-slate-900 via-blue-950/60 to-slate-900 border border-slate-800 p-3 flex items-center justify-between">
        <div>
          <span className="text-[9px] uppercase font-mono tracking-wider text-cyan-400 bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-800/40">
            TMDB Trending #1
          </span>
          <h4 className="text-white font-bold text-xs sm:text-sm mt-1">Interstellar (2014)</h4>
          <p className="text-[10px] text-slate-400 line-clamp-1 max-w-[280px]">
            A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.
          </p>
        </div>
        <div className="flex items-center bg-slate-950/80 border border-slate-800 px-2 py-1 rounded text-amber-400 text-xs font-bold space-x-1 shrink-0">
          <Star className="w-3.5 h-3.5 fill-amber-400" />
          <span>8.7</span>
        </div>
      </div>

      {/* Movie Card Carousel / Grid preview */}
      <div className="grid grid-cols-4 gap-2 flex-1">
        {[
          { title: "Oppenheimer", year: "2023", score: "8.9", tag: "Drama" },
          { title: "Dune: Part Two", year: "2024", score: "8.6", tag: "Sci-Fi" },
          { title: "Blade Runner", year: "2049", score: "8.0", tag: "Action" },
          { title: "The Dark Knight", year: "2008", score: "9.0", tag: "Thriller" },
        ].map((movie, idx) => (
          <div key={idx} className="bg-slate-900/80 border border-slate-800/80 rounded p-1.5 flex flex-col justify-between">
            <div className="w-full aspect-[3/4] bg-slate-800/60 rounded flex items-center justify-center text-slate-600 mb-1">
              <Film className="w-5 h-5 opacity-40 text-cyan-400" />
            </div>
            <div>
              <p className="text-[10px] font-semibold text-slate-200 truncate">{movie.title}</p>
              <div className="flex justify-between items-center text-[9px] text-slate-400 mt-0.5">
                <span>{movie.year}</span>
                <span className="text-amber-400 font-mono">★ {movie.score}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 4. Student Portal Custom Mockup (Academic / Experiment)
function StudentPortalMockup() {
  return (
    <div className="flex flex-col h-full space-y-3 font-sans">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
        <div className="flex items-center space-x-2">
          <GraduationCap className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold text-white text-xs sm:text-sm">IT Department Student Portal</span>
        </div>
        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-800/50 px-2 py-0.5 rounded">
          PHP & MySQL Backend
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="bg-slate-900/80 border border-slate-800 rounded p-2">
          <span className="text-[10px] text-slate-400 block">Student Register No</span>
          <span className="font-mono text-slate-200 font-semibold">IT-2023-4081</span>
        </div>
        <div className="bg-slate-900/80 border border-slate-800 rounded p-2">
          <span className="text-[10px] text-slate-400 block">Semester CGPA</span>
          <span className="font-mono text-emerald-400 font-semibold">8.74 / 10.0</span>
        </div>
        <div className="bg-slate-900/80 border border-slate-800 rounded p-2">
          <span className="text-[10px] text-slate-400 block">Attendance Rate</span>
          <span className="font-mono text-blue-400 font-semibold">94.8%</span>
        </div>
      </div>

      {/* Relational Table Mockup */}
      <div className="bg-slate-900/70 border border-slate-800 rounded overflow-hidden flex-1 flex flex-col justify-between">
        <table className="w-full text-left text-[11px]">
          <thead className="bg-slate-800/60 text-slate-400 text-[10px] uppercase font-mono">
            <tr>
              <th className="py-1 px-2.5">Course Code</th>
              <th className="py-1 px-2.5">Subject</th>
              <th className="py-1 px-2.5">Credits</th>
              <th className="py-1 px-2.5">Internal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50 text-slate-300">
            <tr>
              <td className="py-1 px-2.5 font-mono text-slate-400">CS301</td>
              <td className="py-1 px-2.5">Database Management Systems</td>
              <td className="py-1 px-2.5">4</td>
              <td className="py-1 px-2.5 text-emerald-400 font-medium">48/50</td>
            </tr>
            <tr>
              <td className="py-1 px-2.5 font-mono text-slate-400">IT304</td>
              <td className="py-1 px-2.5">Web Technologies & Frameworks</td>
              <td className="py-1 px-2.5">4</td>
              <td className="py-1 px-2.5 text-emerald-400 font-medium">49/50</td>
            </tr>
            <tr>
              <td className="py-1 px-2.5 font-mono text-slate-400">CS306</td>
              <td className="py-1 px-2.5">Computer Networks</td>
              <td className="py-1 px-2.5">3</td>
              <td className="py-1 px-2.5 text-emerald-400 font-medium">46/50</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Fallback Generic Mockup
function GenericProjectMockup({ project }) {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-4">
      <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-3">
        <Layers className="w-6 h-6" />
      </div>
      <h4 className="text-white font-semibold text-sm">{project.title}</h4>
      <p className="text-slate-400 text-xs mt-1 max-w-sm">{project.description}</p>
    </div>
  );
}
