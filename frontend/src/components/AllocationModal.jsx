import React, { useState } from 'react';
import { X, AlertCircle, ArrowLeftRight, CheckCircle2 } from 'lucide-react';

export default function AllocationModal({ isOpen, onClose, asset, onAllocationSuccess }) {
  const [employeeEmail, setEmployeeEmail] = useState('');
  const [errorState, setErrorState] = useState(null); // Catches and stores MERN conflict errors
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTransferSent, setIsTransferSent] = useState(false);

  if (!isOpen || !asset) return null;

  // Handles initial resource assignment attempt
  const handleAllocateSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorState(null);

    // Simulate backend API latency
    setTimeout(() => {
      // RULE 3: Block allocation if asset status !== 'Available'
      if (asset.status !== 'Available') {
        setErrorState({
          message: `Asset is already taken. Currently held by ${asset.currentHolder || 'Priya Sharma'}.`,
          currentHolder: asset.currentHolder || 'Priya Sharma'
        });
        setIsSubmitting(false);
      } else {
        // Successful path
        setIsSubmitting(false);
        onAllocationSuccess(asset._id);
        setEmployeeEmail('');
        onClose();
      }
    }, 600);
  };

  // Handles the fallback Transfer Request path mandated by the contract
  const handleTransferRequestSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsTransferSent(true);
      setTimeout(() => {
        setIsTransferSent(false);
        setErrorState(null);
        setEmployeeEmail('');
        onClose();
      }, 1500);
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-md overflow-hidden transition-all transform scale-100">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="font-bold text-slate-900 text-base">
              {errorState ? 'Resource Allocation Conflict' : 'Assign Resource'}
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">{asset.assetTag} • {asset.name}</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-200/60 hover:text-slate-700 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {isTransferSent ? (
            /* Success confirmation for routed transfer */
            <div className="text-center py-6 space-y-3">
              <div className="h-12 w-12 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto">
                <ArrowLeftRight className="h-6 w-6" />
              </div>
              <h4 className="text-sm font-semibold text-slate-900">Transfer Initiated</h4>
              <p className="text-xs text-slate-500">Routing transfer authorization link to {errorState?.currentHolder}.</p>
            </div>
          ) : !errorState ? (
            /* Standard Allocation Form */
            <form onSubmit={handleAllocateSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                  Target Employee Email Address
                </label>
                <input
                  type="email"
                  required
                  value={employeeEmail}
                  onChange={(e) => setEmployeeEmail(e.target.value)}
                  placeholder="e.g., employee@company.com"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-colors"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm disabled:opacity-50"
                >
                  {isSubmitting ? 'Validating State...' : 'Confirm Assignment'}
                </button>
              </div>
            </form>
          ) : (
            /* Data Contract Intercept UI - Transfer Request Trigger */
            <div className="space-y-4">
              <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-rose-900">Allocation Blocked (400)</h4>
                  <p className="text-xs text-rose-700 mt-1 leading-relaxed">{errorState.message}</p>
                </div>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed">
                To claim ownership of this hardware asset, you must initiate a cross-departmental ERP Transfer Request. The current holder will be notified to release it.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row-reverse gap-2">
                <button
                  onClick={handleTransferRequestSubmit}
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors shadow-sm flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  <ArrowLeftRight className="h-4 w-4" />
                  <span>{isSubmitting ? 'Routing...' : 'Request Transfer Link'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setErrorState(null)}
                  className="w-full sm:w-auto px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors text-center"
                >
                  Back
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}