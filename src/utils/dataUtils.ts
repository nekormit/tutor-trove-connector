
// Sample courses data
export const courses = [
  { id: 1, code: "COSC2801", name: "Programming Fundamentals" },
  { id: 2, code: "COSC2802", name: "Data Structures and Patterns" },
  { id: 3, code: "COSC2803", name: "Full Stack Development" },
  { id: 4, code: "COSC2804", name: "Mobile Application Development" },
  { id: 5, code: "COSC2805", name: "Cloud Computing" },
  { id: 6, code: "COSC2806", name: "Artificial Intelligence" },
  { id: 7, code: "COSC2807", name: "Database Systems" },
  { id: 8, code: "COSC2808", name: "Computer Networks" },
  { id: 9, code: "COSC2809", name: "Computer Security" },
  { id: 10, code: "COSC2810", name: "Software Engineering" }
];

// Skills list
export const skills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "Python",
  "Java",
  "C#",
  "C++",
  "HTML/CSS",
  "Database Management",
  "Cloud Computing",
  "Mobile Development",
  "UI/UX Design",
  "DevOps",
  "Machine Learning",
  "Data Analysis",
  "Cybersecurity",
  "Agile Methodologies",
  "Technical Writing",
  "Team Leadership"
];

// Sample tutors/applicants data
export const applicants = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    availability: "Part Time",
    skills: ["JavaScript", "React", "Node.js", "HTML/CSS"],
    credentials: "Bachelor of Computer Science, RMIT University",
    previousRoles: ["Lab Assistant - COSC2803 (2022)", "Tutor - COSC2801 (2023)"],
    appliedCourses: [
      { courseId: 1, role: "Tutor" },
      { courseId: 3, role: "Lab Assistant" }
    ],
    selections: 2,
    status: "Selected"
  },
  {
    id: 2,
    name: "Jamie Smith",
    email: "jamie.smith@example.com",
    availability: "Full Time",
    skills: ["Python", "Java", "Database Management", "Machine Learning"],
    credentials: "Master of Data Science, University of Melbourne",
    previousRoles: ["Tutor - COSC2806 (2023)"],
    appliedCourses: [
      { courseId: 2, role: "Tutor" },
      { courseId: 6, role: "Tutor" },
      { courseId: 7, role: "Lab Assistant" }
    ],
    selections: 3,
    status: "Selected"
  },
  {
    id: 3,
    name: "Taylor Wong",
    email: "taylor.wong@example.com",
    availability: "Part Time",
    skills: ["C++", "Python", "Data Analysis", "Cybersecurity"],
    credentials: "Bachelor of IT, RMIT University",
    previousRoles: [],
    appliedCourses: [
      { courseId: 8, role: "Lab Assistant" },
      { courseId: 9, role: "Lab Assistant" }
    ],
    selections: 0,
    status: "Not Selected"
  },
  {
    id: 4,
    name: "Morgan Lee",
    email: "morgan.lee@example.com",
    availability: "Full Time",
    skills: ["Mobile Development", "JavaScript", "TypeScript", "React"],
    credentials: "Master of Software Engineering, RMIT University",
    previousRoles: ["Tutor - COSC2804 (2022)"],
    appliedCourses: [
      { courseId: 3, role: "Tutor" },
      { courseId: 4, role: "Tutor" },
      { courseId: 10, role: "Lab Assistant" }
    ],
    selections: 1,
    status: "Selected"
  },
  {
    id: 5,
    name: "Riley Garcia",
    email: "riley.garcia@example.com",
    availability: "Part Time",
    skills: ["Cloud Computing", "DevOps", "Python", "Database Management"],
    credentials: "Bachelor of Computer Science, Monash University",
    previousRoles: ["Lab Assistant - COSC2805 (2023)"],
    appliedCourses: [
      { courseId: 5, role: "Tutor" },
      { courseId: 7, role: "Tutor" }
    ],
    selections: 0,
    status: "Not Selected"
  }
];

// Function to get applications for a specific course
export const getApplicationsByCourse = (courseId: number) => {
  return applicants.filter(applicant => 
    applicant.appliedCourses.some(course => course.courseId === courseId)
  );
};

// Function to get a course by ID
export const getCourseById = (courseId: number) => {
  return courses.find(course => course.id === courseId);
};

// Initialize local storage with dummy data if not already present
export const initializeLocalStorage = () => {
  // Check if dummy data already exists
  if (!localStorage.getItem('courses')) {
    localStorage.setItem('courses', JSON.stringify(courses));
  }
  
  if (!localStorage.getItem('applicants')) {
    localStorage.setItem('applicants', JSON.stringify(applicants));
  }
  
  if (!localStorage.getItem('skills')) {
    localStorage.setItem('skills', JSON.stringify(skills));
  }
};

// Function to get tutor applications from localStorage
export const getTutorApplications = () => {
  const storedApplications = localStorage.getItem('tutorApplications');
  return storedApplications ? JSON.parse(storedApplications) : [];
};

// Function to save tutor application
export const saveTutorApplication = (application: any) => {
  const applications = getTutorApplications();
  const updatedApplications = [...applications, application];
  localStorage.setItem('tutorApplications', JSON.stringify(updatedApplications));
};

// Function to update tutor application
export const updateTutorApplication = (userId: number, application: any) => {
  const applications = getTutorApplications();
  const updatedApplications = applications.map((app: any) => 
    app.userId === userId ? { ...app, ...application } : app
  );
  localStorage.setItem('tutorApplications', JSON.stringify(updatedApplications));
};

// Function to get lecturer selections
export const getLecturerSelections = () => {
  const storedSelections = localStorage.getItem('lecturerSelections');
  return storedSelections ? JSON.parse(storedSelections) : [];
};

// Function to save lecturer selection
export const saveLecturerSelection = (selection: any) => {
  const selections = getLecturerSelections();
  const updatedSelections = [...selections, selection];
  localStorage.setItem('lecturerSelections', JSON.stringify(updatedSelections));
};

// Function to update lecturer selection
export const updateLecturerSelection = (selectionId: number, selection: any) => {
  const selections = getLecturerSelections();
  const updatedSelections = selections.map((sel: any) => 
    sel.id === selectionId ? { ...sel, ...selection } : sel
  );
  localStorage.setItem('lecturerSelections', JSON.stringify(updatedSelections));
};
