import { Activity } from 'lucide-react';

const HospitalPulseLoading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-8 z-[200] fixed inset-0">
      {/* Pulsing circle with medical icon */}
      <div className="relative mb-8">
        <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center animate-ping opacity-75 absolute"></div>
        <div className="w-24 h-24 bg-emerald-600 rounded-full flex items-center justify-center relative">
          <Activity className="w-10 h-10 text-white" />
        </div>
      </div>

      {/* EKG line */}
      <div className="w-48 h-1 bg-gray-200 rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-emerald-500 rounded-full"
          style={{
            animation: 'progressFill 2s ease-in-out infinite'
          }}
        ></div>
      </div>

      <style>{`
        @keyframes progressFill {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 0%; }
        }
      `}</style>

      {/* Loading text */}
      <div className="text-center">
        <h3 className="text-xl font-medium text-gray-700 mb-2">Processing</h3>
        <p className="text-gray-500">Please wait...</p>
      </div>
    </div>
  );
};

export default HospitalPulseLoading;