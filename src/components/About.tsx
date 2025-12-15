import { useEffect, useState } from "react";
import { Eye, Heart, Target, User } from "lucide-react";
import { supabase } from "../lib/supabase";
import type { Database } from "../lib/database.types";

type Executive = Database["public"]["Tables"]["executives"]["Row"];

export default function About() {
  const [executives, setExecutives] = useState<Executive[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExecutives();
  }, []);

  const loadExecutives = async () => {
    const { data } = await supabase
      .from("executives")
      .select("*")
      .order("order_index", { ascending: true });
    setExecutives(data || []);
    setLoading(false);
  };

  const values = [
    {
      icon: Target,
      title: "Mission",
      description:
        "To transform healthcare delivery through innovative, evidence-based solutions that bridge research and real-world implementation.",
    },
    {
      icon: Eye,
      title: "Vision",
      description:
        "A future where cutting-edge health innovations are accessible, scalable, and deliver measurable improvements in patient outcomes.",
    },
    {
      icon: Heart,
      title: "Values",
      description:
        "Innovation, integrity, collaboration, and a relentless commitment to improving health outcomes for all.",
    },
  ];

  return (
    <section
      id="about"
      className="py-20 lg:py-32 bg-gray-50 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#6EBF78]/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            About Implexa
          </h2>
          <div className="w-20 h-1 bg-[#6EBF78] mx-auto mb-8"></div>
          <p className="text-lg lg:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Implexa is a health innovation company committed to turning research
            into real-world, scalable healthcare solutions. We combine digital,
            scientific, and hardware innovation to transform outcomes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-[#6EBF78] transition-all duration-300 hover:transform hover:scale-105 shadow-sm hover:shadow-md"
              >
                <div className="w-14 h-14 bg-[#6EBF78]/20 rounded-xl flex items-center justify-center mb-6">
                  <Icon className="text-[#6EBF78]" size={28} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading team...</p>
          </div>
        ) : executives.length === 0 ? (
          <div className="bg-white border border-[#6EBF78]/30 rounded-2xl p-8 lg:p-12 shadow-sm">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <img
                  className="w-32 h-32 rounded-full bg-gradient-to-br from-[#6EBF78] to-[#4A9D5F] flex items-center justify-center text-white text-5xl font-bold shadow-2xl"
                  src="http://implexa.org/images/adana.jpg"
                  alt="DA"
                />
              </div>
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                  Dr. Nurudeen S. Adana
                </h3>
                <p className="text-[#6EBF78] font-semibold mb-4">Founder & CEO</p>
                <p className="text-gray-700 leading-relaxed">
                  Dr. Adana is a physician-innovator with a passion for leveraging
                  technology and research to solve critical healthcare challenges.
                  With expertise spanning clinical practice, digital health, and
                  health systems strengthening, he leads Implexa's mission to
                  create impactful, scalable solutions that improve health
                  outcomes across diverse populations.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {executives.map((executive) => (
              <div
                key={executive.id}
                className="bg-white border border-[#6EBF78]/30 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <div className="flex-shrink-0">
                    {executive.image_url ? (
                      <img
                        className="w-32 h-32 rounded-full object-cover shadow-xl"
                        src={executive.image_url}
                        alt={executive.name}
                      />
                    ) : (
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#6EBF78] to-[#4A9D5F] flex items-center justify-center shadow-xl">
                        <User className="text-white" size={64} />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {executive.name}
                    </h3>
                    <p className="text-[#6EBF78] font-semibold mb-4">
                      {executive.title}
                    </p>
                    <p className="text-gray-700 leading-relaxed">{executive.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
