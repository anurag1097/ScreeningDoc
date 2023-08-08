from models.models import UserLoginInfo, Doomsday
from backend.utils.db_util import DbUtil
from backend.utils.configuration_helper import ConfigurationHelper


class SignInSignUpHelper:
    """ """

    db_config = ConfigurationHelper().get_database_details()
    db_session = DbUtil(
        db_config["HOST"],
        db_config["USERNAME"],
        db_config["PASSWORD"],
        db_config["DBNAME"],
    ).session

    def create_new_user(self, user_details):
        """

        :param user_details:
        :return:
        """
        existing_records = (
            self.db_session.query(UserLoginInfo)
            .filter(UserLoginInfo.email_id == user_details["email"])
            .filter(UserLoginInfo.record_end_date == Doomsday)
            .all()
        )
        if any(existing_records):
            raise Exception(
                "This email id is already associated with an existing user!"
            )
        new_record = {
            "first_name": user_details["firstName"],
            "last_name": user_details["lastName"],
            "email_id": user_details["email"],
            "password": user_details["password"],
        }
        model_obj = UserLoginInfo(**new_record)
        self.db_session.add(model_obj)
        self.db_session.commit()

    def authorise_user(self, user_details):
        """

        :param user_details:
        :return:
        """
        user_record = (
            self.db_session.query(UserLoginInfo)
            .filter(UserLoginInfo.email_id == user_details["email"])
            .filter(UserLoginInfo.record_end_date == Doomsday)
            .first()
        )
        if not user_record:
            raise Exception("This email id does not exists. Kindly sign-up!")
        if user_record.password == user_details["password"]:
            return True, f"{user_record.first_name} {user_record.last_name}"
        else:
            return False
