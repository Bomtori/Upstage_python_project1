from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
import time
from selenium.webdriver.common.by import By
import pandas as pd

browser = webdriver.Chrome()
browser.implicitly_wait(10)  # 최대 10초; 페이지 로드를 위해 대기

# javascript로부터 받아오는 데이터 : url_link, Full_XPath
js_link = 'https://news.google.com/home?hl=en-US&gl=US&ceid=US:en'
js_xpath = '/html/body/c-wiz/div/div[2]/main/div[2]/c-wiz/section/div[2]/div/div[2]/c-wiz/c-wiz/div/article/div[1]/a'
browser.get(js_link)

# 페이지 끝까지 스크롤 내리기
last_height = browser.execute_script("return document.body.scrollHeight")

while True:
    browser.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    browser.implicitly_wait(10)  # 최대 10초; 페이지 로드를 위해 대기
    new_height = browser.execute_script("return document.body.scrollHeight")
    if new_height == last_height:
        break
    last_height = new_height

# XPath로 elements 부르기
# Q.이부분에서 find_elements와 find_element는 결과가 같아야하지만 실제로 어떠리 검토해봐야합
parent = browser.find_elements(By.XPATH, js_xpath)

# 데이터를 저장할 리스트
# (추후작업) row역할의 데이터들을 append하면 2d 데이터가 되고 DataFrame으로 변환하면 됨
data = []

# 수집된 데이터 처리
for element in parent:
    # 각 하위 데이터의 텍스트를 수집합니다. 필요한 데이터 구조에 맞게 조정해야 하지만 유의미한 데이터리스트를 만들어 row 역할을 하게합니다.
    child_elements = element.find_elements(By.XPATH, './/*')  # 현재 요소의 모든 하위 요소를 선택
    for child in child_elements:
        text = child.text # 하위 요소의 텍스트 추출
        if text:  # 텍스트가 비어있지 않은 경우에만 데이터에 추가
            data.append(text)

# pandas DataFrame으로 변환
df = pd.DataFrame(data, columns=['Text'])  # 'Text' 열에 수집된 텍스트 저장

# CSV 파일로 저장
df.to_csv('data.csv', index=False)

# 드라이버 종료
browser.quit()

