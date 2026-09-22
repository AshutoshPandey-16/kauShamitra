import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function AdminDashboard({ onLogout }) {
  const [stats, setStats] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [calendar, setCalendar] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, empRes, calRes] = await Promise.all([
        axios.get('http://localhost:5000/api/admin/department-stats'),
        axios.get('http://localhost:5000/api/admin/employees'),
        axios.get('http://localhost:5000/api/admin/training-calendar')
      ]);
      setStats(statsRes.data.stats);
      setEmployees(empRes.data.employees);
      setCalendar(calRes.data.calendar);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching admin data:", error);
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600 text-xl">Loading Admin Dashboard...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-lg shadow-md">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Department of Statistics & Programme Implementation (MoSPI)</p>
        </div>
        <button 
          onClick={onLogout} 
          className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition font-semibold"
        >
          Logout
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <h3 className="text-gray-500 text-sm font-medium">Total Employees</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">{employees.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
          <h3 className="text-gray-500 text-sm font-medium">Avg Skill Gap Score</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">2.3 / 5</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <h3 className="text-gray-500 text-sm font-medium">Upcoming NSSTA Batches</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">{calendar.length}</p>
        </div>
      </div>

      {/* Charts & Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        
        {/* Department Skill Gap Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Department Skill Gap Analysis</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="skill" tick={{fontSize: 12}} />
              <YAxis domain={[0, 5]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="avgCurrent" fill="#3b82f6" name="Avg Current Level" radius={[4, 4, 0, 0]} />
              <Bar dataKey="avgRequired" fill="#ef4444" name="Required Level" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-sm text-gray-500 mt-4 text-center bg-blue-50 p-2 rounded">
            💡 <strong>AI Insight:</strong> "Data Analytics" has the highest departmental gap. Recommend bulk nomination for IIT Bombay batch.
          </p>
        </div>

        {/* Employee Performance Table */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Employee Competency Status</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="p-3">Name</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Weakest Skill</th>
                  <th className="p-3">Gap</th>
                </tr>
              </thead>
              <tbody>
                {employees.map(emp => (
                  <tr key={emp.userId} className="border-b hover:bg-gray-50 transition">
                    <td className="p-3 font-medium text-gray-800">{emp.name}</td>
                    <td className="p-3 text-gray-600">{emp.role}</td>
                    <td className="p-3 text-red-600 font-medium">{emp.weakestSkill}</td>
                    <td className="p-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${emp.skillGapScore >= 3 ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {emp.skillGapScore} Levels
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* NSSTA Training Calendar */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6 border-b pb-2">
          <h2 className="text-xl font-bold text-gray-800">Official NSSTA Training Calendar (FY 2026-27)</h2>
          <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">Live Data</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {calendar.map(course => (
            <div key={course.courseId} className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:shadow-lg hover:border-blue-400 transition">
              <div className="flex justify-between items-start mb-2">
                <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">{course.category}</span>
                <span className="text-yellow-500 text-sm font-bold">⭐ {course.rating}</span>
              </div>
              <h3 className="font-bold text-gray-800 text-sm mb-3 leading-tight h-10 overflow-hidden">{course.title}</h3>
              <div className="space-y-1 text-xs text-gray-600">
                <p>📅 <span className="font-medium">{course.dates}</span></p>
                <p>📍 {course.venue}</p>
                <p>⏳ {course.duration}</p>
              </div>
              <button className="mt-3 w-full bg-blue-600 text-white text-xs py-2 rounded hover:bg-blue-700 transition font-semibold">
                Nominate Employees
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;