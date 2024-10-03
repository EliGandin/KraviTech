from sqlalchemy import Column, Integer, String, ForeignKey, Enum
from sqlalchemy.orm import relationship

from globals.enums.role_enum import Role
from globals.enums.field_enum import Field
from globals.enums.experience_enum import Experience
from models.user_model import User


class Mentor(User):
    __tablename__ = 'mentors'

    id = Column(Integer, ForeignKey('users.id'), primary_key=True)
    field = Column(Enum(Field), nullable=True)
    company = Column(String, nullable=True)
    position = Column(String, nullable=True)
    experience = Column(Enum(Experience), nullable=True)

    user = relationship("User", back_populates="mentor")

    __mapper_args__ = {
        "polymorphic_identity": Role.MENTOR,
        "inherit_condition": id == User.id,
    }

    def __init__(self, name, email, phone_number, password, field, experience, company=None, position=None):
        super().__init__(name=name, email=email,phone_number=phone_number, password=password, role=Role.MENTOR)
        self.field = field
        self.company = company
        self.position = position
        self.experience = experience