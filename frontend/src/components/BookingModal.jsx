import React, { useState } from 'react';
import { X, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function BookingModal({ isOpen, onClose, asset }) {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [conflictError, setConflictError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !asset) return null;

  // Mocked active bookings database record to run overlap test parameters locally
  const activeBookings = [
    { start: '2026-07-12T14:00', end: '2026-07-12T16:00' } // 2:00 PM to 4:00 PM Today
  ];

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setConflictError(null);

    // Simulate standard MERN backend processing latency
    setTimeout(() => {
      const newStart = new Date(startTime).getTime();
      const newEnd = new Date(endTime).getTime();

      // Basic Chronological Order Validation
      if (newEnd <= newStart) {
        setConflictError("Invalid Schedule: End time must be after the start time.");
        setIsSubmitting(false);
        return;
      }

      // RULE 4: Dynamic Overlap Evaluation Logic
      const hasOverlap = activeBookings.some(booking => {
        const existStart = new Date(booking.start).getTime();
        const existEnd = new Date(booking.end).getTime();
        
        // Overlap formula: (StartA < EndB) AND (EndA > StartB)
        return (newStart < existEnd && newEnd > existStart);
      });

      if (hasOverlap) {
        // Triggers the 400 validation intercept error banner
        setConflictError("Schedule Collision (400): This time window clashes with an existing reservation (Allocated from 2:00 PM to 4:00 PM today).");
        setIsSubmitting(false);
      } else {
        setIsSubmitting(false);
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          setStartTime('');
          setEndTime('');
          onClose();
        }, 1500);
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-md overflow-hidden">
        
        {/* Header Panel */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Reserve Shared Resource</h3>
            <p className="text-xs text-indigo-600 font-mono mt-0.5">{asset.assetTag} • {asset.name}</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-200/60 hover:text-slate-700 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Dynamic State Body */}
        <div className="p-6">
          {isSuccess ? (
            <div className="text-center py-6 space-y-3">
              <div className="h-12 w-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h4 className="text-sm font-semibold text-slate-900">Booking Successfully Logged</h4>
              <p className="text-xs text-slate-500">Time-slot secured in the central ERP registry.</p>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              
              {/* Informational Alert Flag */}
              <div className="p-3 bg-indigo-50/60 border border-indigo-100 rounded-lg text-xs text-indigo-800 leading-relaxed flex items-start space-x-2">
                <Clock className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
                <span>Notice: This resource operates on a shared configuration. Overlapping schedules will be auto-blocked by the data engine.</span>
              </div>

              {/* Data Contract Intercept Validation Banner */}
              {conflictError && (
                <div className="p-3 bg-rose-50 border border-rose-100 rounded-lg text-xs text-rose-700 flex items-start space-x-2">
                  <AlertTriangle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{conflictError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Reservation Start Time</label>
                <input
                  type="datetime-local"
                  required
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Reservation End Time</label>
                <input
                  type="datetime-local"
                  required
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
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
                  {isSubmitting ? 'Evaluating Slot...' : 'Book Time Slot'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}