function toButton({iconHtml, name, active, style}) {
  return `
        <button
            class="hover:bg-gray-200 ${active && 'hover:bg-gray-300 bg-gray-200'}
            px-2 py-1 rounded-md cursor-pointer"
            data-tool="${name}"
            data-style="${style}"
            >
            ${iconHtml}
        </button>
    `;
}

export function createToolbar() {
  const buttons = [
    {
      name: 'format-align-left',
      iconHtml: '<i class="fa-solid fa-align-left"></i>',
      active: false,
      style: 'text-align: left',
    },
    {
      name: 'format-align-center',
      iconHtml: '<i class="fa-solid fa-align-center"></i>',
      active: true,
      style: 'text-align: center',
    },
    {
      name: 'format-align-right',
      iconHtml: '<i class="fa-solid fa-align-right"></i>',
      active: false,
      style: 'text-align: right',
    },
    {
      name: 'format-bold',
      iconHtml: '<i class="fa-solid fa-bold"></i>',
      active: false,
      style: 'font-weight: bold',
    },
    {
      name: 'format-italic',
      iconHtml: '<i class="fa-solid fa-italic"></i>',
      active: false,
      style: 'font-style: italic',
    },
    {
      name: 'format-underline',
      iconHtml: '<i class="fa-solid fa-underline"></i>',
      active: false,
      style: 'text-decoration: underline;',
    },
  ];

  return buttons.map(toButton).join('');
}
