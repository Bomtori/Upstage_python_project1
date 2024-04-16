const createDownloadModal = (blobUrl) => {
  // Create the modal container // 컨테이너 만들기
  const modal = document.createElement('div');
  modal.style.cssText = `
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
  `;

  // Create the modal content box // 박스 모달 내용 만들기
  const modalContent = document.createElement('div');
  modalContent.style.cssText = `
      background: white;
      padding: 20px;
      border-radius: 5px;
      text-align: center;
  `;

  // Add text to the modal content // 모달 내용에 텍스트 추가
  const modalText = document.createElement('p');
  modalText.textContent = 'Do you want to download the CSV file?';
  modalContent.appendChild(modalText);

  // Create the download button // 다운로드 버튼 만들기
  const downloadButton = document.createElement('button');
  downloadButton.textContent = 'Download';
  downloadButton.style.cssText = `
      margin: 10px;
      padding: 5px 10px;
      cursor: pointer;
  `;
  downloadButton.onclick = () => {
    document.body.removeChild(modal); // Remove modal before downloading // 다운로드 전에 모달 제거
    downloadFile(blobUrl); // Proceed with download // 다운로드 진행
  };

  // Create the cancel button // 취소 버튼 만들기
  const cancelButton = document.createElement('button');
  cancelButton.textContent = 'Cancel';
  cancelButton.style.cssText = `
      margin: 10px;
      padding: 5px 10px;
      cursor: pointer;
  `;
  cancelButton.onclick = () => {
    document.body.removeChild(modal);
    URL.revokeObjectURL(blobUrl); // Clean up if canceled // 취소시 정리
  };

  // Append buttons to modal content // 모달 내용에 버튼 추가
  modalContent.appendChild(downloadButton);
  modalContent.appendChild(cancelButton);

  // Append modal content to modal container // 모달 내용을 모달 컨테이너에 추가
  modal.appendChild(modalContent);

  // Append modal to body // 모달을 본문에 추가
  document.body.appendChild(modal);
};
// 다운로드 파일
const downloadFile = (blobUrl) => {
  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = 'downloaded_data.csv';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(blobUrl);
};
// 데이터 보내고 응답 출력
const postDataAndPrintResponse = async (url, htmlData) => {
  const authToken =
    'slknflaksdnflnadlfasklmnlkgaslkmelopwjepgjkamdop!@332&56kfmafasg';
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: authToken },
      body: JSON.stringify({ html: htmlData }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // outer html 을 보내고 받음 확인 완료
    // Assuming this is inside an async function after fetching a response // 응답을 가져온 후 async 함수 내부에 있다고 가정
    const blob = await response.blob();
    console.log(blob);
    const blobUrl = URL.createObjectURL(blob);

    // Call the modal function instead of direct download // 직접 다운로드 대신 모달 함수 호출
    createDownloadModal(blobUrl);

    return 'File downloaded';
  } catch (error) {
    console.error('Request failed:', error);
    return null;
  }
};
// 마우스 올라갔을 때 이벤트
const handleMouseOver = (event) => {
  const originalBackgroundColor = event.target.style.backgroundColor;
  event.target.style.backgroundColor = 'lightblue';

  event.target.addEventListener(
    'mouseout',
    () => {
      event.target.style.backgroundColor = originalBackgroundColor;
    },
    { once: true }
  );
};
// 클릭 이벤트
const handleClick = (event) => {
  event.preventDefault();
  event.stopPropagation();

  chrome.storage.local.get(['active'], async (result) => {
    if (result.active === 'active') {
      const elementHtml = event.target.outerHTML;

      const response = await postDataAndPrintResponse(
        'https://crawling-extension-flask.onrender.com/post',
        elementHtml
      );
      console.log(response);

      chrome.storage.local.set({ active: 'none' }); // Deactivate after handling // 처리 후 비활성화
    }
  });
};
// 이벤트 리스너 설정
const setupEventListeners = () => {
  chrome.storage.local.get(['active'], (result) => {
    if (result.active === 'active') {
      document.addEventListener('mouseover', handleMouseOver);
      document.addEventListener('click', handleClick);
    } else {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('click', handleClick);
    }
  });
};

// Initialize listeners setup on script load // 이벤트 리스너 설정
setupEventListeners();
const getRandomScrollDistance = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
// React to changes in activation state // 활성화 상태 변경에 반응
chrome.storage.onChanged.addListener((changes, namespace) => {
  if ('active' in changes) {
    setupEventListeners(); // Re-setup event listeners based on the new active state // 새로운 활성 상태에 따라 이벤트 리스너 다시 설정
  }
  if ('isInitialized' in changes) {
    console.log('isInitialized changed');
    chrome.storage.local.get(
      ['scrollCount', 'isInitialized', 'waitTime'],
      (result) => {
        if (result.isInitialized === 'active') {
          // Retrieve the number of times to scroll down // 아래로 스크롤할 횟수를 가져옴
          const totalScrolls = parseInt(result.scrollCount, 10) || 10; // Default to 10 scrolls if undefined // 정의되지 않은 경우 10 스크롤로 기본 설정
          const delayBetweenScrolls =
            parseInt(result.waitTime, 10) * 1000 || 1000; // Default to 1 second if undefined // 정의되지 않은 경우 1초로 기본 설정
          console.log(parseInt(result.waitTime) * 1000);
          console.log('Total scrolls:', totalScrolls);

          const scrollPage = (currentCount = 0) => {
            const scrollDistance = getRandomScrollDistance(9555, 10555);
            console.log(
              `Scrolling ${currentCount + 1}: ${scrollDistance} pixels`
            );
            window.scrollBy(0, scrollDistance);

            // Increment the scroll count and continue if we haven't reached the total // 스크롤 횟수를 증가시키고 총 횟수에 도달하지 않은 경우 계속 진행
            if (currentCount + 1 < totalScrolls) {
              setTimeout(
                () => scrollPage(currentCount + 1),
                delayBetweenScrolls
              );
            }
          };

          // Start the scrolling process // 스크롤링 프로세스 시작
          scrollPage();

          // Optionally reset the initialization flag to 'none' // 선택적으로 초기화 플래그를 'none'으로 재설정
          chrome.storage.local.set({ isInitialized: 'none' });
        }
      }
    );
  }
});
