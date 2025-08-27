import React from 'react';
import { Clock, RupeeSign, Star, Calendar } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PageType } from '../App';

interface ServicesPageProps {
  onNavigate: (page: PageType) => void;
}

const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const { services } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Premium Services</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Choose from our range of professional tanning services, each designed to give you 
          the perfect tan with the latest technology and expert care.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-gray-100"
          >
            <div className="relative">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-4 left-4">
                <div className="bg-gradient-to-r from-orange-400 to-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Popular
                </div>
              </div>
              <div className="absolute top-4 right-4 flex items-center bg-white bg-opacity-90 backdrop-blur-sm rounded-full px-2 py-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                <span className="text-sm font-medium">4.9</span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.name}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>

              {/* Service Details */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-gray-500">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{service.duration} minutes</span>
                </div>
                <div className="flex items-center text-green-600 font-semibold">
                  <RupeeSign className="h-5 w-5 mr-1" />
                  <span className="text-xl">{service.price}</span>
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">What's Included:</h4>
                <ul className="space-y-1">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onNavigate('booking')}
                className="w-full bg-gradient-to-r from-orange-400 to-amber-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-orange-500 hover:to-amber-600 transition-colors flex items-center justify-center space-x-2"
              >
                <Calendar className="h-5 w-5" />
                <span>Book This Service</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Info Section */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-8 border border-orange-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Help Choosing?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our certified professionals are here to help you select the perfect tanning 
            service based on your skin type, desired results, and schedule.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('booking')}
              className="bg-gradient-to-r from-orange-400 to-amber-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-500 hover:to-amber-600 transition-colors"
            >
              Schedule Consultation
            </button>
            <a
              href="tel: (+91) 9535035171"
              className="border-2 border-orange-400 text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-orange-400 hover:text-white transition-colors"
            >
              Call Us: (+91) 9535035171
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;