// Render interactive graphiql instance
(function() {
  const iconHtml = '<svg style="width:24px; height:24px; cursor: pointer; margin-top: -6px; margin-left: -6px;" viewBox="0 0 24 24"><path d="M 11 9 L 24 16 L 11 23 z"></path></svg>';

  function renderGraphiQLIntoElement(container, query) {
    ReactDOM.render(React.createElement(GraphiQL, {
      query: query,
      fetcher: GraphiQL.createFetcher({
        url: 'https://turing.explorer.oak.tech/',
      }),
      defaultEditorToolsVisibility: false,
      isHeadersEditorEnabled: false,
      toolbar: null,
      showPersistHeadersSettings: false,
      docExplorerOpen: false,
      defaultVariableEditorOpen: false
    }), container);
  }

  function tryQuery(codeBlock, index) {
    const copyWrapper = document.createElement('div');
    copyWrapper.className = 'run-graphql-wrapper';
    codeBlock.append(copyWrapper);

    const copyButton = document.createElement('div');
    copyButton.className = 'run-graphql-button';
    //copyButton.type = 'div';
    copyButton.ariaLabel = 'Try it';
    copyButton.innerHTML = iconHtml;
    copyWrapper.append(copyButton);


    copyButton.addEventListener('click', function () {
      try {
        // First we find  the root of code block
        const codeContainer = codeBlock.closest('.language-graphql');
        const query = codeBlock.innerText || codeBlock.textContent;

        // Now dynamically insert the graphiql container
        let container = document.createElement("div");
        container.className = "grapql-demo-block uk-animation-fade";
        container.id = `graphql-execution-${index}`;
        codeContainer.after(container);

        // render the instance into it
        renderGraphiQLIntoElement(container, query);

        // Now we delete the codeContainer
        codeContainer.remove();
        container.scrollIntoView();
        setTimeout(() => {
          // Ensure we do indeed scroll into it
          window.location.href = `#${container.id}`;
        }, 300);
      } catch (error) {
        console.error(error);
      }
    });
  }

  const run = () => {
    const codeBlocks = document.querySelectorAll('.language-graphql pre.highlight');
    // Currently we don't have dark theme yet so make sure we match GraphiQL with the main doc theme
    localStorage.setItem('graphiql:theme', 'light');

    if (!codeBlocks) {
      return;
    }

    codeBlocks.forEach(tryQuery);
  }

  window.addEventListener("load", run);
})();
