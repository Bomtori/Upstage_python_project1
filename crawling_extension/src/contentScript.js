// const logElementXPath = () => {
//   document.addEventListener(
//     'click',
//     (event) => {
//       const xpath = calculateXPath(event.target);
//       console.log(xpath); // xpath 프린트
//       console.log(window.location.href);
//       event.preventDefault(); // Prevent the default action for demonstration purposes
//     },
//     true
//   );
// };

// const calculateXPath = (element) => {
//   let path = '';
//   while (element.nodeType === Node.ELEMENT_NODE) {
//     const siblingIndex = getSiblingsIndex(element);
//     const nodeName = element.nodeName.toLowerCase();
//     path = `/${nodeName}[${siblingIndex}]` + path;
//     element = element.parentNode;
//   }
//   return path;
// };

// const getSiblingsIndex = (element) => {
//   let index = 1; // XPath indexing starts at 1/ 인덱스 1에서부터 시작
//   for (
//     let sibling = element.previousSibling;
//     sibling;
//     sibling = sibling.previousSibling
//   ) {
//     if (
//       sibling.nodeType === Node.ELEMENT_NODE &&
//       sibling.nodeName === element.nodeName
//     ) {
//       index++;
//     }
//   }
//   return index;
// };

// logElementXPath();

// document.addEventListener('mouseover', (event) => {
//   // Get the original background color of the element under the mouse pointer // 마우스 포인터 아래의 원래 배경색을 가져옴
//   const originalBackgroundColor = event.target.style.backgroundColor;
//   chrome.storage.local.get(['active'], (result) => {
//     const active = result.active;
//     // console.log(active);

//     if (active === 'active') {
//       // act to none
//       event.target.style.backgroundColor = 'lightblue';
//       document.addEventListener('click', (event) => {
//         // Prevent the default click action // 기본 클릭 액션 방지
//         event.preventDefault();
//         const act = 'none'; // 활성화 상태를 비활성화 상태로 변경

//         chrome.storage.local.set({ active: act });

//         // Get the entire HTML content of the clicked element
//         const elementHtml = event.target.outerHTML;

//         // Copy the HTML to the clipboard // 클립보드에 HTML 복사
//         navigator.clipboard
//           .writeText(elementHtml)
//           .then(() => {
//             console.log('Element HTML copied to clipboard');
//           })
//           .catch((err) => {
//             console.error('Failed to copy element HTML to clipboard', err);
//           });
//         // send the html to the server // 서버에 html 보내기
//         const postDataAndPrintResponse = async (url) => {
//           try {
//             // Make the POST request // POST 요청
//             const data = { html: elementHtml };
//             const response = await fetch(url, {
//               method: 'POST',
//               headers: { 'Content-Type': 'application/json' },
//               body: JSON.stringify(data),
//             });
//             const blob = await response.blob(); // Convert the response to a blob
//             console.log(blob);
//             const blobUrl = URL.createObjectURL(blob); // Create a URL for the blob
//             const link = document.createElement('a');
//             link.href = blobUrl;
//             link.download = 'downloaded_data.csv'; // Set the filename for the download
//             document.body.appendChild(link);
//             link.click(); // Trigger the download
//             document.body.removeChild(link); // Clean up the link
//             URL.revokeObjectURL(blobUrl); // Free up the blob URL
//             if (!response.ok)
//               throw new Error(`HTTP error! status: ${response.status}`);

//             // Get the response data as text // 텍스트로 응답 데이터 가져오기
//             // const responseText = await response.json();
//             // console.log(333);
//             // console.log(responseText);
//             // Print the response text (CSV content) // 응답 텍스트 (CSV 내용) 출력
//             // console.log(responseText); // 응답 텍스트 출력
//           } catch (error) {
//             console.error('Request failed:', error);
//           }
//         };

//         // Usage
//         postDataAndPrintResponse(
//           'https://crawling-extension-flask.onrender.com/post'
//         );

//         // act to none
//         const acts = 'none'; // 활성화 상태를 비활성화 상태로 변경

//         chrome.storage.local.set({ active: acts });
//       });
//       // Restore the original background color when the mouse leaves the element // 마우스가 요소를 떠나면 원래 배경색 복원
//       event.target.addEventListener(
//         'mouseout',
//         () => {
//           event.target.style.backgroundColor = originalBackgroundColor;
//         },
//         { once: true }
//       );
//     }
//   });

//   // Change the background color of the element under the mouse pointer
//   // Restore the original background color when the mouse leaves the element
// });
// content.js
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
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ html: htmlData }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // outer html 을 보내고 받음 확인 완료
    // Assuming this is inside an async function after fetching a response
    const blob = await response.blob();
    console.log(blob);
    const blobUrl = URL.createObjectURL(blob);

    // Call the modal function instead of direct download
    createDownloadModal(blobUrl);

    // const blob = await response.blob();
    // console.log(blob);
    // const blobUrl = URL.createObjectURL(blob);
    // const link = document.createElement('a');
    // link.href = blobUrl;
    // link.download = 'downloaded_data.csv';
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
    // URL.revokeObjectURL(blobUrl);

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

      // Assuming postDataAndPrintResponse function is defined elsewhere
      const response = await postDataAndPrintResponse(
        'https://crawling-extension-flask.onrender.com/post',
        elementHtml
      );
      console.log(response);

      chrome.storage.local.set({ active: 'none' }); // Deactivate after handling
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

// React to changes in activation state // 활성화 상태 변경에 반응
chrome.storage.onChanged.addListener((changes, namespace) => {
  if ('active' in changes) {
    setupEventListeners(); // Re-setup event listeners based on the new active state // 새로운 활성 상태에 따라 이벤트 리스너 다시 설정
  }
});
