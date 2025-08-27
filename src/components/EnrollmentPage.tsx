import React, { useState } from 'react';
import { User, Mail, Phone, Check, IndianRupee } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PageType } from '../App';

interface EnrollmentPageProps {
  onNavigate: (page: PageType) => void;
}

interface StudentInfo {
  name: string;
  email: string;
  phone: string;
  experience: string;
  goals: string;
  notes: string;
}

const EnrollmentPage: React.FC<EnrollmentPageProps> = ({ onNavigate }) => {
  const { courses } = useApp();
  const [step, setStep] = useState(1);
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [studentInfo, setStudentInfo] = useState<StudentInfo>({
    name: '',
    email: '',
    phone: '',
    experience: '',
    goals: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedCourseData = courses.find(course => course.id === selectedCourse);

  const handleCourseSelect = (courseId: string) => {
    setSelectedCourse(courseId);
    setStep(2);
  };

  const handleSubmit = async () => {
    if (!studentInfo.name || !studentInfo.email || !studentInfo.phone) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setStep(3);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      {step === 1 && (
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Course</h1>
            <p className="text-xl text-gray-600">Select the perfect course to start your tech journey</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div key={course.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{course.name}</h3>
                    <div className="flex items-center text-green-600 font-bold">
                      <IndianRupee className="h-5 w-5 mr-1" />
                      {course.price.toLocaleString()}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      Duration: {course.duration} weeks
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Instructor: {course.instructor}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                      Start Date: {new Date(course.startDate).toLocaleDateString()}
                    </div>
                  </div>

                  <button
                    onClick={() => handleCourseSelect(course.id)}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-colors"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate('home')}
              className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:border-gray-400 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Complete Your Enrollment</h1>
            <p className="text-xl text-gray-600">Just a few details to get you started</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="h-4 w-4 inline mr-2" />
                Full Name *
              </label>
              <input
                type="text"
                value={studentInfo.name}
                onChange={(e) => setStudentInfo({...studentInfo, name: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="h-4 w-4 inline mr-2" />
                Email Address *
              </label>
              <input
                type="email"
                value={studentInfo.email}
                onChange={(e) => setStudentInfo({...studentInfo, email: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="h-4 w-4 inline mr-2" />
                Phone Number *
              </label>
              <input
                type="tel"
                value={studentInfo.phone}
                onChange={(e) => setStudentInfo({...studentInfo, phone: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Programming Experience
              </label>
              <select
                value={studentInfo.experience}
                onChange={(e) => setStudentInfo({...studentInfo, experience: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select your experience level</option>
                <option value="none">No programming experience</option>
                <option value="beginner">Some basic knowledge</option>
                <option value="intermediate">1-2 years experience</option>
                <option value="advanced">3+ years experience</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Career Goals
              </label>
              <textarea
                value={studentInfo.goals}
                onChange={(e) => setStudentInfo({...studentInfo, goals: e.target.value})}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="What are your career goals? What do you hope to achieve?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes (Optional)
              </label>
              <textarea
                value={studentInfo.notes}
                onChange={(e) => setStudentInfo({...studentInfo, notes: e.target.value})}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Any questions or special requirements..."
              />
            </div>

            {/* Course Summary */}
            {selectedCourseData && (
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-4">Selected Course</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Course:</span>
                    <span className="font-semibold">{selectedCourseData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="font-semibold">{selectedCourseData.duration} weeks</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Start Date:</span>
                    <span className="font-semibold">
                      {new Date(selectedCourseData.startDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Instructor:</span>
                    <span className="font-semibold">{selectedCourseData.instructor}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2 mt-2">
                    <span className="font-semibold">Total Investment:</span>
                    <span className="flex items-center font-bold text-green-600">
                      <IndianRupee className="h-5 w-5 mr-1" />
                      {selectedCourseData.price.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between max-w-2xl mx-auto mt-8">
            <button
              onClick={() => setStep(1)}
              className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:border-gray-400 transition-colors"
            >
              Back to Courses
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !studentInfo.name || !studentInfo.email || !studentInfo.phone}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-700 hover:to-indigo-700 transition-colors flex items-center space-x-2"
            >
              {isSubmitting ? (
                <span>Processing...</span>
              ) : (
                <>
                  <Check className="h-5 w-5" />
                  <span>Complete Enrollment</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="text-center space-y-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <Check className="h-10 w-10 text-green-600" />
          </div>
          
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Enrollment Successful!</h1>
            <p className="text-xl text-gray-600 mb-8">
              Welcome to ACS Soft Tech! Your enrollment has been confirmed and we've sent 
              course details to {studentInfo.email}.
            </p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6 max-w-2xl mx-auto">
            <h4 className="font-semibold text-gray-900 mb-4">Enrollment Details</h4>
            <div className="space-y-2 text-left">
              <div className="flex justify-between">
                <span>Course:</span>
                <span className="font-semibold">{selectedCourseData?.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Start Date:</span>
                <span className="font-semibold">
                  {selectedCourseData && new Date(selectedCourseData.startDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Duration:</span>
                <span className="font-semibold">{selectedCourseData?.duration} weeks</span>
              </div>
              <div className="flex justify-between">
                <span>Instructor:</span>
                <span className="font-semibold">{selectedCourseData?.instructor}</span>
              </div>
              <div className="flex justify-between border-t pt-2 mt-2">
                <span className="font-semibold">Course Fee:</span>
                <span className="flex items-center font-bold text-green-600">
                  <IndianRupee className="h-5 w-5 mr-1" />
                  {selectedCourseData?.price.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
            <h4 className="font-semibold text-gray-900 mb-2">Next Steps</h4>
            <ul className="text-left space-y-2 text-gray-700">
              <li>• Check your email for course materials and access instructions</li>
              <li>• Join our student portal to connect with classmates</li>
              <li>• Attend the orientation session before course start date</li>
              <li>• Set up your development environment using our guide</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('dashboard')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-colors"
            >
              Access Student Portal
            </button>
            <button
              onClick={() => onNavigate('home')}
              className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:border-gray-400 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnrollmentPage;