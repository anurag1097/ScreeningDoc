import os
import configparser


class ConfigurationHelper:
    __instance = None

    def __init__(self):
        ConfigurationHelper.__instance = self
        self.config = configparser.ConfigParser(
            interpolation=configparser.ExtendedInterpolation()
        )
        path = os.path.abspath(__file__)
        dir_path = os.path.dirname(path)
        self.config.read(os.path.join(dir_path, "config.ini"))

    def get_config(self, config_name):
        if config_name not in self.config:
            raise Exception(f"Config not found: {config_name}")
        return self.config[config_name]

    def get_constants(self):
        return self.get_config("CONSTANTS")

    def get_database_details(self):
        return self.get_config("DATABASE")
