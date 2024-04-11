// const initializePopup = () => {
//   chrome.storage.local.get(['active'], (result) => {
//     const savedActive = result.active;
//     console.log(1232);

//     // Set the saved values to the select and input elements
//     if (savedActive === 'active') {
//       document.getElementById('activeToggle').checked = true;
//     } else {
//       document.getElementById('activeToggle').checked = false;
//     }
//   });
// };

// document.getElementById('activeToggle').addEventListener('change', (event) => {
//   console.log(456);
//   const isActive = event.target.checked;

//   chrome.storage.local.set({ active: isActive ? 'active' : 'inactive' });
// });

// initializePopup();

const initializePopup = () => {
  chrome.storage.local.get(['active'], (result) => {
    // set the saved values to the checkbox // 저장된 값을 체크박스에 설정
    const savedActive = result.active;
    if (savedActive === 'active') {
      document.getElementById('activeToggle').checked = true;
    } else {
      document.getElementById('activeToggle').checked = false;
    }
  });
};

document.getElementById('activeToggle').addEventListener('change', (event) => {
  // save the state of the checkbox // 체크박스의 상태 저장
  const isActivated = event.target.checked;
  let act = 'none';
  if (isActivated) {
    act = 'active';
  }
  // set the state of the checkbox //  체크박스의 상태 설정
  chrome.storage.local.set({ active: act });
});

initializePopup();

// 새로운 코드

// document.addEventListener('DOMContentLoaded', () => {
//   chrome.storage.local.get(['isExtensionActive'], (result) => {
//     const isExtensionActive = result.isExtensionActive;
//     // Set the saved values to the select and input elements
//     if (isExtensionActive) {
//       document.getElementById('fontSelect').value = savedFont;
//     }
//   });

//   const toggleButton = document.getElementById('toggleButton');

//   let isExtensionActive = false;

//   toggleButton.addEventListener('click', () => {
//     isExtensionActive = !isExtensionActive;
//     toggleButton.textContent = isExtensionActive ? 'Off' : 'On';

//     // Send a message to the content script
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//       chrome.tabs.sendMessage(tabs[0].id, {
//         action: isExtensionActive ? 'activate' : 'deactivate',
//       });
//     });
//   });
// });
