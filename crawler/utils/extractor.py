from collections import Counter
import string
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import nltk

stop_words = set(stopwords.words("english"))


class Frequency_Counter:
    def __init__(self, text):
        self.text = text
        self.words = []

    def extract_keywords(self):
        # find , replace ,delete translation table ma
        rule = str.maketrans("", "", string.punctuation)
        cleared_text = self.text.lower().translate(rule)
        print(cleared_text)
        tokens = word_tokenize(cleared_text)
        words = [word for word in tokens if word not in stop_words]
        self.words = words[:]

    def get_top_keywords(self):
        dictt = Counter(self.words)
        return dictt.most_common(10)
