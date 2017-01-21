(() => {
    console.log('Domio app started!');
    const page_name = document.head.querySelector("[property=page]").content;
    console.log(`Page name: ${page_name}`);
})();