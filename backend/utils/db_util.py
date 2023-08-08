from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


class DbUtil:
    """ """

    def __init__(self, host, username, password, db_name):
        self.session = None
        self.initialize_db_session(host, username, password, db_name)

    def initialize_db_session(self, host, username, password, db_name):
        db_url = f"postgresql://{username}:{password}@{host}/{db_name}"
        engine = create_engine(db_url, echo=False)
        session_maker_obj = sessionmaker(bind=engine)
        self.session = session_maker_obj()
