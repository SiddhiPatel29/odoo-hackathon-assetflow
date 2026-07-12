import React, { useState } from 'react';
import AssetDashboard from './components/AssetBadge';

function App() {
  const [view, setView] = useState('home');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const fillDemoCredentials = (role) => {
    if (role === 'admin') {
      setEmail('admin@assetflow.com');
      setPassword('admin123');
    } else {
      setEmail('staff@assetflow.com');
      setPassword('staff123');
    }
  };

  const handleAuth = (e) => {
    e.preventDefault();
    setView('dashboard'); 
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-800">
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-slate-900 text-white shadow-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setView('home')}>
            <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center font-black text-white">A</div>
            <span className="font-extrabold text-lg tracking-tight">Asset<span className="text-indigo-400">Flow</span></span>
          </div>
          
          <div className="flex items-center space-x-4">
            {view === 'dashboard' ? (
              <button onClick={() => setView('home')} className="text-xs font-bold px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 text-slate-300">
                Log Out
              </button>
            ) : (
              <>
                <button onClick={() => setView('login')} className="text-sm font-semibold text-slate-300 hover:text-white">Sign In</button>
                <button onClick={() => setView('signup')} className="text-sm font-bold bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg text-white">Get Started</button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Landing View */}
      {view === 'home' && (
        <div className="max-w-5xl mx-auto px-4 py-20 text-center space-y-8">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-1.5 text-xs font-semibold text-indigo-700">
            ✨ Next-Gen Asset Logistics ERP Suite
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight max-w-3xl mx-auto">
            Track & Manage Assets in <span className="text-indigo-600">Real-Time</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
            Streamline device provisioning, manage hardware lifecycles, and handle internal request queues effortlessly.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <button onClick={() => setView('login')} className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg">
              Access Dashboard
            </button>
          </div>
        </div>
      )}

      {/* Login Card with One-Click Demo Option for Judges */}
      {view === 'login' && (
        <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded-2xl border border-slate-200 shadow-xl">
          <h2 className="text-2xl font-black text-slate-900">Sign In</h2>
          <p className="text-sm text-slate-400 mt-1">Access your simulated deployment workspace environment.</p>
          
          {/* Quick Access Credentials Banner for Judges */}
          <div className="mt-4 p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl">
            <p className="text-xs font-bold text-indigo-800 uppercase tracking-wider mb-2">💡 Quick Judge & Demo Access</p>
            <div className="flex gap-2">
              <button 
                type="button"
                onClick={() => fillDemoCredentials('admin')}
                className="flex-1 py-1.5 px-3 bg-white border border-indigo-200 hover:bg-indigo-100 text-xs font-bold text-indigo-700 rounded-lg transition-colors"
              >
                ⚡ Autofill Admin
              </button>
              <button 
                type="button"
                onClick={() => fillDemoCredentials('staff')}
                className="flex-1 py-1.5 px-3 bg-white border border-indigo-200 hover:bg-indigo-100 text-xs font-bold text-indigo-700 rounded-lg transition-colors"
              >
                ⚡ Autofill Staff
              </button>
            </div>
          </div>

          <form className="mt-5 space-y-4" onSubmit={handleAuth}>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase">Email Address</label>
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1.5 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-600" 
                placeholder="name@company.com" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase">Password</label>
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1.5 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-600" 
                placeholder="••••••••" 
              />
            </div>
            <button type="submit" className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-md transition-all text-sm mt-2">
              Sign In to Environment
            </button>
          </form>
        </div>
      )}

      {/* Signup View */}
      {view === 'signup' && (
        <div className="max-w-md mx-auto mt-12 p-8 bg-white rounded-2xl border border-slate-200 shadow-xl">
          <h2 className="text-2xl font-black text-slate-900">Create Workspace</h2>
          <form className="mt-6 space-y-4" onSubmit={handleAuth}>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase">Full Name</label>
              <input type="text" required className="w-full mt-1.5 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" placeholder="Alex Rivera" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase">Work Email</label>
              <input type="email" required className="w-full mt-1.5 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" placeholder="alex@company.com" />
            </div>
            <button type="submit" className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl mt-2">
              Generate Workspace
            </button>
          </form>
        </div>
      )}

      {/* Main Dashboard Portal */}
      {view === 'dashboard' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Central Logistics Core</h1>
            <p className="text-sm text-slate-400 mt-0.5 font-medium">Monitor physical asset lifecycles, active team allocations, and servicing requests.</p>
          </div>
          <AssetDashboard />
        </main>
      )}

    </div>
  );
}

export default App;