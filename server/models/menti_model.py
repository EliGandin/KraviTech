from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship

from models.base import Base


class Menti(Base):
    __tablename__ = 'mentis'

    id = Column(Integer, ForeignKey('users.id'), primary_key=True)
    education = Column(String)
    experience = Column(String)
    goals = Column(String)
    user = relationship("User", back_populates="menti")

    __mapper_args__ = {
        'polymorphic_identity': 'menti',
    }
