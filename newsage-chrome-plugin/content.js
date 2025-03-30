chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "open-dialog") {
    showDialog(request.title, window.location.href);
  }
});

// Function to check if user email exists and prompt if not
function checkUserEmail() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(['user_email'], (result) => {
      if (result.user_email) {
        resolve(result.user_email);
      } else {
        const email = prompt('Please enter your email address to use this extension:');
        if (email && isValidEmail(email)) {
          chrome.storage.sync.set({ user_email: email }, () => {
            resolve(email);
          });
        } else {
          if (email) {
            alert('Please enter a valid email address.');
          }
          resolve(null);
        }
      }
    });
  });
}

// Basic email validation
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Function to send data to webhook
async function sendToWebhook(title, url) {
  const email = await checkUserEmail();
  if (!email) return false;
  
  const data = {
    user_id: email,
    sources: {
      name: title,
      url: url
    }
  };

  try {
    const response = await fetch('https://www.n8n-dev.meetmagnet.fr/webhook/sources', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      console.error('Error sending data to webhook:', response.statusText);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error sending data to webhook:', error);
    return false;
  }
}

function showDialog(title, url) {
  // Create dialog container
  const dialog = document.createElement('div');
  dialog.style.position = 'fixed';
  dialog.style.top = '50%';
  dialog.style.left = '50%';
  dialog.style.transform = 'translate(-50%, -50%)';
  dialog.style.backgroundColor = 'white';
  dialog.style.padding = '20px';
  dialog.style.borderRadius = '5px';
  dialog.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
  dialog.style.zIndex = '10000';
  dialog.style.minWidth = '300px';
  dialog.style.textAlign = 'center';

  // Add title
  const titleElement = document.createElement('h3');
  titleElement.textContent = title;
  dialog.appendChild(titleElement);

  // Add button container
  const buttonContainer = document.createElement('div');
  buttonContainer.style.marginTop = '20px';
  dialog.appendChild(buttonContainer);

  // Add status message element (hidden initially)
  const statusMessage = document.createElement('div');
  statusMessage.style.marginTop = '10px';
  statusMessage.style.display = 'none';
  statusMessage.style.padding = '8px';
  statusMessage.style.borderRadius = '4px';
  dialog.appendChild(statusMessage);

  // Add OK button with webhook functionality
  const okButton = document.createElement('button');
  okButton.textContent = 'OK';
  okButton.style.marginRight = '10px';
  okButton.style.padding = '5px 15px';
  okButton.style.cursor = 'pointer';
  okButton.addEventListener('click', async () => {
    // Disable buttons while processing
    okButton.disabled = true;
    cancelButton.disabled = true;
    
    statusMessage.style.display = 'block';
    statusMessage.textContent = 'Sending data...';
    statusMessage.style.backgroundColor = '#f0f0f0';
    
    const success = await sendToWebhook(title, url);
    
    if (success) {
      statusMessage.textContent = 'Data sent successfully!';
      statusMessage.style.backgroundColor = '#d4edda';
      statusMessage.style.color = '#155724';
      
      // Close dialog after 1 second
      setTimeout(() => {
        document.body.removeChild(backdrop);
        document.body.removeChild(dialog);
      }, 1000);
    } else {
      statusMessage.textContent = 'Failed to send data. Please try again.';
      statusMessage.style.backgroundColor = '#f8d7da';
      statusMessage.style.color = '#721c24';
      
      // Re-enable buttons
      okButton.disabled = false;
      cancelButton.disabled = false;
    }
  });
  buttonContainer.appendChild(okButton);

  // Add Cancel button
  const cancelButton = document.createElement('button');
  cancelButton.textContent = 'Cancel';
  cancelButton.style.padding = '5px 15px';
  cancelButton.style.cursor = 'pointer';
  cancelButton.addEventListener('click', () => {
    document.body.removeChild(backdrop);
    document.body.removeChild(dialog);
  });
  buttonContainer.appendChild(cancelButton);

  // Add backdrop
  const backdrop = document.createElement('div');
  backdrop.style.position = 'fixed';
  backdrop.style.top = '0';
  backdrop.style.left = '0';
  backdrop.style.width = '100%';
  backdrop.style.height = '100%';
  backdrop.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  backdrop.style.zIndex = '9999';
  backdrop.addEventListener('click', () => {
    document.body.removeChild(backdrop);
    document.body.removeChild(dialog);
  });

  // Add to page
  document.body.appendChild(backdrop);
  document.body.appendChild(dialog);
  
  // Focus OK button
  okButton.focus();
}
