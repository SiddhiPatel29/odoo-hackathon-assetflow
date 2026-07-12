import React, { useState } from 'react';
import AssetBadge from '../components/AssetBadge';
import AllocationModal from '../components/AllocationModal';
import BookingModal from '../components/BookingModal';
import { Laptop, Search, Filter, SlidersHorizontal, CalendarDays, ShieldAlert } from 'lucide-react';

const initialAssets = [
  { _id: "64b0f301", name: "ThinkPad X1 Carbon", category: "Hardware", assetTag: "AF-0001", serialNumber: "SN12345678", acquisitionDate: "2026-07-12T00:00:00.000Z", acquisitionCost: 1200, condition: "New", location: "HQ-Floor 2", isSharedBookable: false, status: "Available", currentHolder: null },
  { _id: "64b0f302", name: "MacBook Pro 16\"", category: "Hardware", assetTag: "AF-0002", serialNumber: "SN87654321", acquisitionDate: "2026-05-10T00:00:00.000Z", acquisitionCost: 2400, condition: "Good", location: "HQ-Floor 3", isSharedBookable: false, status: "Allocated", currentHolder: "Priya Sharma" },
  { _id: "64b0f303", name: "Conf Room B Projector", category: "Media", assetTag: "AF-0003", serialNumber: "SN55443322", acquisitionDate: "2026-01-15T00:00:00.000Z", acquisitionCost: 850, condition: "Good", location: "Conf Room B", isSharedBookable: true, status: "Available", currentHolder: null },
  { _id: "64b0f304", name: "Dell UltraSharp 27\"", category: "Peripherals", assetTag: "AF-0004", serialNumber: "SN99887766", acquisitionDate: "2025-11-20T00:00:00.000Z", acquisitionCost: 450, condition: "Damaged", location: "Lab 1", isSharedBookable: false, status: "Under Maintenance", currentHolder: null }
];

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

  // Dynamic filter processing
  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) || asset.assetTag.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || asset.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Upper Statistics Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-400 uppercase">Total Items Registered</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{assets.length}</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-400 uppercase">Available Ready</p>
          <p className="text-2xl font-bold text-emerald-600 mt-1">{assets.filter(a => a.status === 'Available').length}</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-400 uppercase">Active Allocations</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">{assets.filter(a => a.status === 'Allocated').length}</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-400 uppercase">Operational Bottlenecks</p>
          <p className="text-2xl font-bold text-amber-600 mt-1">{assets.filter(a => a.status === 'Under Maintenance').length}</p>
        </div>
      </div>

      {/* Search and Advanced Controls Ribbon */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by asset name or tag (AF-XXXX)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
        <div className="flex items-center space-x-2 w-full md:w-auto justify-end">
          <Filter className="h-4 w-4 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-slate-200 rounded-lg text-sm px-3 py-2 bg-slate-50 font-medium text-slate-700 focus:outline-none"
          >
            <option value="All">All Lifecycles</option>
            <option value="Available">Available</option>
            <option value="Allocated">Allocated</option>
            <option value="Under Maintenance">Under Maintenance</option>
          </select>
        </div>
      </div>

      {/* Main Core Catalog Inventory Grid Layout */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold text-xs tracking-wider uppercase">
              <tr>
                <th className="py-4 px-6">Hardware Details</th>
                <th className="py-4 px-6">ERP Asset Tag</th>
                <th className="py-4 px-6">Location</th>
                <th className="py-4 px-6">Operational Model</th>
                <th className="py-4 px-6">Status State</th>
                <th className="py-4 px-6 text-right">System Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredAssets.map((asset) => (
                <tr key={asset._id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-slate-100 rounded-lg text-slate-600"><Laptop className="h-5 w-5" /></div>
                      <div>
                        <p className="font-bold text-slate-900">{asset.name}</p>
                        <p className="text-xs text-slate-400">{asset.currentHolder ? `Active Holder: ${asset.currentHolder}` : `SN: ${asset.serialNumber}`}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-mono text-xs font-bold text-indigo-600">{asset.assetTag}</td>
                  <td className="py-4 px-6 text-slate-500">{asset.location}</td>
                  <td className="py-4 px-6">
                    {asset.isSharedBookable ? (
                      <span className="inline-flex items-center space-x-1 text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-100 text-xs font-medium"><CalendarDays className="h-3.5 w-3.5 mr-1" />Shared Pool</span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 text-xs font-medium font-sans">Dedicated Assignment</span>
                    )}
                  </td>
                  <td className="py-4 px-6"><AssetBadge status={asset.status} /></td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => handleActionClick(asset)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                        asset.isSharedBookable 
                          ? 'bg-purple-600 text-white border-purple-600 hover:bg-purple-700' 
                          : asset.status === 'Available' 
                            ? 'bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700' 
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {asset.isSharedBookable ? 'Book Time Slot' : asset.status === 'Available' ? 'Allocate' : 'Manage Action'}
                    </button>
                  </td>
                </tr>
              ))}
              {filteredAssets.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-12 text-slate-400 font-medium">No system records match your query parameters.</td>
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