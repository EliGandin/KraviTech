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
import { Controller } from "react-hook-form";

import { MentiEditableProfileGridProps } from "@/global/interfaces/Props/ProfileGridProps.ts";
import EditableField from "@/pages/Profile/EditableField.tsx";
import ProfileField from "@/pages/Profile/ProfileField.tsx";

const MentiEditableProfileGrid = ({
  menti,
  onSubmit,
  form,
}: MentiEditableProfileGridProps) => {
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
            placeholder={menti?.email}
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
            placeholder={menti?.phone_number}
            field={field}
          />
        )}
      />
      <Controller
        name="education"
        control={form.control}
        render={({ field }) => (
          <EditableField
            icon={<GraduationCap />}
            label="Education"
            placeholder={menti?.education || "N/A"}
            field={field}
          />
        )}
      />
      <Controller
        name="goals"
        control={form.control}
        render={({ field }) => (
          <EditableField
            icon={<Target />}
            label="Goals"
            placeholder={menti?.goals}
            field={field}
          />
        )}
      />
      <Controller
        name="experience"
        control={form.control}
        render={({ field }) => (
          <EditableField
            icon={<Award />}
            label="Experience"
            placeholder={menti?.experience}
            field={field}
          />
        )}
      />
      <Controller
        name="comments"
        control={form.control}
        render={({ field }) => (
          <EditableField
            icon={<MessageSquareMore />}
            label="Comments"
            placeholder={menti?.comments}
            field={field}
          />
        )}
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
    </form>
  );
};

export default MentiEditableProfileGrid;
