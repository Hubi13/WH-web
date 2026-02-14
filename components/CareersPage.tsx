import React, { useState } from 'react';
import { ArrowLeft, Users, Briefcase, ArrowRight, CheckCircle2 } from 'lucide-react';
import { usePage } from '../contexts/PageContext';

interface Job {
  id: string;
  title: string;
  loc: string;
  type: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
}

const CareersPage: React.FC = () => {
  const { setPage } = usePage();
  const [activeTab, setActiveTab] = useState('openings');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const navItems = [
    { id: 'openings', label: 'Open Positions', icon: Briefcase },
    { id: 'culture', label: 'Culture', icon: Users },
  ];

  const handleBack = () => {
  setPage('home');
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
};


  const jobs: Job[] = [
    { 
      id: 'arch-eng',
      title: 'Senior Architectural Engineer', 
      loc: 'Warsaw, PL', 
      type: 'Full-Time',
      description: 'Lead the structural design of our next-generation modular units. You will bridge the gap between aesthetic ambition and physical reality, ensuring every millimeter is accounted for in our automated assembly process.',
      responsibilities: [
          'Oversee structural integrity of R-Sequence and R-Infinity modules.',
          'Collaborate with manufacturing teams to optimize DfMA (Design for Manufacture and Assembly).',
          'Manage compliance with EU Eurocode standards.',
          'Mentor junior engineers and architectural staff.'
      ],
      requirements: [
          'Masters in Structural Engineering or Architecture.',
          '7+ years experience in modular, automotive, or high-rise construction.',
          'Proficiency in Revit, Rhino, and structural analysis software.',
          'Fluency in English and Polish.'
      ]
    },
    { 
      id: 'comp-des',
      title: 'Computational Designer', 
      loc: 'Remote / Hybrid', 
      type: 'Full-Time',
      description: 'Develop parametric tools to automate the customization of R-Home units. You will build the logic that allows clients to configure complex architectural systems in real-time, translating user inputs into fabrication-ready data.',
      responsibilities: [
          'Create robust Grasshopper definitions for automated geometry generation.',
          'Develop C# / Python scripts to interface with our web configurator.',
          'Optimize geometry for web-based visualization (three.js/R3F).',
          'Generate automated BOM (Bill of Materials) data from 3D models.'
      ],
      requirements: [
          'Expertise in Rhino + Grasshopper is non-negotiable.',
          'Experience with C# or Python scripting.',
          'Portfolio demonstrating complex parametric geometries.',
          'Background in Architecture or Industrial Design.'
      ]
    },
    { 
      id: 'supply-chain',
      title: 'Supply Chain Manager', 
      loc: 'Warsaw, PL', 
      type: 'Full-Time', 
      description: 'Orchestrate the flow of materials for our just-in-time manufacturing process. You will manage relationships with specialized suppliers across Europe to ensure zero downtime in our assembly facility.',
      responsibilities: [
          'Manage procurement of raw materials (CLT, Aluminum, Glass).',
          'Optimize logistics for component delivery to the assembly hall.',
          'Negotiate long-term contracts with key European partners.',
          'Implement inventory tracking systems for real-time visibility.'
      ],
      requirements: [
          '5+ years in automotive or construction supply chain management.',
          'Experience with modern ERP systems.',
          'Strong negotiation skills and analytical mindset.',
          'Willingness to travel within EU.'
      ]
    },
    { 
      id: 'webgl-dev',
      title: 'React / WebGL Developer', 
      loc: 'Remote', 
      type: 'Contract',
      description: 'Push the boundaries of web-based 3D configuration. You will work on our proprietary R-Configurator, optimizing the React Fiber / Three.js rendering engine for photorealistic performance in the browser.',
      responsibilities: [
          'Maintain and upgrade the 3D configurator codebase.',
          'Implement custom shaders (GLSL) for realistic material representation.',
          'Optimize 3D assets for fast loading and smooth framerates.',
          'Integrate frontend UI with backend pricing logic.'
      ],
      requirements: [
          'Strong React & TypeScript skills.',
          'Deep experience with Three.js / React Three Fiber.',
          'Understanding of PBR (Physically Based Rendering) workflows.',
          'Eye for performance optimization and clean code.'
      ]
    },
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setSelectedJob(null); // Reset detail view when changing tabs
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] pt-24 pb-12">
      
      {/* Navigation Header */}
      <div className="fixed top-0 left-0 w-full bg-[#F5F5F7]/90 backdrop-blur-md border-b border-[#1D1D1F]/10 z-50">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
            <button 
                onClick={handleBack}
                className="flex items-center gap-2 text-[#666] hover:text-black transition-colors text-xs font-bold uppercase tracking-[0.2em]"
            >
                <ArrowLeft size={14} /> Back to Home
            </button>
            <span className="text-sm font-medium">Careers at R-Home</span>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 pt-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
            
            {/* Sidebar Navigation */}
            <div className="w-full lg:w-1/4">
                <div className="sticky top-32 space-y-2">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => handleTabChange(item.id)}
                            className={`w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-300 ${
                                activeTab === item.id 
                                ? 'bg-[#1D1D1F] text-white shadow-lg' 
                                : 'text-[#666] hover:bg-white hover:text-black hover:shadow-sm'
                            }`}
                        >
                            <item.icon size={18} />
                            <span className="text-xs font-bold uppercase tracking-widest">{item.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div className="w-full lg:w-3/4 min-h-[60vh] animate-fade-in-up">
                
                {activeTab === 'openings' && (
                    <div className="space-y-8 max-w-4xl">
                        
                        {!selectedJob ? (
                            // LIST VIEW
                            <>
                                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#666]">Join the Team</span>
                                <h1 className="font-display text-4xl md:text-5xl font-light mb-8">Current Openings</h1>
                                <p className="text-[#666] max-w-2xl mb-8">
                                    We are looking for obsessive detailers, systemic thinkers, and radical innovators.
                                </p>
                                
                                <div className="space-y-4">
                                    {jobs.map((job) => (
                                        <div 
                                            key={job.id} 
                                            onClick={() => setSelectedJob(job)}
                                            className="group bg-white p-6 rounded-xl border border-gray-200 hover:border-black/20 hover:shadow-lg transition-all cursor-pointer flex flex-col md:flex-row justify-between md:items-center"
                                        >
                                            <div>
                                                <h3 className="text-xl font-medium text-[#1D1D1F]">{job.title}</h3>
                                                <div className="flex gap-4 mt-2 text-xs text-[#666] font-mono uppercase tracking-wider">
                                                    <span>{job.loc}</span>
                                                    <span>•</span>
                                                    <span>{job.type}</span>
                                                </div>
                                            </div>
                                            <div className="mt-4 md:mt-0 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                                                <ArrowRight size={20} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            // DETAIL VIEW
                            <div className="animate-fade-in-up">
                                <button 
                                    onClick={() => setSelectedJob(null)}
                                    className="flex items-center gap-2 text-[#666] hover:text-black transition-colors text-xs font-bold uppercase tracking-[0.2em] mb-8"
                                >
                                    <ArrowLeft size={14} /> Back to Openings
                                </button>

                                <div className="bg-white p-8 md:p-12 rounded-2xl border border-gray-200 shadow-sm">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                                        <div>
                                            <h1 className="font-display text-3xl md:text-4xl font-light text-[#1D1D1F]">{selectedJob.title}</h1>
                                            <div className="flex gap-4 mt-3 text-xs text-[#666] font-mono uppercase tracking-wider">
                                                <span>{selectedJob.loc}</span>
                                                <span>•</span>
                                                <span>{selectedJob.type}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-8">
                                        <div>
                                            <h3 className="text-sm font-bold uppercase tracking-widest mb-4">The Role</h3>
                                            <p className="text-[#666] leading-relaxed font-light text-lg">
                                                {selectedJob.description}
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                            <div>
                                                <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Responsibilities</h3>
                                                <ul className="space-y-3">
                                                    {selectedJob.responsibilities.map((req, i) => (
                                                        <li key={i} className="flex items-start gap-3 text-[#666] text-sm leading-relaxed">
                                                            <div className="mt-1 min-w-[16px]"><CheckCircle2 size={16} className="text-[#1D1D1F]" /></div>
                                                            {req}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Requirements</h3>
                                                <ul className="space-y-3">
                                                    {selectedJob.requirements.map((req, i) => (
                                                        <li key={i} className="flex items-start gap-3 text-[#666] text-sm leading-relaxed">
                                                            <div className="mt-1 min-w-[16px]"><div className="w-1.5 h-1.5 rounded-full bg-[#1D1D1F] mt-1.5"></div></div>
                                                            {req}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-12 pt-8 border-t border-gray-100 text-center">
                                         <p className="text-xs text-[#888] mb-4">
                                            Please send your CV and portfolio (max 10MB) to
                                         </p>
                                         <a href="mailto:careers@r-home.systems" className="text-lg font-medium text-[#1D1D1F] hover:underline">
                                            careers@r-home.systems
                                         </a>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'culture' && (
                    <div className="space-y-8 max-w-3xl">
                        <h1 className="font-display text-4xl md:text-5xl font-light mb-8">Engineering Culture</h1>
                        <div className="text-[#444] space-y-6 leading-relaxed font-light text-lg">
                            <p>
                                R-Home operates more like a tech startup than an architecture firm. We value iteration, prototyping, and first-principles thinking over tradition.
                            </p>
                            <p>
                                Our HQ in Warsaw is located at Złota 44, designed by Daniel Libeskind. It serves as both our workspace and our laboratory for high-rise residential innovation.
                            </p>
                            <div className="aspect-video w-full bg-[#111] rounded-2xl overflow-hidden relative mt-8">
                                <img src="https://i.imgur.com/fNQn8nP.jpeg" className="w-full h-full object-cover opacity-80" alt="Office Culture" />
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
      </div>
    </div>
  );
};

export default CareersPage;