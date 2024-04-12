const logElementXPath = () => {
  document.addEventListener(
    'click',
    (event) => {
      const xpath = calculateXPath(event.target);
      console.log(xpath); // xpath 프린트
      console.log(window.location.href);
      event.preventDefault(); // Prevent the default action for demonstration purposes
    },
    true
  );
};

const calculateXPath = (element) => {
  let path = '';
  while (element.nodeType === Node.ELEMENT_NODE) {
    const siblingIndex = getSiblingsIndex(element);
    const nodeName = element.nodeName.toLowerCase();
    path = `/${nodeName}[${siblingIndex}]` + path;
    element = element.parentNode;
  }
  return path;
};

const getSiblingsIndex = (element) => {
  let index = 1; // XPath indexing starts at 1/ 인덱스 1에서부터 시작
  for (
    let sibling = element.previousSibling;
    sibling;
    sibling = sibling.previousSibling
  ) {
    if (
      sibling.nodeType === Node.ELEMENT_NODE &&
      sibling.nodeName === element.nodeName
    ) {
      index++;
    }
  }
  return index;
};

logElementXPath();

document.addEventListener('mouseover', (event) => {
  // Get the original background color of the element under the mouse pointer // 마우스 포인터 아래의 원래 배경색을 가져옴
  const originalBackgroundColor = event.target.style.backgroundColor;
  chrome.storage.local.get(['active'], (result) => {
    const active = result.active;
    // console.log(active);

    if (active === 'active') {
      event.target.style.backgroundColor = 'lightblue';
      document.addEventListener('click', (event) => {
        // Prevent the default click action // 기본 클릭 액션 방지
        event.preventDefault();

        // Get the entire HTML content of the clicked element
        const elementHtml = event.target.outerHTML;

        // Copy the HTML to the clipboard // 클립보드에 HTML 복사
        navigator.clipboard
          .writeText(elementHtml)
          .then(() => {
            console.log('Element HTML copied to clipboard');
          })
          .catch((err) => {
            console.error('Failed to copy element HTML to clipboard', err);
          });
        // send the html to the server // 서버에 html 보내기
        const postDataAndPrintResponse = async (url, data) => {
          try {
            // Make the POST request // POST 요청
            const response = await fetch(url, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data),
            });

            if (!response.ok)
              throw new Error(`HTTP error! status: ${response.status}`);

            // Get the response data as text // 텍스트로 응답 데이터 가져오기
            const responseText = await response.text();

            // Print the response text (CSV content) // 응답 텍스트 (CSV 내용) 출력
            // console.log(responseText); // 응답 텍스트 출력
          } catch (error) {
            console.error('Request failed:', error);
          }
        };

        // Usage
        postDataAndPrintResponse('https://example.com/api', {
          key: elementHtml,
        });

        // act to none
        const act = 'none'; // 활성화 상태를 비활성화 상태로 변경

        chrome.storage.local.set({ active: act });
      });
      // Restore the original background color when the mouse leaves the element // 마우스가 요소를 떠나면 원래 배경색 복원
      event.target.addEventListener(
        'mouseout',
        () => {
          event.target.style.backgroundColor = originalBackgroundColor;
        },
        { once: true }
      );
    }
  });

  // Change the background color of the element under the mouse pointer
  // Restore the original background color when the mouse leaves the element
});
