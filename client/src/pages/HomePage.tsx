import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, Users, Briefcase } from "lucide-react";
import { Separator } from "@/components/ui/separator.tsx";

import Footer from "@/components/shared/Footer.tsx";

const HomePage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20 text-white">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="mb-4 text-4xl font-bold md:text-5xl">
                Empowering Combat Veterans in Tech
              </h1>
              <p className="mb-8 text-xl">
                KraviTech connects former combat soldiers with experienced
                mentors to launch successful careers in the tech industry.
              </p>
              <Button size="lg" asChild>
                <Link to="/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </section>

        <Separator />
        {/* Features Section */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold">
              Why Choose KraviTech?
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="text-center">
                <Shield className="mx-auto mb-4 h-16 w-16 text-blue-600" />
                <h3 className="mb-2 text-xl font-semibold">
                  Tailored Mentorship
                </h3>
                <p>
                  Get paired with mentors who understand your unique background
                  and challenges.
                </p>
              </div>
              <div className="text-center">
                <Users className="mx-auto mb-4 h-16 w-16 text-blue-600" />
                <h3 className="mb-2 text-xl font-semibold">
                  Supportive Community
                </h3>
                <p>
                  Join a network of veterans helping veterans in the tech
                  industry.
                </p>
              </div>
              <div className="text-center">
                <Briefcase className="mx-auto mb-4 h-16 w-16 text-blue-600" />
                <h3 className="mb-2 text-xl font-semibold">
                  Career Advancement
                </h3>
                <p>
                  Gain the skills and connections needed to thrive in your tech
                  career.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Separator />
        {/* Testimonial Section */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold">
              Success Stories
            </h2>
            <div className="mx-auto max-w-3xl rounded-lg bg-white p-8 shadow-md">
              <p className="mb-4 text-lg">
                `&apos;`KraviTech was instrumental in helping me transition from
                military service to a successful career in software development.
                The mentorship and support I received were invaluable.`&apos;`
              </p>
              <div className="flex items-center">
                <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                  JD
                </div>
                <div>
                  <p className="font-semibold">John Doe</p>
                  <p className="text-sm text-gray-600">
                    Former Combat Soldier, Now Senior Developer
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600 py-16 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-8 text-3xl font-bold">
              Ready to Start Your Tech Journey?
            </h2>
            <p className="mb-8 text-xl">
              Join KraviTech today and take the first step towards a rewarding
              career in tech.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/login">Get Started Now</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
