chrome.storage.local.set({ isInitialized: 'none' });
const initializePopup = () => {
  chrome.storage.local.get(['active', 'scrollCount', 'waitTime'], (result) => {
    // set the saved values // 저장된 값 설정
    document.getElementById('activeToggle').checked =
      result.active === 'active';

    if (result.scrollCount) {
      document.getElementById('numberInput').value = result.scrollCount;
    }
    if (result.waitTime) {
      document.getElementById('waitTimeInput').value = result.waitTime;
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

document.getElementById('saveButton').addEventListener('click', () => {
  // save the values of the inputs // 입력값 저장
  const scrollCount = document.getElementById('numberInput').value;
  const waitTime = document.getElementById('waitTimeInput').value;
  // set the values of the inputs // 입력값 설정
  chrome.storage.local.set({
    scrollCount: scrollCount,
    waitTime: waitTime,
    isInitialized: 'active',
  });
});

initializePopup();
