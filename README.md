# Upstage_python_project1
> Upstage x fastcampus AI LAB python first project : crawling chrome extension

### 프로젝트 내용
- 부트캠프를 진행하면서 아버지 지인께서 이러한 기능을 아들이 만들어줬다. 이런 편리한 기능을 사용하고싶다 했습니다. 마침 Upstage_AILAB에서 첫 파이썬 프로젝트로 크롤링 프로젝트를 진행하게 되었습니다. 이를통해 팀원들과 소통 후, 구글 확장 프로그램을 프로젝트로 만들기로 하였습니다.
- 이 프로그램은 구글 확장 프로그램으로, 사용자가 웹페이지에서 원하는 부분을 클릭하면 해당 요소의 outer HTML을 긁어와서 크롤링하는 기능을 제공합니다. 이는 비전공자나 크롤링에 익숙하지 않은 사람들도 손쉽게 사용할 수 있도록 만들어졌습니다.

### 프로젝트 정보
- beautifulsoup로 크롤링
- java를 활용하여 확장프로그램
- flask서버를 활용하여 모델 돌리기

### 사용방법
- 크롬 오른쪽 위 3점 클릭 > 확장프로그램 > 확장프로그램 관리 > 오른쪽 상단 개발자 모드 실행
- powershell에서 crawling_extension폴더로 들어간 후, npm run watch 실행> 폴더에 build 만들어진 것을 확인
- 확장 프로그램 > 압축해제된 확장 프로그램을 로드합니다. 클릭 > build 업로드 후 사용
- 크롤링: Activate Crawling 클릭후 원하는 태그 클릭(서버가 다운되어있으면 재시작하느라 시간이 걸림)
- 스크롤링: Scroll Wait, Time Scroll Count을 원하는 값으로 설정한뒤 initialize 버튼 클릭

### 개발환경

<div style="text-align:center;">

  [![JavaScript](https://img.shields.io/badge/javascript-%23F7DF1E?style=for-the-badge&logo=javascript&logoColor=white)](https://www.javascript.com/)
  [![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
  [![Flask](https://img.shields.io/badge/Flask-%23000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
  [![Beautiful Soup](https://img.shields.io/badge/Beautiful_Soup-4CA2E5?style=for-the-badge&logo=beautifulsoup&logoColor=white)](https://www.crummy.com/software/BeautifulSoup/bs4/doc/)
  [![Selenium](https://img.shields.io/badge/Selenium-%2343B02A?style=for-the-badge&logo=Selenium&logoColor=white)](https://www.selenium.dev/)
  [![Renderer](https://img.shields.io/badge/Renderer-%23323330?style=for-the-badge)](https://example.com/)
  [![Chrome Extension](https://img.shields.io/badge/Chrome_Extension-4285F4?style=for-the-badge&logo=google-chrome&logoColor=white)](https://developer.chrome.com/docs/extensions/)

</div>

![그림1](https://github.com/Bomtori/Upstage_python_project1/assets/117797850/a86447ac-661f-472c-b3eb-0a3c2e648f7f)

### 업데이트 내역
2024.04.15 (월) v0.1 배포
