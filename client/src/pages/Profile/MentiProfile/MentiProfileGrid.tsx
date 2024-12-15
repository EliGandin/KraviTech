import ProfileField from "@/pages/Profile/ProfileField.tsx";
import {
  Award,
  MailIcon,
  PhoneIcon,
  Target,
  CalendarCheck2,
  CalendarX2,
  UserCog,
  UserPlus,
  GraduationCap,
  MessageSquareMore,
} from "lucide-react";

import { MentiProfileGridProps } from "@/global/interfaces/Props/ProfileGridProps.ts";

const MentiProfileGrid = ({ menti }: MentiProfileGridProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:w-2/3">
      <ProfileField icon={<MailIcon />} label="Email" value={menti?.email} />
      <ProfileField
        icon={<PhoneIcon />}
        label="Phone Number"
        value={menti?.phone_number}
      />
      <ProfileField
        icon={<GraduationCap />}
        label="Education"
        value={menti?.education || "N/A"}
      />
      <ProfileField icon={<Target />} label="Goals" value={menti?.goals} />
      <ProfileField
        icon={<Award />}
        label="Experience"
        value={menti?.experience}
      />
      <ProfileField
        icon={<MessageSquareMore />}
        label="Comments"
        value={menti?.comments}
      />
      <ProfileField
        icon={<UserCog />}
        label={"Operator Name"}
        value={menti?.operator_name ? menti?.operator_name : "N/A"}
      />
      <ProfileField
        icon={<UserPlus />}
        label={"Mentor Name"}
        value={menti?.mentor_name ? menti?.mentor_name : "N/A"}
      />
      <ProfileField
        icon={<CalendarCheck2 />}
        label="Start Date"
        value={
          menti?.start_date
            ? new Date(menti?.start_date).toLocaleDateString()
            : "N/A"
        }
      />
      <ProfileField
        icon={<CalendarX2 />}
        label="End Date"
        value={
          menti?.end_date
            ? new Date(menti?.end_date).toLocaleDateString()
            : "N/A"
        }
      />
    </div>
  );
};

export default MentiProfileGrid;
