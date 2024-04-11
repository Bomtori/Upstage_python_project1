// With background scripts you can communicate with popup
// and contentScript files.
// For more information on background script,
// See https://developer.chrome.com/extensions/background_pages
console.log('love');

// chrome.commands.onCommand.addListener(async (command) => {
//   let { font, size, underline } = await chrome.storage.local.get([
//     'font',
//     'size',
//     'underline',
//   ]);
//   const selectedFont = font || 'Arial';
//   const selectedSize = (size * 4) / 3 || '14';
//   console.log(selectedFont, selectedSize, underline);

//   let [currentTab] = await chrome.tabs.query({
//     active: true,
//     currentWindow: true,
//   });
//   const title = currentTab.title.replace(/-.*|\|.*$/, '').trim();

//   const url = currentTab.url;
//   const htmlToCopy = `<a href="${url}" style="font-family: ${selectedFont}; font-size: ${selectedSize}px; text-decoration: ${underline} ;">${title}</a>`;
//   chrome.tabs.sendMessage(currentTab.id, {
//     action: 'copyToClipboard',
//     htmlToCopy: htmlToCopy,
//   });
// });
//

// document.addEventListener('mouseover', (event) => {
//   const originalBackgroundColor = event.target.style.backgroundColor;
//   // Change the background color of the element under the mouse pointer
//   event.target.style.backgroundColor = 'lightblue';

//   // Restore the original background color when the mouse leaves the element
//   event.target.addEventListener(
//     'mouseout',
//     () => {
//       event.target.style.backgroundColor = originalBackgroundColor;
//     },
//     { once: true }
//   );
// });

//  ss

// document.onCommand.addEventListener('mouseover', (event) => {
//   const originalBackgroundColor = event.target.style.backgroundColor;
//   console.log('mouseover');
//   // Change the background color of the element under the mouse pointer
//   event.target.style.backgroundColor = 'lightblue';

//   // Restore the original background color when the mouse leaves the element
//   event.target.addEventListener(
//     'mouseout',
//     () => {
//       event.target.style.backgroundColor = originalBackgroundColor;
//     },
//     { once: true }
//   );
// });

// 새로운 코드

// let isHighlightActive = false;

// chrome.commands.onCommand.addEventListener('mouseover', (event) => {
//   if (isHighlightActive) {
//     event.target.style.backgroundColor = 'lightblue';
//     event.target.addEventListener(
//       'mouseout',
//       () => {
//         event.target.style.backgroundColor = '';
//       },
//       { once: true }
//     );
//   }
// });

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.action === 'activate') {
//     isHighlightActive = true;
//   } else if (message.action === 'deactivate') {
//     isHighlightActive = false;
//   }
// });
