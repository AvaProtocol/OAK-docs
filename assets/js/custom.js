// Custom scripts

// Make h1, h2, h3, h4 tag linkable.
(function() {
  const createLinkIcon = () => {
    const icon = document.createElement("span");
    icon.setAttribute('style', 'padding-left: 10px; cursor: pointer; color: gray;');
    icon.innerHTML = "#";
    icon.style.display = 'none';
    return icon;
  };

  const createCopiedIcon = () => {
    const icon = document.createElement("span");
    icon.innerHTML = 'copied!';
    icon.setAttribute('style', 'padding-left: 10px; font-size: 9px; color: green;');
    icon.style.verticalAlign = 'middle';
    return icon;
  };

  const createTextElement = (text) => {
    const textElement = document.createElement("span");
    textElement.innerHTML = text;
    return textElement;
  }

  /**
   * Make linkable
   * @param {*} titleElement 
   */
  const makeLinkable = (titleElement) => {
    let isCopiedShowed = false;
    const linkIcon = createLinkIcon();

    const recoveryLinkState = (copiedIcon) => {
      copiedIcon.parentNode.removeChild(copiedIcon);
      isCopiedShowed = false;
    }

    const onIconClicked = async (copiedId) => {
      if (isCopiedShowed) {
        return;
      }

      const { origin, pathname } = document.location;
      const url = `${origin}${pathname}#${copiedId}`;
      try {
        await navigator.clipboard.writeText(url);
      } catch (error) {}

      linkIcon.style.display = 'none';
      
      const copiedIcon = createCopiedIcon();
      titleElement.appendChild(copiedIcon);
      setTimeout(() => recoveryLinkState(copiedIcon), 1000);

      isCopiedShowed = true;
    };

    const onLinkableTextMouseOver = () => {
      if (isCopiedShowed) {
        return;
      }
      linkIcon.style.display = 'inline-block';
    };

    const onLinkableTextMouseLeave = () => {
      if (isCopiedShowed) {
        return;
      }
      linkIcon.style.display = 'none';
    };

    linkIcon.onclick = () => onIconClicked(titleElement.id);

    const linkableText = createTextElement(titleElement.innerHTML);
    linkableText.onmouseover = onLinkableTextMouseOver;
    linkableText.onmouseleave = onLinkableTextMouseLeave;
    linkableText.appendChild(linkIcon);

    titleElement.innerHTML = null;
    titleElement.appendChild(linkableText);
  }

  const run = () => {
    // Enumerate all h1, h2, h3, h4 in the page and make them linkable.
    const titleElements = document.querySelectorAll(".article-content h1, .article-content h2,.article-content  h3,.article-content  h4");
    titleElements.forEach((titleElement) => makeLinkable(titleElement));
  }

  // Executed when the page is loaded.
  const onload = window.onload || function() {};
  window.onload = () => {
    onload();
    run();
  };
})();