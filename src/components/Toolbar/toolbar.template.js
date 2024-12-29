export function createButton({ icon, value, active }) {
  const meta = `
    data-type='toolbar-btn'
    data-value='${JSON.stringify(value)}'
  `;

  return `
        <button class="toolbar-btn ${active ? 'bg-gray-300' : ''}" ${meta}>
            <i class="fa-solid ${icon}" ${meta}></i>
        </button>
`;
}

export function createToolbar(state) {
  const buttons = [
    {
      icon: "fa-align-left",
      active: state["textAlign"] === "left",
      value: { textAlign: "left" },
    },
    {
      icon: "fa-align-center",
      active: state["textAlign"] === "center",
      value: { textAlign: "center" },
    },
    {
      icon: "fa-align-right",
      active: state["textAlign"] === "right",
      value: { textAlign: "right" },
    },
    {
      icon: 'fa-bold"',
      active: state["fontWeight"] === "bold",
      value: {fontWeight: state['fontWeight'] === 'bold' ? 'normal' : 'bold'},
    },
    {
      icon: "fa-italic",
      active: state["fontStyle"] === "italic",
      value: {fontStyle: state['fontStyle'] === 'italic' ? 'normal' : 'italic'},
    },
    {
      icon: "fa-underline",
      active: state["textDecoration"] === "underline",
      value: {textDecoration: state['textDecoration'] === 'underline' ? 'none' : 'underline'},
    },
  ];

  return buttons.map(createButton).join("");
}
