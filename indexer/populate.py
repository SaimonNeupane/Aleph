import os
import random

# Folder where files will be created
DATA_FOLDER = "../data"

# Make sure folder exists
os.makedirs(DATA_FOLDER, exist_ok=True)

# Sample keyword pool
KEYWORDS_POOL = [
    "python", "redis", "database", "indexing", "search",
    "backend", "api", "web", "storage", "cache",
    "performance", "fast", "scalable", "server",
    "programming", "data", "keywords", "url", "crawler"
]

for i in range(1, 101):
    url = f"https://example.com/page/{i}"

    # Pick 5–8 random keywords
    keywords = random.sample(KEYWORDS_POOL, random.randint(5, 8))

    file_path = os.path.join(DATA_FOLDER, f"{i}.txt")

    with open(file_path, "w") as f:
        f.write(url + "\n")
        f.write(str(keywords))  # IMPORTANT: Python list, not JSON

print("✅ 100 data files created successfully.")
