import db from "@/db/db";
import { Status, Experience, Field } from "@/globals/constants";

export const populateMentors = async () => {
  const mentors = [];
  for (let i = 1; i < 16; i++) {
    mentors.push({
      name: `Mentor ${i}`,
      email: `mentor${i}@test.com`,
      phone_number: `123456789${i}`,
      password: `1234`,
      field: Field.DATA,
      company: `Company ${i}`,
      position: `Position ${i}`,
      experience: Experience.LOW,
      status: Status.PENDING,
    });
  }

  const values = mentors.map((_, index) => `($${index * 9 + 1}, $${index * 9 + 2}, $${index * 9 + 3}, $${index * 9 + 4}, $${index * 9 + 5}, $${index * 9 + 6}, $${index * 9 + 7}, $${index * 9 + 8}, $${index * 9 + 9})`).join(", ");
  const query = `INSERT INTO mentors (name, email, phone_number, password, field, company, position, experience, status)
  VALUES
  ${values}`;

  const queryParams = mentors.flatMap(mentor => [
    mentor.name,
    mentor.email,
    mentor.phone_number,
    mentor.password,
    mentor.field,
    mentor.company,
    mentor.position,
    mentor.experience,
    mentor.status,
  ]);

  await db.query(query, queryParams);
};

export const populateMentis = async () => {
  const mentis = [];
  for (let i = 1; i < 16; i++) {
    mentis.push({
      name: `Menti ${i}`,
      email: `menti${i}@test.com`,
      phone_number: `123456789${i}`,
      password: `1234`,
      field: Field.DATA,
      education: `Education ${i}`,
      experience: Experience.LOW,
      goals: `Goals ${i}`,
      comments: `Comments ${i}`,
      operator_id: null,
      mentor_id: null,
      status: Status.PENDING,
      start_date: "2021-01-01",
      end_date: null,
    });
  }


  const values = mentis.map((_, index) => `($${index * 13 + 1}, $${index * 13 + 2}, $${index * 13 + 3}, $${index * 13 + 4}, $${index * 13 + 5}, $${index * 13 + 6}, $${index * 13 + 7}, $${index * 13 + 8}, $${index * 13 + 9}, $${index * 13 + 10}, $${index * 13 + 11}, $${index * 13 + 12}, $${index * 13 + 13})`).join(", ");
  const query = `INSERT INTO mentis (name, email, phone_number, password, education, experience, goals, comments,
                                     operator_id, mentor_id, status, start_date, end_date)
  VALUES
  ${values}`;

  const queryParams = mentis.flatMap(menti => [
    menti.name,
    menti.email,
    menti.phone_number,
    menti.password,
    menti.education,
    menti.experience,
    menti.goals,
    menti.comments,
    menti.operator_id,
    menti.mentor_id,
    menti.status,
    menti.start_date,
    menti.end_date,
  ]);

  await db.query(query, queryParams);
};