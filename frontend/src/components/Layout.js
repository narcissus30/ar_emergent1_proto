import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { 
  Building2, 
  Settings, 
  LogOut, 
  Workflow, 
  Brain, 
  Users, 
  GraduationCap,
  BarChart3
} from 'lucide-react';

const Layout = ({ children, universityData, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    {
      path: '/workflow-builder',
      label: 'Workflow Builder',
      icon: Workflow,
      description: 'Configure admission process'
    },
    {
      path: '/ai-review',
      label: 'AI Review',
      icon: Brain,
      description: 'Initiate AI analysis'
    },
    {
      path: '/application-distribution',
      label: 'Application Distribution',
      icon: Users,
      description: 'Review application buckets'
    },
    {
      path: '/scholarship-management',
      label: 'Scholarship Management',
      icon: GraduationCap,
      description: 'Manage scholarship allocation'
    },
    {
      path: '/analytics-dashboard',
      label: 'Analytics Dashboard',
      icon: BarChart3,
      description: 'View performance insights'
    }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  AdmissionAI Pro
                </h1>
                <p className="text-sm text-gray-500">
                  {universityData?.universityName || 'University Portal'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button variant="ghost" size="sm" onClick={onLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6">
          <nav className="flex space-x-8">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    isActive(item.path)
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="bg-blue-50 border-b border-blue-100">
        <div className="px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              {navigationItems.map((item, index) => {
                const Icon = item.icon;
                const isCompleted = navigationItems.findIndex(nav => nav.path === location.pathname) > index;
                const isCurrent = isActive(item.path);
                
                return (
                  <div key={item.path} className="flex items-center">
                    <div className={`flex items-center space-x-2 ${
                      isCurrent ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-400'
                    }`}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                        isCurrent 
                          ? 'bg-blue-600 text-white' 
                          : isCompleted 
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-200 text-gray-600'
                      }`}>
                        {isCompleted ? '✓' : index + 1}
                      </div>
                      <span className="text-xs font-medium hidden sm:block">
                        {item.label}
                      </span>
                    </div>
                    {index < navigationItems.length - 1 && (
                      <div className="w-8 h-px bg-gray-300 mx-4 hidden sm:block" />
                    )}
                  </div>
                );
              })}
            </div>
            
            <div className="text-xs text-gray-500">
              Step {navigationItems.findIndex(item => isActive(item.path)) + 1} of {navigationItems.length}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {children}
        </div>
      </main>

      {/* AI Assistant Panel (Fixed) */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="lg"
          className="rounded-full w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
        >
          <Brain className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
};

export default Layout;