from bs4 import BeautifulSoup
import requests
from collections import deque
from fake_useragent import UserAgent
from crawler.normalizer import normalize
from requests.utils import requote_uri
from api.models import WebPage


class Crawler:
    def __init__(self, max_page=500):
        self.deque = deque(['https://en.wikipedia.org/wiki/Kathmandu_University'])
        self.visited_urls = set()
        self.max_page = max_page

    def get_headers(self):
        return UserAgent().random

    def crawl(self):
        while self.max_page > 0 and self.deque:
            url = self.deque.popleft()
            print(f"for the url {url}")
            try:
                response = requests.get(
                    requote_uri(url), headers={"User-Agent": self.get_headers()}
                )
            except Exception as e:
                print(f"{url} caught an exception {e}")
                continue
            soup = BeautifulSoup(response.text, "html.parser")
            text = soup.get_text(strip=True)
            title = soup.title.string if soup.title else ""
            try:
                WebPage.objects.create(url=url, title=title, content=text)
            except Exception as e:
                print(
                    f"an exception occured while saving {url} skipping this  due to {e.__str__()}"
                )
                continue

            self.visited_urls.add(url)

            a_tags = soup.find_all("a", href=True)
            for a in a_tags:
                link = normalize(a["href"])
                print(link)
                if link in self.visited_urls or link.strip() == "":
                    pass
                else:
                    self.deque.append(link)
            self.max_page -= 1


ram = Crawler()
ram.crawl()
