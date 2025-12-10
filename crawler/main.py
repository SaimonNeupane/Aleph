from bs4 import BeautifulSoup
import requests
from urllib.parse import urlparse, urljoin
from collections import deque
from fake_useragent import UserAgent
from parse_sitemap import parser
from utils.utils import normalize
from requests.utils import requote_uri
from utils.seeder import execute_sql

# def crawler(seed_url, max_n=500):
# m
#     ua = UserAgent()
#     my_headers = {"User-Agent": ua.random}
#     url_queue = deque([seed_url])
#     visited_urls = set()
#
#     while len(url_queue) != 0 and len(visited_urls) < max_n:
#         leftmost_url = url_queue.popleft()
#         if leftmost_url in visited_urls or leftmost_url == "":
#             continue
#         print(leftmost_url)
#         res = requests.get(requote_uri(leftmost_url), headers=my_headers)
#         if res.status_code == 200:
#             visited_urls.add(leftmost_url)
#             html_content = res.text
#             soup = BeautifulSoup(html_content, "html.parser")
#             a_tags = soup.find_all("a", href=True)
#             for a_tag in a_tags:
#                 link = a_tag["href"]
#                 link = urljoin(seed_url, link)
#                 normalized = normalize(link)
#                 if normalized:
#                     url_queue.append(normalized)
#
#         else:
#             print("error")
#     print("done")
#
#
# crawler("https://en.wikipedia.org/wiki/Serial_Experiments_Lain")
# parser.parse_sitemap("https://anvil.works/sitemap.xml")
#


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
            query = "INSERT INTO search (url) VALUES(%s)"
            print(f"for the url {url}")
            response = requests.get(
                requote_uri(url), headers={"User-Agent": self.get_headers()}
            )
            self.visited_urls.add(url)
            execute_sql(query, (url,))
            # print(f"the response is {response.text}")
            soup = BeautifulSoup(response.text, "html.parser")
            a_tags = soup.find_all("a", href=True)
            for a in a_tags:
                link = normalize(a["href"])
                print(link)
                if link in self.visited_urls or link.strip() == "":
                    pass
                else:
                    self.deque.append(link)
            self.max_page -= 1


ram = Crawler("https://saimonneupane.com.np")
ram.crawl()
