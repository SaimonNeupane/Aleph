import redis
import re
from nltk.stem import PorterStemmer
import uuid

stemmer = PorterStemmer()


def Add(url, keywords, r: redis.Redis):
    url_id = r.incr("doc_id_counter")

    r.hset("urlId", mapping={str(url_id): url})

    for keyword in keywords:
        k = keyword.lower()
        k = stemmer.stem(k)
        k = re.sub(r"[^a-z0-9]", "", k)

        if not k:
            continue

        r.sadd(k, url_id)

    print("Added to redis")
