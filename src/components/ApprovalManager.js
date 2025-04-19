import React, { useState } from 'react';

export default function ApprovalManager() {
  const [employeeId, setEmployeeId] = useState('');
  const [manager, setManager] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchManager = async () => {
    setLoading(true);
    setError(null);
    setManager(null);
    try {
      const response = await fetch(
        `http://localhost:8086/approval/available-manager/${employeeId}`
      );
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error fetching manager');
      }
      const data = await response.json();
      setManager(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Available Manager Lookup</h1>

      <label className="block mb-2 font-medium" htmlFor="employeeId">
        Employee ID
      </label>
      <input
        id="employeeId"
        type="text"
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
        className="w-full border rounded px-3 py-2 mb-4"
        placeholder="Enter employee ID"
      />

      <button
        onClick={fetchManager}
        disabled={loading || !employeeId}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Loading...' : 'Get Manager'}
      </button>

      {error && <p className="mt-4 text-red-600">Error: {error}</p>}

      {manager && (
        <div className="mt-6 border rounded p-4 bg-gray-50">
          <h2 className="text-xl font-semibold mb-2">Manager Details</h2>
          <p><strong>ID:</strong> {manager.employeeId}</p>
          <p><strong>Name:</strong> {manager.name}</p>
          <p><strong>Available:</strong> {manager.available ? 'Yes' : 'No'}</p>
        </div>
      )}
    </div>
  );
}
