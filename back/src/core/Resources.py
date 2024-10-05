from injector import singleton
from os.path import abspath, dirname, join


@singleton
class Resources:
    @property
    def root_dir(self):
        return abspath(join(dirname(abspath(__file__)), "../"))

    @property
    def resources_dir(self):
        return f"{self.root_dir}/resources"

    @property
    def fonts_dir(self):
        return f"{self.resources_dir}/fonts"

    @property
    def arial_dir(self):
        return f"{self.fonts_dir}/arial.ttf"

    @property
    def arial(self):
        with open(self.arial_dir, "rb") as f:
            content = f.read()

        return content
