import { Microscope, Lightbulb, Rocket, Code } from 'lucide-react';

export default function RDLab() {
  const prototypes = [
    {
      title: 'AI Clinical Advisor',
      description: 'Machine learning models for diagnostic support and treatment recommendations',
      stage: 'Alpha Testing',
    },
    {
      title: 'Mobile Health Hub',
      description: 'Offline-capable mobile platform for resource-limited settings',
      stage: 'Prototype',
    },
    {
      title: 'Smart Vaccine Tracker',
      description: 'IoT-enabled cold chain monitoring and inventory management',
      stage: 'Development',
    },
  ];

  return (
    <section id="lab" className="py-20 lg:py-32 bg-gray-50 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#6EBF78]/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">R&D & Innovation Lab</h2>
          <div className="w-20 h-1 bg-[#6EBF78] mx-auto mb-8"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Where groundbreaking research meets practical implementation. Our lab transforms cutting-edge ideas into scalable healthcare solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-[#6EBF78] to-[#4A9D5F] rounded-2xl flex items-center justify-center mx-auto mb-4 transform hover:rotate-6 transition-transform">
              <Microscope className="text-white" size={36} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Research</h3>
            <p className="text-gray-600">Evidence-based inquiry into healthcare challenges</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-[#6EBF78] to-[#4A9D5F] rounded-2xl flex items-center justify-center mx-auto mb-4 transform hover:rotate-6 transition-transform">
              <Lightbulb className="text-white" size={36} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Innovation</h3>
            <p className="text-gray-600">Creative solutions leveraging digital technology</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-[#6EBF78] to-[#4A9D5F] rounded-2xl flex items-center justify-center mx-auto mb-4 transform hover:rotate-6 transition-transform">
              <Rocket className="text-white" size={36} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Implementation</h3>
            <p className="text-gray-600">Real-world deployment and continuous improvement</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-8 lg:p-12 mb-12 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-[#6EBF78]/20 rounded-lg flex items-center justify-center">
              <Code className="text-[#6EBF78]" size={24} />
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">Implexa Digital Lab</h3>
          </div>
          <p className="text-gray-700 mb-8 leading-relaxed">
            Our digital lab is a dedicated space for rapid prototyping and testing of innovative health tech solutions.
            We work with partners to co-create tools that address specific healthcare delivery challenges.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {prototypes.map((prototype, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-[#6EBF78] transition-all"
              >
                <h4 className="text-lg font-bold text-gray-900 mb-2">{prototype.title}</h4>
                <p className="text-gray-600 text-sm mb-4">{prototype.description}</p>
                <span className="inline-block px-3 py-1 bg-[#6EBF78]/20 text-[#6EBF78] text-xs font-semibold rounded-full">
                  {prototype.stage}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-[#6EBF78] hover:bg-[#5DAF68] text-white font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-[#6EBF78]/30"
          >
            Partner With Our Lab
          </button>
        </div>
      </div>
    </section>
  );
}
