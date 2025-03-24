
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';
import { Search, ArrowUpDown } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AnimatedContainer from '@/components/ui/AnimatedContainer';
import { courses, applicants, skills, getCourseById } from '@/utils/dataUtils';

// Applicant type
interface Applicant {
  id: number;
  name: string;
  email: string;
  availability: string;
  skills: string[];
  credentials: string;
  previousRoles: string[];
  appliedCourses: { courseId: number; role: string }[];
  selections: number;
  status: string;
}

// Selection type
interface Selection {
  applicantId: number;
  courseId: number;
  rank: number;
  comment: string;
}

const LecturerDashboard: React.FC = () => {
  const { isAuthenticated, userType } = useAuth();
  const navigate = useNavigate();
  
  // State variables
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [filteredApplicants, setFilteredApplicants] = useState<Applicant[]>([]);
  const [selectedApplicants, setSelectedApplicants] = useState<Selection[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAvailability, setFilterAvailability] = useState<string>('All');
  const [filterSkill, setFilterSkill] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  // Check authentication
  useEffect(() => {
    if (!isAuthenticated || userType !== 'lecturer') {
      navigate('/signin');
    }
  }, [isAuthenticated, userType, navigate]);
  
  // Filter applicants based on selected course
  useEffect(() => {
    if (selectedCourse) {
      let filtered = applicants.filter(applicant => 
        applicant.appliedCourses.some(course => course.courseId === selectedCourse)
      );
      
      // Apply search filter
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(applicant => 
          applicant.name.toLowerCase().includes(term) || 
          applicant.skills.some(skill => skill.toLowerCase().includes(term))
        );
      }
      
      // Apply availability filter
      if (filterAvailability !== 'All') {
        filtered = filtered.filter(applicant => 
          applicant.availability === filterAvailability
        );
      }
      
      // Apply skill filter
      if (filterSkill !== 'All') {
        filtered = filtered.filter(applicant => 
          applicant.skills.includes(filterSkill)
        );
      }
      
      // Apply sorting
      filtered.sort((a, b) => {
        if (sortBy === 'name') {
          return sortDirection === 'asc' 
            ? a.name.localeCompare(b.name) 
            : b.name.localeCompare(a.name);
        } else if (sortBy === 'availability') {
          return sortDirection === 'asc' 
            ? a.availability.localeCompare(b.availability) 
            : b.availability.localeCompare(a.availability);
        }
        return 0;
      });
      
      setFilteredApplicants(filtered);
    } else {
      setFilteredApplicants([]);
    }
  }, [selectedCourse, searchTerm, filterAvailability, filterSkill, sortBy, sortDirection]);
  
  // Handle course selection
  const handleCourseSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const courseId = parseInt(e.target.value);
    setSelectedCourse(courseId || null);
    // Reset selections when course changes
    setSelectedApplicants([]);
  };
  
  // Toggle applicant selection
  const handleSelectApplicant = (applicantId: number) => {
    const isAlreadySelected = selectedApplicants.some(
      selection => selection.applicantId === applicantId && selection.courseId === selectedCourse
    );
    
    if (isAlreadySelected) {
      setSelectedApplicants(selectedApplicants.filter(
        selection => !(selection.applicantId === applicantId && selection.courseId === selectedCourse)
      ));
    } else if (selectedCourse) {
      const newRank = selectedApplicants.filter(s => s.courseId === selectedCourse).length + 1;
      setSelectedApplicants([
        ...selectedApplicants,
        { 
          applicantId, 
          courseId: selectedCourse, 
          rank: newRank,
          comment: ''
        }
      ]);
    }
  };
  
  // Update applicant rank
  const handleUpdateRank = (applicantId: number, newRank: number) => {
    if (!selectedCourse) return;
    
    // Get all selections for the current course
    const courseSelections = selectedApplicants.filter(
      selection => selection.courseId === selectedCourse
    );
    
    // Find the selection to update
    const selectionToUpdate = courseSelections.find(
      selection => selection.applicantId === applicantId
    );
    
    if (!selectionToUpdate) return;
    
    // Get the old rank
    const oldRank = selectionToUpdate.rank;
    
    // If trying to set an invalid rank, return
    if (newRank < 1 || newRank > courseSelections.length) return;
    
    // Update ranks for all affected selections
    const updatedSelections = selectedApplicants.map(selection => {
      if (selection.courseId !== selectedCourse) return selection;
      
      if (selection.applicantId === applicantId) {
        return { ...selection, rank: newRank };
      }
      
      if (oldRank < newRank && selection.rank > oldRank && selection.rank <= newRank) {
        return { ...selection, rank: selection.rank - 1 };
      }
      
      if (oldRank > newRank && selection.rank >= newRank && selection.rank < oldRank) {
        return { ...selection, rank: selection.rank + 1 };
      }
      
      return selection;
    });
    
    setSelectedApplicants(updatedSelections);
  };
  
  // Update applicant comment
  const handleUpdateComment = (applicantId: number, comment: string) => {
    if (!selectedCourse) return;
    
    setSelectedApplicants(selectedApplicants.map(selection => {
      if (selection.applicantId === applicantId && selection.courseId === selectedCourse) {
        return { ...selection, comment };
      }
      return selection;
    }));
  };
  
  // Handle sorting
  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };
  
  // Save selections
  const handleSaveSelections = () => {
    if (!selectedCourse || selectedApplicants.length === 0) {
      toast.error('Please select applicants before saving');
      return;
    }
    
    // Logic to save selections would go here
    // For this prototype, we'll just show a success message
    toast.success('Applicant selections saved successfully');
  };
  
  // Get applicant by ID
  const getApplicantById = (id: number) => {
    return applicants.find(applicant => applicant.id === id);
  };
  
  // Format course name
  const formatCourse = (courseId: number) => {
    const course = getCourseById(courseId);
    return course ? `${course.code} - ${course.name}` : '';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedContainer animation="slide-up" className="mb-8">
            <h1 className="text-3xl font-bold">Lecturer Dashboard</h1>
            <p className="text-muted-foreground mt-2">Review and select applicants for your courses</p>
          </AnimatedContainer>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar - Controls */}
            <AnimatedContainer animation="fade-in" delay={100} className="glass-card p-6 rounded-lg lg:col-span-1">
              <h2 className="text-xl font-semibold mb-4">Course Selection</h2>
              
              {/* Course Selector */}
              <div className="mb-6">
                <label className="text-sm font-medium">Select a Course</label>
                <select
                  className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  onChange={handleCourseSelect}
                  value={selectedCourse || ''}
                >
                  <option value="">-- Select a course --</option>
                  {courses.map(course => (
                    <option key={course.id} value={course.id}>
                      {course.code} - {course.name}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Search */}
              <div className="mb-6">
                <label className="text-sm font-medium">Search Applicants</label>
                <div className="relative mt-2">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <input
                    type="text"
                    placeholder="Name or skill"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>
              
              {/* Availability Filter */}
              <div className="mb-6">
                <label className="text-sm font-medium">Filter by Availability</label>
                <select
                  className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  value={filterAvailability}
                  onChange={(e) => setFilterAvailability(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                </select>
              </div>
              
              {/* Skills Filter */}
              <div className="mb-6">
                <label className="text-sm font-medium">Filter by Skill</label>
                <select
                  className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  value={filterSkill}
                  onChange={(e) => setFilterSkill(e.target.value)}
                >
                  <option value="All">All Skills</option>
                  {skills.map(skill => (
                    <option key={skill} value={skill}>
                      {skill}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Save Button */}
              <button
                onClick={handleSaveSelections}
                disabled={!selectedCourse || selectedApplicants.length === 0}
                className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save Selections
              </button>
            </AnimatedContainer>
            
            {/* Main Content - Applicants List */}
            <AnimatedContainer animation="slide-up" delay={150} className="glass-card p-6 rounded-lg lg:col-span-3">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {selectedCourse 
                    ? `Applicants for ${formatCourse(selectedCourse)}` 
                    : 'Please select a course'}
                </h2>
                
                {/* Sort Controls */}
                {filteredApplicants.length > 0 && (
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleSort('name')}
                      className="flex items-center text-sm text-muted-foreground hover:text-foreground"
                    >
                      Name
                      <ArrowUpDown className="ml-1 h-3 w-3" />
                    </button>
                    <button
                      onClick={() => handleSort('availability')}
                      className="flex items-center text-sm text-muted-foreground hover:text-foreground"
                    >
                      Availability
                      <ArrowUpDown className="ml-1 h-3 w-3" />
                    </button>
                  </div>
                )}
              </div>
              
              {!selectedCourse && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Select a course to view applicants</p>
                </div>
              )}
              
              {selectedCourse && filteredApplicants.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No applicants found for this course</p>
                </div>
              )}
              
              {/* Applicants List */}
              {filteredApplicants.length > 0 && (
                <div className="space-y-4">
                  {filteredApplicants.map(applicant => {
                    const isSelected = selectedApplicants.some(
                      selection => selection.applicantId === applicant.id && selection.courseId === selectedCourse
                    );
                    
                    const selection = selectedApplicants.find(
                      selection => selection.applicantId === applicant.id && selection.courseId === selectedCourse
                    );
                    
                    const rank = selection?.rank || 0;
                    
                    return (
                      <div 
                        key={applicant.id} 
                        className={`p-4 rounded-lg border transition-colors ${
                          isSelected ? 'border-primary bg-primary/5' : 'border-border bg-card'
                        }`}
                      >
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                          {/* Applicant Info */}
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold text-lg">{applicant.name}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                applicant.availability === 'Full Time' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-blue-100 text-blue-800'
                              }`}>
                                {applicant.availability}
                              </span>
                            </div>
                            
                            <p className="text-sm text-muted-foreground mt-1">{applicant.email}</p>
                            
                            <div className="mt-3 space-y-2">
                              <div>
                                <span className="text-xs font-medium">Skills:</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {applicant.skills.map(skill => (
                                    <span 
                                      key={skill} 
                                      className="inline-block px-2 py-0.5 bg-secondary text-xs rounded-full"
                                    >
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              
                              <div>
                                <span className="text-xs font-medium">Credentials:</span>
                                <p className="text-sm">{applicant.credentials}</p>
                              </div>
                              
                              {applicant.previousRoles.length > 0 && (
                                <div>
                                  <span className="text-xs font-medium">Previous Roles:</span>
                                  <ul className="list-disc list-inside text-sm">
                                    {applicant.previousRoles.map((role, index) => (
                                      <li key={index}>{role}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {/* Selection Controls */}
                          <div className="w-full md:w-auto flex flex-col gap-3">
                            <button
                              onClick={() => handleSelectApplicant(applicant.id)}
                              className={`px-4 py-2 rounded-md text-sm transition-colors ${
                                isSelected
                                  ? 'bg-red-500 text-white hover:bg-red-600'
                                  : 'bg-primary text-white hover:bg-primary/90'
                              }`}
                            >
                              {isSelected ? 'Deselect' : 'Select'}
                            </button>
                            
                            {isSelected && (
                              <div className="space-y-3">
                                <div>
                                  <label className="text-xs font-medium">Rank</label>
                                  <div className="flex mt-1">
                                    <button
                                      onClick={() => handleUpdateRank(applicant.id, rank - 1)}
                                      disabled={rank <= 1}
                                      className="px-2 py-1 bg-secondary text-foreground rounded-l-md disabled:opacity-50"
                                    >
                                      -
                                    </button>
                                    <div className="px-3 py-1 bg-white border-y text-center min-w-[40px]">
                                      {rank}
                                    </div>
                                    <button
                                      onClick={() => handleUpdateRank(applicant.id, rank + 1)}
                                      disabled={rank >= selectedApplicants.filter(s => s.courseId === selectedCourse).length}
                                      className="px-2 py-1 bg-secondary text-foreground rounded-r-md disabled:opacity-50"
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                                
                                <div>
                                  <label className="text-xs font-medium">Comment</label>
                                  <textarea
                                    value={selection?.comment || ''}
                                    onChange={(e) => handleUpdateComment(applicant.id, e.target.value)}
                                    className="w-full mt-1 px-3 py-2 text-sm border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    rows={2}
                                    placeholder="Add a comment..."
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
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

export default LecturerDashboard;
