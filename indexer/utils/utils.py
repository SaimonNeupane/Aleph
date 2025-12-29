import redis
import re
from nltk.stem import PorterStemmer

stemmer = PorterStemmer()


def Add(url, keywords, r: redis.Redis):
    print(f"{url}: \n {keywords}")
    for k in keywords:
        k = k.lower()
        k = stemmer.stem(k)
        k = re.sub(r"[^a-z0-9]", "", k)

        if not k:
            continue

        r.sadd(k, url)
