from bs4 import BeautifulSoup
import requests
from urllib.parse import urlparse, urljoin
from collections import deque


def crawler(seed_url, max_n=500):
    my_headers = {"User-Agent": "BootCrawler/1.0"}
    url_queue = deque([seed_url])
    visited_urls = set()

    while len(url_queue) != 0 and len(visited_urls) < max_n:
        leftmost_url = url_queue.popleft()
        if leftmost_url in visited_urls:
            continue
        print(leftmost_url)
        res = requests.get(leftmost_url, headers=my_headers)
        if res.status_code == 200:
            visited_urls.add(leftmost_url)
            html_content = res.text
            soup = BeautifulSoup(html_content, "html.parser")
            a_tags = soup.find_all("a", href=True)
            for a_tag in a_tags:
                link = a_tag["href"]
                link = urlparse(link)
                link = urljoin(seed_url, link.path)
                url_queue.append(link)

        else:
            print("error")
    print("done")


crawler("https://en.wikipedia.org/wiki/Serial_Experiments_Lain")
