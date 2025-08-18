import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { 
  Settings, 
  Database, 
  Mail, 
  FileText, 
  Brain, 
  CheckCircle, 
  ArrowRight, 
  Plus, 
  Trash2,
  AlertCircle,
  Target,
  Upload,
  Link,
  File,
  CloudUpload
} from 'lucide-react';

const WorkflowBuilder = () => {
  const navigate = useNavigate();
  const [activeStage, setActiveStage] = useState(1);
  const [workflowData, setWorkflowData] = useState({
    leadSource: {
      integrationType: '', // 'api' or 'file'
      platform: '',
      apiKey: '',
      syncFrequency: 'daily',
      uploadedFile: null,
      fileName: ''
    },
    applicationRequirements: {
      documents: ['Resume/CV', 'Statement of Purpose', 'Letter of Recommendation'],
      customFields: []
    },
    admissionCriteria: {
      minGPA: '3.0',
      workExperience: '0',
      testScores: [],
      customRules: []
    },
    scholarshipRules: {
      criteriaList: [],
      budgetAllocation: ''
    }
  });

  const stages = [
    {
      id: 1,
      title: 'Lead Source Integration',
      description: 'Connect your existing CRM or lead management system',
      icon: Database,
      isCompleted: false
    },
    {
      id: 2,
      title: 'Application Requirements',
      description: 'Define required documents and application fields',
      icon: FileText,
      isCompleted: false
    },
    {
      id: 3,
      title: 'Admission Criteria',
      description: 'Set AI evaluation rules and requirements',
      icon: Brain,
      isCompleted: false
    },
    {
      id: 4,
      title: 'Scholarship Rules',
      description: 'Configure scholarship eligibility and allocation',
      icon: Target,
      isCompleted: false
    }
  ];

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setWorkflowData({
        ...workflowData,
        leadSource: {
          ...workflowData.leadSource,
          uploadedFile: file,
          fileName: file.name
        }
      });
    }
  };

  const handleIntegrationTypeChange = (type) => {
    setWorkflowData({
      ...workflowData,
      leadSource: {
        ...workflowData.leadSource,
        integrationType: type,
        // Reset other fields when switching types
        platform: '',
        apiKey: '',
        uploadedFile: null,
        fileName: ''
      }
    });
  };

  const addCustomField = () => {
    setWorkflowData({
      ...workflowData,
      applicationRequirements: {
        ...workflowData.applicationRequirements,
        customFields: [...workflowData.applicationRequirements.customFields, { name: '', type: 'text', required: false }]
      }
    });
  };

  const removeCustomField = (index) => {
    const newFields = workflowData.applicationRequirements.customFields.filter((_, i) => i !== index);
    setWorkflowData({
      ...workflowData,
      applicationRequirements: {
        ...workflowData.applicationRequirements,
        customFields: newFields
      }
    });
  };

  const addAdmissionRule = () => {
    setWorkflowData({
      ...workflowData,
      admissionCriteria: {
        ...workflowData.admissionCriteria,
        customRules: [...workflowData.admissionCriteria.customRules, { field: '', operator: 'greater_than', value: '', weight: 1 }]
      }
    });
  };

  const addScholarshipCriteria = () => {
    setWorkflowData({
      ...workflowData,
      scholarshipRules: {
        ...workflowData.scholarshipRules,
        criteriaList: [...workflowData.scholarshipRules.criteriaList, { name: '', criteria: '', amount: '', percentage: '' }]
      }
    });
  };

  const handleNext = () => {
    if (activeStage < 4) {
      setActiveStage(activeStage + 1);
    } else {
      // Save workflow and navigate to AI Review
      navigate('/ai-review');
    }
  };

  const renderStageContent = () => {
    switch (activeStage) {
      case 1:
        return (
          <div className="space-y-6">
            {/* Integration Type Selection */}
            <div>
              <Label className="text-base font-medium mb-4 block">Choose Lead Integration Method</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                  className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                    workflowData.leadSource.integrationType === 'api' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                  onClick={() => handleIntegrationTypeChange('api')}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      workflowData.leadSource.integrationType === 'api' 
                        ? 'bg-blue-100' 
                        : 'bg-gray-100'
                    }`}>
                      <Link className={`w-6 h-6 ${
                        workflowData.leadSource.integrationType === 'api' 
                          ? 'text-blue-600' 
                          : 'text-gray-600'
                      }`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">API Integration</h3>
                      <p className="text-sm text-gray-600">Connect directly to your CRM or lead management platform</p>
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-gray-600">
                    • Real-time data synchronization<br/>
                    • Automatic lead updates<br/>
                    • Supports Salesforce, HubSpot, Slate, and more
                  </div>
                </div>

                <div 
                  className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                    workflowData.leadSource.integrationType === 'file' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                  onClick={() => handleIntegrationTypeChange('file')}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      workflowData.leadSource.integrationType === 'file' 
                        ? 'bg-blue-100' 
                        : 'bg-gray-100'
                    }`}>
                      <Upload className={`w-6 h-6 ${
                        workflowData.leadSource.integrationType === 'file' 
                          ? 'text-blue-600' 
                          : 'text-gray-600'
                      }`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">File Upload</h3>
                      <p className="text-sm text-gray-600">Upload leads data from CSV or Excel files</p>
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-gray-600">
                    • One-time or periodic uploads<br/>
                    • Supports CSV and Excel formats<br/>
                    • Easy migration from existing systems
                  </div>
                </div>
              </div>
            </div>

            {/* API Integration Fields */}
            {workflowData.leadSource.integrationType === 'api' && (
              <div className="space-y-6 p-6 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-3 mb-4">
                  <Link className="w-5 h-5 text-blue-600" />
                  <h4 className="text-lg font-semibold text-blue-900">API Configuration</h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="platform">Lead Source Platform</Label>
                    <Select>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select your CRM platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="salesforce">Salesforce</SelectItem>
                        <SelectItem value="hubspot">HubSpot</SelectItem>
                        <SelectItem value="slate">Slate</SelectItem>
                        <SelectItem value="crm">Custom CRM</SelectItem>
                        <SelectItem value="pipedrive">Pipedrive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="syncFrequency">Sync Frequency</Label>
                    <Select>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="How often to sync data" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="realtime">Real-time</SelectItem>
                        <SelectItem value="hourly">Every Hour</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="apiKey">API Key / Connection String</Label>
                  <Input
                    id="apiKey"
                    type="password"
                    placeholder="Enter your API key or connection details"
                    className="mt-2"
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    This will be used to securely connect to your lead source platform
                  </p>
                </div>
                <div className="bg-blue-100 border border-blue-300 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-blue-700 mt-0.5" />
                    <div>
                      <h5 className="font-medium text-blue-900">API Integration Benefits</h5>
                      <p className="text-sm text-blue-800">
                        Real-time synchronization ensures your lead data is always up-to-date. 
                        The system will automatically track lead sources, engagement metrics, and conversion rates.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* File Upload Fields */}
            {workflowData.leadSource.integrationType === 'file' && (
              <div className="space-y-6 p-6 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center space-x-3 mb-4">
                  <File className="w-5 h-5 text-green-600" />
                  <h4 className="text-lg font-semibold text-green-900">File Upload Configuration</h4>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fileUpload" className="text-base font-medium">
                      Upload Leads Data File
                    </Label>
                    <div className="mt-2">
                      <div className="flex items-center justify-center w-full">
                        <label htmlFor="fileUpload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-green-300 border-dashed rounded-lg cursor-pointer bg-green-25 hover:bg-green-100 transition-colors">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <CloudUpload className="w-10 h-10 mb-3 text-green-600" />
                            <p className="mb-2 text-sm text-green-700">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-green-600">CSV, XLSX, or XLS files (MAX. 10MB)</p>
                          </div>
                          <input 
                            id="fileUpload" 
                            type="file" 
                            className="hidden" 
                            accept=".csv,.xlsx,.xls"
                            onChange={handleFileUpload}
                          />
                        </label>
                      </div>
                    </div>
                    
                    {workflowData.leadSource.fileName && (
                      <div className="mt-4 p-4 bg-green-100 rounded-lg border border-green-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <File className="w-5 h-5 text-green-600" />
                            <div>
                              <p className="text-sm font-medium text-green-900">
                                {workflowData.leadSource.fileName}
                              </p>
                              <p className="text-xs text-green-600">
                                File selected successfully
                              </p>
                            </div>
                          </div>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <Upload className="w-3 h-3 mr-1" />
                            Confirm Upload
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Expected Data Format</Label>
                      <div className="mt-2 text-sm text-gray-600 bg-white p-3 rounded-lg border">
                        <div className="font-medium mb-2">Required Columns:</div>
                        <div className="space-y-1">
                          <div>• Name (First Name, Last Name)</div>
                          <div>• Email Address</div>
                          <div>• Phone Number</div>
                          <div>• Country/Region</div>
                          <div>• Program Interest</div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <Label>Upload Schedule</Label>
                      <Select>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="How often will you upload?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="one-time">One-time Upload</SelectItem>
                          <SelectItem value="weekly">Weekly Updates</SelectItem>
                          <SelectItem value="monthly">Monthly Updates</SelectItem>
                          <SelectItem value="quarterly">Quarterly Updates</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-100 border border-green-300 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-green-700 mt-0.5" />
                    <div>
                      <h5 className="font-medium text-green-900">File Upload Benefits</h5>
                      <p className="text-sm text-green-800">
                        Perfect for migrating existing lead data or periodic bulk updates. 
                        The system will automatically validate, clean, and organize your lead data for optimal processing.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!workflowData.leadSource.integrationType && (
              <div className="text-center py-8">
                <Database className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Choose Your Integration Method</h3>
                <p className="text-gray-600">
                  Select either API Integration for real-time sync or File Upload for manual data import
                </p>
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label>Required Documents</Label>
              <div className="mt-2 space-y-2">
                {workflowData.applicationRequirements.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">{doc}</span>
                    <Badge variant="secondary">Required</Badge>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label>Custom Application Fields</Label>
                <Button onClick={addCustomField} size="sm" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Field
                </Button>
              </div>
              <div className="mt-2 space-y-3">
                {workflowData.applicationRequirements.customFields.map((field, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Input
                      placeholder="Field name"
                      value={field.name}
                      onChange={(e) => {
                        const newFields = [...workflowData.applicationRequirements.customFields];
                        newFields[index].name = e.target.value;
                        setWorkflowData({
                          ...workflowData,
                          applicationRequirements: {
                            ...workflowData.applicationRequirements,
                            customFields: newFields
                          }
                        });
                      }}
                    />
                    <Select>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text">Text</SelectItem>
                        <SelectItem value="number">Number</SelectItem>
                        <SelectItem value="date">Date</SelectItem>
                        <SelectItem value="file">File</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button onClick={() => removeCustomField(index)} size="sm" variant="ghost">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-900">Application Process</h4>
                  <p className="text-sm text-green-700">
                    Students will be guided through a step-by-step application process. 
                    The AI will track completion rates and send automated reminders for missing documents.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="minGPA">Minimum GPA Requirement</Label>
                <Input
                  id="minGPA"
                  type="number"
                  step="0.1"
                  min="0"
                  max="4.0"
                  placeholder="e.g., 3.0"
                  value={workflowData.admissionCriteria.minGPA}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="workExperience">Minimum Work Experience (Years)</Label>
                <Input
                  id="workExperience"
                  type="number"
                  min="0"
                  placeholder="e.g., 2"
                  value={workflowData.admissionCriteria.workExperience}
                  className="mt-2"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label>Custom Evaluation Rules</Label>
                <Button onClick={addAdmissionRule} size="sm" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Rule
                </Button>
              </div>
              <div className="mt-2 space-y-3">
                {workflowData.admissionCriteria.customRules.map((rule, index) => (
                  <div key={index} className="grid grid-cols-4 gap-3 p-3 bg-gray-50 rounded-lg">
                    <Input placeholder="Field (e.g., GMAT Score)" />
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="greater_than">Greater than</SelectItem>
                        <SelectItem value="less_than">Less than</SelectItem>
                        <SelectItem value="equals">Equals</SelectItem>
                        <SelectItem value="contains">Contains</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input placeholder="Value" />
                    <Input placeholder="Weight (1-10)" type="number" min="1" max="10" />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Brain className="w-5 h-5 text-purple-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-purple-900">AI Evaluation Process</h4>
                  <p className="text-sm text-purple-700">
                    The AI will automatically score applications based on these criteria. 
                    Applications will be categorized as Rejected, Under Review, or Shortlisted with detailed reasoning.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="budgetAllocation">Total Scholarship Budget</Label>
              <Input
                id="budgetAllocation"
                type="number"
                placeholder="e.g., 500000"
                value={workflowData.scholarshipRules.budgetAllocation}
                className="mt-2"
              />
              <p className="text-sm text-gray-500 mt-1">Enter total budget in USD</p>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label>Scholarship Criteria</Label>
                <Button onClick={addScholarshipCriteria} size="sm" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Criteria
                </Button>
              </div>
              <div className="mt-2 space-y-3">
                {workflowData.scholarshipRules.criteriaList.map((criteria, index) => (
                  <div key={index} className="grid grid-cols-2 md:grid-cols-4 gap-3 p-3 bg-gray-50 rounded-lg">
                    <Input placeholder="Scholarship Name" />
                    <Textarea placeholder="Eligibility Criteria" className="h-10" />
                    <Input placeholder="Amount ($)" type="number" />
                    <Input placeholder="% of Budget" type="number" />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Target className="w-5 h-5 text-orange-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-orange-900">Smart Allocation</h4>
                  <p className="text-sm text-orange-700">
                    AI will optimize scholarship distribution to maximize enrollment while staying within budget. 
                    It considers merit, need, and probability of acceptance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Workflow Builder</h1>
        <p className="text-gray-600">
          Configure your admission process with AI-powered automation
        </p>
      </div>

      {/* Stage Progress */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stages.map((stage) => {
          const Icon = stage.icon;
          const isActive = activeStage === stage.id;
          const isCompleted = stage.isCompleted;
          
          return (
            <div
              key={stage.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                isActive
                  ? 'border-blue-500 bg-blue-50'
                  : isCompleted
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
              onClick={() => setActiveStage(stage.id)}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  isActive
                    ? 'bg-blue-100'
                    : isCompleted
                      ? 'bg-green-100'
                      : 'bg-gray-100'
                }`}>
                  <Icon className={`w-5 h-5 ${
                    isActive
                      ? 'text-blue-600'
                      : isCompleted
                        ? 'text-green-600'
                        : 'text-gray-600'
                  }`} />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-sm">{stage.title}</h3>
                    {isCompleted && <CheckCircle className="w-4 h-4 text-green-600" />}
                  </div>
                  <p className="text-xs text-gray-600">{stage.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content */}
      <Card className="p-8">
        <div className="space-y-6">
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {stages[activeStage - 1].title}
            </h2>
            <p className="text-gray-600 mt-1">
              {stages[activeStage - 1].description}
            </p>
          </div>

          {renderStageContent()}

          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={() => setActiveStage(Math.max(1, activeStage - 1))}
              disabled={activeStage === 1}
            >
              Previous
            </Button>
            
            <div className="text-sm text-gray-500">
              Step {activeStage} of {stages.length}
            </div>
            
            <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700">
              {activeStage === 4 ? 'Complete Setup' : 'Next'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default WorkflowBuilder;