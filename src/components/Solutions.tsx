import { Activity, Database, Sparkles, ArrowRight } from 'lucide-react';

export default function Solutions() {
  const solutions = [
    {
      icon: Activity,
      title: 'Virtual Patient Assessment System',
      subtitle: 'VPA',
      description: 'An intelligent digital platform for conducting comprehensive patient assessments remotely, enabling healthcare providers to deliver quality care beyond traditional clinical settings.',
      features: [
        'Remote patient triage and evaluation',
        'Clinical decision support',
        'Real-time data capture and analysis',
        'Integration with electronic health records',
      ],
      status: 'Demo Coming Soon',
      statusColor: 'text-[#6EBF78]',
      available: false,
    },
    {
      icon: Database,
      title: 'RI-DATACAP',
      subtitle: 'Routine Immunization Data Capture',
      description: 'A comprehensive data management solution designed to streamline immunization program monitoring and improve vaccine coverage tracking across multiple health system levels.',
      features: [
        'Community Health Extension Workers (CHEWs)',
        'Local Immunization Officers (LIOs)',
        'LGA/TWG/State health teams',
        'Real-time reporting and analytics',
      ],
      status: 'Request Early Access',
      statusColor: 'text-blue-400',
      available: true,
    },
    {
      icon: Sparkles,
      title: 'Future Innovations',
      subtitle: 'Coming Soon',
      description: 'We are continuously developing new solutions that address emerging healthcare challenges. Stay tuned for groundbreaking innovations in diagnostics, treatment optimization, and health system strengthening.',
      features: [
        'AI-powered diagnostic tools',
        'Supply chain optimization',
        'Patient engagement platforms',
        'Healthcare analytics dashboards',
      ],
      status: 'In Development',
      statusColor: 'text-gray-400',
      available: false,
    },
  ];

  return (
    <section id="solutions" className="py-20 lg:py-32 bg-white relative overflow-hidden">
      <div className="absolute top-20 left-0 w-96 h-96 bg-[#6EBF78]/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Solutions</h2>
          <div className="w-20 h-1 bg-[#6EBF78] mx-auto mb-8"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Transforming healthcare delivery through innovative digital solutions that bridge the gap between research and real-world application.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-200 hover:border-[#6EBF78] transition-all duration-300 overflow-hidden group hover:transform hover:scale-105 shadow-sm hover:shadow-lg"
              >
                <div className="p-8">
                  <div className="w-16 h-16 bg-[#6EBF78]/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#6EBF78]/30 transition-colors">
                    <Icon className="text-[#6EBF78]" size={32} />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{solution.title}</h3>
                  <p className="text-[#6EBF78] font-semibold mb-4">{solution.subtitle}</p>
                  <p className="text-gray-600 mb-6 leading-relaxed">{solution.description}</p>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      {solution.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-600 text-sm">
                          <div className="w-1.5 h-1.5 bg-[#6EBF78] rounded-full mt-1.5 flex-shrink-0"></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    disabled={!solution.available}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                      solution.available
                        ? 'bg-[#6EBF78] hover:bg-[#5DAF68] text-white'
                        : 'bg-gray-100 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {solution.status}
                    {solution.available && <ArrowRight size={18} />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
