from bs4 import BeautifulSoup
import requests
from urllib.parse import urlparse, urljoin
from collections import deque
from fake_useragent import UserAgent
from parse_sitemap import parser
from utils.utils import normalize
from requests.utils import requote_uri
from utils.utils import handle_html


def crawler(seed_url, max_n=500):
    ua = UserAgent()
    my_headers = {"User-Agent": ua.random}
    url_queue = deque([seed_url])
    visited_urls = set()
    id = 1

    while len(url_queue) != 0 and len(visited_urls) < max_n:
        leftmost_url = url_queue.popleft()
        if leftmost_url in visited_urls or leftmost_url == "":
            continue
        print(leftmost_url)
        res = requests.get(requote_uri(leftmost_url), headers=my_headers)
        if res.status_code == 200:
            visited_urls.add(leftmost_url)
            html_content = res.text
            a_tags = handle_html(leftmost_url, html_content, id)
            for a_tag in a_tags:
                link = a_tag["href"]
                link = urljoin(seed_url, link)
                normalized = normalize(link)
                if normalized:
                    url_queue.append(normalized)
            id += 1
        else:
            print("error")
    print("done")


crawler("https://en.wikipedia.org/wiki/Serial_Experiments_Lain")
# parser.parse_sitemap("https://anvil.works/sitemap.xml")
