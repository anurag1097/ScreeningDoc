from flask_cors import CORS
from flask import Flask, request, jsonify
from backend.utils.configuration_helper import ConfigurationHelper
from backend.utils.sign_in_sing_up_helper import SignInSignUpHelper
from backend.utils.result_calculator import FetchResult

app = Flask(__name__, static_folder="../screening_doc_ui/build", static_url_path="/")
CORS(app)
constants = ConfigurationHelper().get_constants()


@app.route("/")
def home():
    return app.send_static_file("index.html")


@app.route("/sign-up", methods=["POST"])
def handle_sign_up():
    """

    :return:
    """
    try:
        user_details = request.json
        SignInSignUpHelper().create_new_user(user_details)
        return {"status": "success"}, 200
    except Exception as error:
        return {"status": "failure", "msg": str(error)}, 200


@app.route("/sign-in", methods=["POST"])
def handle_sign_in():
    """

    :return:
    :return:
    """
    try:
        user_details = request.json
        is_authenticated, username = SignInSignUpHelper().authorise_user(user_details)
        if is_authenticated:
            return {
                "status": "success",
                "name": username,
                "email": user_details["email"],
            }, 200
        else:
            return {
                "status": "failure",
                "msg": "Password is incorrect. Kindly check the password you entered.",
            }, 200
    except Exception as error:
        return {"status": "failure", "msg": str(error)}, 200


@app.route("/get-result", methods=["GET"])
def fetch_results_based_on_input():
    try:
        params = request.args
        result = FetchResult(params).get_result()
        return {"status": "success", "recommendation": result}, 200
    except Exception as error:
        return {"status": "failure", "msg": str(error)}, 200


if __name__ == "__main__":
    app.run(host=constants["HOST"], port=constants["PORT"])