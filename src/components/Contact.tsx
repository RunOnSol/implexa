import { useState } from 'react';
import { Mail, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <section id="contact" className="py-20 lg:py-32 bg-white relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#6EBF78]/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Contact & Partnerships</h2>
          <div className="w-20 h-1 bg-[#6EBF78] mx-auto mb-8"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Ready to transform healthcare together? Reach out to explore partnership opportunities or learn more about our solutions.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h3>

            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#6EBF78]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="text-[#6EBF78]" size={24} />
                </div>
                <div>
                  <h4 className="text-gray-900 font-semibold mb-1">Email Us</h4>
                  <a href="mailto:info@implexa.org" className="text-[#6EBF78] hover:underline">
                    info@implexa.org
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 border border-[#6EBF78]/30 rounded-2xl p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3">Partnership Opportunities</h4>
              <p className="text-gray-700 mb-4 leading-relaxed">
                We're always looking to collaborate with forward-thinking organizations, research institutions,
                and funding partners who share our vision of transforming healthcare delivery.
              </p>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#6EBF78] rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Research collaborations</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#6EBF78] rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Implementation partnerships</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#6EBF78] rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Technology co-development</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#6EBF78] rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Funding and investment opportunities</span>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <CheckCircle className="text-[#6EBF78] mb-4" size={64} />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-600">We'll get back to you shortly.</p>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <label htmlFor="name" className="block text-gray-900 font-medium mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#6EBF78] transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  <div className="mb-6">
                    <label htmlFor="email" className="block text-gray-900 font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#6EBF78] transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div className="mb-6">
                    <label htmlFor="message" className="block text-gray-900 font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#6EBF78] transition-colors resize-none"
                      placeholder="Tell us about your project or inquiry..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#6EBF78] hover:bg-[#5DAF68] text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#6EBF78]/30"
                  >
                    <Send size={20} />
                    Send Message
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
