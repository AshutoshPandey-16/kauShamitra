module.exports = {
  users: [
    {
      userId: "EMP1001",
      name: "Rajesh Kumar",
      department: "Ministry of Statistics & Programme Implementation (MoSPI)",
      currentRole: "Section Officer (ISS)",
      joiningDate: "2018-05-12",
      competencyProfile: {
        behavioral: { skill: "Team Leadership", currentLevel: 2, requiredLevel: 4 },
        functional: { skill: "File Noting & Drafting", currentLevel: 2, requiredLevel: 4 },
        domain: { skill: "Data Analytics", currentLevel: 3, requiredLevel: 5 }
      },
      completedCourses: []
    },
    {
      userId: "EMP1002",
      name: "Priya Sharma",
      department: "Ministry of Statistics & Programme Implementation (MoSPI)",
      currentRole: "Under Secretary",
      joiningDate: "2015-08-20",
      competencyProfile: {
        behavioral: { skill: "Team Leadership", currentLevel: 4, requiredLevel: 5 },
        functional: { skill: "File Noting & Drafting", currentLevel: 3, requiredLevel: 4 },
        domain: { skill: "Data Analytics", currentLevel: 2, requiredLevel: 5 }
      },
      completedCourses: []
    },
    {
      userId: "EMP1003",
      name: "Amit Verma",
      department: "Ministry of Statistics & Programme Implementation (MoSPI)",
      currentRole: "Section Officer",
      joiningDate: "2019-02-14",
      competencyProfile: {
        behavioral: { skill: "Team Leadership", currentLevel: 1, requiredLevel: 4 },
        functional: { skill: "File Noting & Drafting", currentLevel: 4, requiredLevel: 4 },
        domain: { skill: "Data Analytics", currentLevel: 4, requiredLevel: 5 }
      },
      completedCourses: []
    }
  ],
  
  // REAL NSSTA & DoPT Advance Training Calendar FY 2026-27
  courseCatalog: [
    {
      courseId: "NSSTA-DSTP-01",
      title: "Handling of unit-level data of NSS and its analysis",
      category: "Domain",
      skillMapped: "Data Analytics",
      duration: "1 Week (5 Days)",
      dates: "01-06-2026 to 05-06-2026",
      venue: "NSSTA",
      participants: "In Service ISS Officers",
      rating: 4.6
    },
    {
      courseId: "NSSTA-DSTP-04",
      title: "Data-driven decision-making using data analytics",
      category: "Domain",
      skillMapped: "Data Analytics",
      duration: "1 Week (5 Days)",
      dates: "13-07-2026 to 17-07-2026",
      venue: "IIT Bombay / IIT Kanpur",
      participants: "In Service ISS Officers",
      rating: 4.9
    },
    {
      courseId: "NSSTA-DSTP-10",
      title: "Parliamentary Procedures, Cabinet Note Prep, Noting & Drafting, and MOP",
      category: "Functional",
      skillMapped: "File Noting & Drafting",
      duration: "1 Week (5 Days)",
      dates: "14-12-2026 to 18-12-2026",
      venue: "MCRHRDIT Hyderabad",
      participants: "In Service ISS Officers",
      rating: 4.8
    },
    {
      courseId: "NSSTA-DSTP-08",
      title: "Team Building and Leadership through Adventure Sports (Trekking)",
      category: "Behavioral",
      skillMapped: "Team Leadership",
      duration: "1 Week (5 Days)",
      dates: "21-09-2026 to 25-09-2026",
      venue: "NIM Uttarkashi / JIM&WS J&K",
      participants: "In Service ISS Officers",
      rating: 5.0
    },
    {
      courseId: "NSSTA-MCTP-06",
      title: "Course on Artificial Intelligence (AI), AI ready Data & Machine Readable Data",
      category: "Technical",
      skillMapped: "AI & Machine Learning",
      duration: "1 Week (5 Days)",
      dates: "03-08-2026 to 07-08-2026",
      venue: "IIT Madras / IIT Delhi / IIT Kharagpur",
      participants: "ISS officers (8-10 years service)",
      rating: 4.9
    },
    {
      courseId: "DOPT-IST-08",
      title: "Ethics in Public Service",
      category: "Behavioral",
      skillMapped: "Ethical Conduct",
      duration: "1 Week (5 Days)",
      dates: "22-02-2027 to 26-02-2027",
      venue: "ICCG, Panchagani",
      participants: "In-Service ISS Officers",
      rating: 4.7
    },
    {
      courseId: "NSSTA-DSTP-05",
      title: "Stress Management / Work Beyond Stress",
      category: "Behavioral",
      skillMapped: "Stress Management",
      duration: "1 Week (5 Days)",
      dates: "13-07-2026 to 17-07-2026",
      venue: "Art of Living, Bengaluru / Isha Foundation",
      participants: "In Service ISS Officers",
      rating: 4.8
    },
    {
      courseId: "DOPT-IST-01",
      title: "Monitoring and Evaluation for Outcome-Oriented Governance (AI, MIS, DGQI)",
      category: "Functional",
      skillMapped: "Project Management",
      duration: "1 Week (5 Days)",
      dates: "08-06-2026 to 12-06-2026",
      venue: "IIM Visakhapatnam",
      participants: "In-Service ISS Officers",
      rating: 4.6
    },
    {
      courseId: "SSS-REF-03",
      title: "GFR with emphasis on procurement of Goods and Services",
      category: "Functional",
      skillMapped: "Financial Rules & Procurement",
      duration: "1 Week (5 Days)",
      dates: "06-07-2026 to 10-07-2026",
      venue: "ASCI Hyderabad",
      participants: "JSO / SSO",
      rating: 4.5
    }
  ],

  // Assessment Question Bank (Yeh wahi rakho jo pehle tha, bas ensure karo comma sahi ho)
  assessmentQuestions: [
    {
      questionId: "FN001", skill: "File Noting & Drafting", difficulty: "Easy", difficultyScore: 1000,
      question: "What is the primary purpose of file noting in government offices?",
      options: ["To create permanent legal records", "To document decision-making process and track file movement", "To communicate with external stakeholders", "To maintain attendance records"],
      correctOption: 1, explanation: "File noting primarily documents the decision-making process and tracks how a file moves through various levels of approval."
    },
    {
      questionId: "FN002", skill: "File Noting & Drafting", difficulty: "Medium", difficultyScore: 1200,
      question: "According to the Manual of Office Procedure, what should be the maximum length of a noting for routine matters?",
      options: ["1 page", "2 pages", "3 pages", "No specific limit"],
      correctOption: 1, explanation: "The Manual of Office Procedure recommends that notings for routine matters should be concise and preferably not exceed 2 pages."
    },
    {
      questionId: "FN003", skill: "File Noting & Drafting", difficulty: "Hard", difficultyScore: 1400,
      question: "In a multi-tier approval system, if a Section Officer disagrees with the Under Secretary's opinion on a file, what is the correct procedure?",
      options: ["The Section Officer must accept the Under Secretary's decision", "The Section Officer can record their dissenting note and the file moves to the next level", "The file should be returned to the Section Officer for re-consideration", "The matter should be referred to the Secretary immediately"],
      correctOption: 1, explanation: "As per government procedures, an officer can record their dissenting view in writing, and the file will proceed to the next higher authority with both views."
    },
    {
      questionId: "TL001", skill: "Team Leadership", difficulty: "Easy", difficultyScore: 1000,
      question: "What is the most important quality of an effective government leader?",
      options: ["Strict discipline enforcement", "Ability to inspire and motivate team members", "Technical expertise in all areas", "Minimizing team communication"],
      correctOption: 1, explanation: "Effective leadership in government requires the ability to inspire, motivate, and guide team members towards common goals."
    },
    {
      questionId: "TL002", skill: "Team Leadership", difficulty: "Medium", difficultyScore: 1200,
      question: "When dealing with a conflict between two team members, what should a leader do first?",
      options: ["Immediately take sides based on seniority", "Listen to both parties separately to understand the root cause", "Ignore the conflict and hope it resolves itself", "Transfer one of the team members"],
      correctOption: 1, explanation: "Effective conflict resolution starts with active listening and understanding both perspectives before taking any action."
    },
    {
      questionId: "TL003", skill: "Team Leadership", difficulty: "Hard", difficultyScore: 1400,
      question: "In a situation where a team member is consistently underperforming due to personal issues, what is the most appropriate leadership approach?",
      options: ["Issue a formal warning immediately", "Have a private conversation, offer support, and create a performance improvement plan", "Reduce their workload without discussion", "Reassign them to a different department"],
      correctOption: 1, explanation: "Compassionate leadership involves understanding root causes, offering support, and creating structured plans for improvement while maintaining accountability."
    },
    {
      questionId: "DA001", skill: "Data Analytics", difficulty: "Easy", difficultyScore: 1000,
      question: "Which of the following is the first step in the data analytics process?",
      options: ["Data Visualization", "Data Collection and Cleaning", "Predictive Modeling", "Report Generation"],
      correctOption: 1, explanation: "Data collection and cleaning is the foundational step to ensure accuracy before any analysis or visualization."
    },
    {
      questionId: "DA002", skill: "Data Analytics", difficulty: "Medium", difficultyScore: 1200,
      question: "What is the primary difference between descriptive and predictive analytics?",
      options: ["Descriptive uses AI, Predictive uses Excel", "Descriptive tells what happened, Predictive forecasts what might happen", "Descriptive is for finance, Predictive is for HR", "There is no difference"],
      correctOption: 1, explanation: "Descriptive analytics summarizes historical data, while predictive analytics uses statistical models to forecast future outcomes."
    },
    {
      questionId: "DA003", skill: "Data Analytics", difficulty: "Hard", difficultyScore: 1400,
      question: "In the context of NSS data, what is the primary purpose of 'unit-level data' analysis?",
      options: ["To calculate national GDP only", "To understand micro-level variations and correlations between specific household/individual characteristics", "To replace census data completely", "To generate automated policy drafts"],
      correctOption: 1, explanation: "Unit-level data allows researchers to analyze micro-level variations, cross-tabulations, and specific correlations that aggregate data cannot show."
    }
  ]
};