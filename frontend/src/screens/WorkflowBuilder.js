import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { Checkbox } from '../components/ui/checkbox';
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
  CloudUpload,
  GraduationCap,
  BarChart3,
  Download,
  Users,
  CheckSquare,
  Square
} from 'lucide-react';

const WorkflowBuilder = () => {
  const navigate = useNavigate();
  const [activeStage, setActiveStage] = useState(1);
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  
  const [workflowData, setWorkflowData] = useState({
    leadSource: {
      integrationType: '', // 'api' or 'file'
      platform: '',
      apiKey: '',
      syncFrequency: 'daily',
      uploadedFile: null,
      fileName: ''
    },
    programConfiguration: {
      selectedProgram: '',
      programDetails: {
        name: '',
        duration: '',
        departments: [],
        specializations: []
      }
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

  // Mock lead data for demonstration
  const mockLeads = [
    { id: 1, name: 'John Smith', email: 'john@email.com', program: 'Full-Time MBA', source: 'Website', status: 'New' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@email.com', program: 'MS in Cybersecurity', source: 'University Fair', status: 'Contacted' },
    { id: 3, name: 'Michael Brown', email: 'michael@email.com', program: 'Full-Time MBA', source: 'Social Media', status: 'Applied' },
    { id: 4, name: 'Emma Wilson', email: 'emma@email.com', program: 'MS in Cybersecurity', source: 'Referral', status: 'New' }
  ];

  const programs = [
    {
      id: 'mba',
      name: 'Full-Time MBA',
      duration: '2 Years',
      departments: ['Business Administration', 'Finance', 'Marketing', 'Operations'],
      specializations: ['Finance', 'Marketing', 'Operations Management', 'Strategy', 'Entrepreneurship']
    },
    {
      id: 'cybersecurity',
      name: 'MS in Cybersecurity',
      duration: '1.5 Years', 
      departments: ['Computer Science', 'Information Technology', 'Cybersecurity'],
      specializations: ['Network Security', 'Digital Forensics', 'Risk Management', 'Ethical Hacking', 'Security Architecture']
    }
  ];

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
      title: 'Program Configuration',
      description: 'Select and configure academic programs',
      icon: GraduationCap,
      isCompleted: false
    },
    {
      id: 3,
      title: 'Application Requirements',
      description: 'Define required documents and application fields',
      icon: FileText,
      isCompleted: false
    },
    {
      id: 4,
      title: 'Admission Criteria',
      description: 'Set AI evaluation rules and requirements',
      icon: Brain,
      isCompleted: false
    },
    {
      id: 5,
      title: 'Scholarship Rules',
      description: 'Configure scholarship eligibility and allocation',
      icon: Target,
      isCompleted: false
    },
    {
      id: 6,
      title: 'Analytics Dashboard',
      description: 'View efficiency metrics and performance insights',
      icon: BarChart3,
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

  const handleProgramSelect = (programId) => {
    const selectedProgram = programs.find(p => p.id === programId);
    setWorkflowData({
      ...workflowData,
      programConfiguration: {
        selectedProgram: programId,
        programDetails: selectedProgram || {}
      }
    });
  };

  const handleLeadSelect = (leadId) => {
    setSelectedLeads(prev => 
      prev.includes(leadId) 
        ? prev.filter(id => id !== leadId)
        : [...prev, leadId]
    );
  };

  const handleSelectAllLeads = () => {
    if (selectAll) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(mockLeads.map(lead => lead.id));
    }
    setSelectAll(!selectAll);
  };

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
    if (activeStage < 6) {
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
            {/* Program Selection */}
            <div>
              <Label className="text-base font-medium mb-4 block">Select Academic Program</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {programs.map((program) => (
                  <div
                    key={program.id}
                    className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                      workflowData.programConfiguration.selectedProgram === program.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                    onClick={() => handleProgramSelect(program.id)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        workflowData.programConfiguration.selectedProgram === program.id
                          ? 'bg-purple-100'
                          : 'bg-gray-100'
                      }`}>
                        <GraduationCap className={`w-6 h-6 ${
                          workflowData.programConfiguration.selectedProgram === program.id
                            ? 'text-purple-600'
                            : 'text-gray-600'
                        }`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{program.name}</h3>
                        <p className="text-sm text-gray-600">Duration: {program.duration}</p>
                      </div>
                    </div>
                    
                    {workflowData.programConfiguration.selectedProgram === program.id && (
                      <div className="mt-4 space-y-3">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Departments</h4>
                          <div className="flex flex-wrap gap-2">
                            {program.departments.map((dept, index) => (
                              <Badge key={index} variant="outline" className="bg-purple-50 border-purple-200 text-purple-700">
                                {dept}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Specializations</h4>
                          <div className="flex flex-wrap gap-2">
                            {program.specializations.map((spec, index) => (
                              <Badge key={index} variant="outline" className="bg-purple-50 border-purple-200 text-purple-700">
                                {spec}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {workflowData.programConfiguration.selectedProgram && (
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-purple-900">Program Configuration Complete</h4>
                    <p className="text-sm text-purple-700">
                      You've selected {workflowData.programConfiguration.programDetails.name}. 
                      The subsequent workflow stages will be customized for this program's specific requirements and criteria.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {!workflowData.programConfiguration.selectedProgram && (
              <div className="text-center py-8">
                <GraduationCap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Choose Your Program</h3>
                <p className="text-gray-600">
                  Select the academic program to configure application requirements and admission criteria
                </p>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            {/* Export Button */}
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Application Requirements Configuration</h3>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => exportToCSV(mockLeads, 'application-requirements')}
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>

            <div>
              <Label>Required Documents {workflowData.programConfiguration.programDetails.name && `for ${workflowData.programConfiguration.programDetails.name}`}</Label>
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

            {/* Leads Management Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Current Leads {workflowData.programConfiguration.programDetails.name && `for ${workflowData.programConfiguration.programDetails.name}`}</Label>
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleSelectAllLeads}
                  >
                    {selectAll ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                    <span className="ml-2">Select All</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={selectedLeads.length === 0}
                    onClick={() => alert(`Bulk action for ${selectedLeads.length} leads`)}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Bulk Action ({selectedLeads.length})
                  </Button>
                </div>
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-3 border-b">
                  <div className="grid grid-cols-6 gap-4 text-sm font-medium text-gray-700">
                    <div>Select</div>
                    <div>Name</div>
                    <div>Email</div>
                    <div>Program</div>
                    <div>Source</div>
                    <div>Status</div>
                  </div>
                </div>
                <div className="divide-y">
                  {mockLeads.map((lead) => (
                    <div key={lead.id} className="grid grid-cols-6 gap-4 p-3 text-sm hover:bg-gray-50">
                      <div>
                        <Checkbox
                          checked={selectedLeads.includes(lead.id)}
                          onCheckedChange={() => handleLeadSelect(lead.id)}
                        />
                      </div>
                      <div className="font-medium">{lead.name}</div>
                      <div className="text-gray-600">{lead.email}</div>
                      <div>
                        <Badge variant={lead.program === 'Full-Time MBA' ? 'default' : 'secondary'}>
                          {lead.program}
                        </Badge>
                      </div>
                      <div className="text-gray-600">{lead.source}</div>
                      <div>
                        <Badge variant={
                          lead.status === 'New' ? 'destructive' :
                          lead.status === 'Contacted' ? 'default' : 'secondary'
                        }>
                          {lead.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
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

      case 4:
        return (
          <div className="space-y-6">
            {/* Export Button */}
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Admission Criteria Configuration</h3>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => exportToCSV(mockLeads, 'admission-criteria')}
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="minGPA">Minimum GPA Requirement {workflowData.programConfiguration.programDetails.name && `for ${workflowData.programConfiguration.programDetails.name}`}</Label>
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

            {/* Leads Status for Admission */}
            <div className="space-y-4">
              <Label>Lead Status & Admission Tracking</Label>
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-3 border-b">
                  <div className="grid grid-cols-7 gap-4 text-sm font-medium text-gray-700">
                    <div>Select</div>
                    <div>Name</div>
                    <div>Program</div>
                    <div>GPA</div>
                    <div>Experience</div>
                    <div>Status</div>
                    <div>Action</div>
                  </div>
                </div>
                <div className="divide-y">
                  {mockLeads.map((lead) => (
                    <div key={lead.id} className="grid grid-cols-7 gap-4 p-3 text-sm hover:bg-gray-50">
                      <div>
                        <Checkbox
                          checked={selectedLeads.includes(lead.id)}
                          onCheckedChange={() => handleLeadSelect(lead.id)}
                        />
                      </div>
                      <div className="font-medium">{lead.name}</div>
                      <div>
                        <Badge variant={lead.program === 'Full-Time MBA' ? 'default' : 'secondary'}>
                          {lead.program}
                        </Badge>
                      </div>
                      <div>3.{Math.floor(Math.random() * 5) + 2}</div>
                      <div>{Math.floor(Math.random() * 5) + 1} yrs</div>
                      <div>
                        <Badge variant="default">Evaluating</Badge>
                      </div>
                      <div>
                        <Button size="sm" variant="ghost">Review</Button>
                      </div>
                    </div>
                  ))}
                </div>
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

      case 5:
        return (
          <div className="space-y-6">
            {/* Export Button */}
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Scholarship Rules Configuration</h3>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => exportToCSV(mockLeads, 'scholarship-rules')}
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>

            <div>
              <Label htmlFor="budgetAllocation">Total Scholarship Budget {workflowData.programConfiguration.programDetails.name && `for ${workflowData.programConfiguration.programDetails.name}`}</Label>
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

            {/* Scholarship Allocation Table */}
            <div className="space-y-4">
              <Label>Scholarship Allocation Status</Label>
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-3 border-b">
                  <div className="grid grid-cols-6 gap-4 text-sm font-medium text-gray-700">
                    <div>Select</div>
                    <div>Name</div>
                    <div>Program</div>
                    <div>Merit Score</div>
                    <div>Scholarship</div>
                    <div>Amount</div>
                  </div>
                </div>
                <div className="divide-y">
                  {mockLeads.map((lead) => (
                    <div key={lead.id} className="grid grid-cols-6 gap-4 p-3 text-sm hover:bg-gray-50">
                      <div>
                        <Checkbox
                          checked={selectedLeads.includes(lead.id)}
                          onCheckedChange={() => handleLeadSelect(lead.id)}
                        />
                      </div>
                      <div className="font-medium">{lead.name}</div>
                      <div>
                        <Badge variant={lead.program === 'Full-Time MBA' ? 'default' : 'secondary'}>
                          {lead.program}
                        </Badge>
                      </div>
                      <div>{Math.floor(Math.random() * 30) + 70}/100</div>
                      <div>
                        <Badge variant={Math.random() > 0.5 ? 'default' : 'outline'}>
                          {Math.random() > 0.5 ? 'Eligible' : 'Pending'}
                        </Badge>
                      </div>
                      <div className="font-medium">
                        ${Math.floor(Math.random() * 20000) + 5000}
                      </div>
                    </div>
                  ))}
                </div>
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

      case 6:
        return (
          <div className="space-y-6">
            {/* Analytics Dashboard Header */}
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Analytics & Performance Dashboard</h3>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => exportToCSV([
                  { metric: 'Time Saved', value: '45%', description: 'Average processing time reduction' },
                  { metric: 'Effort Saved', value: '60%', description: 'Manual review time reduction' },
                  { metric: 'Conversion Rate', value: '38.8%', description: 'Lead to application rate' },
                  { metric: 'Processing Efficiency', value: '2.3x', description: 'Faster than manual process' },
                  { metric: 'Cost Savings', value: '$125K', description: 'Annual operational savings' },
                  { metric: 'Lead Quality Score', value: '8.2/10', description: 'AI-assessed lead quality' }
                ], 'analytics-dashboard')}
              >
                <Download className="w-4 h-4 mr-2" />
                Export Analytics
              </Button>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Top Sources */}
              <Card className="p-6 space-y-4">
                <h4 className="text-lg font-semibold text-gray-900">Top Sources</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">University Fair</div>
                      <div className="text-sm text-gray-600">425 leads</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">8.2%</div>
                      <div className="text-xs text-gray-500">conversion</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Website</div>
                      <div className="text-sm text-gray-600">312 leads</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">6.5%</div>
                      <div className="text-xs text-gray-500">conversion</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Social Media</div>
                      <div className="text-sm text-gray-600">289 leads</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-orange-600">4.1%</div>
                      <div className="text-xs text-gray-500">conversion</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Referral</div>
                      <div className="text-sm text-gray-600">224 leads</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">12.3%</div>
                      <div className="text-xs text-gray-500">conversion</div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Program Performance */}
              <Card className="p-6 space-y-4">
                <h4 className="text-lg font-semibold text-gray-900">Program Performance</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Full-Time MBA</div>
                      <div className="text-sm text-gray-600">98 applications</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-blue-600">25</div>
                      <div className="text-xs text-gray-500">admitted</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">MS Cybersecurity</div>
                      <div className="text-sm text-gray-600">145 applications</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-blue-600">38</div>
                      <div className="text-xs text-gray-500">admitted</div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* AI Insights */}
              <Card className="p-6 space-y-4">
                <h4 className="text-lg font-semibold text-gray-900">AI Insights</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="font-medium text-red-800">Alert</div>
                    <div className="text-sm text-red-700">Applications dropped 12% last month. Social media leads showing low conversion.</div>
                  </div>
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="font-medium text-green-800">Opportunity</div>
                    <div className="text-sm text-green-700">University fair leads converting 2x better. Consider increasing presence.</div>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="font-medium text-blue-800">Prediction</div>
                    <div className="text-sm text-blue-700">Spring 2026 enrollment projected at 89 students based on current trends.</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Efficiency Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Time & Effort Savings */}
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">Time Saved</h4>
                    <div className="text-3xl font-bold text-green-600 mt-2">45%</div>
                    <p className="text-sm text-gray-600 mt-1">Average processing time reduction</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">Processing Efficiency</h4>
                    <div className="text-3xl font-bold text-blue-600 mt-2">2.3x</div>
                    <p className="text-sm text-gray-600 mt-1">Faster than manual process</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Settings className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">Cost Savings</h4>
                    <div className="text-3xl font-bold text-purple-600 mt-2">$125K</div>
                    <p className="text-sm text-gray-600 mt-1">Annual operational savings</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Conversion Funnel */}
            <Card className="p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Admission Funnel & Conversion Metrics</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">1,250</div>
                  <div className="text-sm text-gray-600">Leads</div>
                  <div className="text-xs text-green-600">+2.3% ↗</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">485</div>
                  <div className="text-sm text-gray-600">Applications Started</div>
                  <div className="text-xs text-gray-500">38.8%</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">320</div>
                  <div className="text-sm text-gray-600">Applications Completed</div>
                  <div className="text-xs text-gray-500">66.0%</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">95</div>
                  <div className="text-sm text-gray-600">Admitted</div>
                  <div className="text-xs text-gray-500">29.7%</div>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-lg font-semibold">Avg Processing Time</div>
                  <div className="text-2xl font-bold text-orange-600">12.5 days</div>
                  <div className="text-sm text-orange-600">-0.8 days ↓</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-lg font-semibold">Lead Quality Score</div>
                  <div className="text-2xl font-bold text-green-600">8.2/10</div>
                  <div className="text-sm text-green-600">AI-assessed quality</div>
                </div>
              </div>
            </Card>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <BarChart3 className="w-6 h-6 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 text-lg">Workflow Complete!</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Your AI-powered admission workflow is now fully configured and operational. 
                    The system is processing leads 2.3x faster while maintaining high quality standards.
                    Total estimated annual savings: <span className="font-semibold">$125,000</span> with 
                    <span className="font-semibold">45% time reduction</span> in manual processing.
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
          Configure your admission process with AI-powered automation and program-specific workflows
        </p>
      </div>

      {/* Stage Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-sm truncate">{stage.title}</h3>
                    {isCompleted && <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />}
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
              {activeStage === 6 ? 'Complete Setup' : 'Next'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default WorkflowBuilder;