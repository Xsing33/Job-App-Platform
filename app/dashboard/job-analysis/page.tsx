"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

// Example mock data for demonstration
const MOCK_KEYWORDS = {
  technical: [
    { keyword: 'React.js', count: 5, matches: true },
    { keyword: 'TypeScript', count: 3, matches: true },
    { keyword: 'Node.js', count: 2, matches: false },
    { keyword: 'GraphQL', count: 2, matches: false },
    { keyword: 'AWS', count: 1, matches: false },
  ],
  soft: [
    { keyword: 'Communication', count: 3, matches: true },
    { keyword: 'Team player', count: 2, matches: true },
    { keyword: 'Problem solving', count: 2, matches: false },
    { keyword: 'Leadership', count: 1, matches: false },
  ],
  tools: [
    { keyword: 'Git', count: 2, matches: true },
    { keyword: 'Docker', count: 1, matches: false },
    { keyword: 'Jira', count: 1, matches: false },
  ],
};

const MOCK_SKILLS_MATCH = {
  match: 65,
  missingSkills: [
    'Node.js',
    'GraphQL',
    'AWS',
    'Problem solving',
    'Leadership',
    'Docker',
    'Jira',
  ],
  matchingSkills: [
    'React.js',
    'TypeScript',
    'Communication',
    'Team player',
    'Git',
  ],
};

export default function JobAnalysisPage() {
  const [jobDescription, setJobDescription] = useState('');
  const [jobUrl, setJobUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<null | typeof MOCK_KEYWORDS>(null);
  const [skillsMatch, setSkillsMatch] = useState<null | typeof MOCK_SKILLS_MATCH>(null);

  const handleAnalyze = async (type: 'text' | 'url') => {
    const content = type === 'text' ? jobDescription : jobUrl;
    
    if (!content.trim()) {
      toast.error(type === 'text' 
        ? 'Please enter a job description' 
        : 'Please enter a job posting URL');
      return;
    }
    
    setIsAnalyzing(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setAnalysisResult(MOCK_KEYWORDS);
      setSkillsMatch(MOCK_SKILLS_MATCH);
      setIsAnalyzing(false);
      toast.success('Job description analyzed successfully');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Job Description Analysis</h1>
        <p className="text-muted-foreground">
          Analyze job descriptions to identify key skills and requirements for your resume.
        </p>
      </div>
      
      <Tabs defaultValue="text" className="space-y-4">
        <TabsList>
          <TabsTrigger value="text">Paste Job Description</TabsTrigger>
          <TabsTrigger value="url">Job Posting URL</TabsTrigger>
        </TabsList>
        
        <TabsContent value="text" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
              <CardDescription>
                Paste the full job description text below to analyze required skills and keywords.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <textarea 
                className="min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Paste job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
              <Button 
                onClick={() => handleAnalyze('text')} 
                disabled={isAnalyzing || !jobDescription.trim()}
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze Job Description'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="url" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Job Posting URL</CardTitle>
              <CardDescription>
                Enter the URL of the job posting to extract and analyze the job description.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input 
                placeholder="https://example.com/job-posting"
                value={jobUrl}
                onChange={(e) => setJobUrl(e.target.value)}
              />
              <Button 
                onClick={() => handleAnalyze('url')} 
                disabled={isAnalyzing || !jobUrl.trim()}
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze Job URL'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Analysis Results */}
      {analysisResult && skillsMatch && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Skills Match Analysis</CardTitle>
              <CardDescription>
                How well your profile matches the job requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Match Percentage */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Skills Match</span>
                    <span className="text-sm font-medium">{skillsMatch.match}%</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary" 
                      style={{ width: `${skillsMatch.match}%` }}
                    />
                  </div>
                </div>
                
                {/* Matching Skills */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Your Matching Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillsMatch.matchingSkills.map((skill) => (
                      <Badge key={skill} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* Missing Skills */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Missing Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillsMatch.missingSkills.map((skill) => (
                      <Badge key={skill} variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Keyword Analysis</CardTitle>
              <CardDescription>
                Important keywords extracted from the job description
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Technical Skills */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Technical Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.technical.map((item) => (
                      <Badge 
                        key={item.keyword} 
                        variant="outline" 
                        className={item.matches 
                          ? "bg-green-50 text-green-700 border-green-200" 
                          : "bg-muted"
                        }
                      >
                        {item.keyword} ({item.count})
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* Soft Skills */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Soft Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.soft.map((item) => (
                      <Badge 
                        key={item.keyword} 
                        variant="outline" 
                        className={item.matches 
                          ? "bg-green-50 text-green-700 border-green-200" 
                          : "bg-muted"
                        }
                      >
                        {item.keyword} ({item.count})
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* Tools */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Tools & Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.tools.map((item) => (
                      <Badge 
                        key={item.keyword} 
                        variant="outline" 
                        className={item.matches 
                          ? "bg-green-50 text-green-700 border-green-200" 
                          : "bg-muted"
                        }
                      >
                        {item.keyword} ({item.count})
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex gap-4">
            <Button>Generate Tailored Resume</Button>
            <Button variant="outline">Save Analysis</Button>
          </div>
        </div>
      )}
    </div>
  );
} 