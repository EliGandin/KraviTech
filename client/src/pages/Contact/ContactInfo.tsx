import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import {
  Clock,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";

const ContactInfo = () => {
  return (
    <div className="mb-4 flex flex-col justify-between">
      <Card className="mt-0 shadow-lg">
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>
            Reach out to us directly using the information below.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start">
            <Mail className="mr-3 mt-0.5 h-5 w-5 text-blue-600" />
            <div>
              <h3 className="font-semibold">Email</h3>
              <p className="text-gray-600">info@kravitech.org</p>
            </div>
          </div>
          <div className="flex items-start">
            <Phone className="mr-3 mt-0.5 h-5 w-5 text-blue-600" />
            <div>
              <h3 className="font-semibold">Phone</h3>
              <p className="text-gray-600">+972 (0) 50-123-4567</p>
            </div>
          </div>
          <div className="flex items-start">
            <MapPin className="mr-3 mt-0.5 h-5 w-5 text-blue-600" />
            <div>
              <h3 className="font-semibold">Address</h3>
              <p className="text-gray-600">123 Tech Street, Tel Aviv, Israel</p>
            </div>
          </div>
          <div className="flex items-start">
            <Clock className="mr-3 mt-0.5 h-5 w-5 text-blue-600" />
            <div>
              <h3 className="font-semibold">Office Hours</h3>
              <p className="text-gray-600">
                Monday - Thursday: 9:00 AM - 5:00 PM
              </p>
              <p className="text-gray-600">Friday: 9:00 AM - 2:00 PM</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-4 shadow-lg">
        <CardHeader>
          <CardTitle>Connect With Us</CardTitle>
          <CardDescription>
            Follow us on social media for updates and news.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center space-x-4">
            <Button variant="outline" size="icon" asChild>
              <Link to="#" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <Link to="#" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <Link to="#" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactInfo;
