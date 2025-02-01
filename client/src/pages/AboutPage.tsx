import { Shield, Users, Briefcase, Target, Heart, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator.tsx";
import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <main className="flex-grow">
        <section className="bg-gradient-to-r from-blue-500 to-sky-700 py-20 text-white">
          <div className="container mx-auto px-4">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">
              About KraviTech
            </h1>
            <p className="mb-8 text-xl">Empowering Combat Veterans in Tech</p>
            <Button asChild>
              <Link to="#contact">Get Involved</Link>
            </Button>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center text-3xl font-bold">Our Mission</h2>
            <p className="mx-auto max-w-3xl text-center text-xl">
              KraviTech aims to help former combat soldiers transition into the
              tech job market by pairing them with mentors from matching fields.
              Our mentors, who are former combat soldiers themselves, understand
              the unique challenges faced by veterans, making them ideal guides
              for this journey.
            </p>
          </div>
        </section>

        <Separator />
        {/* Core Values */}
        <section className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold">
              Our Core Values
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <Shield className="mx-auto mb-2 h-10 w-10 text-blue-600" />
                  <CardTitle>Empowerment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    We believe in the untapped potential of combat veterans and
                    strive to empower them in their tech careers.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Users className="mx-auto mb-2 h-10 w-10 text-blue-600" />
                  <CardTitle>Community</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    We foster a strong, supportive community of veterans helping
                    veterans in the tech industry.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Briefcase className="mx-auto mb-2 h-10 w-10 text-blue-600" />
                  <CardTitle>Excellence</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    We are committed to excellence in mentorship and
                    professional development for all our participants.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <Separator />
        {/* How It Works */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold">
              How It Works
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="text-center">
                <Target className="mx-auto mb-4 h-16 w-16 text-blue-600" />
                <h3 className="mb-2 text-xl font-semibold">Match</h3>
                <p>
                  We pair combat veterans with experienced mentors in their
                  desired tech field.
                </p>
              </div>
              <div className="text-center">
                <Heart className="mx-auto mb-4 h-16 w-16 text-blue-600" />
                <h3 className="mb-2 text-xl font-semibold">Support</h3>
                <p>
                  Mentors provide guidance, resources, and emotional support
                  throughout the journey.
                </p>
              </div>
              <div className="text-center">
                <Award className="mx-auto mb-4 h-16 w-16 text-blue-600" />
                <h3 className="mb-2 text-xl font-semibold">Succeed</h3>
                <p>
                  Veterans gain the skills and confidence needed to thrive in
                  the tech industry.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Separator />
        {/* Team Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold">Our Team</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle className="text-center">
                      Team Member {i}
                    </CardTitle>
                    <CardDescription className="text-center">
                      Former Combat Soldier & Tech Expert
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center">
                      Dedicated to helping fellow veterans succeed in the tech
                      industry.
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section
          id="contact"
          className="bg-gradient-to-r from-blue-500 to-sky-700 py-16 text-white"
        >
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-8 text-3xl font-bold">
              Join the KraviTech Community
            </h2>
            <p className="mb-8 text-xl">
              Whether you're a veteran looking to enter tech or a mentor willing
              to give back, we want to hear from you.
            </p>
            <div className="flex justify-center space-x-4">
              <Button variant="secondary" asChild>
                <Link to="/apply">Apply as a Mentee</Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link to="/volunteer">Become a Mentor</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 py-8 text-white">
        <div className="container mx-auto px-4 text-center">
          <p>
            &copy; {new Date().getFullYear()} KraviTech. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
