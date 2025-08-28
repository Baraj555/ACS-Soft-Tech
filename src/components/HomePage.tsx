import React from 'react';
import { Code, Award, Clock, Users, ArrowRight, Star, Shield, BookOpen, Laptop, TrendingUp } from 'lucide-react';
import { PageType } from '../App';

interface HomePageProps {
  onNavigate: (page: PageType) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const features = [
    {
      icon: Code,
      title: 'Industry-Standard Curriculum',
      description: 'Learn the latest technologies and frameworks used by top tech companies worldwide.'
    },
    {
      icon: Award,
      title: 'Expert Instructors',
      description: 'Learn from experienced software engineers and industry professionals with real-world expertise.'
    },
    {
      icon: Clock,
      title: 'Flexible Learning',
      description: 'Choose from full-time bootcamps, part-time courses, and self-paced online programs.'
    },
    {
      icon: Shield,
      title: 'Job Placement Support',
      description: 'Career counseling, resume building, and interview preparation to land your dream job.'
    }
  ];

  const testimonials = [
    {
      name: 'Sirisha Veeramasetti',
      role: 'Full Stack Developer at Capgemini',
      rating: 5,
      text: 'ACS Soft Tech transformed my career. The hands-on projects and expert guidance helped me land my dream job.',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg'
    },
    {
      name: 'Siva Pravallika K',
      role: 'Software Engineer at EY',
      rating: 5,
      text: 'Best investment I ever made. The curriculum is up-to-date and the instructors are incredibly knowledgeable.',
      image: 'https://images.pexels.com/photos/1040586/pexels-photo-1040586.jpeg'
    },
    {
      name: 'Sai Vikas P',
      role: 'Data Scientist at Infosys',
      rating: 5,
      text: 'The data science program exceeded my expectations. Real projects and industry connections made all the difference.',
      image: 'https://images.pexels.com/photos/1040848/pexels-photo-1040848.jpeg'
    }
  ];

  const stats = [
    { number: '1000+', label: 'Graduates Placed' },
    { number: '95%', label: 'Job Placement Rate' },
    { number: '50+', label: 'Industry Partners' },
    { number: '4.9', label: 'Student Rating' }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center text-white">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Launch Your
              <span className="block text-blue-200">Tech Career</span>
            </h1>
            <p className="text-xl sm:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Master in-demand programming skills with hands-on training, expert mentorship, 
              and guaranteed job placement support at ACS Soft Tech.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate('enrollment')}
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2 shadow-lg"
              >
                <BookOpen className="h-5 w-5" />
                <span>Start Learning Today</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button
                onClick={() => onNavigate('courses')}
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors flex items-center justify-center space-x-2"
              >
                <Code className="h-5 w-5" />
                <span>Browse Courses</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why Choose ACS Soft Tech?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide comprehensive software training with cutting-edge curriculum, 
            expert instruction, and proven career outcomes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Categories Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Popular Course Categories
          </h2>
          <p className="text-xl text-gray-600">
            Explore our comprehensive range of software development programs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Laptop,
              title: 'Web Development',
              description: 'Full-stack development with modern frameworks',
              courses: '3 Courses',
              color: 'from-green-500 to-emerald-600'
            },
            {
              icon: TrendingUp,
              title: 'Data Science',
              description: 'Analytics, machine learning, and AI',
              courses: '2 Courses',
              color: 'from-purple-500 to-violet-600'
            },
            {
              icon: Shield,
              title: 'Cybersecurity',
              description: 'Security, ethical hacking, and compliance',
              courses: '2 Courses',
              color: 'from-red-500 to-rose-600'
            }
          ].map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 cursor-pointer"
                onClick={() => onNavigate('courses')}
              >
                <div className={`bg-gradient-to-r ${category.color} w-16 h-16 rounded-lg flex items-center justify-center mb-6`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{category.title}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="text-sm text-blue-600 font-medium">{category.courses}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Success Stories
          </h2>
          <p className="text-xl text-gray-600">
            Hear from our graduates who transformed their careers
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <div className="flex items-center mt-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Start Your Tech Journey?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of successful graduates who launched their tech careers with ACS Soft Tech. 
            Expert instruction, hands-on projects, and job placement support included.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('enrollment')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-colors flex items-center justify-center space-x-2 shadow-lg"
            >
              <BookOpen className="h-5 w-5" />
              <span>Enroll Now</span>
            </button>
            <button
              onClick={() => onNavigate('courses')}
              className="border-2 border-gray-600 text-gray-300 px-8 py-4 rounded-lg font-semibold text-lg hover:border-gray-500 hover:text-white transition-colors shadow-lg"
            >
              View All Courses
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
