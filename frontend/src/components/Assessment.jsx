import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Assessment({ userId, skill, onComplete }) {
  const [sessionId, setSessionId] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    startAssessment();
  }, []);

  const startAssessment = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/assessment/start', {
        userId: userId,
        skill: skill
      });
      
      setSessionId(response.data.sessionId);
      setCurrentQuestion(response.data.currentQuestion);
      setStats(response.data.assessmentInfo);
      setLoading(false);
    } catch (error) {
      setError('Failed to start assessment. Please try again.');
      setLoading(false);
    }
  };

  const handleSubmitAnswer = async () => {
    if (selectedOption === null) {
      alert('Please select an option');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/assessment/submit-answer', {
        sessionId: sessionId,
        questionId: currentQuestion.questionId,
        selectedOption: selectedOption
      });

      setFeedback(response.data.feedback);
      
      if (response.data.assessmentComplete) {
        setTimeout(() => {
          onComplete(response.data.finalScore);
        }, 3000);
      } else {
        setTimeout(() => {
          setCurrentQuestion(response.data.nextQuestion);
          setStats(response.data.currentStats);
          setSelectedOption(null);
          setFeedback(null);
        }, 2000);
      }
    } catch (error) {
      setError('Failed to submit answer. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Starting assessment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-xl">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Adaptive Assessment</h1>
          <p className="text-gray-600 mt-2">Skill: {skill}</p>
          {stats && (
            <div className="flex gap-4 mt-4 text-sm">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded">
                Questions: {stats.totalAnswered || 0}
              </span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded">
                Correct: {stats.correctAnswers || 0}
              </span>
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded">
                Difficulty: {stats.currentDifficulty || currentQuestion?.difficulty}
              </span>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="mb-4">
            <span className="inline-block bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm mb-2">
              {currentQuestion.difficulty}
            </span>
          </div>
          
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {currentQuestion.question}
          </h2>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <label
                key={index}
                className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${
                  selectedOption === index
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="option"
                  value={index}
                  checked={selectedOption === index}
                  onChange={(e) => setSelectedOption(parseInt(e.target.value))}
                  className="mr-3"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>

          {feedback && (
            <div className={`mt-6 p-4 rounded-lg ${
              feedback.correctAnswer === selectedOption 
                ? 'bg-green-50 border-l-4 border-green-500' 
                : 'bg-red-50 border-l-4 border-red-500'
            }`}>
              <p className="font-semibold">
                {feedback.correctAnswer === selectedOption ? '✅ Correct!' : '❌ Incorrect'}
              </p>
              <p className="text-sm text-gray-700 mt-2">{feedback.explanation}</p>
            </div>
          )}

          {!feedback && (
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedOption === null}
              className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Submit Answer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Assessment;