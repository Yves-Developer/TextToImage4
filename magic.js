var img = document.getElementById('img');
var btn = document.getElementById('btn');
var prompt = document.getElementById('prompt');
var loader = document.getElementById('loader');
var downloadBtn = document.getElementById('downloadBtn');

function showLoader() {
    loader.style.display = 'block';
    img.style.display = 'none';
    downloadBtn.style.display = 'none';
}

function hideLoader() {
    loader.style.display = 'none';
    img.style.display = 'block';
    downloadBtn.style.display = 'block';
}

btn.onclick = function() {
    showLoader(); // Show loader when request starts
    
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image', true);

    // Set up request headers
    xhr.setRequestHeader('Authorization', 'Bearer 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');
    xhr.setRequestHeader('Content-Type', 'application/json');

    // Track progress
    xhr.onprogress = function(event) {
        // Optionally, handle progress if needed
    };

    // Handle request completion
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            const objurl = URL.createObjectURL(xhr.response);
            img.src = objurl;
            downloadBtn.href = objurl; // Set the href for the download button
            hideLoader(); // Hide loader and show image when the response is processed
        } else {
            console.error('Request failed with status:', xhr.status);
            hideLoader(); // Hide loader on error
        }
    };

    xhr.onerror = function() {
        console.error('Request failed');
        hideLoader(); // Hide loader on error
    };

    // Handle request cancellation
    xhr.onabort = function() {
        console.log('Request was aborted');
        hideLoader(); // Hide loader if the request is aborted
    };

    // Handle response
    xhr.responseType = 'blob';
    xhr.send(JSON.stringify({ "inputs": prompt.value }));
};
