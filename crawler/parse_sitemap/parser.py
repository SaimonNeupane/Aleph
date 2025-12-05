import requests
from bs4 import BeautifulSoup
from fake_useragent import UserAgent


def parse_sitemap(url):
    ua = UserAgent()
    my_headers = {"User-Agent": ua.random}
    res = requests.get(url, headers=my_headers)
    soup = BeautifulSoup(res.text, "lxml-xml")
    a = soup.find_all("loc")
    for tag in a:
        print(tag.text)
