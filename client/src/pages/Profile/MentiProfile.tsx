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

import { useGetMenti } from "@/hooks/profile/useGetMenti.ts";
import ProfileField from "@/pages/Profile/ProfileField.tsx";
import Loader from "@/components/ui/Loader.tsx";

const MentiProfile = () => {
  const { id } = useParams();
  const { menti, isLoading } = useGetMenti(Number(id));

  if (isLoading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-10">
      <Card className="mx-auto max-w-4xl overflow-hidden bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900 dark:to-indigo-900">
        <CardContent className="p-8">
          <div className="flex flex-col gap-8 md:flex-row">
            <div className="text-center md:w-1/3 md:text-left">
              <Avatar className="mx-auto h-32 w-32 border-4 border-white shadow-lg md:mx-0">
                <AvatarImage
                  src={`https://api.dicebear.com/6.x/micah/svg?seed=${menti?.name}`}
                  alt={menti?.name}
                />
                <AvatarFallback>{menti?.name}</AvatarFallback>
              </Avatar>
              <h2 className="mb-2 mt-4 text-3xl font-bold">{menti?.name}</h2>
              <Badge variant="outline" className="px-3 py-1 text-lg">
                {menti?.status}
              </Badge>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:w-2/3">
              <ProfileField
                icon={<MailIcon />}
                label="Email"
                value={menti?.email}
              />
              <ProfileField
                icon={<PhoneIcon />}
                label="Phone"
                value={menti?.phone_number}
              />
              <ProfileField
                icon={<BriefcaseIcon />}
                label="Company"
                value={menti?.education || "N/A"}
              />
              <ProfileField
                icon={<GlobeIcon />}
                label="Goals"
                value={menti?.goals}
              />
              <ProfileField
                icon={<CalendarIcon />}
                label="Experience"
                value={menti?.experience}
              />
              <ProfileField
                icon={<MapPinIcon />}
                label="Comments"
                value={menti?.comments}
              />
              <ProfileField
                icon={<CalendarIcon />}
                label={"Operator Name"}
                value={menti?.operator_id ? menti?.operator_id : "N/A"}
              />
              <ProfileField
                icon={<CalendarIcon />}
                label={"Mentor Name"}
                value={menti?.mentor_id ? menti?.mentor_id : "N/A"}
              />
              <ProfileField
                icon={<CalendarIcon />}
                label="Start Date"
                value={
                  menti?.start_date
                    ? new Date(menti?.start_date).toLocaleDateString()
                    : "N/A"
                }
              />
              <ProfileField
                icon={<CalendarIcon />}
                label="End Date"
                value={
                  menti?.end_date
                    ? new Date(menti?.end_date).toLocaleDateString()
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

export default MentiProfile;
