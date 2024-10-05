from dataclasses import replace
from injector import inject, singleton
from core import Resources
from data.repository import RecognizeRepository, TranslationRepository
from utils.image import ImageHelper


@singleton
class TranslationService:
    @inject
    def __init__(
        self,
        recognize_repository: RecognizeRepository,
        translation_repository: TranslationRepository,
        resources: Resources,
    ):
        self._recognize_repository = recognize_repository
        self._translation_repository = translation_repository
        self._resources = resources

    def translate(self, image: bytes, target: str):

        helper = ImageHelper(
            image=image,
            font=self._resources.arial_dir,
        )

        lines = self._recognize_repository.recognize(
            content=image,
            type=helper.format,
        )

        translates = self._translation_repository.translate(
            texts=[t.text for t in lines], target=target
        )

        for i, line in enumerate(lines):
            helper.replace_text(replace(line, text=translates[i]))

        return helper.to_bytes()
