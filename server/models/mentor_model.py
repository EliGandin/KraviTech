from sqlalchemy import Column, Integer, String, ForeignKey, Enum
from sqlalchemy.orm import relationship

from models.base import Base
from globals.enums.field_enum import Field
from globals.enums.experience_enum import Experience


class Mentor(Base):
    __tablename__ = 'mentors'

    id = Column(Integer, ForeignKey('users.id'), primary_key=True)
    field = Column(Enum(Field), nullable=False)
    company = Column(String)
    position = Column(String)
    experience = Column(Enum(Experience), nullable=False)

    user = relationship("User", back_populates="mentor")

    __mapper_args__ = {
        'polymorphic_identity': 'mentor',
    }
