from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship

from globals.enums.role_enum import Role
from models.base import Base
from models.user_model import User


class Menti(User):
    __tablename__ = 'mentis'

    id = Column(Integer, ForeignKey('users.id'), primary_key=True)
    education = Column(String)
    experience = Column(String)
    goals = Column(String)
    user = relationship("User", back_populates="menti")

    __mapper_args__ = {
        'polymorphic_identity': 'menti',
    }

    def __init__(self, name, email, password, education=None, experience=None, goals=None):
        super().__init__(name=name, email=email, password=password,role=Role.MENTI)
        self.education = education
        self.experience = experience
        self.goals = goals
