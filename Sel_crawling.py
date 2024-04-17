'''
해당 파일은 초기 디자인으로 현 프로젝트의 중요 처리 방법을 바꿈에 따라 다른 코드 스크립트로 진행합니다.
Old(this file) : Only using Selenium
Final : Using BeautifulSoup (for crawling deep node data)
향후 가능성 : Selenium + BeautifulSoup
'''

from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
import time
from selenium.webdriver.common.by import By
import pandas as pd

ChromeDriverManager().install()
browser = webdriver.Chrome()

# 최대 10초; 페이지 로드를 위해 대기
# browser.implicitly_wait(10) 

# 보다 확실한 로드를 위해 강제 3초 대기
time.sleep(3) 

# javascript로부터 받아오는 데이터 : url_link, Full_XPath
# current setting : sample url, XPath
js_link = 'https://news.google.com/home?hl=ko&gl=KR&ceid=KR:ko'
js_xpath = '/html/body/c-wiz/div/div[2]/main/div[2]/c-wiz/section/div[2]/div'
browser.get(js_link)

# 페이지 끝까지 스크롤 내리기
last_height = browser.execute_script("return document.body.scrollHeight")

while True:
    browser.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    # browser.implicitly_wait(10)  # 최대 10초; 페이지 로드를 위해 대기
    time.sleep(5) # 5초 페이지 로드
    new_height = browser.execute_script("return document.body.scrollHeight")
    if new_height == last_height:
        break
    last_height = new_height

# XPath로 elements 부르기
parent = browser.find_elements(By.XPATH, js_xpath)

# 데이터를 저장할 리스트
data = []

# 수집된 데이터 처리
for element in parent:
    child_elements = element.find_elements(By.XPATH, './/*')  # 현재 요소의 모든 하위 요소를 선택
    row=[]
    for child in child_elements:
        text = child.text # 하위 요소의 텍스트 추출
        if text:
            data.append(text)
# print(data)
# (추후작업) row역할의 데이터들을 append하면 2d 데이터가 되고 DataFrame으로 변환
# ==> BeautifulSoup에서 처리하는것이 더 맞으므로 방법 변경

# pandas DataFrame으로 변환
df = pd.DataFrame(data, columns=['Text'])  # 'Text' 열에 수집된 텍스트 저장

# CSV 파일로 저장
df.to_csv('data.csv', index=False)

# 드라이버 종료
browser.quit()

