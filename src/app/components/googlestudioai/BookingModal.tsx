
import React, { useState, useEffect } from 'react';
import { X, Briefcase, Building2, Calendar, ArrowRight } from 'lucide-react';
import { UserType } from '@/app/lib/types';
import Cal, { getCalApi } from "@calcom/embed-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [selectedType, setSelectedType] = useState<UserType | null>(null);

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ "namespace": "30min" });
      cal("ui", { "hideEventTypeDetails": false, "layout": "month_view" });
    })();
  }, []);

  if (!isOpen) return null;

  const handleBack = () => setSelectedType(null);

  return (
    <div className="modal modal-open modal-bottom sm:modal-middle bg-slate-900/40 backdrop-blur-sm">
      <div className="modal-box p-0 max-w-2xl bg-white shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200" style={selectedType ? { height: '80vh', maxWidth: '800px' } : {}}>

        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50">
          <h3 className="font-bold text-lg text-slate-800">
            {selectedType ? "Schedule a Meeting" : "Let's Connect"}
          </h3>
          <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost text-slate-500">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className={selectedType ? "h-full" : "p-8"}>
          {!selectedType ? (
            <div className="space-y-6">
              <p className="text-center text-slate-600 mb-8">
                To better prepare for our conversation, please tell me who you represent.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <button
                  onClick={() => setSelectedType(UserType.RECRUITER)}
                  className="card bg-white border-2 border-slate-100 hover:border-brand-blue hover:bg-blue-50/50 transition-all cursor-pointer text-left p-6 group shadow-sm hover:shadow-md"
                >
                  <div className="w-12 h-12 rounded-lg bg-blue-100 text-brand-blue flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Briefcase size={24} />
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg mb-2">I'm a Recruiter</h3>
                  <p className="text-sm text-slate-500">Looking for a Senior Engineer for an international role.</p>
                </button>

                <button
                  onClick={() => setSelectedType(UserType.BUSINESS)}
                  className="card bg-white border-2 border-slate-100 hover:border-brand-orange hover:bg-orange-50/50 transition-all cursor-pointer text-left p-6 group shadow-sm hover:shadow-md"
                >
                  <div className="w-12 h-12 rounded-lg bg-orange-100 text-brand-orange flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Building2 size={24} />
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg mb-2">I represent a Company</h3>
                  <p className="text-sm text-slate-500">Need a technical partner or consultant for a project.</p>
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col">
              <div className="px-4 py-2 border-b border-slate-100 flex items-center">
                <button onClick={handleBack} className="btn btn-link btn-sm px-0 no-underline hover:no-underline text-slate-400 hover:text-slate-600 flex items-center gap-1">
                  &larr; Back
                </button>
              </div>

              <div className="flex-1 overflow-hidden">
                <Cal
                  namespace="30min"
                  calLink="giorgio-tedesco/30min"
                  style={{ width: "100%", height: "100%", overflow: "scroll" }}
                  config={{ "layout": "month_view", "useSlotsViewOnSmallScreen": "true" }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </div>
  );
};

export default BookingModal;