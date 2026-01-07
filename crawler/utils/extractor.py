from collections import Counter
import string
import re
from nltk.corpus import stopwords
import nltk

try:
    nltk.data.find("corpora/stopwords")
except LookupError:
    nltk.download("stopwords")

stop_words = set(stopwords.words("english"))


class Frequency_Counter:
    def __init__(self, text):
        self.text = text
        self.words = []

    def extract_keywords(self):
        text = self.text.lower().translate(str.maketrans("", "", string.punctuation))

        tokens = re.findall(r"[a-z]{3,}", text)

        self.words = [w for w in tokens if w not in stop_words]

    def get_top_keywords(self):
        return Counter(self.words).most_common(10)
