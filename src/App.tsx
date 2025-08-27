import React, { useState } from 'react';
import { Code, BookOpen, Users, Settings, Home, Phone, Mail, MapPin, Clock, Star, X, MessageCircle } from 'lucide-react';
import HomePage from './components/HomePage';
import CoursesPage from './components/CoursesPage';
import EnrollmentPage from './components/EnrollmentPage';
import DashboardPage from './components/DashboardPage';
import AdminPage from './components/AdminPage';
import { AppProvider } from './context/AppContext';

export type PageType = 'home' | 'courses' | 'enrollment' | 'dashboard' | 'admin';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showMessaging, setShowMessaging] = useState(true);

  const navigation = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'courses', label: 'Courses', icon: Code },
    { id: 'enrollment', label: 'Enroll Now', icon: BookOpen },
    { id: 'dashboard', label: 'My Learning', icon: Users },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'courses':
        return <CoursesPage onNavigate={setCurrentPage} />;
      case 'enrollment':
        return <EnrollmentPage onNavigate={setCurrentPage} />;
      case 'dashboard':
        return <DashboardPage onNavigate={setCurrentPage} />;
      case 'admin':
        return <AdminPage onNavigate={setCurrentPage} />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <AppProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        {/* Navigation Header */}
        <header className="bg-white shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                  <Code className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">ACS Soft Tech</h1>
                  <p className="text-xs text-gray-600">Software Training Institute</p>
                </div>
              </div>

              {/* Navigation */}
              <nav className="hidden md:flex space-x-8">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setCurrentPage(item.id as PageType)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        currentPage === item.id
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
                <button
                  onClick={() => {
                    setIsAdmin(!isAdmin);
                    if (!isAdmin) setCurrentPage('admin');
                  }}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                >
                  <Settings className="h-4 w-4" />
                  <span>{isAdmin ? 'Exit Admin' : 'Admin'}</span>
                </button>
              </nav>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setCurrentPage('enrollment')}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:from-blue-700 hover:to-indigo-700 transition-colors"
                >
                  Enroll Now
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id as PageType)}
                    className={`flex items-center space-x-2 w-full px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentPage === item.id
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1">
          {renderPage()}
        </main>

        {/* Messaging Popup */}
        {showMessaging && (
          <div className="fixed bottom-6 right-6 z-50 animate-bounce">
            <div className="bg-white text-gray-800 rounded-xl shadow-lg p-4 max-w-xs relative border border-gray-200">
              <button
                onClick={() => setShowMessaging(false)}
                className="absolute -top-1 -right-1 bg-gray-400 hover:bg-gray-500 text-white rounded-full w-5 h-5 flex items-center justify-center transition-colors text-xs"
                aria-label="Close messaging"
              >
                <X className="h-2 w-2" />
              </button>
              <div className="flex items-center space-x-2 mb-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <MessageCircle className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-800">Need Help?</h4>
                  <p className="text-xs text-gray-600">Chat with us</p>
                </div>
              </div>
              <div className="space-y-1">
                <button
                  onClick={() => {
                    window.open('tel:+919535035171', '_self');
                  }}
                  className="w-full bg-blue-600 text-white py-1.5 px-3 rounded-md text-xs font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1"
                >
                  <Phone className="h-3 w-3" />
                  <span>Call Now</span>
                </button>
                <button
                  onClick={() => {
                    window.open('mailto:info@acssofttech.com', '_blank');
                  }}
                  className="w-full bg-gray-100 text-gray-700 py-1.5 px-3 rounded-md text-xs font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-1"
                >
                  <Mail className="h-3 w-3" />
                  <span>Email Us</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                    <Code className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">ACS Soft Tech</h3>
                    <p className="text-gray-400">Software Training Institute</p>
                  </div>
                </div>
                <p className="text-gray-400 mb-4">
                  Empowering the next generation of software developers with cutting-edge training 
                  programs and hands-on experience. Your tech career starts here.
                </p>
                <div className="flex space-x-4">
                  <div className="flex items-center text-sm text-gray-400">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    4.9/5 Rating
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <Users className="h-4 w-4 mr-1" />
                    1000+ Graduates
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-400">
                    <Phone className="h-4 w-4 mr-3" />
                    <span>(+91) 9535035171</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Mail className="h-4 w-4 mr-3" />
                    <span>info@acssofttech.com</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <MapPin className="h-4 w-4 mr-3" />
                    <span>12-18 Floor KBHP Face 7<br />Hyderabad Telangana, IN 500085</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Office Hours</h4>
                <div className="space-y-2 text-gray-400">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-3" />
                    <div>
                      <p>Mon - Fri: 9AM - 6PM</p>
                      <p>Sat: 10AM - 4PM</p>
                      <p>Sun: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2025 ACS Soft Tech. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </AppProvider>
  );
}

export default App;