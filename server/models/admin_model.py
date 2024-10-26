from sqlalchemy import Column, ForeignKey, Integer
from sqlalchemy.orm import relationship

from models.user_model import User
from globals.enums.role_enum import Role

class Admin(User):
    __tablename__ = 'admins'
    id = Column(Integer, ForeignKey('users.id'), primary_key=True)

    user = relationship("User", back_populates="admin")

    __mapper_args__ = {
        'polymorphic_identity': Role.ADMIN,
        "inherit_condition": id == User.id,
    }

    def __init__(self, name, email, phone_number, password):
        super().__init__(name=name, email=email, phone_number=phone_number, password=password, role=Role.ADMIN)