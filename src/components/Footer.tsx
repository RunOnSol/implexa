import { Mail, Twitter } from "lucide-react";

export default function Footer() {
  const quickLinks = [
    { name: "About", href: "#about" },
    { name: "Solutions", href: "#solutions" },
    { name: "R&D Lab", href: "#lab" },
    { name: "Projects", href: "#projects" },
    { name: "News", href: "#news" },
    { name: "Contact", href: "#contact" },
  ];

  const handleLinkClick = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0a0b0e] border-t border-white/10 py-12 lg:py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img
                src="http://implexa.org/images/logo.png"
                className="w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center"
                alt="I"
              />
              <span className="text-white font-bold text-xl lg:text-2xl">
                IMPLEXA
              </span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Transforming healthcare delivery through innovative,
              evidence-based solutions that bridge research and real-world
              implementation.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-white/5 hover:bg-[#6EBF78]/20 rounded-lg flex items-center justify-center transition-colors group"
                aria-label="Twitter"
              >
                <Twitter
                  className="text-gray-400 group-hover:text-[#6EBF78]"
                  size={20}
                />
              </a>

              <a
                href="mailto:info@implexa.org"
                className="w-10 h-10 bg-white/5 hover:bg-[#6EBF78]/20 rounded-lg flex items-center justify-center transition-colors group"
                aria-label="Email"
              >
                <Mail
                  className="text-gray-400 group-hover:text-[#6EBF78]"
                  size={20}
                />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="text-gray-400 hover:text-[#6EBF78] transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Implexa. All Rights Reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <button className="hover:text-[#6EBF78] transition-colors">
                Privacy Policy
              </button>
              <button className="hover:text-[#6EBF78] transition-colors">
                Terms of Service
              </button>
            </div>
          </div>
        </div>
        <div className="items-center justify-center mt-4 text-center">
          <p>
            <span className="text-gray-500"> Created By</span>{" "}
            <a
              href="https://lazerwebs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 font-bold"
            >
              Lazerwebs
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
