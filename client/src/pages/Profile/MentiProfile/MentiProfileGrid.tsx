import ProfileField from "@/pages/Profile/ProfileField.tsx";
import {
  BriefcaseIcon,
  CalendarIcon,
  GlobeIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
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
        icon={<BriefcaseIcon />}
        label="Education"
        value={menti?.education || "N/A"}
      />
      <ProfileField icon={<GlobeIcon />} label="Goals" value={menti?.goals} />
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
        value={menti?.operator_name ? menti?.operator_name : "N/A"}
      />
      <ProfileField
        icon={<CalendarIcon />}
        label={"Mentor Name"}
        value={menti?.mentor_name ? menti?.mentor_name : "N/A"}
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
  );
};

export default MentiProfileGrid;
