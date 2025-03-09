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

const educationSchema = z.object({
  school: z.string().min(1, 'School/institution name is required'),
  degree: z.string().min(1, 'Degree or certificate is required'),
  fieldOfStudy: z.string().optional(),
  location: z.string().optional(),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  gpa: z.string().optional(),
  description: z.string().optional(),
});

type Education = z.infer<typeof educationSchema>;

export function EducationForm() {
  const [educationList, setEducationList] = useState<Education[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEducationIndex, setCurrentEducationIndex] = useState<number | null>(null);

  // Initialize form with empty values
  const form = useForm<Education>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      school: '',
      degree: '',
      fieldOfStudy: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      gpa: '',
      description: '',
    },
  });

  // Load education history from localStorage when component mounts
  useState(() => {
    const savedEducation = localStorage.getItem('educationHistory');
    if (savedEducation) {
      setEducationList(JSON.parse(savedEducation));
    }
  });

  function onSubmit(data: Education) {
    setIsSubmitting(true);
    
    setTimeout(() => {
      if (isEditing && currentEducationIndex !== null) {
        // Update existing education entry
        const updatedEducationList = [...educationList];
        updatedEducationList[currentEducationIndex] = data;
        setEducationList(updatedEducationList);
        localStorage.setItem('educationHistory', JSON.stringify(updatedEducationList));
        toast.success('Education updated successfully');
      } else {
        // Add new education entry
        const updatedEducationList = [...educationList, data];
        setEducationList(updatedEducationList);
        localStorage.setItem('educationHistory', JSON.stringify(updatedEducationList));
        toast.success('Education added successfully');
      }
      
      // Reset form and state
      form.reset();
      setIsSubmitting(false);
      setIsEditing(false);
      setCurrentEducationIndex(null);
    }, 1000);
  }

  function editEducation(index: number) {
    const education = educationList[index];
    form.reset(education);
    setIsEditing(true);
    setCurrentEducationIndex(index);
  }

  function deleteEducation(index: number) {
    const updatedEducationList = educationList.filter((_, i) => i !== index);
    setEducationList(updatedEducationList);
    localStorage.setItem('educationHistory', JSON.stringify(updatedEducationList));
    toast.success('Education removed successfully');
    
    // Reset editing state if the deleted education was being edited
    if (isEditing && currentEducationIndex === index) {
      form.reset();
      setIsEditing(false);
      setCurrentEducationIndex(null);
    }
  }

  return (
    <div className="space-y-8">
      {/* List of existing education entries */}
      {educationList.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Your Education</h3>
          {educationList.map((education, index) => (
            <Card key={index} className="relative">
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-2 right-2"
                onClick={() => deleteEducation(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                  <h4 className="font-semibold">{education.degree}</h4>
                  <div className="text-sm text-muted-foreground">
                    {education.startDate} - {education.current ? 'Present' : education.endDate}
                  </div>
                </div>
                <div className="text-sm mb-1">{education.school}</div>
                {education.fieldOfStudy && (
                  <div className="text-sm mb-1">Field of Study: {education.fieldOfStudy}</div>
                )}
                {education.location && (
                  <div className="text-sm mb-1">{education.location}</div>
                )}
                {education.gpa && (
                  <div className="text-sm mb-1">GPA: {education.gpa}</div>
                )}
                {education.description && <p className="text-sm mt-2">{education.description}</p>}
                <Button 
                  variant="link" 
                  className="px-0 mt-2" 
                  onClick={() => editEducation(index)}
                >
                  Edit
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Form for adding or editing education */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="school"
            render={({ field }) => (
              <FormItem>
                <FormLabel>School/Institution</FormLabel>
                <FormControl>
                  <Input placeholder="University of California, Berkeley" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="degree"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Degree/Certificate</FormLabel>
                  <FormControl>
                    <Input placeholder="Bachelor of Science" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fieldOfStudy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Field of Study</FormLabel>
                  <FormControl>
                    <Input placeholder="Computer Science (optional)" {...field} />
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
                  <Input placeholder="Berkeley, CA (optional)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Input placeholder="Sep 2018" {...field} />
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
                      placeholder="Jun 2022 (or leave blank if current)" 
                      disabled={form.getValues('current')}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gpa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GPA</FormLabel>
                  <FormControl>
                    <Input placeholder="3.8 (optional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="current"
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
                  <FormLabel>Currently Studying Here</FormLabel>
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
                    placeholder="Relevant coursework, honors, activities, etc. (optional)"
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
                  setCurrentEducationIndex(null);
                }}
              >
                Cancel
              </Button>
            )}
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting 
                ? 'Saving...' 
                : isEditing 
                ? 'Update Education' 
                : 'Add Education'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
} 