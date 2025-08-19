import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  DollarSign,
  Users,
  Award,
  Download,
  Target,
  Zap,
  CheckCircle,
  ArrowUp,
  ArrowDown,
  Calendar,
  Globe,
  Star,
  Lightbulb
} from 'lucide-react';

const AnalyticsDashboard = () => {
  const [timeFrame, setTimeFrame] = useState('monthly');

  const exportToCSV = (data, filename) => {
    const csvContent = [
      Object.keys(data[0]).join(','),
      ...data.map(row => Object.values(row).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const exportAnalytics = () => {
    const analyticsData = [
      { metric: 'Lead to Application Rate', value: '38.8%', change: '+2.3%', period: 'vs last month' },
      { metric: 'Application to Admit Rate', value: '29.7%', change: '-1.1%', period: 'vs last month' },
      { metric: 'Admit to Enroll Rate', value: '75.8%', change: '+4.2%', period: 'vs last month' },
      { metric: 'Average Processing Time', value: '12.5 days', change: '-0.8 days', period: 'vs last month' },
      { metric: 'Time Savings', value: '67%', change: '+12%', period: 'vs manual process' },
      { metric: 'Cost Reduction', value: '$150K', change: '+$25K', period: 'annual savings' },
      { metric: 'Staff Productivity', value: '3.2x', change: '+0.5x', period: 'vs previous year' },
      { metric: 'Application Quality Score', value: '8.7/10', change: '+1.2', period: 'vs baseline' },
      { metric: 'University Reputation Score', value: '94%', change: '+8%', period: 'vs last year' },
      { metric: 'International Student Growth', value: '45%', change: '+15%', period: 'vs last year' }
    ];
    exportToCSV(analyticsData, 'analytics-dashboard');
  };

  const conversionMetrics = [
    {
      title: 'Lead to Application',
      value: '38.8%',
      change: '+2.3%',
      trending: 'up',
      description: 'Leads converting to applications'
    },
    {
      title: 'Application to Admit',
      value: '29.7%',
      change: '-1.1%',
      trending: 'down',
      description: 'Applications receiving admission offers'
    },
    {
      title: 'Admit to Enroll',
      value: '75.8%',
      change: '+4.2%',
      trending: 'up',
      description: 'Admitted students enrolling'
    },
    {
      title: 'Avg Processing Time',
      value: '12.5 days',
      change: '-0.8 days',
      trending: 'up',
      description: 'Average application processing time'
    }
  ];

  const qualitativeMetrics = [
    {
      icon: Clock,
      title: 'Time Savings',
      value: '67%',
      subtitle: 'Faster processing',
      description: 'Reduction in manual processing time through AI automation',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      change: '+12% vs manual process'
    },
    {
      icon: DollarSign,
      title: 'Cost Reduction',
      value: '$150K',
      subtitle: 'Annual savings',
      description: 'Total operational cost savings from automation',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      change: '+$25K vs projected'
    },
    {
      icon: Zap,
      title: 'Staff Productivity',
      value: '3.2x',
      subtitle: 'Efficiency boost',
      description: 'Staff productivity improvement with AI assistance',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      change: '+0.5x vs previous year'
    },
    {
      icon: Award,
      title: 'Application Quality',
      value: '8.7/10',
      subtitle: 'Quality score',
      description: 'AI-assessed application completeness and quality',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      change: '+1.2 vs baseline'
    },
    {
      icon: Star,
      title: 'University Reputation',
      value: '94%',
      subtitle: 'Reputation score',
      description: 'Enhanced university reputation through efficient admissions',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
      change: '+8% vs last year'
    },
    {
      icon: Globe,
      title: 'International Growth',
      value: '45%',
      subtitle: 'International students',
      description: 'Growth in international student applications and admissions',
      color: 'text-teal-600',
      bgColor: 'bg-teal-100',
      change: '+15% vs last year'
    }
  ];

  const admissionFunnel = [
    { stage: 'Leads', count: 1250, percentage: 100, color: 'bg-blue-500' },
    { stage: 'Applications Started', count: 485, percentage: 38.8, color: 'bg-purple-500' },
    { stage: 'Applications Completed', count: 320, percentage: 66.0, color: 'bg-indigo-500' },
    { stage: 'Reviewed', count: 280, percentage: 87.5, color: 'bg-pink-500' },
    { stage: 'Admitted', count: 95, percentage: 33.9, color: 'bg-green-500' },
    { stage: 'Enrolled', count: 72, percentage: 75.8, color: 'bg-emerald-500' }
  ];

  const programPerformance = [
    {
      name: 'Full-Time MBA',
      applications: 98,
      admitted: 25,
      enrolled: 19,
      conversionRate: '25.5%',
      quality: 'High'
    },
    {
      name: 'MS in Cybersecurity',
      applications: 145,
      admitted: 38,
      enrolled: 31,
      conversionRate: '26.2%',
      quality: 'High'
    }
  ];

  const insights = [
    {
      type: 'success',
      icon: TrendingUp,
      title: 'Strong Performance',
      message: 'Enrollment rates increased by 15% this quarter with AI-powered matching',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-800'
    },
    {
      type: 'opportunity',
      icon: Lightbulb,
      title: 'Optimization Opportunity',
      message: 'University fair leads show 2x higher conversion - consider expanding presence',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-800'
    },
    {
      type: 'prediction',
      icon: Target,
      title: 'Future Projection',
      message: 'Spring 2026 enrollment projected at 89 students based on current trends',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-800'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Analytics & Performance Dashboard</h1>
          <p className="text-gray-600">
            Comprehensive insights into your AI-powered admission process efficiency and impact
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={timeFrame}
            onChange={(e) => setTimeFrame(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
          <Button 
            variant="outline" 
            size="sm"
            onClick={exportAnalytics}
          >
            <Download className="w-4 h-4 mr-2" />
            Export Analytics
          </Button>
        </div>
      </div>

      {/* Conversion Funnel Metrics */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Admission Funnel & Conversion Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {conversionMetrics.map((metric, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
              <div className="text-sm text-gray-600 mb-2">{metric.title}</div>
              <div className={`text-sm flex items-center justify-center space-x-1 ${
                metric.trending === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.trending === 'up' ? 
                  <ArrowUp className="w-3 h-3" /> : 
                  <ArrowDown className="w-3 h-3" />
                }
                <span>{metric.change}</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">{metric.description}</div>
            </div>
          ))}
        </div>

        {/* Funnel Visualization */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Admission Funnel</h3>
          <div className="space-y-3">
            {admissionFunnel.map((stage, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-32 text-sm font-medium text-gray-700">{stage.stage}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                  <div 
                    className={`${stage.color} h-6 rounded-full flex items-center justify-center text-white text-sm font-medium`}
                    style={{ width: `${Math.max(stage.percentage, 15)}%` }}
                  >
                    {stage.count}
                  </div>
                </div>
                <div className="w-16 text-sm text-gray-600 text-right">{stage.percentage}%</div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Qualitative Value Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {qualitativeMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg ${metric.bgColor} flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${metric.color}`} />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                  <div className="text-sm text-gray-600">{metric.subtitle}</div>
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{metric.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{metric.description}</p>
              <div className={`text-sm ${metric.color} font-medium`}>
                {metric.change}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Program Performance */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Program Performance Analysis</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-4 font-semibold text-gray-700">Program</th>
                <th className="text-left p-4 font-semibold text-gray-700">Applications</th>
                <th className="text-left p-4 font-semibold text-gray-700">Admitted</th>
                <th className="text-left p-4 font-semibold text-gray-700">Enrolled</th>
                <th className="text-left p-4 font-semibold text-gray-700">Conversion Rate</th>
                <th className="text-left p-4 font-semibold text-gray-700">Quality</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {programPerformance.map((program, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-4">
                    <div className="font-medium text-gray-900">{program.name}</div>
                  </td>
                  <td className="p-4 text-gray-600">{program.applications}</td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-900 font-medium">{program.admitted}</span>
                      <Badge variant="secondary">{((program.admitted / program.applications) * 100).toFixed(1)}%</Badge>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-900 font-medium">{program.enrolled}</span>
                      <Badge variant="default">{((program.enrolled / program.admitted) * 100).toFixed(1)}%</Badge>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-green-600 font-medium">{program.conversionRate}</span>
                  </td>
                  <td className="p-4">
                    <Badge variant={program.quality === 'High' ? 'default' : 'secondary'}>
                      {program.quality}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* AI Insights */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">AI-Powered Insights & Recommendations</h2>
        <div className="space-y-4">
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <div key={index} className={`p-4 rounded-lg border ${insight.bgColor} ${insight.borderColor}`}>
                <div className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-lg bg-white flex items-center justify-center`}>
                    <Icon className={`w-4 h-4 ${insight.textColor}`} />
                  </div>
                  <div>
                    <h4 className={`font-medium ${insight.textColor} mb-1`}>{insight.title}</h4>
                    <p className={`text-sm ${insight.textColor}`}>{insight.message}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Summary Impact Card */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-blue-900 mb-3">AI-Powered Admission Success Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <div className="text-2xl font-bold text-blue-600">67%</div>
                <div className="text-sm text-gray-600">Time Savings</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <div className="text-2xl font-bold text-green-600">$150K</div>
                <div className="text-sm text-gray-600">Annual Cost Savings</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <div className="text-2xl font-bold text-purple-600">3.2x</div>
                <div className="text-sm text-gray-600">Staff Productivity</div>
              </div>
            </div>
            <p className="text-blue-800 text-sm leading-relaxed">
              Your AI-powered admission workflow has transformed university operations, delivering significant 
              time savings, cost reductions, and productivity improvements while enhancing the quality of 
              the admission process. The system processes applications 67% faster than traditional methods, 
              saves $150,000 annually, and has boosted staff productivity by 3.2x while maintaining 
              exceptionally high application quality scores.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;