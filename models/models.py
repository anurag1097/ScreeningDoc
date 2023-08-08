from datetime import datetime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String, Text, Integer, DateTime

Base = declarative_base()
Doomsday = datetime(2099, 12, 31, 23, 59, 59)


class UserLoginInfo(Base):
    __tablename__ = "user_login_info"
    __table_args__ = {"schema": "cancer_screener"}
    first_name = Column(Text)
    last_name = Column(Text)
    email_id = Column(Text, primary_key=True)
    password = Column(Text)
    record_start_date = Column(DateTime, default=datetime.utcnow())
    record_end_date = Column(DateTime, default=Doomsday)
