chrome.commands.onCommand.addListener((command) => {
  if (command === 'open-dialog') {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, {
        action: "open-dialog", 
        title: activeTab.title
      });
    });
  }
});
