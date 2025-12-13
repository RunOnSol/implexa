import {
  ArrowRight,
  Users,
} from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden "
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#6EBF78]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#6EBF78]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8 animate-fade-in ">
            <img
              src="http://implexa.org/images/logo.png"
              className="inline-flex items-center justify-center w-24 h-28 lg:w-32 lg:h-32 rounded-full"
              alt="I"
            />
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 animate-slide-up">
            Innovating Health.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6EBF78] to-[#4A9D5F]">
              Transforming Outcomes.
            </span>
          </h1>

          <p className="text-xl lg:text-2xl text-gray-600 mb-12 animate-slide-up animation-delay-200">
            Insight. Innovation. Implementation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up animation-delay-400">
            <button
              onClick={() =>
                document
                  .querySelector("#solutions")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="group px-8 py-4 bg-[#6EBF78] hover:bg-[#5DAF68] text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#6EBF78]/30"
            >
              Explore Our Solutions
              <ArrowRight
                className="group-hover:translate-x-1 transition-transform"
                size={20}
              />
            </button>
            <button
              onClick={() =>
                document
                  .querySelector("#contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-8 py-4 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 border border-gray-300"
            >
              <Users size={20} />
              Collaborate With Us
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-gray-400 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
