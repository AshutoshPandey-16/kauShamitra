// server.js - API endpoints yahan define honge

const express = require('express');
const cors = require('cors');
const data = require('./data');

const app = express();
app.use(cors()); // Frontend se connect karne ke liye
app.use(express.json()); // JSON body parse karne ke liye

const PORT = 5000;

// Helper: Network delay simulate karo (real API jaisa feel)
const simulateDelay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// ========================================
// ENDPOINT 1: Get User Profile
// ========================================
app.get('/api/igot/profile/:userId', async (req, res) => {
    await simulateDelay(800); // 800ms delay
    
    const user = data.users.find(u => u.userId === req.params.userId);
    
    if (user) {
        res.json({ 
            success: true, 
            data: user 
        });
    } else {
        res.status(404).json({ 
            success: false, 
            message: "User not found" 
        });
    }
});

// ========================================
// ENDPOINT 2: Get Course Recommendations
// ========================================
app.get('/api/igot/recommendations/:userId', async (req, res) => {
    await simulateDelay(1000);
    
    const user = data.users.find(u => u.userId === req.params.userId);
    
    if (!user) {
        return res.status(404).json({ 
            success: false, 
            message: "User not found" 
        });
    }

    // Logic: Find skills where currentLevel < requiredLevel (GAP)
    const gaps = [];
    for (const [type, details] of Object.entries(user.competencyProfile)) {
        if (details.currentLevel < details.requiredLevel) {
            gaps.push({
                skill: details.skill,
                currentLevel: details.currentLevel,
                requiredLevel: details.requiredLevel,
                gap: details.requiredLevel - details.currentLevel
            });
        }
    }

    // Filter courses that match the gaps
    const recommendations = data.courseCatalog.filter(course => 
        gaps.some(gap => gap.skill === course.skillMapped)
    );

    res.json({ 
        success: true, 
        identifiedGaps: gaps,
        recommendedCourses: recommendations 
    });
});

// ========================================
// ENDPOINT 3: Update Profile (After Course Completion)
// ========================================
app.post('/api/igot/update-profile', async (req, res) => {
    await simulateDelay(1200);
    
    const { userId, courseId, newSkillLevel } = req.body;
    
    const user = data.users.find(u => u.userId === userId);
    
    if (user) {
        // Mock update: Functional skill ko update karo
        user.competencyProfile.functional.currentLevel = newSkillLevel;
        
        res.json({ 
            success: true, 
            message: "Profile updated successfully!", 
            updatedProfile: user 
        });
    } else {
        res.status(404).json({ 
            success: false, 
            message: "User not found" 
        });
    }
});
// server.js mein app.listen se PEHLE ye add karo

// ========================================
// IN-MEMORY SESSION STORAGE (For tracking active assessments)
// ========================================
const activeAssessments = new Map();

// ========================================
// ENDPOINT 4: Start Assessment
// ========================================
app.post('/api/assessment/start', async (req, res) => {
    await simulateDelay(500);
    
    const { userId, skill } = req.body;
    
    if (!userId || !skill) {
        return res.status(400).json({ 
            success: false, 
            message: "userId and skill are required" 
        });
    }

    // Filter questions for the requested skill
    const skillQuestions = data.assessmentQuestions.filter(q => q.skill === skill);
    
    if (skillQuestions.length === 0) {
        return res.status(404).json({ 
            success: false, 
            message: `No questions available for skill: ${skill}` 
        });
    }

    // Create assessment session
    const sessionId = `${userId}_${skill}_${Date.now()}`;
    
    activeAssessments.set(sessionId, {
        userId,
        skill,
        currentDifficulty: "Medium", // Start with medium
        questionsAsked: [],
        correctAnswers: 0,
        totalAnswered: 0,
        currentStreak: 0, // Track consecutive correct answers
        startedAt: new Date()
    });

    // Get first question (Medium difficulty)
    const firstQuestion = skillQuestions.find(q => q.difficulty === "Medium") || skillQuestions[0];

    res.json({
        success: true,
        sessionId,
        message: "Assessment started successfully",
        currentQuestion: {
            questionId: firstQuestion.questionId,
            question: firstQuestion.question,
            options: firstQuestion.options,
            difficulty: firstQuestion.difficulty
        },
        assessmentInfo: {
            skill,
            totalQuestionsAvailable: skillQuestions.length,
            maxQuestions: 8, // Stop after 8 questions
            passingStreak: 3 // 3 consecutive correct = skill mastered
        }
    });
});

// ========================================
// ENDPOINT 5: Submit Answer & Get Next Question
// ========================================
app.post('/api/assessment/submit-answer', async (req, res) => {
    await simulateDelay(300);
    
    const { sessionId, questionId, selectedOption } = req.body;
    
    const session = activeAssessments.get(sessionId);
    
    if (!session) {
        return res.status(404).json({ 
            success: false, 
            message: "Assessment session not found or expired" 
        });
    }

    // Find the question
    const question = data.assessmentQuestions.find(q => q.questionId === questionId);
    
    if (!question) {
        return res.status(404).json({ 
            success: false, 
            message: "Question not found" 
        });
    }

    // Check if answer is correct
    const isCorrect = selectedOption === question.correctOption;
    
    // Update session
    session.questionsAsked.push(questionId);
    session.totalAnswered += 1;
    
    if (isCorrect) {
        session.correctAnswers += 1;
        session.currentStreak += 1;
    } else {
        session.currentStreak = 0; // Reset streak
    }

    // ========================================
    // ADAPTIVE LOGIC: Decide next difficulty
    // ========================================
    let nextDifficulty = session.currentDifficulty;
    
    if (isCorrect) {
        // User answered correctly -> increase difficulty
        if (session.currentDifficulty === "Easy") nextDifficulty = "Medium";
        else if (session.currentDifficulty === "Medium") nextDifficulty = "Hard";
    } else {
        // User answered incorrectly -> decrease difficulty
        if (session.currentDifficulty === "Hard") nextDifficulty = "Medium";
        else if (session.currentDifficulty === "Medium") nextDifficulty = "Easy";
    }

    session.currentDifficulty = nextDifficulty;

    // ========================================
    // CHECK STOPPING CRITERIA
    // ========================================
    let shouldStop = false;
    let stopReason = "";

    // Criterion 1: Max questions reached
    if (session.totalAnswered >= 8) {
        shouldStop = true;
        stopReason = "Maximum questions reached";
    }
    
    // Criterion 2: Skill mastered (3 consecutive correct at Hard level)
    if (session.currentStreak >= 3 && session.currentDifficulty === "Hard") {
        shouldStop = true;
        stopReason = "Skill mastered - excellent performance!";
    }
    
    // Criterion 3: Skill needs work (3 consecutive wrong at Easy level)
    if (session.currentStreak === 0 && session.totalAnswered >= 3 && session.currentDifficulty === "Easy") {
        const recentEasyQuestions = session.questionsAsked.slice(-3);
        const allEasyWrong = recentEasyQuestions.every(qId => {
            const q = data.assessmentQuestions.find(qu => qu.questionId === qId);
            return q && q.difficulty === "Easy";
        });
        
        if (allEasyWrong && session.totalAnswered >= 5) {
            shouldStop = true;
            stopReason = "Skill needs improvement - foundational gaps identified";
        }
    }

    // If assessment should stop, return completion signal
    if (shouldStop) {
        return res.json({
            success: true,
            isCorrect,
            feedback: {
                correctAnswer: question.correctOption,
                explanation: question.explanation
            },
            assessmentComplete: true,
            stopReason,
            finalScore: {
                correctAnswers: session.correctAnswers,
                totalAnswered: session.totalAnswered,
                percentage: Math.round((session.correctAnswers / session.totalAnswered) * 100),
                skillLevel: calculateSkillLevel(session.correctAnswers, session.totalAnswered)
            }
        });
    }

    // Get next question
    const skillQuestions = data.assessmentQuestions.filter(q => q.skill === session.skill);
    const nextQuestion = skillQuestions.find(q => 
        q.difficulty === nextDifficulty && 
        !session.questionsAsked.includes(q.questionId)
    );

    // If no question available at target difficulty, try any unasked question
    const questionToShow = nextQuestion || skillQuestions.find(q => !session.questionsAsked.includes(q.questionId));

    if (!questionToShow) {
        // All questions exhausted
        return res.json({
            success: true,
            isCorrect,
            feedback: {
                correctAnswer: question.correctOption,
                explanation: question.explanation
            },
            assessmentComplete: true,
            stopReason: "All questions completed",
            finalScore: {
                correctAnswers: session.correctAnswers,
                totalAnswered: session.totalAnswered,
                percentage: Math.round((session.correctAnswers / session.totalAnswered) * 100),
                skillLevel: calculateSkillLevel(session.correctAnswers, session.totalAnswered)
            }
        });
    }

    res.json({
        success: true,
        isCorrect,
        feedback: {
            correctAnswer: question.correctOption,
            explanation: question.explanation
        },
        assessmentComplete: false,
        currentStats: {
            correctAnswers: session.correctAnswers,
            totalAnswered: session.totalAnswered,
            currentStreak: session.currentStreak,
            currentDifficulty: session.currentDifficulty
        },
        nextQuestion: {
            questionId: questionToShow.questionId,
            question: questionToShow.question,
            options: questionToShow.options,
            difficulty: questionToShow.difficulty
        }
    });
});

// ========================================
// HELPER FUNCTION: Calculate Skill Level
// ========================================
function calculateSkillLevel(correct, total) {
    const percentage = (correct / total) * 100;
    
    if (percentage >= 90) return { level: 5, label: "Expert" };
    if (percentage >= 75) return { level: 4, label: "Advanced" };
    if (percentage >= 60) return { level: 3, label: "Intermediate" };
    if (percentage >= 40) return { level: 2, label: "Basic" };
    return { level: 1, label: "Beginner" };
}

// ========================================
// ENDPOINT 6: Complete Assessment (Cleanup)
// ========================================
app.post('/api/assessment/complete', async (req, res) => {
    await simulateDelay(500);
    
    const { sessionId } = req.body;
    
    const session = activeAssessments.get(sessionId);
    
    if (!session) {
        return res.status(404).json({ 
            success: false, 
            message: "Assessment session not found" 
        });
    }

    const finalScore = {
        userId: session.userId,
        skill: session.skill,
        correctAnswers: session.correctAnswers,
        totalAnswered: session.totalAnswered,
        percentage: Math.round((session.correctAnswers / session.totalAnswered) * 100),
        skillLevel: calculateSkillLevel(session.correctAnswers, session.totalAnswered),
        duration: Math.round((new Date() - session.startedAt) / 1000 / 60) + " minutes"
    };

    // Remove session from memory
    activeAssessments.delete(sessionId);

    res.json({
        success: true,
        message: "Assessment completed and saved",
        finalScore,
        recommendation: finalScore.skillLevel.level >= 4 
            ? "You have mastered this skill! Consider mentoring others." 
            : "We recommend taking the suggested iGOT courses to improve."
    });
});
// ========================================
// ADMIN ENDPOINTS (Paste this above app.listen)
// ========================================

// 1. Get Department Skill Gap Statistics (For Charts)
app.get('/api/admin/department-stats', async (req, res) => {
    await simulateDelay(600);
    
    const skills = ["Team Leadership", "File Noting & Drafting", "Data Analytics"];
    const stats = skills.map(skillName => {
        let totalCurrent = 0;
        let totalRequired = 0;
        let count = 0;

        data.users.forEach(user => {
            for (const [type, details] of Object.entries(user.competencyProfile)) {
                if (details.skill === skillName) {
                    totalCurrent += details.currentLevel;
                    totalRequired += details.requiredLevel;
                    count++;
                }
            }
        });

        return {
            skill: skillName,
            avgCurrent: count > 0 ? (totalCurrent / count).toFixed(1) : 0,
            avgRequired: count > 0 ? (totalRequired / count).toFixed(1) : 0
        };
    });

    res.json({ success: true, department: "MoSPI", totalEmployees: data.users.length, stats });
});

// 2. Get All Employees List (For Table)
app.get('/api/admin/employees', async (req, res) => {
    await simulateDelay(500);
    
    const employeeList = data.users.map(user => {
        let weakestSkill = "";
        let maxGap = 0;
        
        for (const [type, details] of Object.entries(user.competencyProfile)) {
            const gap = details.requiredLevel - details.currentLevel;
            if (gap > maxGap) {
                maxGap = gap;
                weakestSkill = details.skill;
            }
        }

        return {
            userId: user.userId,
            name: user.name,
            role: user.currentRole,
            weakestSkill: weakestSkill,
            skillGapScore: maxGap
        };
    });

    res.json({ success: true, employees: employeeList });
});

// 3. Get Real NSSTA Training Calendar
app.get('/api/admin/training-calendar', async (req, res) => {
    await simulateDelay(400);
    res.json({ success: true, calendar: data.courseCatalog });
});
// ========================================
// START SERVER
// ========================================
app.listen(PORT, () => {
    console.log(`🚀 Mock iGOT API running on http://localhost:${PORT}`);
    console.log(`📋 Test URLs:`);
    console.log(`   - Profile: http://localhost:${PORT}/api/igot/profile/EMP1001`);
    console.log(`   - Recommendations: http://localhost:${PORT}/api/igot/recommendations/EMP1001`);
});