import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Slider } from '../components/ui/slider';
import { Progress } from '../components/ui/progress';
import { 
  DollarSign, 
  Users, 
  Award, 
  TrendingUp, 
  Target, 
  Brain,
  PieChart,
  BarChart3,
  CheckCircle,
  AlertTriangle,
  Send,
  Download,
  Settings
} from 'lucide-react';

const ScholarshipManagement = () => {
  const [totalBudget, setTotalBudget] = useState(500000);
  const [allocatedBudget, setAllocatedBudget] = useState(0);
  const [activeTab, setActiveTab] = useState('planner');
  const [scholarshipAllocations, setScholarshipAllocations] = useState([]);

  // Mock scholarship candidates from shortlisted applications
  const scholarshipCandidates = [
    {
      id: 1,
      name: 'Sarah Chen',
      program: 'Computer Science MS',
      gpa: 3.9,
      aiScore: 9.2,
      meritScore: 95,
      needScore: 65,
      suggestedAmount: 25000,
      category: 'Merit-based',
      reasoning: 'Exceptional academic performance, strong research potential in AI/ML'
    },
    {
      id: 2,
      name: 'Raj Patel',
      program: 'Data Science MS',
      gpa: 3.8,
      aiScore: 8.9,
      meritScore: 88,
      needScore: 80,
      suggestedAmount: 20000,
      category: 'Merit + Need',
      reasoning: 'Strong technical skills with demonstrated financial need'
    },
    {
      id: 3,
      name: 'Emma Johnson',
      program: 'MBA',
      gpa: 3.7,
      aiScore: 8.7,
      meritScore: 85,
      needScore: 45,
      suggestedAmount: 15000,
      category: 'Merit-based',
      reasoning: 'Leadership potential and diverse professional background'
    }
  ];

  const scholarshipTypes = [
    {
      name: 'Academic Excellence',
      criteria: 'GPA > 3.7 & Top 20% AI Score',
      budget: 200000,
      allocated: 0,
      recipients: 0,
      avgAmount: 20000
    },
    {
      name: 'Need-based',
      criteria: 'Financial Need Score > 70',
      budget: 150000,
      allocated: 0,
      recipients: 0,
      avgAmount: 15000
    },
    {
      name: 'Diversity & Inclusion',
      criteria: 'Underrepresented groups',
      budget: 100000,
      allocated: 0,
      recipients: 0,
      avgAmount: 12500
    },
    {
      name: 'Research Excellence',
      criteria: 'Research experience & publications',
      budget: 50000,
      allocated: 0,
      recipients: 0,
      avgAmount: 10000
    }
  ];

  const handleScholarshipAllocation = (candidateId, amount, type) => {
    const candidate = scholarshipCandidates.find(c => c.id === candidateId);
    const newAllocation = {
      candidateId,
      candidateName: candidate.name,
      amount: parseInt(amount),
      type,
      status: 'pending'
    };
    
    setScholarshipAllocations([...scholarshipAllocations, newAllocation]);
    setAllocatedBudget(allocatedBudget + parseInt(amount));
  };

  const runAIOptimization = () => {
    // Simulate AI optimization
    const optimizedAllocations = scholarshipCandidates.map(candidate => ({
      candidateId: candidate.id,
      candidateName: candidate.name,
      amount: candidate.suggestedAmount,
      type: candidate.category,
      status: 'optimized'
    }));
    
    setScholarshipAllocations(optimizedAllocations);
    setAllocatedBudget(optimizedAllocations.reduce((sum, alloc) => sum + alloc.amount, 0));
  };

  const sendScholarshipNotifications = () => {
    console.log('Sending scholarship notifications...', scholarshipAllocations);
  };

  const budgetUtilization = (allocatedBudget / totalBudget) * 100;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Scholarship Management</h1>
          <p className="text-gray-600">
            AI-powered scholarship allocation and budget optimization
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
            <Send className="w-4 h-4 mr-2" />
            Send Notifications
          </Button>
        </div>
      </div>

      {/* Budget Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Total Budget</div>
              <div className="text-xl font-bold text-gray-900">${totalBudget.toLocaleString()}</div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Allocated</div>
              <div className="text-xl font-bold text-gray-900">${allocatedBudget.toLocaleString()}</div>
            </div>
          </div>
          <div className="mt-2">
            <Progress value={budgetUtilization} className="h-2" />
            <div className="text-xs text-gray-500 mt-1">{budgetUtilization.toFixed(1)}% utilized</div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Recipients</div>
              <div className="text-xl font-bold text-gray-900">{scholarshipAllocations.length}</div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Award className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Avg Award</div>
              <div className="text-xl font-bold text-gray-900">
                ${scholarshipAllocations.length > 0 
                  ? Math.round(allocatedBudget / scholarshipAllocations.length).toLocaleString() 
                  : '0'}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="planner">AI Scholarship Planner</TabsTrigger>
          <TabsTrigger value="candidates">Eligible Candidates</TabsTrigger>
          <TabsTrigger value="analytics">Budget Analytics</TabsTrigger>
        </TabsList>

        {/* AI Scholarship Planner */}
        <TabsContent value="planner" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">AI Optimization Engine</h3>
                <p className="text-gray-600">Let AI suggest optimal scholarship distribution</p>
              </div>
              <Button onClick={runAIOptimization} className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                <Brain className="w-4 h-4 mr-2" />
                Run AI Optimization
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="budget">Total Scholarship Budget</Label>
                <div className="flex items-center space-x-3 mt-2">
                  <span className="text-sm">$0</span>
                  <Slider
                    value={[totalBudget]}
                    onValueChange={([value]) => setTotalBudget(value)}
                    max={1000000}
                    min={100000}
                    step={25000}
                    className="flex-1"
                  />
                  <span className="text-sm">$1M</span>
                </div>
                <div className="text-center mt-2 font-medium">${totalBudget.toLocaleString()}</div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Optimization Strategy</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm">Merit Weight</span>
                    <Badge variant="outline">70%</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm">Need Weight</span>
                    <Badge variant="outline">30%</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm">Enrollment Probability</span>
                    <Badge variant="outline">Considered</Badge>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {scholarshipTypes.map((type, index) => (
              <Card key={index} className="p-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">{type.name}</h4>
                    <p className="text-xs text-gray-600">{type.criteria}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Budget</span>
                      <span className="font-medium">${type.budget.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Allocated</span>
                      <span className="font-medium">${type.allocated.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Recipients</span>
                      <span className="font-medium">{type.recipients}</span>
                    </div>
                  </div>
                  
                  <Progress value={(type.allocated / type.budget) * 100} className="h-2" />
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Eligible Candidates */}
        <TabsContent value="candidates" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Scholarship Candidates</h3>
            
            <div className="space-y-6">
              {scholarshipCandidates.map((candidate) => (
                <div key={candidate.id} className="border rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{candidate.name}</h4>
                      <p className="text-gray-600">{candidate.program}</p>
                    </div>
                    <Badge className="bg-blue-50 text-blue-700 border-blue-200">
                      {candidate.category}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">{candidate.gpa}</div>
                      <div className="text-xs text-gray-600">GPA</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">{candidate.aiScore}</div>
                      <div className="text-xs text-gray-600">AI Score</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-purple-600">{candidate.meritScore}</div>
                      <div className="text-xs text-gray-600">Merit</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-orange-600">{candidate.needScore}</div>
                      <div className="text-xs text-gray-600">Need</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-gray-900 mb-2">AI Reasoning:</h5>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                      {candidate.reasoning}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div>
                        <Label htmlFor={`amount-${candidate.id}`} className="text-sm">Scholarship Amount</Label>
                        <Input
                          id={`amount-${candidate.id}`}
                          type="number"
                          defaultValue={candidate.suggestedAmount}
                          className="w-32 mt-1"
                        />
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleScholarshipAllocation(
                          candidate.id, 
                          candidate.suggestedAmount, 
                          candidate.category
                        )}
                      >
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Approve Suggested
                      </Button>
                      <Button size="sm">
                        Custom Allocation
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Budget Analytics */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <PieChart className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Budget Distribution</h3>
              </div>
              
              <div className="space-y-4">
                {scholarshipTypes.map((type, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full bg-blue-500" />
                      <span className="text-sm">{type.name}</span>
                    </div>
                    <div className="text-sm font-medium">
                      ${type.budget.toLocaleString()} ({((type.budget / totalBudget) * 100).toFixed(1)}%)
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <BarChart3 className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">ROI Projection</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Expected Enrollment Rate</span>
                  <span className="text-sm font-medium">85%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Avg. Tuition Revenue</span>
                  <span className="text-sm font-medium">$45,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Projected ROI</span>
                  <span className="text-sm font-medium text-green-600">180%</span>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Net Revenue Impact</span>
                    <span className="text-sm font-bold text-green-600">+$890K</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Allocation Summary</h3>
            
            {scholarshipAllocations.length > 0 ? (
              <div className="space-y-3">
                {scholarshipAllocations.map((allocation, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">{allocation.candidateName}</div>
                      <div className="text-sm text-gray-600">{allocation.type}</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-lg font-bold text-green-600">
                        ${allocation.amount.toLocaleString()}
                      </div>
                      <Badge variant={allocation.status === 'optimized' ? 'default' : 'secondary'}>
                        {allocation.status}
                      </Badge>
                    </div>
                  </div>
                ))}
                
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-lg font-semibold">Total Allocated</div>
                  <div className="text-xl font-bold text-blue-600">
                    ${allocatedBudget.toLocaleString()}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No scholarships allocated yet</p>
                <p className="text-sm text-gray-500">Use the AI planner or manually assign scholarships to candidates</p>
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Panel */}
      {scholarshipAllocations.length > 0 && (
        <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to Finalize</h3>
              <p className="text-gray-600">
                {scholarshipAllocations.length} scholarship allocations totaling ${allocatedBudget.toLocaleString()}
              </p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Review & Edit
              </Button>
              <Button 
                onClick={sendScholarshipNotifications}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Scholarship Offers
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ScholarshipManagement;