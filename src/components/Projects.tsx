import { MapPin, Users, Calendar } from 'lucide-react';

export default function Projects() {
  const projects = [
    {
      title: 'Community Immunization Coverage Study',
      location: 'Northern Nigeria',
      description: 'Pilot program assessing the effectiveness of mobile data capture tools for improving vaccination coverage tracking in hard-to-reach communities.',
      status: 'Ongoing',
      participants: '500+ children',
      duration: '6 months',
    },
    {
      title: 'Telehealth Integration Pilot',
      location: 'Lagos State',
      description: 'Testing virtual patient assessment tools in primary healthcare centers to expand access to quality medical consultations.',
      status: 'Completed',
      participants: '12 PHC facilities',
      duration: '3 months',
    },
    {
      title: 'Health Worker Training Platform',
      location: 'Multi-state',
      description: 'Digital learning platform for continuous professional development of community health workers, focusing on maternal and child health.',
      status: 'In Development',
      participants: '200+ CHEWs',
      duration: 'Ongoing',
    },
    {
      title: 'Data-Driven Decision Making Initiative',
      location: 'Federal Capital Territory',
      description: 'Implementing real-time analytics dashboards for health managers to improve program monitoring and resource allocation.',
      status: 'Planning Phase',
      participants: '8 LGA teams',
      duration: '12 months',
    },
    {
      title: 'Mobile Health Screening Program',
      location: 'Rural Communities',
      description: 'Deployment of portable diagnostic tools and mobile apps for early detection of non-communicable diseases in underserved populations.',
      status: 'Pilot Stage',
      participants: '1000+ residents',
      duration: '4 months',
    },
    {
      title: 'Supply Chain Optimization Study',
      location: 'North-Central Zone',
      description: 'Research project examining barriers to medical supply distribution and testing IoT-based tracking solutions.',
      status: 'Data Collection',
      participants: '15 facilities',
      duration: '8 months',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-500/20 text-green-400';
      case 'Ongoing':
        return 'bg-blue-500/20 text-blue-400';
      case 'In Development':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'Pilot Stage':
        return 'bg-purple-500/20 text-purple-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <section id="projects" className="py-20 lg:py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-[#6EBF78]/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Projects & Case Studies</h2>
          <div className="w-20 h-1 bg-[#6EBF78] mx-auto mb-8"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Real-world implementations and research initiatives demonstrating the impact of our innovative solutions across diverse healthcare settings.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-200 hover:border-[#6EBF78] transition-all duration-300 p-6 hover:transform hover:scale-105 shadow-sm hover:shadow-md"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 flex-1">{project.title}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-2 ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-600 text-sm mb-4">
                <MapPin size={16} className="text-[#6EBF78]" />
                <span>{project.location}</span>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed text-sm">{project.description}</p>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Users size={16} className="text-[#6EBF78]" />
                  <span className="text-gray-700">{project.participants}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar size={16} className="text-[#6EBF78]" />
                  <span className="text-gray-700">{project.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
