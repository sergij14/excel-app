function toButton({iconHtml, name, active, style}) {
  return `
        <button
            class="hover:bg-gray-200
            ${active && 'hover:bg-gray-300 bg-gray-200'}
            px-2 py-1 rounded-md cursor-pointer"
            data-type="toolbar-btn"
            data-style='${JSON.stringify(style)}'
            >
            ${iconHtml}
        </button>
    `;
}

export function createToolbar(state) {
  const buttons = [
    {
      iconHtml: '<i class="fa-solid fa-align-left"></i>',
      active: state['textAlign'] === 'left',
      style: {textAlign: 'left'},
    },
    {
      iconHtml: '<i class="fa-solid fa-align-center"></i>',
      active: state['textAlign'] === 'center',
      style: {textAlign: 'center'},
    },
    {
      iconHtml: '<i class="fa-solid fa-align-right"></i>',
      active: state['textAlign'] === 'right',
      style: {textAlign: 'right'},
    },
    {
      iconHtml: '<i class="fa-solid fa-bold"></i>',
      active: state['fontWeight'] === 'bold',
      style: {fontWeight: state['fontWeight'] === 'bold' ? 'normal' : 'bold'},
    },
    {
      iconHtml: '<i class="fa-solid fa-italic"></i>',
      active: state['fontStyle'] === 'italic',
      style: {fontStyle: state['fontStyle'] === 'italic' ? 'normal' : 'italic'},
    },
    {
      iconHtml: '<i class="fa-solid fa-underline"></i>',
      active: state['textDecoration'] === 'underline',
      style: {textDecoration: state['textDecoration'] === 'underline' ? 'none' : 'underline'},
    },
  ];

  return buttons.map(toButton).join('');
}
