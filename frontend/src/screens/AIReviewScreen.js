import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { 
  Brain, 
  FileText, 
  Users, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  TrendingUp,
  Activity,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';

const AIReviewScreen = () => {
  const navigate = useNavigate();
  const [analysisStatus, setAnalysisStatus] = useState('pending'); // pending, running, completed
  const [progress, setProgress] = useState(0);
  const [currentTask, setCurrentTask] = useState('');
  const [analysisResults, setAnalysisResults] = useState(null);

  // Mock analysis data
  const mockResults = {
    totalApplications: 1247,
    processed: 1247,
    shortlisted: 312,
    underReview: 189,
    rejected: 746,
    processingTime: '2m 34s',
    avgScore: 7.2,
    qualityDistribution: {
      excellent: 125,
      good: 187,
      average: 298,
      poor: 637
    }
  };

  const analysisSteps = [
    'Loading applications from database...',
    'Analyzing documents with AI...',
    'Evaluating GPA and test scores...',
    'Checking application completeness...',
    'Applying admission criteria rules...',
    'Generating recommendations...',
    'Finalizing results...'
  ];

  useEffect(() => {
    let interval;
    if (analysisStatus === 'running') {
      interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + (100 / analysisSteps.length / 10);
          const stepIndex = Math.floor(newProgress / (100 / analysisSteps.length));
          
          if (stepIndex < analysisSteps.length) {
            setCurrentTask(analysisSteps[stepIndex]);
          }
          
          if (newProgress >= 100) {
            setAnalysisStatus('completed');
            setAnalysisResults(mockResults);
            clearInterval(interval);
            return 100;
          }
          return newProgress;
        });
      }, 200);
    }
    return () => clearInterval(interval);
  }, [analysisStatus]);

  const startAnalysis = () => {
    setAnalysisStatus('running');
    setProgress(0);
    setCurrentTask(analysisSteps[0]);
  };

  const resetAnalysis = () => {
    setAnalysisStatus('pending');
    setProgress(0);
    setCurrentTask('');
    setAnalysisResults(null);
  };

  const viewResults = () => {
    navigate('/application-distribution');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">AI Review Initiation</h1>
        <p className="text-gray-600">
          Let AI analyze and categorize all applications based on your admission criteria
        </p>
      </div>

      {/* Analysis Control Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Status Card */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Analysis Status</h3>
            <div className={`w-3 h-3 rounded-full ${
              analysisStatus === 'pending' ? 'bg-gray-400' :
              analysisStatus === 'running' ? 'bg-blue-500 animate-pulse' :
              'bg-green-500'
            }`} />
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            
            {currentTask && (
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Activity className="w-4 h-4 animate-pulse" />
                <span>{currentTask}</span>
              </div>
            )}
            
            <div className="flex space-x-2">
              {analysisStatus === 'pending' && (
                <Button onClick={startAnalysis} className="flex-1">
                  <Play className="w-4 h-4 mr-2" />
                  Start Analysis
                </Button>
              )}
              
              {analysisStatus === 'running' && (
                <Button variant="outline" className="flex-1" disabled>
                  <Pause className="w-4 h-4 mr-2" />
                  Running...
                </Button>
              )}
              
              {analysisStatus === 'completed' && (
                <>
                  <Button onClick={viewResults} className="flex-1">
                    View Results
                  </Button>
                  <Button onClick={resetAnalysis} variant="outline" size="sm">
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </Card>

        {/* System Info */}
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Brain className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold">AI Engine</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Model Version</span>
              <Badge variant="secondary">AdmissionAI v2.1</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Accuracy Rate</span>
              <span className="text-sm font-medium">94.7%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Processing Speed</span>
              <span className="text-sm font-medium">~500 apps/min</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Languages Supported</span>
              <span className="text-sm font-medium">15+</span>
            </div>
          </div>
        </Card>

        {/* Quick Stats */}
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Users className="w-6 h-6 text-green-600" />
            <h3 className="text-lg font-semibold">Application Overview</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Applications</span>
              <span className="text-sm font-medium">1,247</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Complete Applications</span>
              <span className="text-sm font-medium">1,089</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Incomplete</span>
              <span className="text-sm font-medium">158</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Avg. Completion Time</span>
              <span className="text-sm font-medium">5.2 days</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Analysis Process Visualization */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-6">AI Analysis Process</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Document Analysis',
              description: 'AI reviews SOP, recommendations, and resumes for quality and relevance',
              icon: FileText,
              color: 'blue'
            },
            {
              title: 'Criteria Matching',
              description: 'Evaluates candidates against GPA, experience, and custom requirements',
              icon: CheckCircle,
              color: 'green'
            },
            {
              title: 'Risk Assessment',
              description: 'Identifies potential issues like incomplete documents or inconsistencies',
              icon: AlertTriangle,
              color: 'orange'
            },
            {
              title: 'Score Generation',
              description: 'Generates comprehensive scores and recommendations for each application',
              icon: TrendingUp,
              color: 'purple'
            }
          ].map((step, index) => {
            const Icon = step.icon;
            const isActive = analysisStatus === 'running' && progress > (index * 25);
            const isCompleted = analysisStatus === 'completed' || progress > ((index + 1) * 25);
            
            return (
              <div key={index} className={`p-4 rounded-lg border-2 transition-all ${
                isCompleted 
                  ? `border-${step.color}-500 bg-${step.color}-50` 
                  : isActive 
                    ? `border-${step.color}-300 bg-${step.color}-25` 
                    : 'border-gray-200 bg-gray-50'
              }`}>
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isCompleted 
                      ? `bg-${step.color}-100` 
                      : isActive 
                        ? `bg-${step.color}-100` 
                        : 'bg-gray-100'
                  }`}>
                    <Icon className={`w-4 h-4 ${
                      isCompleted 
                        ? `text-${step.color}-600` 
                        : isActive 
                          ? `text-${step.color}-600` 
                          : 'text-gray-600'
                    }`} />
                  </div>
                  <h4 className="font-medium text-sm">{step.title}</h4>
                </div>
                <p className="text-xs text-gray-600">{step.description}</p>
                
                {isActive && (
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div className={`bg-${step.color}-500 h-1 rounded-full animate-pulse`} style={{width: '60%'}} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Results Preview */}
      {analysisResults && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Analysis Results</h3>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <CheckCircle className="w-3 h-3 mr-1" />
              Completed
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{analysisResults.shortlisted}</div>
              <div className="text-sm text-gray-600">Shortlisted</div>
              <div className="text-xs text-gray-500">
                {((analysisResults.shortlisted / analysisResults.totalApplications) * 100).toFixed(1)}%
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{analysisResults.underReview}</div>
              <div className="text-sm text-gray-600">Under Review</div>
              <div className="text-xs text-gray-500">
                {((analysisResults.underReview / analysisResults.totalApplications) * 100).toFixed(1)}%
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{analysisResults.rejected}</div>
              <div className="text-sm text-gray-600">Rejected</div>
              <div className="text-xs text-gray-500">
                {((analysisResults.rejected / analysisResults.totalApplications) * 100).toFixed(1)}%
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{analysisResults.avgScore}/10</div>
              <div className="text-sm text-gray-600">Avg Score</div>
              <div className="text-xs text-gray-500">Quality Rating</div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Analysis completed in <span className="font-medium">{analysisResults.processingTime}</span>
            </div>
            <Button onClick={viewResults} size="sm">
              View Detailed Results
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default AIReviewScreen;