import os
from dotenv import load_dotenv
from injector import singleton


@singleton
class Config:
    def __init__(self):
        load_dotenv()

    @property
    def token(self) -> str:
        return os.getenv("TOKEN")

    @property
    def folder_id(self) -> str:
        return os.getenv("FOLDER_ID")

    @property
    def port(self) -> int:
        return os.getenv("PORT")
