import React from 'react';

function Results({ result, onBack }) {
  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">No results to display</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <div className="inline-block bg-green-100 p-4 rounded-full mb-4">
              <svg className="w-16 h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Assessment Complete!</h1>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg p-6 mb-6">
            <div className="text-5xl font-bold mb-2">{result.percentage}%</div>
            <p className="text-xl">Skill Level: {result.skillLevel.label}</p>
            <p className="text-sm opacity-90">Level {result.skillLevel.level} out of 5</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Correct Answers</p>
              <p className="text-2xl font-bold text-gray-800">{result.correctAnswers}/{result.totalAnswered}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Duration</p>
              <p className="text-2xl font-bold text-gray-800">{result.duration}</p>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mb-6 text-left">
            <p className="font-semibold text-blue-900">💡 Recommendation</p>
            <p className="text-blue-700 text-sm mt-1">
              {result.skillLevel.level >= 4 
                ? "Excellent! You have mastered this skill. Consider mentoring others or taking advanced courses."
                : "We recommend taking the suggested iGOT courses to improve your competency in this area."}
            </p>
          </div>

          <button
            onClick={onBack}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default Results;