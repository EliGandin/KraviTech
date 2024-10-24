from typing import List

from schemas.menti_schema import MentiResponse
from schemas.mentor_schema import MentorResponse


def mentis_mapper(res):
    formatted_mentis = [
        MentiResponse(
            id=menti.id,
            email=menti.email,
            experience=menti.experience,
            comments=menti.comments,
            name=menti.name,
            phone_number=menti.phone_number,
            role=menti.role.value,
            education=menti.education,
            goals=menti.goals,
            mentor_id=menti.mentor_id,
            mentor_name=mentor_name
        )
        for menti, mentor_name in res
    ]

    return formatted_mentis

def mentor_mapper(res) -> List[MentorResponse]:
    formatted_mentors = [
        MentorResponse(
            id=mentor.id,
            email=mentor.email,
            name=mentor.name,
            phone_number=mentor.phone_number,
            role=mentor.role.value,
            experience=mentor.experience,
            position=mentor.position,
            company=mentor.company,
            field=mentor.field,
        )
        for mentor in res
    ]

    return formatted_mentors
