import React, { useState } from 'react';
import AllocationModal from '../components/AllocationModal';
import BookingModal from '../components/BookingModal';
import { Laptop, Search, Filter, CalendarDays, ShieldAlert, CheckCircle2, User, HardDrive, AlertTriangle } from 'lucide-react';

const initialAssets = [
  { _id: "64b0f301", name: "ThinkPad X1 Carbon", category: "Hardware", assetTag: "AF-0001", serialNumber: "SN12345678", condition: "New", location: "HQ-Floor 2", isSharedBookable: false, status: "Available", currentHolder: null },
  { _id: "64b0f302", name: "MacBook Pro 16\"", category: "Hardware", assetTag: "AF-0002", serialNumber: "SN87654321", condition: "Good", location: "HQ-Floor 3", isSharedBookable: false, status: "Allocated", currentHolder: "Priya Sharma" },
  { _id: "64b0f303", name: "Conf Room B Projector", category: "Media", assetTag: "AF-0003", serialNumber: "SN55443322", condition: "Good", location: "Conf Room B", isSharedBookable: true, status: "Available", currentHolder: null },
  { _id: "64b0f304", name: "Dell UltraSharp 27\"", category: "Peripherals", assetTag: "AF-0004", serialNumber: "SN99887766", condition: "Damaged", location: "Lab 1", isSharedBookable: false, status: "Under Maintenance", currentHolder: null }
];

// Clean Inline Badge Handler to eliminate circular dependency issues
function InnerStatusBadge({ status }) {
  const styles = {
    'Available': 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
    'Allocated': 'bg-blue-50 text-blue-700 border-blue-200/60',
    'Reserved': 'bg-purple-50 text-purple-700 border-purple-200/60',
    'Under Maintenance': 'bg-amber-50 text-amber-700 border-amber-200/60'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${styles[status] || 'bg-slate-100 text-slate-700'}`}>
      <span className={`h-1.5 w-1.5 rounded-full mr-1.5 ${
        status === 'Available' ? 'bg-emerald-500' : status === 'Allocated' ? 'bg-blue-500' : status === 'Reserved' ? 'bg-purple-500' : 'bg-amber-500'
      }`} />
      {status}
    </span>
  );
}

export default function AssetDashboard() {
  const [assets, setAssets] = useState(initialAssets);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [isAllocOpen, setIsAllocOpen] = useState(false);
  const [isBookOpen, setIsBookOpen] = useState(false);

  const handleActionClick = (asset) => {
    setSelectedAsset(asset);
    if (asset.isSharedBookable) {
      setIsBookOpen(true);
    } else {
      setIsAllocOpen(true);
    }
  };

  const handleAllocationSuccess = (assetId) => {
    setAssets(prev => prev.map(a => a._id === assetId ? { ...a, status: 'Allocated', currentHolder: 'Staff Member' } : a));
  };

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) || asset.assetTag.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || asset.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Modern High-Impact Statistics Metrics Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Inventory</p>
            <p className="text-3xl font-black text-slate-900 mt-1">{assets.length}</p>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-500"><HardDrive className="h-6 w-6" /></div>
        </div>
        
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Available Ready</p>
            <p className="text-3xl font-black text-emerald-600 mt-1">{assets.filter(a => a.status === 'Available').length}</p>
          </div>
          <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-500"><CheckCircle2 className="h-6 w-6" /></div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Allocated Active</p>
            <p className="text-3xl font-black text-blue-600 mt-1">{assets.filter(a => a.status === 'Allocated').length}</p>
          </div>
          <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-blue-500"><User className="h-6 w-6" /></div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">In Maintenance</p>
            <p className="text-3xl font-black text-amber-600 mt-1">{assets.filter(a => a.status === 'Under Maintenance').length}</p>
          </div>
          <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl text-amber-500"><AlertTriangle className="h-6 w-6" /></div>
        </div>
      </div>

      {/* Advanced Filter Control Header Ribbon Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search catalog by hardware name or unique tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all placeholder-slate-400"
          />
        </div>
        <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
          <Filter className="h-4 w-4 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-slate-200 rounded-lg text-sm px-3 py-2 bg-slate-50 font-semibold text-slate-700 focus:outline-none focus:border-indigo-600 transition-colors cursor-pointer"
          >
            <option value="All">All Lifecycles</option>
            <option value="Available">Available Only</option>
            <option value="Allocated">Allocated Only</option>
            <option value="Under Maintenance">Under Maintenance</option>
          </select>
        </div>
      </div>

      {/* Modern Catalog Structured Inventory Grid Table Layout */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead className="bg-slate-50 border-b border-slate-200/80 text-slate-400 font-bold text-xs tracking-wider uppercase">
              <tr>
                <th className="py-3.5 px-6">Hardware Details</th>
                <th className="py-3.5 px-6">System Tag</th>
                <th className="py-3.5 px-6">Location</th>
                <th className="py-3.5 px-6">Model Classification</th>
                <th className="py-3.5 px-6">Status State</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600 font-medium">
              {filteredAssets.map((asset) => (
                <tr key={asset._id} className="hover:bg-slate-50/40 transition-colors group">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-slate-100 text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600 rounded-xl transition-colors">
                        <Laptop className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{asset.name}</p>
                        <p className="text-xs text-slate-400 font-normal mt-0.5">{asset.currentHolder ? `Holder: ${asset.currentHolder}` : `SN: ${asset.serialNumber}`}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-mono text-xs font-bold text-slate-900 bg-slate-50/50 px-2 py-1 rounded border border-slate-100 max-w-max">{asset.assetTag}</td>
                  <td className="py-4 px-6 text-slate-500">{asset.location}</td>
                  <td className="py-4 px-6">
                    {asset.isSharedBookable ? (
                      <span className="inline-flex items-center text-purple-700 bg-purple-50/60 px-2 py-0.5 rounded border border-purple-100 text-xs font-medium"><CalendarDays className="h-3.5 w-3.5 mr-1" />Shared Pool</span>
                    ) : (
                      <span className="inline-flex items-center text-slate-600 bg-slate-100/70 px-2 py-0.5 rounded border border-slate-200/60 text-xs font-medium">Dedicated</span>
                    )}
                  </td>
                  <td className="py-4 px-6"><InnerStatusBadge status={asset.status} /></td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => handleActionClick(asset)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all shadow-sm ${
                        asset.isSharedBookable 
                          ? 'bg-purple-600 text-white border-purple-600 hover:bg-purple-700 hover:shadow-purple-200' 
                          : asset.status === 'Available' 
                            ? 'bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-200' 
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {asset.isSharedBookable ? 'Book Slot' : asset.status === 'Available' ? 'Allocate' : 'Manage'}
                    </button>
                  </td>
                </tr>
              ))}
              {filteredAssets.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-12 text-slate-400 font-medium bg-slate-50/20">No inventory matches found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AllocationModal isOpen={isAllocOpen} onClose={() => setIsAllocOpen(false)} asset={selectedAsset} onAllocationSuccess={handleAllocationSuccess} />
      <BookingModal isOpen={isBookOpen} onClose={() => setIsBookOpen(false)} asset={selectedAsset} />
    </div>
  );
}