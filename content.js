(function() {
    'use strict';

    function copyImageToClipboard(imgUrl) {
        const img = new Image();
        img.crossOrigin = "anonymous"; // Handle cross-origin images
        img.src = imgUrl;

        img.onload = function() {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const context = canvas.getContext('2d');
            context.drawImage(img, 0, 0);

            canvas.toBlob(async function(blob) {
                const item = new ClipboardItem({ "image/png": blob });
                await navigator.clipboard.write([item]);
                console.log('Image copied to clipboard successfully!');
            });
        };

        img.onerror = function() {
            console.error('Failed to load image.');
        };
    }

    function addCopyButton(img) {
        const postContainer = img.closest('div._aagu'); // Targeting the correct container

        if (postContainer && !postContainer.querySelector('.copy-url-button')) {
            const button = document.createElement('button');
            button.innerText = 'Copy Image';

            // Button styling
            button.className = 'copy-url-button';
            button.style.position = 'absolute';
            button.style.top = '5px';
            button.style.right = '5px';
            button.style.padding = '5px 10px';
            button.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
            button.style.color = '#ffffff';
            button.style.border = 'none';
            button.style.borderRadius = '12px';
            button.style.cursor = 'pointer';
            button.style.fontSize = '12px';
            button.style.zIndex = '1000';
            button.style.opacity = '0';
            button.style.transition = 'opacity 0.3s';

            postContainer.style.position = 'relative';
            postContainer.appendChild(button);

            // Show/hide button on hover
            postContainer.addEventListener('mouseenter', function() {
                button.style.opacity = '0.8';
            });

            postContainer.addEventListener('mouseleave', function() {
                button.style.opacity = '0';
            });

            button.addEventListener('click', function() {
                copyImageToClipboard(img.src);
                showConfirmationMessage(postContainer);
            });
        }
    }

    function showConfirmationMessage(container) {
        const message = document.createElement('div');
        message.innerText = 'Image copied to clipboard!';
        message.style.position = 'absolute';
        message.style.bottom = '30px';
        message.style.left = '50%';
        message.style.transform = 'translateX(-50%)';
        message.style.backgroundColor = 'rgba(128, 0, 128, 0.9)';
        message.style.color = '#ffffff';
        message.style.padding = '10px 20px';
        message.style.borderRadius = '20px';
        message.style.zIndex = '1001';
        message.style.fontSize = '14px';
        message.style.display = 'flex';
        message.style.alignItems = 'center';
        message.style.opacity = '1';
        message.style.transition = 'opacity 1s';

        const closeButton = document.createElement('span');
        closeButton.innerText = '✕';
        closeButton.style.marginLeft = '10px';
        closeButton.style.cursor = 'pointer';
        closeButton.style.color = '#ffffff';

        closeButton.addEventListener('click', function() {
            container.removeChild(message);
        });

        message.appendChild(closeButton);
        container.appendChild(message);

        setTimeout(function() {
            message.style.opacity = '0';
        }, 1000);

        setTimeout(function() {
            if (container.contains(message)) {
            container.removeChild(message);
            }
        }, 2000);
    }

    function checkAndApplyButtons() {
        document.querySelectorAll('div._aagu img').forEach(addCopyButton);
    }

    setInterval(checkAndApplyButtons, 1000);
    checkAndApplyButtons();
})();
