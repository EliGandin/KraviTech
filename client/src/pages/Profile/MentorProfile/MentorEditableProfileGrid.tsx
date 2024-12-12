import { Controller } from "react-hook-form";

import { MentorEditableProfileGridProps } from "@/global/interfaces/Props/ProfileGridProps.ts";
import EditableField from "@/pages/Profile/EditableField.tsx";
import {
  BriefcaseIcon,
  CalendarIcon,
  GlobeIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from "lucide-react";
import ProfileField from "@/pages/Profile/ProfileField.tsx";

const MentorEditableProfileGrid = ({
  mentor,
  form,
  onSubmit,
}: MentorEditableProfileGridProps) => {
  return (
    <form
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:w-2/3"
      onSubmit={form.handleSubmit(onSubmit)}
      id="menti-edit-form"
    >
      <Controller
        name="email"
        control={form.control}
        render={({ field }) => (
          <EditableField
            icon={<MailIcon />}
            label="Email"
            placeholder={mentor?.email}
            field={field}
          />
        )}
      />
      <Controller
        name="phone_number"
        control={form.control}
        render={({ field }) => (
          <EditableField
            icon={<PhoneIcon />}
            label="Phone Number"
            placeholder={mentor?.phone_number}
            field={field}
          />
        )}
      />
      <Controller
        name="company"
        control={form.control}
        render={({ field }) => (
          <EditableField
            icon={<BriefcaseIcon />}
            label="Company"
            placeholder={mentor?.company || "N/A"}
            field={field}
          />
        )}
      />
      <Controller
        name="field"
        control={form.control}
        render={({ field }) => (
          <EditableField
            icon={<GlobeIcon />}
            label="Field"
            placeholder={mentor?.field}
            field={field}
          />
        )}
      />
      <Controller
        name="experience"
        control={form.control}
        render={({ field }) => (
          <EditableField
            icon={<CalendarIcon />}
            label="Experience"
            placeholder={mentor?.experience}
            field={field}
          />
        )}
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
    </form>
  );
};

export default MentorEditableProfileGrid;
