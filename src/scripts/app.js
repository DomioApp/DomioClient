(() => {
    console.log('Domio app started!');
    const page_name = document.head.querySelector("[name=page]").content;
    console.log(`Page name: ${page_name}`);
})();