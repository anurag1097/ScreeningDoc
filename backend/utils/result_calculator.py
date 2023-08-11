class FetchResult:
    def __init__(self, params):
        self.params = params
        self.age = int(params["age"])
        self.gender = params["gender"]
        self.number_of_pack_years = float(params["packsPerDay"]) * float(
            params["yearsSmoked"]
        )
        self.have_been_a_smoker = (
            params["currentSmoker"] == "yes" or params["pastSmoker"] == "yes"
        )
        self.any_disease_history = (
            params["personalHistoryCancer"] == "yes"
            or params["familyHistoryCancer"] == "yes"
            or params["personalHistoryIBD"] == "yes"
            or params["hereditaryColorectalCancer"] == "yes"
            or params["radiationHistory"] == "yes"
        )
        self.increased_colon_risk = (
            params["personalHistoryCancer"] == "yes"
            or params["familyHistoryCancer"] == "yes"
            or params["radiationHistory"] == "yes"
        )
        self.high_colon_risk = (
            params["hereditaryColorectalCancer"] == "yes"
            or params["personalHistoryIBD"] == "yes"
        )

    @staticmethod
    def concatenate_strings(stringOne, stringTwo):
        if not stringOne:
            return stringTwo
        elif not stringTwo:
            return stringOne
        else:
            concatenated_string = stringOne + "\n\n" + stringTwo
            return concatenated_string

    def apply_lung_cancer_logic(self):
        """

        :return:
        """
        if self.age < 40:
            screening_interval = 2
        elif 40 <= self.age < 50:
            screening_interval = None
        else:
            screening_interval = 0.5

        if screening_interval and (
            self.number_of_pack_years >= 20 and 50 <= self.age <= 80
        ):
            msg = (
                "According to the USPSTF guidelines, you are eligible for lung cancer screening. This does not mean "
                "that you have the disease, but you meet the criteria for screening. Screening with low-dose "
                "computed tomography (LDCT) can help in early detection of lung cancer."
            )
        else:
            msg = "No lung cancer screening test is required at the moment. Please inquire again after 6 months."

        return msg

    def apply_colon_cancer_logic(self):
        if not self.any_disease_history:
            if 85 >= self.age >= 76:
                msg = (
                    "Kindly discuss with your primary healthcare physician. As per the American Cancer Society, "
                    "the decision to be screened should be based on a person’s preferences, life expectancy, "
                    "overall health, and prior screening history."
                )
            elif 75 >= self.age >= 45:
                msg = "As per the American Cancer Society, you are eligible for colorectal cancer screening."
            else:
                msg = "As per American Cancer Society, you do not meet the eligibility criteria for screening."
        elif self.increased_colon_risk or self.high_colon_risk:
            msg = ""
            if self.params["familyHistoryCancer"] == "yes":
                string = (
                    "Some people with a family "
                    "history will be able to follow the recommendations for average risk adults, but others might "
                    "need to get a colonoscopy (and not any other type of test) more often, and possibly starting "
                    "before age 45."
                )
                msg = self.concatenate_strings(msg, string)
            if self.params["personalHistoryCancer"] == "yes":
                string = (
                    "Most of these people will need to get a colonoscopy again after 3 years, "
                    "but some people might need to get one earlier (or later) than 3 years, depending on the "
                    "type, size, and number of polyps. \n\nMost of these people will need to start having "
                    "colonoscopies regularly about one year after surgery to remove the cancer. Other procedures "
                    "like MRI or proctoscopy with ultrasound might also be recommended for some people with "
                    "rectal cancer, depending on the type of surgery they had."
                )
                msg = self.concatenate_strings(msg, string)
            if self.params["radiationHistory"] == "yes":
                string = (
                    "Most of these people will need to start having colorectal screening (colonoscopy "
                    "or stool based testing) at an earlier age (depending on how old they were when they got the "
                    "radiation). Screening often begins 5 years after the radiation was given or at age 30, "
                    "whichever comes last. These people might also need to be screened more often than normal ("
                    "such as at least every 3 to 5 years)."
                )
                msg = self.concatenate_strings(msg, string)

            if self.params["personalHistoryIBD"] == "yes":
                string = (
                    "DISCUSS THE FOLLOW-UP COLONOSCOPY WITH YOUR HEALTH CARE PROVIDER. \nAS PER THE AMERICAN "
                    "CANCER SCREENING GUIDELINES, INDIVIDUALS WITH INFLAMMATORY BOWEL DISEASE need to get "
                    "colonoscopies (not any other type of test) starting at least 8 years after they are "
                    "diagnosed with inflammatory bowel disease. Follow-up colonoscopies should be done every 1 "
                    "to 3 years, depending on the person’s risk factors for colorectal cancer and the findings "
                    "on the previous colonoscopy. \nIf you’re at increased or high risk of colorectal cancer (or "
                    "think you might be), talk to your health care provider to learn more. Your provider can "
                    "suggest the best screening option for you, as well as determine what type of screening "
                    "schedule you should follow, based on your individual risk."
                )
                msg = self.concatenate_strings(msg, string)

            if self.params["hereditaryColorectalCancer"]:
                string = (
                    "AS PER THE AMERICAN CANCER SCREENING GUIDELINES, INDIVIDUALS WITH CERTAIN GENETIC SYNDROMES "
                    "need to have colonoscopy (not any of the other tests) at a young age. \nScreening is often "
                    "recommended to begin at a young age, possibly as early as the teenage years for some "
                    "syndromes – and needs to be done much more frequently. Specifics depend on which genetic "
                    "syndrome you have, and other factors. \nIf you’re at increased or high risk of colorectal "
                    "cancer (or think you might be), talk to your health care provider to learn more. Your "
                    "provider can suggest the best screening option for you, as well as determine what type of "
                    "screening schedule you should follow, based on your individual risk."
                )
                msg = self.concatenate_strings(msg, string)
        else:
            msg = "No colon cancer screening test is required at the moment. Please inquire again after 6 months."
        return msg

    def apply_breast_cancer_logic(self):
        if self.gender == "female":
            if 50 <= self.age <= 75:
                msg = (
                    "Recommendation: According to the USPSTF guidelines, you are eligible for breast cancer "
                    "screening. This does not mean that you have the disease, but you meet the criteria for "
                    "screening. Screening with mammogram can help in early detection of breast cancer."
                )
            if (
                self.age > 30
                or self.params["brcaMutation"]
                or self.params["relativeWithMutation"]
                or self.params["chestRadiation"]
                or self.params["lrrSyndrome"]
            ):
                msg = (
                    "You are at high risk for breast cancer based on certain factors. Kindly consult you primary "
                    "physician. As per american cancer society should get a breast MRI and a mammogram every year, "
                    "typically starting at age 30."
                )
        else:
            msg = "No breast cancer screening test is required at the moment. Please inquire again after 6 months."

        return msg

    def apply_cervical_cancer_logic(self):
        if self.gender == "female":
            if 21 <= self.age <= 29:
                msg = (
                    "As per the USPSTF, you are eligible for screening for cervical cancer every 3 years. Screening "
                    "test- cervical cytology alone every 3 years."
                )
            elif 30 <= self.age <= 65:
                msg = (
                    "As per the USPSTF, you are eligible for screening for cervical cancer every 3 years. Screening "
                    "test- Cervical cytology every 3 years + high-risk human papilomavirus (hrHPV) every 5 years. "
                    "OR COTESTING (hrHPV testing and cytology) every 5 years."
                )
            else:
                msg = (
                    "No cervical cancer screening test is required at the moment. Please inquire again after 6 "
                    "months."
                )
        else:
            msg = "No cervical cancer screening test is required at the moment. Please inquire again after 6 months."

        return msg

    def apply_prostate_cancer_logic(self):
        if self.gender == "male":
            if 55 <= self.age <= 65:
                msg = (
                    "As per U.S. Preventive Services Task Force, the decision to receive PSA- based screening "
                    "should be an individual one. You can discuss the potential benefits and harms of screening "
                    "with your primary health care"
                )
            else:
                msg = (
                    "No prostate cancer screening test is required at the moment. Please inquire again after 6 "
                    "months."
                )
        else:
            msg = "No prostate cancer screening test is required at the moment. Please inquire again after 6 months."

        return msg

    def get_result(self):
        result = {
            "Lung Cancer": self.apply_lung_cancer_logic(),
            "Breast Cancer": self.apply_breast_cancer_logic(),
            "Colon Cancer": self.apply_colon_cancer_logic(),
            "Cervical Cancer": self.apply_cervical_cancer_logic(),
            "Prostate Cancer": self.apply_prostate_cancer_logic(),
        }
        return result
