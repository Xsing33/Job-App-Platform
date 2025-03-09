"use client";

import { useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X } from 'lucide-react';

const skillCategories = [
  { value: 'technical', label: 'Technical Skills' },
  { value: 'soft', label: 'Soft Skills' },
  { value: 'language', label: 'Languages' },
  { value: 'tools', label: 'Tools & Software' },
  { value: 'other', label: 'Other Skills' },
];

const skillSchema = z.object({
  name: z.string().min(1, 'Skill name is required'),
  category: z.string().min(1, 'Category is required'),
  proficiency: z.enum(['beginner', 'intermediate', 'advanced', 'expert']).optional(),
});

type Skill = z.infer<typeof skillSchema>;

interface SkillsByCategory {
  [key: string]: Skill[];
}

export function SkillsForm() {
  const [skillsByCategory, setSkillsByCategory] = useState<SkillsByCategory>({
    technical: [],
    soft: [],
    language: [],
    tools: [],
    other: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with empty values
  const form = useForm<Skill>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      name: '',
      category: 'technical',
      proficiency: 'intermediate',
    },
  });

  // Load skills from localStorage when component mounts
  useEffect(() => {
    const savedSkills = localStorage.getItem('skills');
    if (savedSkills) {
      setSkillsByCategory(JSON.parse(savedSkills));
    }
  }, []);

  function onSubmit(data: Skill) {
    setIsSubmitting(true);
    
    setTimeout(() => {
      // Check if skill already exists in the category
      const exists = skillsByCategory[data.category].some(
        skill => skill.name.toLowerCase() === data.name.toLowerCase()
      );
      
      if (exists) {
        toast.error(`"${data.name}" already exists in ${getCategoryLabel(data.category)}`);
        setIsSubmitting(false);
        return;
      }
      
      // Add new skill to the appropriate category
      const updatedSkillsByCategory = {
        ...skillsByCategory,
        [data.category]: [...skillsByCategory[data.category], data],
      };
      
      setSkillsByCategory(updatedSkillsByCategory);
      localStorage.setItem('skills', JSON.stringify(updatedSkillsByCategory));
      toast.success('Skill added successfully');
      
      // Reset form and state
      form.reset({
        name: '',
        category: data.category,
        proficiency: data.proficiency,
      });
      setIsSubmitting(false);
    }, 500);
  }

  function deleteSkill(category: string, skillName: string) {
    const updatedCategory = skillsByCategory[category].filter(
      skill => skill.name !== skillName
    );
    
    const updatedSkillsByCategory = {
      ...skillsByCategory,
      [category]: updatedCategory,
    };
    
    setSkillsByCategory(updatedSkillsByCategory);
    localStorage.setItem('skills', JSON.stringify(updatedSkillsByCategory));
    toast.success('Skill removed successfully');
  }

  function getCategoryLabel(categoryValue: string): string {
    const category = skillCategories.find(c => c.value === categoryValue);
    return category ? category.label : categoryValue;
  }

  function getProficiencyColor(proficiency?: string): string {
    switch (proficiency) {
      case 'beginner':
        return 'bg-blue-100 text-blue-800';
      case 'intermediate':
        return 'bg-green-100 text-green-800';
      case 'advanced':
        return 'bg-purple-100 text-purple-800';
      case 'expert':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  const totalSkills = Object.values(skillsByCategory).reduce(
    (sum, skills) => sum + skills.length, 
    0
  );

  return (
    <div className="space-y-8">
      {/* Add skill form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skill</FormLabel>
                  <FormControl>
                    <Input placeholder="React.js, Project Management, Spanish, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      {...field}
                    >
                      {skillCategories.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="proficiency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Proficiency Level (Optional)</FormLabel>
                <FormControl>
                  <div className="flex flex-wrap gap-2">
                    {['beginner', 'intermediate', 'advanced', 'expert'].map((level) => (
                      <label 
                        key={level} 
                        className={`flex items-center px-3 py-1 rounded-full text-sm cursor-pointer ${field.value === level ? getProficiencyColor(level) : 'bg-muted'}`}
                      >
                        <input 
                          type="radio" 
                          name="proficiency" 
                          value={level} 
                          checked={field.value === level}
                          onChange={(e) => field.onChange(e.target.value)}
                          className="mr-1 opacity-0 absolute"
                        />
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </label>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Adding...' : 'Add Skill'}
          </Button>
        </form>
      </Form>

      {/* Skills list by category */}
      {totalSkills > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category) => {
            const skills = skillsByCategory[category.value] || [];
            if (skills.length === 0) return null;
            
            return (
              <Card key={category.value}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{category.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <div 
                        key={index} 
                        className={`flex items-center gap-1 rounded-full px-3 py-1 text-sm ${getProficiencyColor(skill.proficiency)}`}
                      >
                        {skill.name}
                        <button
                          onClick={() => deleteSkill(category.value, skill.name)}
                          className="ml-1 rounded-full p-0.5 hover:bg-white/20"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          Add skills to enhance your profile and help with job matching.
        </div>
      )}
    </div>
  );
} 