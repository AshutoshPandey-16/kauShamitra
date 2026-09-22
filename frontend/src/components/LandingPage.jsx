import React from 'react';

function LandingPage({ onSelectRole }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">kauShalMitra</h1>
        <p className="text-blue-200 text-lg">sahi SKILL sahi  COURSE sahi WAQT pr</p>
        <div className="w-24 h-1 bg-yellow-400 mx-auto mt-4 rounded"></div>
      </div>

      {/* Login Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        
        {/* Employee Card */}
        <div 
          onClick={() => onSelectRole('employee')}
          className="bg-white p-8 rounded-2xl shadow-2xl cursor-pointer transform transition hover:-translate-y-2 hover:shadow-blue-500/50 border-b-4 border-blue-500 group"
        >
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:bg-blue-500 transition">
            <svg className="w-8 h-8 text-blue-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">Employee Portal</h2>
          <p className="text-gray-600 text-center text-sm">
            Access your competency profile, take adaptive assessments, and view personalized iGOT course recommendations.
          </p>
          <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            Login as Employee
          </button>
        </div>

        {/* Admin Card */}
        <div 
          onClick={() => onSelectRole('admin')}
          className="bg-white p-8 rounded-2xl shadow-2xl cursor-pointer transform transition hover:-translate-y-2 hover:shadow-indigo-500/50 border-b-4 border-indigo-500 group"
        >
          <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:bg-indigo-500 transition">
            <svg className="w-8 h-8 text-indigo-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">Admin / HR Portal</h2>
          <p className="text-gray-600 text-center text-sm">
            View departmental skill gaps, analyze employee performance, and manage NSSTA training nominations.
          </p>
          <button className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
            Login as Administrator
          </button>
        </div>

      </div>
      
      <p className="text-slate-400 text-xs mt-12">© 2026 Ministry of Statistics & Programme Implementation (MoSPI)</p>
    </div>
  );
}

export default LandingPage;