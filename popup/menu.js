var menuContainer = document.querySelector('#menu');
var allMenuItems = null;
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('button')) {
    var scriptName = e.target.textContent;
    var scriptContent = allMenuItems[scriptName];
    if (scriptContent) {
      browser.tabs.executeScript(null, {
        code: scriptContent
      });
    }
    window.close();
    return;
  } else if (e.target.classList.contains('options')) {
    browser.runtime.openOptionsPage();
    window.close();
    return;
  }
});

function onError(error) {
  console.error(error);
}

initialize();
function initialize() {
  var gettingAllStorageItems = browser.storage.local.get(null);
  gettingAllStorageItems.then((results) => {
    allMenuItems = results;
    //allMenuItems['Make page content editable'] = 'document.getElementsByTagName("html").item(0).contentEditable=true';
    var scriptNames = Object.keys(allMenuItems);
    if (scriptNames.length > 0) {
      menuContainer.innerHTML = '';
    }
    for (scriptName of scriptNames) {
      var item = document.createElement('div');
      item.textContent = scriptName;
      item.setAttribute('class', 'button');
      menuContainer.appendChild(item);
    }
  }, onError);
}
