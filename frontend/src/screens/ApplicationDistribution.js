import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { 
  Users, 
  Search, 
  Filter, 
  Mail, 
  Phone, 
  MessageSquare, 
  Eye, 
  Star,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  ArrowRight,
  Download,
  Send
} from 'lucide-react';

const ApplicationDistribution = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('shortlisted');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApplications, setSelectedApplications] = useState([]);

  // Mock data for applications
  const applications = {
    shortlisted: [
      {
        id: 1,
        name: 'Sarah Chen',
        email: 'sarah.chen@email.com',
        country: 'Canada',
        gpa: 3.9,
        score: 9.2,
        program: 'Computer Science MS',
        reason: 'Excellent academic record, strong research background in AI/ML',
        documents: ['Resume', 'SOP', 'LOR', 'Transcripts'],
        status: 'shortlisted'
      },
      {
        id: 2,
        name: 'Raj Patel',
        email: 'raj.patel@email.com',
        country: 'India',
        gpa: 3.8,
        score: 8.9,
        program: 'Data Science MS',
        reason: 'Strong quantitative skills, relevant work experience at tech companies',
        documents: ['Resume', 'SOP', 'LOR', 'Transcripts'],
        status: 'shortlisted'
      },
      {
        id: 3,
        name: 'Emma Johnson',
        email: 'emma.johnson@email.com',
        country: 'USA',
        gpa: 3.7,
        score: 8.7,
        program: 'MBA',
        reason: 'Leadership experience, diverse background, clear career goals',
        documents: ['Resume', 'SOP', 'LOR', 'Transcripts'],
        status: 'shortlisted'
      }
    ],
    underReview: [
      {
        id: 4,
        name: 'Alex Rodriguez',
        email: 'alex.rodriguez@email.com',
        country: 'Mexico',
        gpa: 3.4,
        score: 7.1,
        program: 'Engineering MS',
        reason: 'Meets minimum requirements but lacks research experience',
        documents: ['Resume', 'SOP', 'LOR'],
        status: 'under-review'
      },
      {
        id: 5,
        name: 'Li Wei',
        email: 'li.wei@email.com',
        country: 'China',
        gpa: 3.5,
        score: 7.3,
        program: 'Business Analytics',
        reason: 'Good academic record, need to verify English proficiency',
        documents: ['Resume', 'SOP', 'Transcripts'],
        status: 'under-review'
      }
    ],
    rejected: [
      {
        id: 6,
        name: 'Michael Brown',
        email: 'michael.brown@email.com',
        country: 'UK',
        gpa: 2.8,
        score: 4.2,
        program: 'Computer Science MS',
        reason: 'Below minimum GPA requirement (3.0), insufficient technical background',
        documents: ['Resume', 'SOP'],
        status: 'rejected'
      },
      {
        id: 7,
        name: 'Anna Silva',
        email: 'anna.silva@email.com',
        country: 'Brazil',
        gpa: 3.1,
        score: 5.8,
        program: 'MBA',
        reason: 'Limited work experience, weak statement of purpose',
        documents: ['Resume', 'SOP', 'Transcripts'],
        status: 'rejected'
      }
    ]
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'shortlisted':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'under-review':
        return <Clock className="w-4 h-4 text-orange-600" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'shortlisted':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'under-review':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'rejected':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const handleSelectApplication = (id) => {
    setSelectedApplications(prev => 
      prev.includes(id) 
        ? prev.filter(appId => appId !== id)
        : [...prev, id]
    );
  };

  const handleBulkAction = (action) => {
    console.log(`Performing ${action} on applications:`, selectedApplications);
    setSelectedApplications([]);
  };

  const proceedToScholarships = () => {
    navigate('/scholarship-management');
  };

  const renderApplicationCard = (app) => (
    <Card key={app.id} className="p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-4">
          <input
            type="checkbox"
            checked={selectedApplications.includes(app.id)}
            onChange={() => handleSelectApplication(app.id)}
            className="mt-1"
          />
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{app.name}</h3>
              <Badge className={getStatusColor(app.status)}>
                {getStatusIcon(app.status)}
                <span className="ml-1 capitalize">{app.status.replace('-', ' ')}</span>
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div>Email: {app.email}</div>
              <div>Country: {app.country}</div>
              <div>GPA: {app.gpa}/4.0</div>
              <div>Program: {app.program}</div>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">{app.score}</div>
            <div className="text-xs text-gray-500">AI Score</div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-900 mb-2">AI Reasoning:</h4>
        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{app.reason}</p>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Documents Submitted:</h4>
        <div className="flex flex-wrap gap-2">
          {app.documents.map((doc, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {doc}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <Button size="sm" variant="outline">
            <Eye className="w-3 h-3 mr-1" />
            View Details
          </Button>
          <Button size="sm" variant="outline">
            <Mail className="w-3 h-3 mr-1" />
            Email
          </Button>
          <Button size="sm" variant="outline">
            <Phone className="w-3 h-3 mr-1" />
            Call
          </Button>
        </div>
        <Button size="sm">
          <MessageSquare className="w-3 h-3 mr-1" />
          Send Message
        </Button>
      </div>
    </Card>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Application Distribution</h1>
          <p className="text-gray-600">
            Review AI-categorized applications and take actions
          </p>
        </div>
        <Button onClick={proceedToScholarships} className="bg-blue-600 hover:bg-blue-700">
          Proceed to Scholarships
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{applications.shortlisted.length}</div>
          <div className="text-sm text-gray-600">Shortlisted</div>
          <div className="text-xs text-green-600 font-medium">Ready for admission</div>
        </Card>
        
        <Card className="p-6 text-center">
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Clock className="w-6 h-6 text-orange-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{applications.underReview.length}</div>
          <div className="text-sm text-gray-600">Under Review</div>
          <div className="text-xs text-orange-600 font-medium">Needs attention</div>
        </Card>
        
        <Card className="p-6 text-center">
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <XCircle className="w-6 h-6 text-red-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{applications.rejected.length}</div>
          <div className="text-sm text-gray-600">Rejected</div>
          <div className="text-xs text-red-600 font-medium">Below requirements</div>
        </Card>

        <Card className="p-6 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {applications.shortlisted.length + applications.underReview.length + applications.rejected.length}
          </div>
          <div className="text-sm text-gray-600">Total Processed</div>
          <div className="text-xs text-blue-600 font-medium">AI analyzed</div>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <Input
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Select>
              <SelectTrigger className="w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by program" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Programs</SelectItem>
                <SelectItem value="cs">Computer Science</SelectItem>
                <SelectItem value="ds">Data Science</SelectItem>
                <SelectItem value="mba">MBA</SelectItem>
                <SelectItem value="eng">Engineering</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {selectedApplications.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                {selectedApplications.length} selected
              </span>
              <Button size="sm" variant="outline" onClick={() => handleBulkAction('email')}>
                <Mail className="w-3 h-3 mr-1" />
                Email All
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleBulkAction('export')}>
                <Download className="w-3 h-3 mr-1" />
                Export
              </Button>
            </div>
          )}
        </div>

        {/* Application Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="shortlisted" className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>Shortlisted ({applications.shortlisted.length})</span>
            </TabsTrigger>
            <TabsTrigger value="underReview" className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>Under Review ({applications.underReview.length})</span>
            </TabsTrigger>
            <TabsTrigger value="rejected" className="flex items-center space-x-2">
              <XCircle className="w-4 h-4" />
              <span>Rejected ({applications.rejected.length})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="shortlisted" className="space-y-4 mt-6">
            {applications.shortlisted.map(renderApplicationCard)}
          </TabsContent>

          <TabsContent value="underReview" className="space-y-4 mt-6">
            {applications.underReview.map(renderApplicationCard)}
          </TabsContent>

          <TabsContent value="rejected" className="space-y-4 mt-6">
            {applications.rejected.map(renderApplicationCard)}
          </TabsContent>
        </Tabs>
      </Card>

      {/* Quick Actions Panel */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Next Steps</h3>
            <p className="text-gray-600">
              Ready to proceed with scholarship allocation for shortlisted candidates?
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline">
              <Send className="w-4 h-4 mr-2" />
              Send Batch Communications
            </Button>
            <Button onClick={proceedToScholarships} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Continue to Scholarships
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ApplicationDistribution;