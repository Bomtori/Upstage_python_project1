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
