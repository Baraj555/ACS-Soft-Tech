import React, { useState } from 'react';
import { BookOpen, Clock, User, Mail, Phone, Edit, Trash2, CheckCircle, XCircle, TrendingUp, Award, IndianRupee } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PageType } from '../App';

interface DashboardPageProps {
  onNavigate: (page: PageType) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const { enrollments, updateEnrollment, cancelEnrollment, getStudentEnrollments, getCourseById } = useApp();
  const [studentEmail, setStudentEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [studentEnrollments, setStudentEnrollments] = useState<any[]>([]);

  const handleLogin = () => {
    if (!studentEmail) {
      alert('Please enter your email address');
      return;
    }

    const userEnrollments = getStudentEnrollments(studentEmail);
    setStudentEnrollments(userEnrollments);
    setIsLoggedIn(true);
  };

  const handleDropCourse = (enrollmentId: string) => {
    if (window.confirm('Are you sure you want to drop this course? This action cannot be undone.')) {
      cancelEnrollment(enrollmentId);
      // Refresh enrollments
      const updatedEnrollments = getStudentEnrollments(studentEmail);
      setStudentEnrollments(updatedEnrollments);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      enrolled: { bg: 'bg-blue-100', text: 'text-blue-800', icon: BookOpen },
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock },
      completed: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
      dropped: { bg: 'bg-red-100', text: 'text-red-800', icon: XCircle }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <Icon className="h-3 w-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Student Portal</h1>
            <p className="text-gray-600">Access your courses and track your progress</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="h-4 w-4 inline mr-2" />
                Email Address
              </label>
              <input
                type="email"
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email address"
              />
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-colors"
            >
              Access My Courses
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-500 mb-2">Not enrolled in any courses yet?</p>
              <button
                onClick={() => onNavigate('enrollment')}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Browse our courses →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const activeCourses = studentEnrollments.filter(enr => 
    enr.status === 'enrolled' || enr.status === 'pending'
  );
  
  const completedCourses = studentEnrollments.filter(enr => 
    enr.status === 'completed'
  );

  const totalProgress = studentEnrollments.length > 0 
    ? studentEnrollments.reduce((sum, enr) => sum + enr.progress, 0) / studentEnrollments.length 
    : 0;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome Back, Student!</h1>
            <p className="text-blue-100 mb-4">Continue your learning journey and track your progress</p>
            <div className="flex items-center text-blue-100">
              <Mail className="h-4 w-4 mr-2" />
              {studentEmail}
            </div>
          </div>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Switch Account
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <BookOpen className="h-8 w-8 text-blue-500 mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Active Courses</h3>
          <p className="text-2xl font-bold text-blue-600">{activeCourses.length}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <CheckCircle className="h-8 w-8 text-green-500 mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Completed</h3>
          <p className="text-2xl font-bold text-green-600">{completedCourses.length}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <TrendingUp className="h-8 w-8 text-purple-500 mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Overall Progress</h3>
          <p className="text-2xl font-bold text-purple-600">{Math.round(totalProgress)}%</p>
        </div>

        <button
          onClick={() => onNavigate('enrollment')}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-xl shadow-lg text-white hover:from-blue-700 hover:to-indigo-700 transition-colors text-left"
        >
          <BookOpen className="h-8 w-8 mb-3" />
          <h3 className="text-lg font-semibold mb-2">Enroll in New Course</h3>
          <p className="text-blue-100">Expand your skills</p>
        </button>
      </div>

      {/* Active Courses */}
      {activeCourses.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">My Active Courses</h2>
          <div className="space-y-4">
            {activeCourses.map((enrollment) => {
              const course = getCourseById(enrollment.courseId);
              return (
                <div key={enrollment.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-xl font-semibold text-gray-900">{enrollment.courseName}</h3>
                        {getStatusBadge(enrollment.status)}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 mr-2" />
                          {course?.duration} weeks
                        </div>
                        <div className="flex items-center text-gray-600">
                          <User className="h-4 w-4 mr-2" />
                          {course?.instructor}
                        </div>
                        <div className="flex items-center text-green-600 font-semibold">
                          <span>${enrollment.price.toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Course Progress</span>
                          <span>{enrollment.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-400 to-indigo-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${enrollment.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      {course?.startDate && new Date(course.startDate) > new Date() && (
                        <div className="text-blue-600 text-sm font-medium">
                          Starts {new Date(course.startDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>

                    <div className="ml-6 flex space-x-2">
                      <button
                        onClick={() => handleDropCourse(enrollment.id)}
                        className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                        title="Drop Course"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Completed Courses */}
      {completedCourses.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Completed Courses</h2>
          <div className="space-y-4">
            {completedCourses.map((enrollment) => (
              <div key={enrollment.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{enrollment.courseName}</h3>
                      {getStatusBadge(enrollment.status)}
                      <Award className="h-5 w-5 text-yellow-500" />
                    </div>
                    <div className="flex items-center space-x-6 text-gray-600">
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                        Completed {enrollment.enrollmentDate}
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        100% Progress
                      </div>
                    </div>
                  </div>
                  <div className="text-gray-500 font-semibold">
                    ${enrollment.price.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Enrollments */}
      {studentEnrollments.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Courses Yet</h3>
          <p className="text-gray-600 mb-6">Start your software development journey today!</p>
          <button
            onClick={() => onNavigate('enrollment')}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-colors"
          >
            Browse Available Courses
          </button>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;