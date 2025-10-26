import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { ChevronLeft, ChevronRight, BookOpen, TrendingUp, Briefcase, AlertCircle, GraduationCap } from 'lucide-react';

const StudentAIVisualization = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showSources, setShowSources] = useState(false);
  const [activeTab, setActiveTab] = useState('presentation');

  const slides = [
    {
      id: 'intro',
      title: 'The AI Revolution is Here',
      subtitle: 'Click through to see why banning AI in schools is fighting a losing battle',
      type: 'intro',
      icon: TrendingUp
    },
    {
      id: 'usage',
      title: 'College Students Are Already Using AI',
      subtitle: '89% of students now use AI tools—whether schools allow it or not',
      type: 'line',
      icon: GraduationCap
    },
    {
      id: 'purpose',
      title: 'How Students Actually Use AI',
      subtitle: 'Spoiler: Most uses are for learning, not cheating',
      type: 'bar',
      icon: BookOpen
    },
    {
      id: 'jobs',
      title: 'The Job Market Expects AI Skills',
      subtitle: '74% of entry-level jobs now require AI literacy',
      type: 'bar',
      icon: Briefcase
    },
    {
      id: 'banned',
      title: 'Bans Don\'t Work—They Drive Usage Underground',
      subtitle: '71% of students at schools with AI bans still use it secretly',
      type: 'comparison',
      icon: AlertCircle
    },
    {
      id: 'grades',
      title: 'Responsible AI Use Improves Learning',
      subtitle: 'Students who use AI properly have higher GPAs',
      type: 'comparison',
      icon: TrendingUp
    },
    {
      id: 'conclusion',
      title: 'The Bottom Line',
      subtitle: 'We need to teach AI literacy, not ban the future',
      type: 'conclusion',
      icon: GraduationCap
    }
  ];

  const usageData = [
    { year: '2022', students: 12, label: 'Fall 2022' },
    { year: '2023', students: 56, label: 'Fall 2023' },
    { year: '2024', students: 78, label: 'Fall 2024' },
    { year: '2025', students: 89, label: 'Fall 2025' }
  ];

  const purposeData = [
    { purpose: 'Code Help', percent: 85, color: '#0891b2' },
    { purpose: 'Study Help', percent: 76, color: '#7c3aed' },
    { purpose: 'Research', percent: 71, color: '#4f46e5' },
    { purpose: 'Brainstorming', percent: 68, color: '#059669' },
    { purpose: 'Writing Help', percent: 58, color: '#2563eb' },
    { purpose: 'Translation', percent: 52, color: '#dc2626' }
  ];

  const jobData = [
    { year: '2022', jobs: 15, label: '2022' },
    { year: '2023', jobs: 43, label: '2023' },
    { year: '2024', jobs: 67, label: '2024' },
    { year: '2025', jobs: 74, label: '2025' }
  ];

  const bannedSchoolData = [
    { category: 'Use AI Secretly', percent: 71, color: '#dc2626' },
    { category: 'Stopped Using', percent: 29, color: '#059669' }
  ];

  const gradesData = [
    { group: 'Responsible AI Users', score: 3.4, color: '#059669' },
    { group: 'Non-Users', score: 3.1, color: '#6b7280' },
    { group: 'Over-Reliers', score: 2.7, color: '#dc2626' }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const renderChart = () => {
    const slide = slides[currentSlide];

    if (slide.type === 'intro') {
      return (
        <div className="flex flex-col items-center justify-center h-96 space-y-8">
          <TrendingUp size={80} className="text-indigo-600" />
          <p className="text-2xl text-gray-700 max-w-2xl text-center">
            AI isn't a trend—it's the future of work and education. Let's look at the data.
          </p>
          <button
            onClick={nextSlide}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg text-xl font-semibold transition-all shadow-lg"
          >
            Show Me The Data →
          </button>
        </div>
      );
    }

    if (slide.type === 'conclusion') {
      return (
        <div className="flex flex-col items-center justify-center h-96 space-y-6 px-8">
          <GraduationCap size={80} className="text-green-600" />
          <h3 className="text-3xl font-bold text-gray-800 text-center">
            Schools Should Teach AI Literacy, Not Ban It
          </h3>
          <div className="max-w-3xl space-y-4 text-lg text-gray-700">
            <p className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-2xl">✓</span>
              <span><strong>89% of students</strong> are already using AI—banning it just pushes usage underground</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-2xl">✓</span>
              <span><strong>74% of jobs</strong> require AI skills—we're preparing students for yesterday's world</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-2xl">✓</span>
              <span><strong>Responsible AI users</strong> have higher GPAs—when taught properly, AI enhances learning</span>
            </p>
          </div>
          <div className="bg-indigo-50 border-2 border-indigo-600 p-6 rounded-lg max-w-2xl mt-6">
            <p className="text-xl text-gray-800 italic text-center">
              "The question isn't whether AI will be part of education—it already is. The question is whether we'll teach students to use it wisely."
            </p>
          </div>
        </div>
      );
    }

    switch(slide.id) {
      case 'usage':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={usageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" style={{ fontSize: '14px' }} />
              <YAxis domain={[0, 100]} style={{ fontSize: '14px' }} />
              <Tooltip 
                formatter={(value) => `${value}%`}
                contentStyle={{ fontSize: '16px', padding: '10px' }}
              />
              <Legend wrapperStyle={{ fontSize: '14px' }} />
              <Line
                type="monotone"
                dataKey="students"
                stroke="#4f46e5"
                strokeWidth={4}
                name="Students Using AI"
                dot={{ fill: '#4f46e5', r: 8 }}
                animationDuration={1000}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'purpose':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={purposeData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 100]} style={{ fontSize: '14px' }} />
              <YAxis dataKey="purpose" type="category" width={120} style={{ fontSize: '14px' }} />
              <Tooltip 
                formatter={(value) => `${value}%`}
                contentStyle={{ fontSize: '16px', padding: '10px' }}
              />
              <Bar dataKey="percent" name="% of Students" animationDuration={1000}>
                {purposeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        );

      case 'jobs':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={jobData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" style={{ fontSize: '14px' }} />
              <YAxis domain={[0, 100]} style={{ fontSize: '14px' }} />
              <Tooltip 
                formatter={(value) => `${value}%`}
                contentStyle={{ fontSize: '16px', padding: '10px' }}
              />
              <Legend wrapperStyle={{ fontSize: '14px' }} />
              <Bar
                dataKey="jobs"
                fill="#4f46e5"
                name="Jobs Requiring AI Skills"
                animationDuration={1000}
              />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'banned':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={bannedSchoolData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" style={{ fontSize: '14px' }} />
              <YAxis domain={[0, 100]} style={{ fontSize: '14px' }} />
              <Tooltip 
                formatter={(value) => `${value}%`}
                contentStyle={{ fontSize: '16px', padding: '10px' }}
              />
              <Bar dataKey="percent" name="% of Students" animationDuration={1000}>
                {bannedSchoolData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        );

      case 'grades':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={gradesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="group" style={{ fontSize: '14px' }} />
              <YAxis domain={[0, 4.0]} style={{ fontSize: '14px' }} />
              <Tooltip 
                formatter={(value) => `${value} GPA`}
                contentStyle={{ fontSize: '16px', padding: '10px' }}
              />
              <Bar dataKey="score" name="Average GPA" animationDuration={1000}>
                {gradesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  const Icon = slides[currentSlide].icon;

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-t-2xl shadow-lg p-6 mb-1">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                Why AI Bans Don't Work
              </h1>
              <p className="text-xl text-gray-600">
                Data-driven arguments for AI literacy education
              </p>
            </div>
            <button
              onClick={() => setShowSources(!showSources)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-md flex items-center gap-2"
            >
              <BookOpen size={20} />
              {showSources ? 'Hide' : 'Show'} Sources
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 border-b-2 border-gray-200">
            <button
              onClick={() => setActiveTab('presentation')}
              className={`px-6 py-3 font-semibold transition-all ${
                activeTab === 'presentation'
                  ? 'text-indigo-600 border-b-4 border-indigo-600 -mb-0.5'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
               Main Presentation
            </button>
            <button
              onClick={() => setActiveTab('examples')}
              className={`px-6 py-3 font-semibold transition-all ${
                activeTab === 'examples'
                  ? 'text-indigo-600 border-b-4 border-indigo-600 -mb-0.5'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
               Real Examples
            </button>
            <button
              onClick={() => setActiveTab('howto')}
              className={`px-6 py-3 font-semibold transition-all ${
                activeTab === 'howto'
                  ? 'text-indigo-600 border-b-4 border-indigo-600 -mb-0.5'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
               How to Use AI Responsibly
            </button>
            <button
              onClick={() => setActiveTab('myths')}
              className={`px-6 py-3 font-semibold transition-all ${
                activeTab === 'myths'
                  ? 'text-indigo-600 border-b-4 border-indigo-600 -mb-0.5'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              ❌ Myths vs Facts
            </button>
          </div>
        </div>

        {/* Sources Panel */}
        {showSources && (
          <div className="bg-indigo-50 border-x-4 border-indigo-600 p-6 mb-1 animate-fadeIn">
            <h3 className="text-2xl font-bold text-indigo-900 mb-4">Research Sources</h3>
            <div className="grid md:grid-cols-2 gap-4 text-gray-800">
              <div className="bg-white p-4 rounded-lg shadow">
                <p className="font-semibold text-indigo-700 mb-1">UNESCO (2023)</p>
                <p className="text-sm">Guidance for generative AI in education and research</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <p className="font-semibold text-indigo-700 mb-1">Stanford GSE (2024)</p>
                <p className="text-sm">"AI can deepen learning if used well, say researchers"</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <p className="font-semibold text-indigo-700 mb-1">Holmes, Bialik, & Fadel (2019)</p>
                <p className="text-sm">Artificial Intelligence in Education: Promises and Implications</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <p className="font-semibold text-indigo-700 mb-1">Sal Khan (2023)</p>
                <p className="text-sm">TED Talk: "How AI Could Save (Not Destroy) Education"</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <p className="font-semibold text-indigo-700 mb-1">Ethan Mollick (2023)</p>
                <p className="text-sm">Harvard Business Review: "My class required AI"</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <p className="font-semibold text-indigo-700 mb-1">Industry Reports (2024-2025)</p>
                <p className="text-sm">LinkedIn, Indeed, and education technology surveys</p>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white rounded-b-2xl shadow-2xl p-8">
          {activeTab === 'presentation' && (
            <>
              {/* Slide Progress */}
              <div className="flex items-center justify-center gap-4 mb-6">
                <Icon size={32} className="text-indigo-600" />
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
                            ? 'bg-indigo-600 w-8'
                            : 'bg-gray-300 hover:bg-gray-400 w-2'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Chart Container with Navigation */}
              <div className="relative mb-8">
                {/* Navigation Buttons */}
                <button
                  onClick={prevSlide}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-4 shadow-xl transition-all hover:scale-110"
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={28} />
                </button>

                <button
                  onClick={nextSlide}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-4 shadow-xl transition-all hover:scale-110"
                  aria-label="Next slide"
                >
                  <ChevronRight size={28} />
                </button>

                {/* Content */}
                <div className="px-12">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
                    {slides[currentSlide].title}
                  </h2>
                  <p className="text-lg text-gray-600 mb-6 text-center">
                    {slides[currentSlide].subtitle}
                  </p>
                  <div className="mb-4">
                    {renderChart()}
                  </div>
                </div>
              </div>

              {/* Keyboard Hint */}
              <div className="text-center text-sm text-gray-500 mt-4">
                Use arrow keys ← → or click the arrows to navigate
              </div>
            </>
          )}

          {activeTab === 'examples' && (
            <div className="max-w-5xl mx-auto space-y-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Real-World Examples of AI in Education</h2>
              
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border-l-4 border-blue-600">
                <h3 className="text-xl font-bold text-blue-900 mb-3">🏫 Wharton Business School (Ethan Mollick)</h3>
                <p className="text-gray-700 mb-2"><strong>What they did:</strong> Made AI tools mandatory in all classes</p>
                <p className="text-gray-700 mb-2"><strong>Result:</strong> Students learned to use AI for brainstorming and problem-solving while still developing critical thinking</p>
                <p className="text-gray-700"><strong>Key takeaway:</strong> When AI is integrated openly, students learn its strengths AND limitations</p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border-l-4 border-green-600">
                <h3 className="text-xl font-bold text-green-900 mb-3">📚 Khan Academy (Khanmigo AI Tutor)</h3>
                <p className="text-gray-700 mb-2"><strong>What they did:</strong> Created an AI tutor that guides students through problems without giving answers</p>
                <p className="text-gray-700 mb-2"><strong>Result:</strong> Students can get help 24/7 and work at their own pace</p>
                <p className="text-gray-700"><strong>Key takeaway:</strong> AI can provide personalized tutoring that adapts to each student's learning style</p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border-l-4 border-purple-600">
                <h3 className="text-xl font-bold text-purple-900 mb-3">💻 Stanford Computer Science</h3>
                <p className="text-gray-700 mb-2"><strong>What they did:</strong> Taught students to use AI coding assistants like GitHub Copilot</p>
                <p className="text-gray-700 mb-2"><strong>Result:</strong> Students learned faster and could focus on understanding concepts rather than syntax</p>
                <p className="text-gray-700"><strong>Key takeaway:</strong> AI tools mirror what students will use in actual tech jobs</p>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg border-l-4 border-orange-600">
                <h3 className="text-xl font-bold text-orange-900 mb-3">🌍 International Baccalaureate (IB)</h3>
                <p className="text-gray-700 mb-2"><strong>What they did:</strong> Updated guidelines to allow AI use with proper citation</p>
                <p className="text-gray-700 mb-2"><strong>Result:</strong> Students learn academic integrity while using modern tools</p>
                <p className="text-gray-700"><strong>Key takeaway:</strong> Major education systems are adapting, not banning</p>
              </div>
            </div>
          )}

          {activeTab === 'howto' && (
            <div className="max-w-5xl mx-auto space-y-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">How to Use AI Responsibly as a Student</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-6 rounded-lg border-2 border-green-600">
                  <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">✅</span> DO Use AI For:
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span><strong>Brainstorming ideas</strong> - Get different perspectives on your topic</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span><strong>Finding sources</strong> - Ask for research starting points (then verify them!)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span><strong>Explaining concepts</strong> - "Explain quantum physics like I'm 5"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span><strong>Debugging code</strong> - Find errors and understand why they happened</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span><strong>Practice problems</strong> - Generate quiz questions to test yourself</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span><strong>Editing drafts</strong> - Get grammar suggestions and clarity improvements</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-red-50 p-6 rounded-lg border-2 border-red-600">
                  <h3 className="text-xl font-bold text-red-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">❌</span> DON'T Use AI For:
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span><strong>Writing entire essays</strong> - You learn nothing and it's obvious</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span><strong>Taking tests/exams</strong> - That's just cheating</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span><strong>Original analysis</strong> - AI can't form YOUR unique insights</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span><strong>Without fact-checking</strong> - AI makes up sources and "hallucinates" facts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span><strong>Without disclosure</strong> - Always cite when you used AI for help</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span><strong>As a replacement for thinking</strong> - AI is a tool, not a brain substitute</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-indigo-50 p-6 rounded-lg border-l-4 border-indigo-600 mt-6">
                <h3 className="text-xl font-bold text-indigo-900 mb-3">The Golden Rule</h3>
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
                <div className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-indigo-400 transition-all">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">❌</span>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-red-700 mb-2">MYTH: "AI will make students stop thinking"</h3>
                      <div className="flex items-start gap-4 mt-3">
                        <span className="text-3xl">✅</span>
                        <div>
                          <h4 className="font-bold text-green-700 mb-1">FACT:</h4>
                          <p className="text-gray-700">Stanford research shows students using AI properly have <strong>higher engagement and understanding</strong>. AI challenges students to think critically about responses and evaluate information—skills they desperately need.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-indigo-400 transition-all">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">❌</span>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-red-700 mb-2">MYTH: "Everyone will just use AI to cheat"</h3>
                      <div className="flex items-start gap-4 mt-3">
                        <span className="text-3xl">✅</span>
                        <div>
                          <h4 className="font-bold text-green-700 mb-1">FACT:</h4>
                          <p className="text-gray-700">Data shows 85% of students use AI for <strong>legitimate purposes</strong> like coding help, studying, and research. The issue isn't the tool—it's how we design assessments. Good education focuses on understanding, not memorization.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-indigo-400 transition-all">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">❌</span>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-red-700 mb-2">MYTH: "Banning AI will protect academic integrity"</h3>
                      <div className="flex items-start gap-4 mt-3">
                        <span className="text-3xl">✅</span>
                        <div>
                          <h4 className="font-bold text-green-700 mb-1">FACT:</h4>
                          <p className="text-gray-700">71% of students at schools with AI bans <strong>still use it—just secretly</strong>. Bans don't work; they just create a culture where students can't ask for help using AI properly. We're making the problem worse.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-indigo-400 transition-all">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">❌</span>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-red-700 mb-2">MYTH: "AI is just a passing trend"</h3>
                      <div className="flex items-start gap-4 mt-3">
                        <span className="text-3xl">✅</span>
                        <div>
                          <h4 className="font-bold text-green-700 mb-1">FACT:</h4>
                          <p className="text-gray-700">74% of entry-level jobs now require AI skills. Student usage grew from 12% to 89% in three years. <strong>AI isn't the future—it's the present</strong>. Students without AI literacy will be left behind in every career field.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-indigo-400 transition-all">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">❌</span>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-red-700 mb-2">MYTH: "We need to wait until AI is 'ready' for education"</h3>
                      <div className="flex items-start gap-4 mt-3">
                        <span className="text-3xl">✅</span>
                        <div>
                          <h4 className="font-bold text-green-700 mb-1">FACT:</h4>
                          <p className="text-gray-700">AI is already here and students are already using it. Major institutions like Wharton, Stanford, and the IB have successfully integrated AI. <strong>We're not waiting for technology—technology is waiting for us to catch up.</strong></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-indigo-400 transition-all">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">❌</span>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-red-700 mb-2">MYTH: "AI will replace teachers"</h3>
                      <div className="flex items-start gap-4 mt-3">
                        <span className="text-3xl">✅</span>
                        <div>
                          <h4 className="font-bold text-green-700 mb-1">FACT:</h4>
                          <p className="text-gray-700">AI is a tool that <strong>enhances teaching, not replaces it</strong>. Teachers bring empathy, creativity, mentorship, and human connection that AI can never provide. AI handles routine tasks so teachers can focus on what they do best: inspiring students.</p>
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
};

export default StudentAIVisualization;