import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Course {
  id: string;
  name: string;
  description: string;
  duration: number; // in weeks
  price: number;
  image: string;
  features: string[];
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  instructor: string;
  category: string;
  startDate: string;
  maxStudents: number;
  enrolledStudents: number;
}

export interface Enrollment {
  id: string;
  courseId: string;
  courseName: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  enrollmentDate: string;
  status: 'enrolled' | 'completed' | 'dropped' | 'pending';
  price: number;
  progress: number; // percentage
  notes?: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalCourses: number;
  memberSince: string;
  lastActivity?: string;
  completedCourses: number;
}

interface AppContextType {
  courses: Course[];
  enrollments: Enrollment[];
  students: Student[];
  addEnrollment: (enrollment: Omit<Enrollment, 'id'>) => void;
  updateEnrollment: (id: string, updates: Partial<Enrollment>) => void;
  cancelEnrollment: (id: string) => void;
  getStudentEnrollments: (email: string) => Enrollment[];
  getCourseById: (id: string) => Course | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [courses] = useState<Course[]>([
    {
      id: '1',
      name: 'Full Stack Web Development',
      description: 'Complete web development bootcamp covering HTML, CSS, JavaScript, React, Node.js, and databases.',
      duration: 12,
      price: 20000,
      image: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg',
      features: ['HTML5 & CSS3', 'JavaScript ES6+', 'React & Redux', 'Node.js & Express', ' SQL', 'Project Portfolio'],
      level: 'Beginner',
      instructor: 'Srikanth',
      category: 'Web Development',
      startDate: '2025-10-15',
      maxStudents: 25,
      enrolledStudents: 18
    },
    {
      id: '2',
      name: 'Deta Engineer',
      description: 'Comprehensive Python course from basics to advanced topics including data engineering and automation.',
      duration: 12,
      price: 30000,
      image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg',
      features: ['Python Fundamentals', 'Data Structures', 'Web Scraping', 'Automation Scripts', 'SQL', 'Big Data Tools', 'Real Projects', 'Databricks', 'Azure Data Factory'],
      level: 'Beginner',
      instructor: 'Venkaiah Naidu',
      category: 'Programming',
      startDate: '2025-09-01',
      maxStudents: 10,
      enrolledStudents: 7
    },
    {
      id: '3',
      name: 'Cloud Computing & DevOps',
      description: 'Learn cloud platforms, containerization, CI/CD, and modern DevOps practices for scalable applications.',
      duration: 12,
      price: 25000,
      image: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg',
      features: ['AWS/Azure/GCP', 'Docker & Kubernetes', 'CI/CD Pipelines', 'Infrastructure as Code', 'Monitoring & Logging', 'Security Best Practices'],
      level: 'Advanced',
      instructor: 'VasuDeva',
      category: 'Cloud & DevOps',
      startDate: '2025-09-15',
      maxStudents: 10,
      enrolledStudents: 3
    },
    {
      id: '4',
      name: 'Medical Coding',
      description: 'Ensure accurate healthcare billing, insurance claims, and compliance by translating medical diagnoses and procedures into standardized universal codes.',
      duration: 12,
      price: 30000,
      image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg',
      features: ['Human Anatomy and Physiology', 'ICD 10 CM Guidelines', 'IPDRG Cross Training', 'Basic/Advanced Medical coding', 'Leading a code in 3M Solventum'],
      level: 'Intermediate',
      instructor: 'Dr. Ravi Prathap',
      category: 'Medical Coding',
      startDate: '2025-09-15',
      maxStudents: 15,
      enrolledStudents: 12
    }
  ]);

  const [enrollments, setEnrollments] = useState<Enrollment[]>(() => {
    const saved = localStorage.getItem('training-enrollments');
    return saved ? JSON.parse(saved) : [];
  });

  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('training-students');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('training-enrollments', JSON.stringify(enrollments));
  }, [enrollments]);

  useEffect(() => {
    localStorage.setItem('training-students', JSON.stringify(students));
  }, [students]);

  const addEnrollment = (enrollmentData: Omit<Enrollment, 'id'>) => {
    const newEnrollment: Enrollment = {
      ...enrollmentData,
      id: Date.now().toString(),
    };

    setEnrollments(prev => [...prev, newEnrollment]);

    // Add or update student
    const existingStudent = students.find(s => s.email === enrollmentData.studentEmail);
    if (existingStudent) {
      setStudents(prev => prev.map(s => 
        s.email === enrollmentData.studentEmail
          ? { ...s, totalCourses: s.totalCourses + 1, lastActivity: enrollmentData.enrollmentDate }
          : s
      ));
    } else {
      const newStudent: Student = {
        id: Date.now().toString(),
        name: enrollmentData.studentName,
        email: enrollmentData.studentEmail,
        phone: enrollmentData.studentPhone,
        totalCourses: 1,
        memberSince: new Date().toISOString().split('T')[0],
        lastActivity: enrollmentData.enrollmentDate,
        completedCourses: 0
      };
      setStudents(prev => [...prev, newStudent]);
    }
  };

  const updateEnrollment = (id: string, updates: Partial<Enrollment>) => {
    setEnrollments(prev => prev.map(enr => 
      enr.id === id ? { ...enr, ...updates } : enr
    ));
  };

  const cancelEnrollment = (id: string) => {
    setEnrollments(prev => prev.map(enr => 
      enr.id === id ? { ...enr, status: 'dropped' } : enr
    ));
  };

  const getStudentEnrollments = (email: string) => {
    return enrollments.filter(enr => enr.studentEmail === email);
  };

  const getCourseById = (id: string) => {
    return courses.find(course => course.id === id);
  };

  return (
    <AppContext.Provider value={{
      courses,
      enrollments,
      students,
      addEnrollment,
      updateEnrollment,
      cancelEnrollment,
      getStudentEnrollments,
      getCourseById
    }}>
      {children}
    </AppContext.Provider>
  );
};
