import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from 'recharts';

function Dashboard({ userId, userProfile, setUserProfile, onStartAssessment, onLogout }) {
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    fetchProfile();
    fetchRecommendations();
  }, [userId]);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/igot/profile/${userId}`);
      setUserProfile(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setLoading(false);
    }
  };

  const fetchRecommendations = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/igot/recommendations/${userId}`);
      setRecommendations(response.data.recommendedCourses);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-xl">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-xl">User not found!</p>
        </div>
      </div>
    );
  }

  // Prepare data for Radar Chart
  const radarData = Object.entries(userProfile.competencyProfile).map(([type, details]) => ({
    subject: details.skill,
    currentLevel: details.currentLevel,
    requiredLevel: details.requiredLevel,
    fullMark: 5
  }));

  // Identify Skill Gaps
  const gaps = Object.entries(userProfile.competencyProfile)
    .filter(([_, details]) => details.currentLevel < details.requiredLevel)
    .map(([type, details]) => ({
      type,
      skill: details.skill,
      gap: details.requiredLevel - details.currentLevel,
      currentLevel: details.currentLevel,
      requiredLevel: details.requiredLevel
    }));

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* ✅ NEW HEADER WITH LOGOUT BUTTON */}
        <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-lg shadow-md">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Welcome, {userProfile.name}</h1>
            <p className="text-gray-600 mt-1">
              {userProfile.currentRole} | {userProfile.department}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Employee ID: {userProfile.userId} | Joined: {userProfile.joiningDate}
            </p>
          </div>
          <button 
            onClick={onLogout} 
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition font-semibold shadow-sm"
          >
            Logout
          </button>
        </div>

        {/* Skill Gap Visualization Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          
          {/* Radar Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Competency Profile</h2>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" tick={{fontSize: 12}} />
                <PolarRadiusAxis angle={90} domain={[0, 5]} />
                <Radar name="Current Level" dataKey="currentLevel" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                <Radar name="Required Level" dataKey="requiredLevel" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Skill Gaps List */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Identified Skill Gaps</h2>
            {gaps.length === 0 ? (
              <div className="flex items-center justify-center h-64">
                <p className="text-green-600 text-lg font-medium">✅ No skill gaps found! You're fully competent.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {gaps.map((gap, index) => (
                  <div key={index} className="border-l-4 border-red-500 bg-red-50 p-4 rounded flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-gray-800">{gap.skill}</h3>
                      <p className="text-sm text-gray-600">
                        Current: <span className="font-bold text-red-600">{gap.currentLevel}</span>/5 | Required: <span className="font-bold text-gray-800">{gap.requiredLevel}</span>/5
                      </p>
                    </div>
                    <button
                      onClick={() => onStartAssessment(gap.skill)}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm font-semibold transition shadow-sm"
                    >
                      Take Assessment
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recommended iGOT / NSSTA Courses */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6 border-b pb-2">
            <h2 className="text-xl font-bold text-gray-800">📚 Recommended Training Courses (NSSTA FY 2026-27)</h2>
            <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">Personalized for You</span>
          </div>
          
          {recommendations.length === 0 ? (
            <p className="text-gray-600 text-center py-10">No specific recommendations at this time.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendations.map((course) => (
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
                  <button className="mt-4 w-full bg-green-600 text-white text-xs py-2 rounded hover:bg-green-700 transition font-semibold">
                    Enroll on iGOT Karmayogi
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;