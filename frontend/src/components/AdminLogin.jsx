import React, { useState } from 'react';

function AdminLogin({ onLogin, onBack }) {
  const [adminId, setAdminId] = useState('ADMIN01');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAdminAuth = (e) => {
    e.preventDefault();
    setError('');

    // 1. Basic Validation: Admin IDs usually follow a specific format (e.g., ADM, HR, GOV)
    if (!adminId.trim().toUpperCase().startsWith('ADM') && !adminId.trim().toUpperCase().startsWith('HR')) {
      setError('Invalid Admin ID format. Must start with ADM or HR.');
      return;
    }

    // 2. Simulate Network Request to DoPT / NIC ePramaan Gateway
    setIsLoading(true);

    setTimeout(() => {
      // Mock successful authentication
      console.log(`[Mock Auth] Verified Admin ${adminId} via DoPT/NIC ePramaan Gateway. Token Generated.`);
      setIsLoading(false);
      onLogin(adminId.trim().toUpperCase());
    }, 1500); // 1.5 second delay
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 via-indigo-900 to-slate-900">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border-t-4 border-indigo-600">
        <button onClick={onBack} className="text-indigo-600 text-sm mb-4 hover:underline flex items-center gap-1">
          ← Back to Home
        </button>
        
        <div className="text-center mb-6">
          <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Admin Secure Login</h1>
          <p className="text-gray-500 text-sm mt-1">Authenticated via DoPT / NIC ePramaan Gateway</p>
        </div>
        
        <form onSubmit={handleAdminAuth}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Official Admin / HR ID</label>
            <input
              type="text"
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 uppercase"
              placeholder="e.g., ADMIN01"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={isLoading}
            className={`w-full text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
              isLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verifying with DoPT Gateway...
              </>
            ) : (
              'Login via NIC ePramaan'
            )}
          </button>
          
          <p className="text-xs text-gray-400 text-center mt-4">
            Demo ID: ADMIN01
          </p>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;