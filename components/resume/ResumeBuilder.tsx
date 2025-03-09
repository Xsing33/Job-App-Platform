import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { PlusCircle, Trash2, GripVertical } from 'lucide-react';

interface ResumeBuilderProps {
  resumeData: any;
  setResumeData: (data: any) => void;
}

export function ResumeBuilder({ resumeData, setResumeData }: ResumeBuilderProps) {
  const [activeTab, setActiveTab] = useState('personal');

  // Initialize resume content with default values on component mount
  useEffect(() => {
    if (!resumeData.content || Object.keys(resumeData.content).length === 0) {
      // Get personal info from localStorage if available
      let personalInfo = {};
      const storedPersonalInfo = localStorage.getItem('personalInfo');
      if (storedPersonalInfo) {
        personalInfo = JSON.parse(storedPersonalInfo);
      }

      // Get work history from localStorage if available
      let workHistory = [];
      const storedWorkHistory = localStorage.getItem('workHistory');
      if (storedWorkHistory) {
        workHistory = JSON.parse(storedWorkHistory);
      }

      // Get education from localStorage if available
      let education = [];
      const storedEducation = localStorage.getItem('educationHistory');
      if (storedEducation) {
        education = JSON.parse(storedEducation);
      }

      // Get skills from localStorage if available
      let skills = {};
      const storedSkills = localStorage.getItem('skills');
      if (storedSkills) {
        skills = JSON.parse(storedSkills);
      }

      // Set initial content with data from localStorage or empty defaults
      setResumeData({
        ...resumeData,
        content: {
          personal: {
            firstName: personalInfo.firstName || '',
            lastName: personalInfo.lastName || '',
            email: personalInfo.email || '',
            phone: personalInfo.phone || '',
            address: personalInfo.address || '',
            city: personalInfo.city || '',
            state: personalInfo.state || '',
            zipCode: personalInfo.zipCode || '',
            linkedin: personalInfo.linkedin || '',
            website: personalInfo.website || '',
            summary: '',
          },
          workExperience: workHistory || [],
          education: education || [],
          skills: skills || {
            technical: [],
            soft: [],
            language: [],
            tools: [],
            other: [],
          },
          // Additional sections can be added here
          customSections: [],
        },
      });
    }
  }, []);

  const handlePersonalInfoChange = (field: string, value: string) => {
    setResumeData({
      ...resumeData,
      content: {
        ...resumeData.content,
        personal: {
          ...resumeData.content.personal,
          [field]: value,
        },
      },
    });
  };

  const handleSummaryChange = (value: string) => {
    setResumeData({
      ...resumeData,
      content: {
        ...resumeData.content,
        personal: {
          ...resumeData.content.personal,
          summary: value,
        },
      },
    });
  };

  const addCustomSection = () => {
    setResumeData({
      ...resumeData,
      content: {
        ...resumeData.content,
        customSections: [
          ...resumeData.content.customSections,
          {
            id: `section-${Date.now()}`,
            title: 'New Section',
            items: [],
          },
        ],
      },
    });
  };

  // If content is not yet initialized, show a loading state
  if (!resumeData.content || Object.keys(resumeData.content).length === 0) {
    return <div className="py-8 text-center">Loading resume editor...</div>;
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={resumeData.content.personal.firstName}
                onChange={(e) => handlePersonalInfoChange('firstName', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={resumeData.content.personal.lastName}
                onChange={(e) => handlePersonalInfoChange('lastName', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={resumeData.content.personal.email}
                onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={resumeData.content.personal.phone}
                onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={resumeData.content.personal.address}
              onChange={(e) => handlePersonalInfoChange('address', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={resumeData.content.personal.city}
                onChange={(e) => handlePersonalInfoChange('city', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                value={resumeData.content.personal.state}
                onChange={(e) => handlePersonalInfoChange('state', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zipCode">Zip Code</Label>
              <Input
                id="zipCode"
                value={resumeData.content.personal.zipCode}
                onChange={(e) => handlePersonalInfoChange('zipCode', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                value={resumeData.content.personal.linkedin}
                onChange={(e) => handlePersonalInfoChange('linkedin', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={resumeData.content.personal.website}
                onChange={(e) => handlePersonalInfoChange('website', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="summary">Professional Summary</Label>
            <textarea
              id="summary"
              className="min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Write a professional summary highlighting your key strengths and experience..."
              value={resumeData.content.personal.summary}
              onChange={(e) => handleSummaryChange(e.target.value)}
            />
          </div>
        </TabsContent>

        <TabsContent value="experience" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Work Experience</h3>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <PlusCircle className="h-4 w-4" />
              Add Position
            </Button>
          </div>

          {resumeData.content.workExperience.length > 0 ? (
            <Accordion type="multiple" defaultValue={['item-0']} className="space-y-2">
              {resumeData.content.workExperience.map((job, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-md">
                  <AccordionTrigger className="px-4 hover:no-underline">
                    <div className="flex items-center gap-2">
                      <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                      <div className="text-left">
                        <div>{job.title || 'Untitled Position'}</div>
                        <div className="text-sm text-muted-foreground">
                          {job.company}{job.location ? `, ${job.location}` : ''}
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-2">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-xs text-right">
                          <Button variant="ghost" size="sm" className="h-7 px-2 text-destructive">
                            <Trash2 className="h-3.5 w-3.5 mr-1" />
                            Remove
                          </Button>
                        </div>
                        <div className="job-form space-y-4">
                          {/* Job details would be edited here */}
                          <div className="text-sm text-muted-foreground italic">
                            Use your work history from your profile. You can edit or customize entries specifically for this resume.
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="border rounded-md p-6 text-center bg-muted/20">
              <div className="text-muted-foreground mb-4">No work experience added yet</div>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <PlusCircle className="h-4 w-4" />
                Add Position
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="education" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Education</h3>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <PlusCircle className="h-4 w-4" />
              Add Education
            </Button>
          </div>

          {resumeData.content.education.length > 0 ? (
            <Accordion type="multiple" defaultValue={['item-0']} className="space-y-2">
              {resumeData.content.education.map((edu, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-md">
                  <AccordionTrigger className="px-4 hover:no-underline">
                    <div className="flex items-center gap-2">
                      <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                      <div className="text-left">
                        <div>{edu.degree || 'Untitled Degree'}</div>
                        <div className="text-sm text-muted-foreground">
                          {edu.school}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-2">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-xs text-right">
                          <Button variant="ghost" size="sm" className="h-7 px-2 text-destructive">
                            <Trash2 className="h-3.5 w-3.5 mr-1" />
                            Remove
                          </Button>
                        </div>
                        <div className="education-form space-y-4">
                          {/* Education details would be edited here */}
                          <div className="text-sm text-muted-foreground italic">
                            Use your education history from your profile. You can edit or customize entries specifically for this resume.
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="border rounded-md p-6 text-center bg-muted/20">
              <div className="text-muted-foreground mb-4">No education added yet</div>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <PlusCircle className="h-4 w-4" />
                Add Education
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="skills" className="space-y-4">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Skills</h3>
            
            {Object.keys(resumeData.content.skills).map(category => {
              const skills = resumeData.content.skills[category];
              if (skills.length === 0) return null;
              
              return (
                <Card key={category}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium capitalize">{category === 'technical' ? 'Technical Skills' : 
                                                              category === 'soft' ? 'Soft Skills' :
                                                              category === 'language' ? 'Languages' :
                                                              category === 'tools' ? 'Tools & Software' : 
                                                              'Other Skills'}</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, index) => (
                        <div key={index} className="flex items-center gap-1 bg-muted px-2 py-1 rounded-md text-sm">
                          <span>{skill.name}</span>
                          <button className="text-muted-foreground hover:text-destructive">
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
            
            <div className="text-sm text-muted-foreground">
              Skills are imported from your profile. You can manage and update your skills in the Profile section.
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Custom Sections */}
      <div className="pt-4 border-t">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Additional Sections</h3>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={addCustomSection}
          >
            <PlusCircle className="h-4 w-4" />
            Add Section
          </Button>
        </div>

        {resumeData.content.customSections?.length > 0 ? (
          <Accordion type="multiple" className="space-y-2">
            {resumeData.content.customSections.map((section, index) => (
              <AccordionItem key={index} value={`custom-${index}`} className="border rounded-md">
                <AccordionTrigger className="px-4 hover:no-underline">
                  <div className="flex items-center gap-2">
                    <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                    <span>{section.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 py-2">
                  <Card>
                    <CardContent className="p-4 space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="space-y-2 flex-1">
                          <Label htmlFor={`section-title-${index}`}>Section Title</Label>
                          <Input
                            id={`section-title-${index}`}
                            value={section.title}
                            // Update section title functionality would go here
                          />
                        </div>
                        <div className="pl-4">
                          <Button variant="ghost" size="sm" className="h-8 px-2 text-destructive">
                            <Trash2 className="h-3.5 w-3.5 mr-1" />
                            Remove Section
                          </Button>
                        </div>
                      </div>
                      
                      {/* Add items to this section */}
                      <div className="pt-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full justify-center text-sm"
                        >
                          <PlusCircle className="h-3.5 w-3.5 mr-1" />
                          Add Item
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="text-sm text-muted-foreground">
            Add custom sections like "Projects," "Certifications," or "Volunteer Experience."
          </div>
        )}
      </div>
    </div>
  );
} 