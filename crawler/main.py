from bs4 import BeautifulSoup
import requests
from urllib.parse import urlparse, urljoin
from collections import deque
from fake_useragent import UserAgent
from parse_sitemap import parser
from utils.utils import normalize
from requests.utils import requote_uri
from utils.seeder import execute_sql
from utils.extractor import Frequency_Counter


class Crawler:
    def __init__(self, seed_url, max_page=500):
        self.deque = deque([seed_url])
        self.visited_urls = set()
        self.max_page = max_page

    def get_headers(self):
        return UserAgent().random

    def crawl(self):
        while self.max_page > 0 and self.deque:
            url = self.deque.popleft()
            query = "INSERT INTO api_webpage (title,content,url) VALUES(%s,%s,%s)"
            print(f"for the url {url}")
            response = requests.get(
                requote_uri(url), headers={"User-Agent": self.get_headers()}
            )
            self.visited_urls.add(url)
            soup = BeautifulSoup(response.text, "html.parser")
            text = soup.get_text()
            title = soup.title.string
            execute_sql(query, (title, text, url))

            a_tags = soup.find_all("a", href=True)
            for a in a_tags:
                link = normalize(a["href"])
                print(link)
                if link in self.visited_urls or link.strip() == "":
                    pass
                else:
                    self.deque.append(link)
            self.max_page -= 1


ram = Crawler("https://en.wikipedia.org/wiki/Kathmandu_University")
ram.crawl()
