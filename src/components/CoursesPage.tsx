import React from 'react';
import { Clock, IndianRupee, Star, BookOpen, Users, Calendar, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PageType } from '../App';

interface CoursesPageProps {
  onNavigate: (page: PageType) => void;
}

const CoursesPage: React.FC<CoursesPageProps> = ({ onNavigate }) => {
  const { courses } = useApp();

  const getLevelBadge = (level: string) => {
    const levelConfig = {
      'Beginner': { bg: 'bg-green-100', text: 'text-green-800' },
      'Intermediate': { bg: 'bg-yellow-100', text: 'text-yellow-800' },
      'Advanced': { bg: 'bg-red-100', text: 'text-red-800' }
    };
    
    const config = levelConfig[level as keyof typeof levelConfig] || levelConfig.Beginner;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {level}
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Training Programs</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive software development courses designed to take you from beginner 
          to job-ready professional with hands-on projects and expert mentorship.
        </p>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-gray-100"
          >
            <div className="relative">
              <img
                src={course.image}
                alt={course.name}
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-4 left-4">
                {getLevelBadge(course.level)}
              </div>
              <div className="absolute top-4 right-4 flex items-center bg-white bg-opacity-90 backdrop-blur-sm rounded-full px-2 py-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                <span className="text-sm font-medium">4.9</span>
              </div>
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
                {course.category}
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{course.name}</h3>
              <p className="text-gray-600 mb-4">{course.description}</p>

              {/* Course Details */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center text-gray-500">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{course.duration} weeks</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <Users className="h-4 w-4 mr-2" />
                  <span>{course.enrolledStudents}/{course.maxStudents} enrolled</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <Award className="h-4 w-4 mr-2" />
                  <span>{course.instructor}</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Starts {new Date(course.startDate).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center text-green-600 font-semibold">
                  <IndianRupee className="h-6 w-6 mr-1" />
                  <span className="text-2xl">{course.price.toLocaleString()}</span>
                </div>
                <div className="text-sm text-gray-500">
                  Payment plans available
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">What You'll Learn:</h4>
                <ul className="space-y-1">
                  {course.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Enrollment Progress */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Enrollment Progress</span>
                  <span>{course.enrolledStudents}/{course.maxStudents}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-400 to-indigo-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(course.enrolledStudents / course.maxStudents) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onNavigate('enrollment')}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-colors flex items-center justify-center space-x-2"
              >
                <BookOpen className="h-5 w-5" />
                <span>Enroll in Course</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Info Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Help Choosing a Course?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our career counselors are here to help you select the perfect training program 
            based on your background, goals, and career aspirations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('enrollment')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-colors"
            >
              Schedule Consultation
            </button>
            <a
              href="tel:+15551234567"
              className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors"
            >
              Call Us: (555) 123-4567
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;