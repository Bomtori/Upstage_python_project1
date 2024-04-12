# -*- coding: utf-8 -*-
import pandas as pd
from bs4 import BeautifulSoup
from collections import defaultdict

html_doc = ""

soup = BeautifulSoup(html_doc, 'html.parser')

class_elements = defaultdict(list)

# 모든 태그를 찾아서 클래스 이름을 그에 해당하는 요소 리스트에 추가
for tag in soup.find_all(True):
    class_names = tag.get('class', [])
    for class_name in class_names:
        class_elements[class_name].append(tag.get_text(strip=True))

# 각 클래스 이름에 해당하는 리스트의 길이를 맞추기 위해 빈 문자열로 채움
max_length = max(len(elements) for elements in class_elements.values())
for elements in class_elements.values():
    elements.extend([''] * (max_length - len(elements)))

# pandas DataFrame 생성
df = pd.DataFrame(class_elements)

# CSV 파일로 저장
df.to_csv('class_elements.csv', index=False, encoding='utf-8-sig')
print("CSV 파일이 성공적으로 생성되었습니다.")

