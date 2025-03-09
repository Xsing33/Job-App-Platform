"use client";

import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2 } from 'lucide-react';

const jobSchema = z.object({
  title: z.string().min(1, 'Job title is required'),
  company: z.string().min(1, 'Company name is required'),
  location: z.string().optional(),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  currentJob: z.boolean().default(false),
  description: z.string().optional(),
});

type Job = z.infer<typeof jobSchema>;

export function WorkHistoryForm() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentJobIndex, setCurrentJobIndex] = useState<number | null>(null);

  // Initialize form with empty values
  const form = useForm<Job>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      currentJob: false,
      description: '',
    },
  });

  // Load jobs from localStorage when component mounts
  useState(() => {
    const savedJobs = localStorage.getItem('workHistory');
    if (savedJobs) {
      setJobs(JSON.parse(savedJobs));
    }
  });

  function onSubmit(data: Job) {
    setIsSubmitting(true);
    
    setTimeout(() => {
      if (isEditing && currentJobIndex !== null) {
        // Update existing job
        const updatedJobs = [...jobs];
        updatedJobs[currentJobIndex] = data;
        setJobs(updatedJobs);
        localStorage.setItem('workHistory', JSON.stringify(updatedJobs));
        toast.success('Job updated successfully');
      } else {
        // Add new job
        const updatedJobs = [...jobs, data];
        setJobs(updatedJobs);
        localStorage.setItem('workHistory', JSON.stringify(updatedJobs));
        toast.success('Job added successfully');
      }
      
      // Reset form and state
      form.reset();
      setIsSubmitting(false);
      setIsEditing(false);
      setCurrentJobIndex(null);
    }, 1000);
  }

  function editJob(index: number) {
    const job = jobs[index];
    form.reset(job);
    setIsEditing(true);
    setCurrentJobIndex(index);
  }

  function deleteJob(index: number) {
    const updatedJobs = jobs.filter((_, i) => i !== index);
    setJobs(updatedJobs);
    localStorage.setItem('workHistory', JSON.stringify(updatedJobs));
    toast.success('Job removed successfully');
    
    // Reset editing state if the deleted job was being edited
    if (isEditing && currentJobIndex === index) {
      form.reset();
      setIsEditing(false);
      setCurrentJobIndex(null);
    }
  }

  return (
    <div className="space-y-8">
      {/* List of existing jobs */}
      {jobs.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Your Work History</h3>
          {jobs.map((job, index) => (
            <Card key={index} className="relative">
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-2 right-2"
                onClick={() => deleteJob(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                  <h4 className="font-semibold">{job.title}</h4>
                  <div className="text-sm text-muted-foreground">
                    {job.startDate} - {job.currentJob ? 'Present' : job.endDate}
                  </div>
                </div>
                <div className="text-sm mb-2">
                  {job.company}{job.location ? `, ${job.location}` : ''}
                </div>
                {job.description && <p className="text-sm">{job.description}</p>}
                <Button 
                  variant="link" 
                  className="px-0 mt-2" 
                  onClick={() => editJob(index)}
                >
                  Edit
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Form for adding or editing a job */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Software Engineer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input placeholder="Acme Inc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="San Francisco, CA (optional)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Input placeholder="Jan 2020" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Dec 2022 (or leave blank if current)" 
                      disabled={form.getValues('currentJob')}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="currentJob"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Current Position</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <textarea
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Describe your responsibilities and achievements (optional)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end space-x-2">
            {isEditing && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  form.reset();
                  setIsEditing(false);
                  setCurrentJobIndex(null);
                }}
              >
                Cancel
              </Button>
            )}
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting 
                ? 'Saving...' 
                : isEditing 
                ? 'Update Job' 
                : 'Add Job'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
} 