import { test } from "@playwright/test";
import { deleteMentiViaProfile, deleteMentorViaProfile } from "./deleteUserViaProfile";
import { deleteMentiViaTable, deleteMentorViaTable } from "./deleteUserViaTable";

test.describe("Profile", () => {
  deleteMentiViaProfile();
  deleteMentorViaProfile();
});
test.describe("Table", () => {
  deleteMentiViaTable();
  deleteMentorViaTable();
});