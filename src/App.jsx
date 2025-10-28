
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, AreaChart, Area } from 'recharts';
import { ChevronLeft, ChevronRight, BookOpen, TrendingUp, Briefcase, AlertCircle, GraduationCap, Maximize2, Minimize2, Users, Brain, Award } from 'lucide-react';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showSources, setShowSources] = useState(false);
  const [activeTab, setActiveTab] = useState('presentation');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [animateIn, setAnimateIn] = useState(true);

  const slides = [
    {
      id: 'intro',
      title: 'The AI Revolution is Here',
      subtitle: 'Click through to see why banning AI in schools is fighting a losing battle',
      type: 'intro',
      icon: TrendingUp,
      showIcon: true
    },
    {
      id: 'usage',
      title: 'College Students Are Already Using AI',
      subtitle: '89% of students now use AI tools—whether schools allow it or not',
      type: 'line',
      icon: GraduationCap,
      stat: '89%',
      statLabel: 'of students use AI',
      showIcon: false
    },
    {
      id: 'banned',
      title: 'Bans Don\'t Work—They Drive Usage Underground',
      subtitle: '71% of students at schools with AI bans still use it secretly',
      type: 'comparison',
      icon: AlertCircle,
      stat: '71%',
      statLabel: 'still use AI secretly',
      showIcon: false
    },
    {
      id: 'growth',
      title: 'AI Adoption Is Accelerating Exponentially',
      subtitle: 'Student AI usage grew 642% in just 3 years',
      type: 'growth',
      icon: TrendingUp,
      stat: '642%',
      statLabel: 'increase in AI usage (2022-2025)',
      showIcon: false
    },
    {
      id: 'purpose',
      title: 'How Students Actually Use AI',
      subtitle: 'Spoiler: Most uses are for learning, not cheating',
      type: 'bar',
      icon: BookOpen,
      stat: '85%',
      statLabel: 'use for legitimate learning',
      showIcon: false
    },
    {
      id: 'jobs',
      title: 'The Job Market Expects AI Skills',
      subtitle: '74% of entry-level jobs now require AI literacy',
      type: 'area',
      icon: Briefcase,
      stat: '74%',
      statLabel: 'of jobs require AI skills',
      showIcon: false
    },
    {
      id: 'grades',
      title: 'Responsible AI Use Improves Learning',
      subtitle: 'Students who use AI properly have higher GPAs',
      type: 'comparison',
      icon: Award,
      stat: '3.4',
      statLabel: 'GPA with responsible AI use',
      showIcon: false
    },
    {
      id: 'examples',
      title: 'Top Schools Are Already Teaching AI',
      subtitle: 'Wharton, Stanford, Khan Academy, and more',
      type: 'examples',
      icon: TrendingUp,
      showIcon: false
    },
    {
      id: 'conclusion',
      title: 'The Bottom Line',
      subtitle: 'We need to teach AI literacy, not ban the future',
      type: 'conclusion',
      icon: Brain,
      showIcon: true
    }
  ];

  const usageData = [
    { year: '2022', students: 12, label: 'Fall 2022' },
    { year: '2023', students: 56, label: 'Fall 2023' },
    { year: '2024', students: 78, label: 'Fall 2024' },
    { year: '2025', students: 89, label: 'Fall 2025' }
  ];

  const purposeData = [
    { purpose: 'Code Help', percent: 85 },
    { purpose: 'Study Help', percent: 76 },
    { purpose: 'Research', percent: 71 },
    { purpose: 'Brainstorming', percent: 68 },
    { purpose: 'Writing Help', percent: 58 },
    { purpose: 'Translation', percent: 52 }
  ];

  const jobData = [
    { year: '2022', jobs: 15, label: '2022' },
    { year: '2023', jobs: 43, label: '2023' },
    { year: '2024', jobs: 67, label: '2024' },
    { year: '2025', jobs: 74, label: '2025' }
  ];

  const bannedSchoolData = [
    { category: 'Use AI Secretly', percent: 71 },
    { category: 'Stopped Using', percent: 29 }
  ];

  const gradesData = [
    { group: 'Responsible\nAI Users', score: 3.4, label: 'Responsible AI Users' },
    { group: 'Non-Users', score: 3.1, label: 'Non-Users' },
    { group: 'Over-Reliers', score: 2.7, label: 'Over-Reliers' }
  ];

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.key === 'Escape' && isFullscreen) {
        exitFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSlide, isFullscreen]);

  useEffect(() => {
    setAnimateIn(false);
    const timer = setTimeout(() => setAnimateIn(true), 50);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  const nextSlide = () => {
    if (activeTab === 'presentation') {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }
  };

  const prevSlide = () => {
    if (activeTab === 'presentation') {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const exitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const renderChart = () => {
    const slide = slides[currentSlide];

    if (slide.type === 'intro') {
      return (
        <div className={`flex flex-col items-center justify-center h-96 space-y-8 transition-all duration-1000 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <TrendingUp size={120} className="text-gray-900 animate-pulse" strokeWidth={2.5} />
          <p className="text-3xl text-gray-700 max-w-3xl text-center font-medium">
            AI isn't a trend it's the future of work and education. Let's look at the data.
          </p>
          <button
            onClick={nextSlide}
            className="bg-gray-900 hover:bg-gray-800 text-white px-10 py-5 rounded-xl text-2xl font-bold transition-all shadow-2xl hover:scale-105"
          >
            Show Me The Data →
          </button>
        </div>
      );
    }

    if (slide.type === 'hook') {
      return (
        <div className={`flex flex-col items-center justify-center h-96 space-y-10 transition-all duration-1000 ${animateIn ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <Users size={140} className="text-gray-900" strokeWidth={2} />
          <div className="text-center space-y-6">
            <p className="text-4xl text-gray-800 font-bold">
              Who here has used AI for school?
            </p>
            <p className="text-3xl text-gray-700 font-semibold">
              Keep your hand up if you used it when you "weren't supposed to"
            </p>
            <p className="text-2xl text-gray-600 italic mt-8">
              Yeah, that's what I thought.
            </p>
          </div>
        </div>
      );
    }

    if (slide.type === 'hook') {
      return (
        <div className={`flex flex-col items-center justify-center h-96 space-y-10 transition-all duration-1000 ${animateIn ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <Users size={140} className="text-gray-900" strokeWidth={2} />
          <div className="text-center space-y-6">
            <p className="text-4xl text-gray-800 font-bold">
              Who here has used AI for school?
            </p>
            <p className="text-3xl text-gray-700 font-semibold">
              Keep your hand up if you used it when you "weren't supposed to"
            </p>
            <p className="text-2xl text-gray-600 italic mt-8">
              Yeah, that's what I thought.
            </p>
          </div>
        </div>
      );
    }

    if (slide.type === 'growth') {
      return (
        <div className={`transition-all duration-1000 ${animateIn ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <div className="text-center mb-8">
            <p className="text-2xl text-gray-600 mb-4">From 12% to 89% in just 3 years</p>
            <div className="flex justify-center items-center gap-8">
              <div className="text-center">
                <div className="text-6xl font-bold text-gray-400">12%</div>
                <div className="text-lg text-gray-500">2022</div>
              </div>
              <div className="text-5xl text-gray-900">→</div>
              <div className="text-center">
                <div className="text-6xl font-bold text-gray-900">89%</div>
                <div className="text-lg text-gray-700">2025</div>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={usageData}>
              <defs>
                <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1f2937" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#1f2937" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
              <XAxis dataKey="label" style={{ fontSize: '16px', fontWeight: 'bold' }} stroke="#374151" />
              <YAxis domain={[0, 100]} style={{ fontSize: '16px', fontWeight: 'bold' }} stroke="#374151" />
              <Tooltip 
                formatter={(value) => `${value}%`}
                contentStyle={{ fontSize: '18px', padding: '12px', fontWeight: 'bold', backgroundColor: '#fff', border: '2px solid #1f2937' }}
              />
              <Area
                type="monotone"
                dataKey="students"
                stroke="#1f2937"
                strokeWidth={4}
                fill="url(#colorGrowth)"
                name="Students Using AI"
                animationDuration={2000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      );
    }

    if (slide.type === 'examples') {
      return (
        <div className={`space-y-6 transition-all duration-1000 ${animateIn ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
          <div className="grid grid-cols-2 gap-6">
            <a 
              href="https://hbr.org/2023/09/my-class-required-ai-heres-what-ive-learned-so-far" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gray-900 p-8 rounded-2xl text-white shadow-2xl transform hover:scale-105 transition-all cursor-pointer"
            >
              <h3 className="text-3xl font-bold mb-3">Wharton</h3>
              <p className="text-xl">Made AI mandatory in all business classes</p>
              <p className="text-sm mt-3 opacity-75">Click to read more →</p>
            </a>
            <a 
              href="https://www.khanacademy.org/khan-labs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gray-800 p-8 rounded-2xl text-white shadow-2xl transform hover:scale-105 transition-all cursor-pointer"
            >
              <h3 className="text-3xl font-bold mb-3">Khan Academy</h3>
              <p className="text-xl">AI tutor helps millions of students learn</p>
              <p className="text-sm mt-3 opacity-75">Click to read more →</p>
            </a>
            <a 
              href="https://ed.stanford.edu/news/ai-can-deepen-learning-if-used-well-say-researchers" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gray-700 p-8 rounded-2xl text-white shadow-2xl transform hover:scale-105 transition-all cursor-pointer"
            >
              <h3 className="text-3xl font-bold mb-3">Stanford</h3>
              <p className="text-xl">Teaching AI coding tools in CS classes</p>
              <p className="text-sm mt-3 opacity-75">Click to read more →</p>
            </a>
            <a 
              href="https://www.ibo.org/news/news-about-the-ib/the-ib-statement-on-artificial-intelligence-in-education-and-assessment/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gray-600 p-8 rounded-2xl text-white shadow-2xl transform hover:scale-105 transition-all cursor-pointer"
            >
              <h3 className="text-3xl font-bold mb-3">IB Program</h3>
              <p className="text-xl">Updated policies to allow AI with citation</p>
              <p className="text-sm mt-3 opacity-75">Click to read more →</p>
            </a>
          </div>
        </div>
      );
    }

    if (slide.type === 'conclusion') {
      return (
        <div className={`flex flex-col items-center justify-center h-96 space-y-8 transition-all duration-1000 ${animateIn ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <Brain size={120} className="text-gray-900" strokeWidth={2.5} />
          <h3 className="text-4xl font-bold text-gray-800 text-center">
            Schools Should Teach AI Literacy, Not Ban It
          </h3>
          <div className="max-w-4xl space-y-5 text-2xl text-gray-700">
            <p className="flex items-center gap-4 transform hover:translate-x-2 transition-all">
              <span className="text-gray-900 font-bold text-4xl">✓</span>
              <span><strong>89% of students</strong> already using AI</span>
            </p>
            <p className="flex items-center gap-4 transform hover:translate-x-2 transition-all">
              <span className="text-gray-900 font-bold text-4xl">✓</span>
              <span><strong>74% of jobs</strong> require AI skills</span>
            </p>
            <p className="flex items-center gap-4 transform hover:translate-x-2 transition-all">
              <span className="text-gray-900 font-bold text-4xl">✓</span>
              <span><strong>Higher GPAs</strong> with responsible use</span>
            </p>
          </div>
          <div className="bg-gray-900 text-white p-8 rounded-2xl max-w-4xl mt-8 shadow-2xl">
            <p className="text-2xl italic text-center font-medium">
              "The question isn't whether AI will be part of education it already is. The question is whether we'll teach students to use it wisely."
            </p>
          </div>
        </div>
      );
    }

    switch(slide.id) {
      case 'usage':
        return (
          <div className={`transition-all duration-1000 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <ResponsiveContainer width="100%" height={450}>
              <AreaChart data={usageData}>
                <defs>
                  <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1f2937" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#1f2937" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
                <XAxis dataKey="label" style={{ fontSize: '18px', fontWeight: 'bold' }} stroke="#374151" />
                <YAxis domain={[0, 100]} style={{ fontSize: '18px', fontWeight: 'bold' }} stroke="#374151" />
                <Tooltip 
                  formatter={(value) => `${value}%`}
                  contentStyle={{ fontSize: '20px', padding: '15px', fontWeight: 'bold', backgroundColor: '#fff', border: '2px solid #1f2937' }}
                />
                <Area
                  type="monotone"
                  dataKey="students"
                  stroke="#1f2937"
                  strokeWidth={5}
                  fill="url(#colorStudents)"
                  name="Students Using AI"
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        );

      case 'purpose':
        return (
          <div className={`transition-all duration-1000 ${animateIn ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <ResponsiveContainer width="100%" height={450}>
              <BarChart data={purposeData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
                <XAxis type="number" domain={[0, 100]} style={{ fontSize: '18px', fontWeight: 'bold' }} stroke="#374151" />
                <YAxis dataKey="purpose" type="category" width={140} style={{ fontSize: '18px', fontWeight: 'bold' }} stroke="#374151" />
                <Tooltip 
                  formatter={(value) => `${value}%`}
                  contentStyle={{ fontSize: '20px', padding: '15px', fontWeight: 'bold', backgroundColor: '#fff', border: '2px solid #1f2937' }}
                />
                <Bar dataKey="percent" name="% of Students" animationDuration={1500} fill="#1f2937" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );

      case 'jobs':
        return (
          <div className={`transition-all duration-1000 ${animateIn ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <ResponsiveContainer width="100%" height={450}>
              <AreaChart data={jobData}>
                <defs>
                  <linearGradient id="colorJobs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#374151" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#374151" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
                <XAxis dataKey="label" style={{ fontSize: '18px', fontWeight: 'bold' }} stroke="#374151" />
                <YAxis domain={[0, 100]} style={{ fontSize: '18px', fontWeight: 'bold' }} stroke="#374151" />
                <Tooltip 
                  formatter={(value) => `${value}%`}
                  contentStyle={{ fontSize: '20px', padding: '15px', fontWeight: 'bold', backgroundColor: '#fff', border: '2px solid #1f2937' }}
                />
                <Area
                  type="monotone"
                  dataKey="jobs"
                  stroke="#374151"
                  strokeWidth={5}
                  fill="url(#colorJobs)"
                  name="Jobs Requiring AI"
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        );

      case 'banned':
        return (
          <div className={`transition-all duration-1000 ${animateIn ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            <ResponsiveContainer width="100%" height={450}>
              <BarChart data={bannedSchoolData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
                <XAxis dataKey="category" style={{ fontSize: '18px', fontWeight: 'bold' }} stroke="#374151" />
                <YAxis domain={[0, 100]} style={{ fontSize: '18px', fontWeight: 'bold' }} stroke="#374151" />
                <Tooltip 
                  formatter={(value) => `${value}%`}
                  contentStyle={{ fontSize: '20px', padding: '15px', fontWeight: 'bold', backgroundColor: '#fff', border: '2px solid #1f2937' }}
                />
                <Bar dataKey="percent" name="% of Students" animationDuration={1500}>
                  {bannedSchoolData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#1f2937' : '#9ca3af'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        );

      case 'grades':
        return (
          <div className={`transition-all duration-1000 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <ResponsiveContainer width="100%" height={450}>
              <BarChart data={gradesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
                <XAxis dataKey="label" style={{ fontSize: '18px', fontWeight: 'bold' }} angle={-15} textAnchor="end" height={80} stroke="#374151" />
                <YAxis domain={[0, 4.0]} style={{ fontSize: '18px', fontWeight: 'bold' }} stroke="#374151" />
                <Tooltip 
                  formatter={(value) => `${value} GPA`}
                  contentStyle={{ fontSize: '20px', padding: '15px', fontWeight: 'bold', backgroundColor: '#fff', border: '2px solid #1f2937' }}
                />
                <Bar dataKey="score" name="Average GPA" animationDuration={1500}>
                  {gradesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#1f2937' : index === 1 ? '#6b7280' : '#d1d5db'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        );

      default:
        return null;
    }
  };

  const Icon = slides[currentSlide].icon;

  return (
    <div className={`w-full min-h-screen bg-white ${isFullscreen ? 'p-0' : 'p-4'}`}>
      <div className="max-w-7xl mx-auto h-full">
        {(!isFullscreen || activeTab !== 'presentation') && (
          <div className="bg-gray-50 rounded-t-2xl shadow-lg p-6 mb-1 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  Why AI Bans Don't Work
                </h1>
                <p className="text-xl text-gray-700">
                  Data-driven arguments for AI literacy education
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowSources(!showSources)}
                  className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-md flex items-center gap-2"
                >
                  <BookOpen size={20} />
                  {showSources ? 'Hide' : 'Show'} Sources
                </button>
                {activeTab === 'presentation' && (
                  <button
                    onClick={toggleFullscreen}
                    className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-md flex items-center gap-2"
                  >
                    {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                    {isFullscreen ? 'Exit' : 'Fullscreen'}
                  </button>
                )}
              </div>
            </div>

            <div className="flex gap-2 border-b-2 border-gray-300">
              <button
                onClick={() => setActiveTab('presentation')}
                className={`px-6 py-3 font-semibold transition-all ${
                  activeTab === 'presentation'
                    ? 'text-gray-900 border-b-4 border-gray-900 -mb-0.5'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                 Main Presentation
              </button>
              <button
                onClick={() => setActiveTab('examples')}
                className={`px-6 py-3 font-semibold transition-all ${
                  activeTab === 'examples'
                    ? 'text-gray-900 border-b-4 border-gray-900 -mb-0.5'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                 Real Examples
              </button>
              <button
                onClick={() => setActiveTab('howto')}
                className={`px-6 py-3 font-semibold transition-all ${
                  activeTab === 'howto'
                    ? 'text-gray-900 border-b-4 border-gray-900 -mb-0.5'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                 How to Use AI Responsibly
              </button>
              <button
                onClick={() => setActiveTab('myths')}
                className={`px-6 py-3 font-semibold transition-all ${
                  activeTab === 'myths'
                    ? 'text-gray-900 border-b-4 border-gray-900 -mb-0.5'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                 Myths vs Facts
              </button>
            </div>
          </div>
        )}

        {showSources && !isFullscreen && (
          <div className="bg-gray-100 border-x-4 border-gray-900 p-6 mb-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Research Sources</h3>
            <div className="grid md:grid-cols-2 gap-4 text-gray-800">
              <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                <p className="font-semibold text-gray-900 mb-1">UNESCO (2023)</p>
                <p className="text-sm">Guidance for generative AI in education and research</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                <p className="font-semibold text-gray-900 mb-1">Stanford GSE (2024)</p>
                <p className="text-sm">"AI can deepen learning if used well, say researchers"</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                <p className="font-semibold text-gray-900 mb-1">Holmes, Bialik, & Fadel (2019)</p>
                <p className="text-sm">Artificial Intelligence in Education: Promises and Implications</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                <p className="font-semibold text-gray-900 mb-1">Sal Khan (2023)</p>
                <p className="text-sm">TED Talk: "How AI Could Save (Not Destroy) Education"</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                <p className="font-semibold text-gray-900 mb-1">Ethan Mollick (2023)</p>
                <p className="text-sm">Harvard Business Review: "My class required AI"</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                <p className="font-semibold text-gray-900 mb-1">Industry Reports (2024-2025)</p>
                <p className="text-sm">LinkedIn, Indeed, and education technology surveys</p>
              </div>
            </div>
          </div>
        )}

        <div className={`bg-white shadow-2xl ${isFullscreen && activeTab === 'presentation' ? 'h-screen flex flex-col justify-center' : 'rounded-b-2xl p-8'}`}>
          {activeTab === 'presentation' && (
            <div className={isFullscreen ? 'px-16 py-8' : ''}>
              {slides[currentSlide].stat && (
                <div className={`text-center mb-8 transition-all duration-1000 ${animateIn ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                  <div className="text-9xl font-black text-gray-900 mb-4">
                    {slides[currentSlide].stat}
                  </div>
                  <div className="text-3xl font-bold text-gray-700">
                    {slides[currentSlide].statLabel}
                  </div>
                </div>
              )}

              {!isFullscreen && (
                <div className="flex items-center justify-center gap-4 mb-6">
                  <Icon size={32} className="text-gray-900" />
                  <div className="text-center">
                    <div className="text-sm text-gray-500 mb-1">
                      Slide {currentSlide + 1} of {slides.length}
                    </div>
                    <div className="flex gap-1">
                      {slides.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentSlide(index)}
                          className={`h-2 rounded-full transition-all ${
                            currentSlide === index
                              ? 'bg-gray-900 w-8'
                              : 'bg-gray-300 hover:bg-gray-400 w-2'
                          }`}
                          aria-label={`Go to slide ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="relative mb-8">
                <button
                  onClick={prevSlide}
                  className={`absolute left-0 top-1/2 -translate-y-1/2 ${isFullscreen ? '-translate-x-8' : '-translate-x-6'} z-10 bg-gray-900 hover:bg-gray-800 text-white rounded-full ${isFullscreen ? 'p-6' : 'p-4'} shadow-2xl transition-all hover:scale-110`}
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={isFullscreen ? 40 : 28} />
                </button>

                <button
                  onClick={nextSlide}
                  className={`absolute right-0 top-1/2 -translate-y-1/2 ${isFullscreen ? 'translate-x-8' : 'translate-x-6'} z-10 bg-gray-900 hover:bg-gray-800 text-white rounded-full ${isFullscreen ? 'p-6' : 'p-4'} shadow-2xl transition-all hover:scale-110`}
                  aria-label="Next slide"
                >
                  <ChevronRight size={isFullscreen ? 40 : 28} />
                </button>

                <div className={isFullscreen ? 'px-20' : 'px-12'}>
                  <h2 className={`font-bold text-gray-800 mb-2 text-center ${isFullscreen ? 'text-5xl' : 'text-3xl'}`}>
                    {slides[currentSlide].title}
                  </h2>
                  <p className={`text-gray-600 mb-6 text-center ${isFullscreen ? 'text-2xl' : 'text-lg'}`}>
                    {slides[currentSlide].subtitle}
                  </p>
                  <div className="mb-4">
                    {renderChart()}
                  </div>
                </div>
              </div>

              {!isFullscreen && (
                <div className="text-center text-sm text-gray-500 mt-4">
                  Use arrow keys ← → or clicker/spacebar to navigate • Press F for fullscreen • Press Esc to exit
                </div>
              )}

              {isFullscreen && (
                <div className="fixed bottom-8 right-8 bg-black bg-opacity-50 text-white px-6 py-3 rounded-full text-xl font-bold">
                  {currentSlide + 1} / {slides.length}
                </div>
              )}
            </div>
          )}

          {activeTab === 'examples' && (
            <div className="max-w-5xl mx-auto space-y-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Real World Examples of AI in Education</h2>
              
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-gray-900">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Wharton Business School (Ethan Mollick)</h3>
                <p className="text-gray-700 mb-2"><strong>What they did:</strong> Made AI tools mandatory in all classes</p>
                <p className="text-gray-700 mb-2"><strong>Result:</strong> Students learned to use AI for brainstorming and problem-solving while still developing critical thinking</p>
                <p className="text-gray-700 mb-3"><strong>Key takeaway:</strong> When AI is integrated openly, students learn its strengths AND limitations</p>
                <a 
                  href="https://hbr.org/2023/09/my-class-required-ai-heres-what-ive-learned-so-far" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-900 font-semibold hover:underline"
                >
                  Read the full article →
                </a>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-gray-800">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Khan Academy (Khanmigo AI Tutor)</h3>
                <p className="text-gray-700 mb-2"><strong>What they did:</strong> Created an AI tutor that guides students through problems without giving answers</p>
                <p className="text-gray-700 mb-2"><strong>Result:</strong> Students can get help 24/7 and work at their own pace</p>
                <p className="text-gray-700 mb-3"><strong>Key takeaway:</strong> AI can provide personalized tutoring that adapts to each student's learning style</p>
                <a 
                  href="https://www.khanacademy.org/khan-labs" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-900 font-semibold hover:underline"
                >
                  Try Khanmigo →
                </a>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Stanford Computer Science</h3>
                <p className="text-gray-700 mb-2"><strong>What they did:</strong> Taught students to use AI coding assistants like GitHub Copilot</p>
                <p className="text-gray-700 mb-2"><strong>Result:</strong> Students learned faster and could focus on understanding concepts rather than syntax</p>
                <p className="text-gray-700 mb-3"><strong>Key takeaway:</strong> AI tools mirror what students will use in actual tech jobs</p>
                <a 
                  href="https://ed.stanford.edu/news/ai-can-deepen-learning-if-used-well-say-researchers" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-900 font-semibold hover:underline"
                >
                  Read Stanford's research →
                </a>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-gray-600">
                <h3 className="text-xl font-bold text-gray-900 mb-3">International Baccalaureate (IB)</h3>
                <p className="text-gray-700 mb-2"><strong>What they did:</strong> Updated guidelines to allow AI use with proper citation</p>
                <p className="text-gray-700 mb-2"><strong>Result:</strong> Students learn academic integrity while using modern tools</p>
                <p className="text-gray-700 mb-3"><strong>Key takeaway:</strong> Major education systems are adapting, not banning</p>
                <a 
                  href="https://www.ibo.org/news/news-about-the-ib/the-ib-statement-on-artificial-intelligence-in-education-and-assessment/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-900 font-semibold hover:underline"
                >
                  Read IB's policy →
                </a>
              </div>
            </div>
          )}

          {activeTab === 'howto' && (
            <div className="max-w-5xl mx-auto space-y-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">How to Use AI Responsibly as a Student</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-900">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">✅</span> DO Use AI For:
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-gray-900 font-bold">•</span>
                      <span><strong>Brainstorming ideas</strong> - Get different perspectives on your topic</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-900 font-bold">•</span>
                      <span><strong>Finding sources</strong> - Ask for research starting points (then verify them!)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-900 font-bold">•</span>
                      <span><strong>Explaining concepts</strong> - "Explain quantum physics like I'm 5"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-900 font-bold">•</span>
                      <span><strong>Debugging code</strong> - Find errors and understand why they happened</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-900 font-bold">•</span>
                      <span><strong>Practice problems</strong> - Generate quiz questions to test yourself</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-900 font-bold">•</span>
                      <span><strong>Editing drafts</strong> - Get grammar suggestions and clarity improvements</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-900">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">❌</span> DON'T Use AI For:
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-gray-900 font-bold">•</span>
                      <span><strong>Writing entire essays</strong> - You learn nothing and it's obvious</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-900 font-bold">•</span>
                      <span><strong>Taking tests/exams</strong> - That's just cheating</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-900 font-bold">•</span>
                      <span><strong>Original analysis</strong> - AI can't form YOUR unique insights</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-900 font-bold">•</span>
                      <span><strong>Without fact-checking</strong> - AI makes up sources and "hallucinates" facts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-900 font-bold">•</span>
                      <span><strong>Without disclosure</strong> - Always cite when you used AI for help</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-900 font-bold">•</span>
                      <span><strong>As a replacement for thinking</strong> - AI is a tool, not a brain substitute</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-gray-900 mt-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">The Golden Rule</h3>
                <p className="text-lg text-gray-700">
                  <strong>Use AI to enhance your learning, not replace it.</strong> If you can't explain what the AI gave you in your own words, you didn't actually learn it. AI should make you smarter, not lazier.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'myths' && (
            <div className="max-w-5xl mx-auto space-y-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">AI in Education: Myths vs Facts</h2>
              
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-gray-900 transition-all">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">❌</span>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">MYTH: "AI will make students stop thinking"</h3>
                      <div className="flex items-start gap-4 mt-3">
                        <span className="text-3xl">✅</span>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">FACT:</h4>
                          <p className="text-gray-700">Stanford research shows students using AI properly have <strong>higher engagement and understanding</strong>. AI challenges students to think critically about responses and evaluate information—skills they desperately need.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-gray-900 transition-all">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">❌</span>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">MYTH: "Everyone will just use AI to cheat"</h3>
                      <div className="flex items-start gap-4 mt-3">
                        <span className="text-3xl">✅</span>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">FACT:</h4>
                          <p className="text-gray-700">Data shows 85% of students use AI for <strong>legitimate purposes</strong> like coding help, studying, and research. The issue isn't the tool—it's how we design assessments.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-gray-900 transition-all">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">❌</span>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">MYTH: "Banning AI will protect academic integrity"</h3>
                      <div className="flex items-start gap-4 mt-3">
                        <span className="text-3xl">✅</span>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">FACT:</h4>
                          <p className="text-gray-700">71% of students at schools with AI bans <strong>still use it—just secretly</strong>. Bans don't work; they just create a culture where students can't ask for help using AI properly.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-gray-900 transition-all">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">❌</span>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">MYTH: "AI is just a passing trend"</h3>
                      <div className="flex items-start gap-4 mt-3">
                        <span className="text-3xl">✅</span>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">FACT:</h4>
                          <p className="text-gray-700">74% of entry-level jobs now require AI skills. Student usage grew from 12% to 89% in three years. <strong>AI isn't the future it's the present</strong>.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-gray-900 transition-all">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">❌</span>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">MYTH: "We need to wait until AI is 'ready' for education"</h3>
                      <div className="flex items-start gap-4 mt-3">
                        <span className="text-3xl">✅</span>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">FACT:</h4>
                          <p className="text-gray-700">AI is already here and students are already using it. Major institutions like Wharton, Stanford, and the IB have successfully integrated AI.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-gray-900 transition-all">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">❌</span>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">MYTH: "AI will replace teachers"</h3>
                      <div className="flex items-start gap-4 mt-3">
                        <span className="text-3xl">✅</span>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">FACT:</h4>
                          <p className="text-gray-700">AI is a tool that <strong>enhances teaching, not replaces it</strong>. Teachers bring empathy, creativity, mentorship, and human connection that AI can never provide.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;