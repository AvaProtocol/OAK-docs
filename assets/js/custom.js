// Custom scripts
(function() {
  function run() {
    const titleElements = document.querySelectorAll(".article-content h1, .article-content h2,.article-content  h3,.article-content  h4");
    titleElements.forEach((titleElement) => {
      const textElement = document.createElement("span");
      textElement.innerHTML = titleElement.innerHTML;

      const linkIcon = document.createElement("span");
      linkIcon.setAttribute('style', 'padding-left: 10px; cursor: pointer;');
      linkIcon.innerHTML = "#";
      linkIcon.onclick = () => {
        const copyToClipboard = async (url) => {
          try {
            await navigator.clipboard.writeText(url);
          } catch (error) {}
        }
        const { origin, pathname } = document.location;
        const url = `${origin}${pathname}#${titleElement.id}`;
        copyToClipboard(url);
      }
      
      linkIcon.style.visibility = 'hidden';

      titleElement.innerHTML = null;

      titleElement.appendChild(textElement);
      titleElement.appendChild(linkIcon);

      textElement.onmouseover = () => {
        linkIcon.style.visibility = 'visible';
      }
      textElement.onmouseleave = () => {
        linkIcon.style.visibility = 'hidden';
      }

      linkIcon.onmouseover = () => {
        linkIcon.style.visibility = 'visible';
      }
      linkIcon.onmouseleave = () => {
        linkIcon.style.visibility = 'hidden';
      }
    });
  }
  setTimeout(run, 1000);
  
})();