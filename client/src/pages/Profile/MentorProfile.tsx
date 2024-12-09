import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  CalendarIcon,
  BriefcaseIcon,
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  GlobeIcon,
} from "lucide-react";
import { useParams } from "react-router-dom";

import { useGetMentor } from "@/hooks/profile/useGetMentor.ts";
import ProfileField from "@/pages/Profile/ProfileField.tsx";
import Loader from "@/components/ui/Loader.tsx";

const MentorProfile = () => {
  const { id } = useParams();
  const { mentor, isLoading } = useGetMentor(Number(id));

  if (isLoading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-10">
      <Card className="mx-auto max-w-4xl overflow-hidden bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900 dark:to-indigo-900">
        <CardContent className="p-8">
          <div className="flex flex-col gap-8 md:flex-row">
            <div className="text-center md:w-1/3 md:text-left">
              <Avatar className="mx-auto h-32 w-32 border-4 border-white shadow-lg md:mx-0">
                <AvatarImage
                  src={`https://api.dicebear.com/6.x/micah/svg?seed=${mentor?.name}`}
                  alt={mentor?.name}
                />
                <AvatarFallback>{mentor?.name}</AvatarFallback>
              </Avatar>
              <h2 className="mb-2 mt-4 text-3xl font-bold">{mentor?.name}</h2>
              <p className="mb-4 text-xl text-muted-foreground">
                {mentor?.position}
              </p>
              <Badge variant="outline" className="px-3 py-1 text-lg">
                {mentor?.status}
              </Badge>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:w-2/3">
              <ProfileField
                icon={<MailIcon />}
                label="Email"
                value={mentor?.email}
              />
              <ProfileField
                icon={<PhoneIcon />}
                label="Phone"
                value={mentor?.phone_number}
              />
              <ProfileField
                icon={<BriefcaseIcon />}
                label="Company"
                value={mentor?.company || "N/A"}
              />
              <ProfileField
                icon={<GlobeIcon />}
                label="Field"
                value={mentor?.field}
              />
              <ProfileField
                icon={<CalendarIcon />}
                label="Experience"
                value={mentor?.experience}
              />
              <ProfileField
                icon={<MapPinIcon />}
                label="Location"
                value="San Francisco, CA"
              />
              <ProfileField
                icon={<CalendarIcon />}
                label="Start Date"
                value={
                  mentor?.start_date
                    ? new Date(mentor?.start_date).toLocaleDateString()
                    : "N/A"
                }
              />
              <ProfileField
                icon={<CalendarIcon />}
                label="End Date"
                value={
                  mentor?.end_date
                    ? new Date(mentor?.end_date).toLocaleDateString()
                    : "N/A"
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MentorProfile;
