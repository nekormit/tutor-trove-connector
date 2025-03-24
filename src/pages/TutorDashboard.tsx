
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AnimatedContainer from '@/components/ui/AnimatedContainer';
import { courses, skills, getTutorApplications, saveTutorApplication } from '@/utils/dataUtils';

const TutorDashboard: React.FC = () => {
  const { isAuthenticated, user, userType } = useAuth();
  const navigate = useNavigate();
  
  // Form states
  const [selectedCourses, setSelectedCourses] = useState<Array<{ courseId: number, role: string }>>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [availability, setAvailability] = useState('Part Time');
  const [credentials, setCredentials] = useState('');
  const [previousRoles, setPreviousRoles] = useState<string[]>([]);
  const [newPreviousRole, setNewPreviousRole] = useState('');
  
  // Check authentication
  useEffect(() => {
    if (!isAuthenticated || userType !== 'tutor') {
      navigate('/signin');
    }
  }, [isAuthenticated, userType, navigate]);
  
  // Load existing application if available
  useEffect(() => {
    if (user) {
      const applications = getTutorApplications();
      const existingApplication = applications.find((app: any) => app.userId === user.id);
      
      if (existingApplication) {
        setSelectedCourses(existingApplication.selectedCourses || []);
        setSelectedSkills(existingApplication.selectedSkills || []);
        setAvailability(existingApplication.availability || 'Part Time');
        setCredentials(existingApplication.credentials || '');
        setPreviousRoles(existingApplication.previousRoles || []);
      }
    }
  }, [user]);
  
  // Handle course selection
  const handleCourseSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const courseId = parseInt(e.target.value);
    if (courseId && !selectedCourses.some(c => c.courseId === courseId)) {
      setSelectedCourses([...selectedCourses, { courseId, role: 'Tutor' }]);
    }
  };
  
  // Handle role change
  const handleRoleChange = (courseId: number, role: string) => {
    setSelectedCourses(
      selectedCourses.map(course => 
        course.courseId === courseId ? { ...course, role } : course
      )
    );
  };
  
  // Remove course from selection
  const handleRemoveCourse = (courseId: number) => {
    setSelectedCourses(selectedCourses.filter(course => course.courseId !== courseId));
  };
  
  // Toggle skill selection
  const handleSkillToggle = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };
  
  // Add previous role
  const handleAddPreviousRole = () => {
    if (newPreviousRole.trim()) {
      setPreviousRoles([...previousRoles, newPreviousRole.trim()]);
      setNewPreviousRole('');
    }
  };
  
  // Remove previous role
  const handleRemovePreviousRole = (index: number) => {
    setPreviousRoles(previousRoles.filter((_, i) => i !== index));
  };
  
  // Save application
  const handleSaveApplication = () => {
    if (!credentials.trim()) {
      toast.error('Please enter your academic credentials');
      return;
    }
    
    if (selectedCourses.length === 0) {
      toast.error('Please select at least one course');
      return;
    }
    
    if (selectedSkills.length === 0) {
      toast.error('Please select at least one skill');
      return;
    }
    
    // Create application object
    const application = {
      userId: user?.id || 1,
      name: user?.name || 'User',
      selectedCourses,
      selectedSkills,
      availability,
      credentials,
      previousRoles,
      dateApplied: new Date().toISOString()
    };
    
    // Save to localStorage
    saveTutorApplication(application);
    
    toast.success('Application saved successfully');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedContainer animation="slide-up" className="mb-8">
            <h1 className="text-3xl font-bold">Tutor Dashboard</h1>
            <p className="text-muted-foreground mt-2">Apply for tutor and lab assistant roles</p>
          </AnimatedContainer>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Course Application */}
            <AnimatedContainer animation="fade-in" delay={100} className="glass-card p-6 rounded-lg lg:col-span-2">
              <h2 className="text-xl font-semibold mb-4">Apply for Courses</h2>
              
              <div className="space-y-6">
                {/* Course Selection */}
                <div>
                  <label className="text-sm font-medium">Select a Course</label>
                  <div className="flex mt-2">
                    <select 
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                      onChange={handleCourseSelect}
                      value=""
                    >
                      <option value="">-- Select a course --</option>
                      {courses.map(course => (
                        <option key={course.id} value={course.id} disabled={selectedCourses.some(c => c.courseId === course.id)}>
                          {course.code} - {course.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                {/* Selected Courses */}
                {selectedCourses.length > 0 && (
                  <div className="space-y-3">
                    <label className="text-sm font-medium">Selected Courses</label>
                    {selectedCourses.map(({ courseId, role }) => {
                      const course = courses.find(c => c.id === courseId);
                      return (
                        <div key={courseId} className="flex items-center justify-between p-3 bg-secondary rounded-md">
                          <div>
                            <span className="font-medium">{course?.code}</span> - {course?.name}
                          </div>
                          <div className="flex items-center space-x-3">
                            <select
                              value={role}
                              onChange={(e) => handleRoleChange(courseId, e.target.value)}
                              className="px-2 py-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                            >
                              <option value="Tutor">Tutor</option>
                              <option value="Lab Assistant">Lab Assistant</option>
                            </select>
                            <button
                              onClick={() => handleRemoveCourse(courseId)}
                              className="text-red-500 hover:text-red-700"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                
                {/* Availability */}
                <div>
                  <label className="text-sm font-medium">Availability</label>
                  <div className="flex mt-2 space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="availability"
                        value="Part Time"
                        checked={availability === 'Part Time'}
                        onChange={() => setAvailability('Part Time')}
                        className="mr-2"
                      />
                      Part Time
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="availability"
                        value="Full Time"
                        checked={availability === 'Full Time'}
                        onChange={() => setAvailability('Full Time')}
                        className="mr-2"
                      />
                      Full Time
                    </label>
                  </div>
                </div>
                
                {/* Academic Credentials */}
                <div>
                  <label className="text-sm font-medium">Academic Credentials</label>
                  <textarea
                    value={credentials}
                    onChange={(e) => setCredentials(e.target.value)}
                    placeholder="e.g., Bachelor of Computer Science, RMIT University"
                    className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    rows={3}
                  />
                </div>
                
                {/* Previous Roles */}
                <div>
                  <label className="text-sm font-medium">Previous Roles</label>
                  <div className="flex mt-2">
                    <input
                      type="text"
                      value={newPreviousRole}
                      onChange={(e) => setNewPreviousRole(e.target.value)}
                      placeholder="e.g., Tutor - COSC2803 (2023)"
                      className="w-full px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <button
                      onClick={handleAddPreviousRole}
                      className="px-4 py-2 bg-primary text-white rounded-r-md hover:bg-primary/90 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  {previousRoles.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {previousRoles.map((role, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-secondary rounded-md">
                          <span>{role}</span>
                          <button
                            onClick={() => handleRemovePreviousRole(index)}
                            className="text-red-500 text-sm hover:text-red-700"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Submit Button */}
                <div>
                  <button
                    onClick={handleSaveApplication}
                    className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    Save Application
                  </button>
                </div>
              </div>
            </AnimatedContainer>
            
            {/* Sidebar - Skills */}
            <AnimatedContainer animation="fade-in" delay={200} className="glass-card p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Your Skills</h2>
              
              <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                  <button
                    key={skill}
                    onClick={() => handleSkillToggle(skill)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      selectedSkills.includes(skill)
                        ? 'bg-primary text-white'
                        : 'bg-secondary text-foreground hover:bg-primary/10'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
              
              {selectedSkills.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-2">Selected Skills:</h3>
                  <div className="p-3 bg-secondary rounded-md">
                    <ul className="list-disc list-inside">
                      {selectedSkills.map(skill => (
                        <li key={skill}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </AnimatedContainer>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TutorDashboard;
