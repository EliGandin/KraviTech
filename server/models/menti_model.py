from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship

from globals.enums.role_enum import Role
from models.user_model import User


class Menti(User):
    __tablename__ = 'mentis'

    id = Column(Integer, ForeignKey('users.id'), primary_key=True)
    education = Column(String)
    experience = Column(String)
    goals = Column(String)
    comments = Column(String, nullable=True)
    mentor_id = Column(Integer, ForeignKey('mentors.id'), nullable=True)

    user = relationship("User", back_populates="menti")
    mentor = relationship("Mentor", back_populates="menti", primaryjoin="Menti.mentor_id == Mentor.id")

    __mapper_args__ = {
        'polymorphic_identity': Role.MENTI,
        "inherit_condition": id == User.id,
    }

    def __init__(self, name, email, phone_number, password, education=None, experience=None, goals=None, comments=None, mentor_id=None):
        super().__init__(name=name, email=email, phone_number=phone_number, password=password,role=Role.MENTI)
        self.education = education
        self.experience = experience
        self.goals = goals
        self.comments = comments
        self.mentor_id = mentor_id
