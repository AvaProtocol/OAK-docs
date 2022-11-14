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

(function() {
  const createCopiedIcon = () => {
    const icon = document.createElement("span");
    icon.innerHTML = 'copied!';
    icon.setAttribute('style', 'padding-left: 10px; font-size: 9px; color: green; cursor: default;');
    icon.style.verticalAlign = 'middle';
    return icon;
  };

  const run = () => {
    const codeBlocks = document.querySelectorAll('pre.highlight');
    if (!codeBlocks) {
      return;
    }

    codeBlocks.forEach(function (codeBlock) {
      const iconHtml = '<svg style="width:20px; height:20px; cursor: pointer;" viewBox="0 0 24 24"> \
          <path fill="currentColor"d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" /> \
        </svg>';

      const copiedIcon = createCopiedIcon();

      const copyWrapper = document.createElement('div');
      copyWrapper.className = 'copy-code-wrapper';
      codeBlock.append(copyWrapper);

      const copyButton = document.createElement('div');
      copyButton.className = 'copy-code-button';
      copyButton.type = 'button';
      copyButton.ariaLabel = 'Copy code to clipboard';
      copyButton.innerHTML = iconHtml;
      copyWrapper.append(copyButton);

      copyButton.addEventListener('click', function () {
        try {
          const code = codeBlock.querySelector('code').innerText.trim();
          window.navigator.clipboard.writeText(code);
        } catch (error) {}

        copyWrapper.innerHTML = null;
        copyWrapper.append(copiedIcon);

        setTimeout(function () {
          copyWrapper.innerHTML = null;
          copyWrapper.append(copyButton);
        }, 1000);
      });
    });
  }

  // Executed when the page is loaded.
  const onload = window.onload || function() {};
  window.onload = () => {
    onload();
    run();
  };
})();


(function() {
  const run = () => {
    try {
      const docs = document.querySelector('.sidebar-docs');
      const docDivs = docs.querySelectorAll('div');
      docDivs.forEach(function (divElem) {
        // Unfold all side menu items
        const ulElement = divElem.querySelector('ul');
        ulElement.style.display = 'block';

        // toggle selected menu items
        const h5Element = divElem.querySelector('h5');
        h5Element.addEventListener('click', function () {
          try {
            const ulElement = divElem.querySelector('ul');
            ulElement.style.display = ulElement.style.display === 'none' ? 'block' : 'none';
            const iconElement = h5Element.querySelector('i');
            iconElement.className = iconElement.className === 'icofont-simple-down' ? 'icofont-simple-right' : 'icofont-simple-down';
          } catch (error) {
            console.log(error);
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  // Executed when the page is loaded.
  const onload = window.onload || function() {};
  window.onload = () => {
    onload();
    run();
  };
})();
