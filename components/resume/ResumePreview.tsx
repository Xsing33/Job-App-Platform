import { Phone, Mail, Globe, Linkedin } from 'lucide-react';

interface ResumePreviewProps {
  resumeData: any;
}

export function ResumePreview({ resumeData }: ResumePreviewProps) {
  const { template, content } = resumeData;
  
  if (!content || Object.keys(content).length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        Loading preview...
      </div>
    );
  }

  // Choose template component based on selected template
  switch (template) {
    case 'professional':
      return <ProfessionalTemplate content={content} />;
    case 'modern':
      return <ModernTemplate content={content} />;
    case 'creative':
      return <CreativeTemplate content={content} />;
    case 'minimal':
      return <MinimalTemplate content={content} />;
    default:
      return <ProfessionalTemplate content={content} />;
  }
}

// Professional Template Component
function ProfessionalTemplate({ content }: { content: any }) {
  const { personal, workExperience, education, skills, customSections } = content;
  
  return (
    <div className="bg-white text-black p-10 h-full font-sans">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">
          {personal.firstName} {personal.lastName}
        </h1>
        
        {/* Contact Information */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
          {personal.email && (
            <div className="flex items-center gap-1">
              <Mail className="h-3.5 w-3.5" />
              <span>{personal.email}</span>
            </div>
          )}
          {personal.phone && (
            <div className="flex items-center gap-1">
              <Phone className="h-3.5 w-3.5" />
              <span>{personal.phone}</span>
            </div>
          )}
          {personal.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="h-3.5 w-3.5" />
              <span>{personal.linkedin.replace('https://linkedin.com/in/', '')}</span>
            </div>
          )}
          {personal.website && (
            <div className="flex items-center gap-1">
              <Globe className="h-3.5 w-3.5" />
              <span>{personal.website.replace('https://', '')}</span>
            </div>
          )}
        </div>
      </header>

      {/* Summary */}
      {personal.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 border-b pb-1 mb-2">Professional Summary</h2>
          <p className="text-sm text-gray-700">{personal.summary}</p>
        </section>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 border-b pb-1 mb-2">Work Experience</h2>
          <div className="space-y-4">
            {workExperience.map((job, index) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-semibold text-gray-800">{job.title}</h3>
                    <p className="text-sm text-gray-600">{job.company}{job.location ? `, ${job.location}` : ''}</p>
                  </div>
                  <p className="text-sm text-gray-600">
                    {job.startDate} - {job.currentJob ? 'Present' : job.endDate}
                  </p>
                </div>
                {job.description && (
                  <p className="text-sm text-gray-700">{job.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 border-b pb-1 mb-2">Education</h2>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                    <p className="text-sm text-gray-600">
                      {edu.school}
                      {edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}
                      {edu.gpa ? ` • GPA: ${edu.gpa}` : ''}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600">
                    {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                  </p>
                </div>
                {edu.description && (
                  <p className="text-sm text-gray-700">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {Object.values(skills).some(category => (category as any[]).length > 0) && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 border-b pb-1 mb-2">Skills</h2>
          <div className="space-y-2">
            {Object.entries(skills).map(([category, skillsList]) => {
              if ((skillsList as any[]).length === 0) return null;
              
              const categoryLabel = 
                category === 'technical' ? 'Technical Skills' : 
                category === 'soft' ? 'Soft Skills' :
                category === 'language' ? 'Languages' :
                category === 'tools' ? 'Tools & Software' : 
                'Other Skills';
              
              return (
                <div key={category}>
                  <h3 className="font-medium text-sm text-gray-700">{categoryLabel}:</h3>
                  <p className="text-sm text-gray-600">
                    {(skillsList as any[]).map(skill => skill.name).join(', ')}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Custom Sections */}
      {customSections && customSections.length > 0 && (
        <>
          {customSections.map((section, index) => (
            <section key={index} className="mb-6">
              <h2 className="text-lg font-bold text-gray-800 border-b pb-1 mb-2">{section.title}</h2>
              {section.items && section.items.length > 0 ? (
                <div className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <div key={itemIndex}>
                      {/* Custom section item rendering would go here */}
                      <p className="text-sm text-gray-700">{item.content}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic">No items added to this section yet.</p>
              )}
            </section>
          ))}
        </>
      )}
    </div>
  );
}

// Modern Template Component
function ModernTemplate({ content }: { content: any }) {
  const { personal, workExperience, education, skills, customSections } = content;
  
  return (
    <div className="bg-white text-black h-full font-sans flex">
      {/* Left Sidebar */}
      <div className="bg-gray-100 w-1/3 p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1 text-gray-800">
            {personal.firstName}<br />{personal.lastName}
          </h1>
          {personal.jobTitle && (
            <p className="text-sm font-medium text-gray-600">{personal.jobTitle}</p>
          )}
        </div>
        
        {/* Contact Information */}
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-700 mb-3">Contact</h2>
          <div className="space-y-2 text-sm">
            {personal.email && (
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-gray-500" />
                <span>{personal.email}</span>
              </div>
            )}
            {personal.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-gray-500" />
                <span>{personal.phone}</span>
              </div>
            )}
            {personal.linkedin && (
              <div className="flex items-center gap-2">
                <Linkedin className="h-3.5 w-3.5 text-gray-500" />
                <span>{personal.linkedin.replace('https://linkedin.com/in/', '')}</span>
              </div>
            )}
            {personal.website && (
              <div className="flex items-center gap-2">
                <Globe className="h-3.5 w-3.5 text-gray-500" />
                <span>{personal.website.replace('https://', '')}</span>
              </div>
            )}
          </div>
        </section>
        
        {/* Skills */}
        {Object.values(skills).some(category => (category as any[]).length > 0) && (
          <section className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-700 mb-3">Skills</h2>
            <div className="space-y-3">
              {Object.entries(skills).map(([category, skillsList]) => {
                if ((skillsList as any[]).length === 0) return null;
                
                const categoryLabel = 
                  category === 'technical' ? 'Technical' : 
                  category === 'soft' ? 'Soft Skills' :
                  category === 'language' ? 'Languages' :
                  category === 'tools' ? 'Tools' : 
                  'Other';
                
                return (
                  <div key={category}>
                    <h3 className="text-xs font-medium text-gray-600">{categoryLabel}</h3>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {(skillsList as any[]).map((skill, i) => (
                        <span key={i} className="bg-gray-200 px-2 py-0.5 rounded text-xs">
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
      
      {/* Main Content */}
      <div className="w-2/3 p-6">
        {/* Summary */}
        {personal.summary && (
          <section className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-700 mb-2">Profile</h2>
            <p className="text-sm text-gray-700">{personal.summary}</p>
          </section>
        )}

        {/* Work Experience */}
        {workExperience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-700 mb-3">Experience</h2>
            <div className="space-y-4">
              {workExperience.map((job, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-gray-800">{job.title}</h3>
                    <p className="text-xs text-gray-500">
                      {job.startDate} - {job.currentJob ? 'Present' : job.endDate}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{job.company}{job.location ? `, ${job.location}` : ''}</p>
                  {job.description && (
                    <p className="text-sm text-gray-700">{job.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-700 mb-3">Education</h2>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                    <p className="text-xs text-gray-500">
                      {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    {edu.school}
                    {edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}
                    {edu.gpa ? ` • GPA: ${edu.gpa}` : ''}
                  </p>
                  {edu.description && (
                    <p className="text-sm text-gray-700">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Custom Sections */}
        {customSections && customSections.length > 0 && (
          <>
            {customSections.map((section, index) => (
              <section key={index} className="mb-6">
                <h2 className="text-sm font-bold uppercase tracking-wider text-gray-700 mb-3">{section.title}</h2>
                {section.items && section.items.length > 0 ? (
                  <div className="space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <div key={itemIndex}>
                        <p className="text-sm text-gray-700">{item.content}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic">No items added to this section yet.</p>
                )}
              </section>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

// Simple template component stubs for other templates
function CreativeTemplate({ content }: { content: any }) {
  return (
    <div className="bg-white text-black h-full font-sans p-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-purple-700 border-b-2 border-purple-700 pb-2">
        {content.personal.firstName} {content.personal.lastName}
      </h1>
      <div className="text-center text-sm mb-8">
        <p>Creative Template Preview</p>
        <p>Full implementation coming soon</p>
      </div>
    </div>
  );
}

function MinimalTemplate({ content }: { content: any }) {
  return (
    <div className="bg-white text-black h-full font-sans p-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">
        {content.personal.firstName} {content.personal.lastName}
      </h1>
      <div className="text-sm mb-8">
        <p>Minimal Template Preview</p>
        <p>Full implementation coming soon</p>
      </div>
    </div>
  );
} 