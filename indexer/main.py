import os
import ast
from utils.utils import Add
import redis


def indexer():
    r = redis.Redis(host="localhost", port=6379, db=0)
    folder = "../data"
    files = os.listdir(folder)
    max = len(files)
    i = 1

    while i <= max:
        f = open(f"../data/{i}.txt", "r")
        text = f.read().split("\n")
        keywords = ast.literal_eval(text[1])
        Add(text[0], keywords, r)
        i += 1
        f.close()


if __name__ == "__main__":
    indexer()
