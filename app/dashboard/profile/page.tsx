import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PersonalInfoForm } from '@/components/profile/PersonalInfoForm';
import { WorkHistoryForm } from '@/components/profile/WorkHistoryForm';
import { EducationForm } from '@/components/profile/EducationForm';
import { SkillsForm } from '@/components/profile/SkillsForm';

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">
          Manage your personal information for resume generation and application autofill.
        </p>
      </div>
      
      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList>
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="work">Work History</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
        </TabsList>
        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Add your contact information and personal details.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <PersonalInfoForm />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="work">
          <Card>
            <CardHeader>
              <CardTitle>Work History</CardTitle>
              <CardDescription>
                Add your work experience, starting with the most recent position.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <WorkHistoryForm />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="education">
          <Card>
            <CardHeader>
              <CardTitle>Education</CardTitle>
              <CardDescription>
                Add your educational background, degrees, and certifications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <EducationForm />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="skills">
          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
              <CardDescription>
                Add technical skills, tools, and other competencies.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <SkillsForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 