import {
  BriefcaseIcon,
  CalendarIcon,
  GlobeIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from "lucide-react";

import { MentorProfileGridProps } from "@/global/interfaces/Props/ProfileGridProps.ts";
import ProfileField from "@/pages/Profile/ProfileField.tsx";

const MentorProfileGrid = ({ mentor }: MentorProfileGridProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:w-2/3">
      <ProfileField icon={<MailIcon />} label="Email" value={mentor?.email} />
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
      <ProfileField icon={<GlobeIcon />} label="Field" value={mentor?.field} />
      <ProfileField
        icon={<CalendarIcon />}
        label="Experience"
        value={mentor?.experience}
      />
      <ProfileField icon={<MapPinIcon />} label="MENTIS" value="5" />
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
  );
};

export default MentorProfileGrid;
