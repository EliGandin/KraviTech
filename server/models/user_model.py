from sqlalchemy import Column, Integer, String, Enum

from sqlalchemy.orm import relationship

from models.base import Base
from globals.enums.role_enum import Role


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    role = Column(Enum(Role), nullable=False)

    mentor = relationship("Mentor", uselist=False, back_populates="user")
    # mentee = relationship("Mentee", uselist=False, back_populates="user")

    __mapper_args__ = {
        'polymorphic_identity': 'user',
        'polymorphic_on': role
    }
