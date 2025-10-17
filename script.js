// Helper function to parse data URLs
function parseDataUrl(url) {
  if (!url.startsWith('data:')) {
    throw new Error('Invalid data URL');
  }
  
  const commaIndex = url.indexOf(',');
  if (commaIndex === -1) {
    throw new Error('Invalid data URL format');
  }
  
  const header = url.substring(5, commaIndex);
  const payload = url.substring(commaIndex + 1);
  
  const parts = header.split(';');
  const mime = parts[0] || 'text/plain';
  const isBase64 = parts.includes('base64');
  
  let text = '';
  if (isBase64) {
    try {
      const binary = atob(payload);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      text = new TextDecoder().decode(bytes);
    } catch (e) {
      throw new Error('Failed to decode base64 data');
    }
  } else {
    try {
      text = decodeURIComponent(payload);
    } catch (e) {
      throw new Error('Failed to decode URL-encoded data');
    }
  }
  
  return { mime, isBase64, text };
}

// Main function to process markdown
async function processMarkdown() {
  const outputElement = document.getElementById('markdown-output');
  
  try {
    // Attachment data from the brief
    const attachment = {
      name: "input.md",
      url: "data:text/markdown;base64,aGVsbG8KIyBUaXRsZQ=="
    };
    
    // Parse the data URL
    const { text: markdownText } = parseDataUrl(attachment.url);
    
    // Configure marked with highlight.js
    marked.setOptions({
      highlight: function(code, lang) {
        try {
          if (hljs.getLanguage(lang)) {
            return hljs.highlight(code, { language: lang }).value;
          }
        } catch (err) {
          console.error('Highlighting error:', err);
        }
        return hljs.highlightAuto(code).value;
      },
      langPrefix: 'hljs language-'
    });
    
    // Convert markdown to HTML
    const htmlContent = marked.parse(markdownText);
    
    // Render in the output element
    outputElement.innerHTML = htmlContent;
  } catch (error) {
    console.error('Error processing Markdown:', error);
    outputElement.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', processMarkdown);
} else {
  processMarkdown();
}