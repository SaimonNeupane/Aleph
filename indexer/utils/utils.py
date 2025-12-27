import redis
import re


def Add(url, keywords, r: redis.Redis):
    print(f"{url}: \n {keywords}")
    for k in keywords:
        k = k.lower()
        k = re.sub(r"[^a-z0-9]", "", k)

        if not k:
            continue

        r.sadd(f"kw:{k}", url)
