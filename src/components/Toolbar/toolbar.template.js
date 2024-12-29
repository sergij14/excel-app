export function createButton({ icon, value }) {
  const meta = `
    data-type='toolbar-btn'
    data-value='${JSON.stringify(value)}'
  `;

  return `
        <button class="toolbar-btn" ${meta}>
            <i class="fa-solid ${icon}" ${meta}></i>
        </button>
`;
}

export function createToolbar() {
  const buttons = [
    {
      icon: "fa-align-left",
      active: false,
      value: { textAlign: "left" },
    },
    {
      icon: "fa-align-center",
      active: false,
      value: { textAlign: "center" },
    },
    {
      icon: "fa-align-right",
      active: false,
      value: { textAlign: "right" },
    },
    {
      icon: 'fa-bold"',
      active: false,
      value: { fontWeight: "bold" },
    },
    {
      icon: "fa-italic",
      active: false,
      value: { fontStyle: "italic" },
    },
    {
      icon: "fa-underline",
      active: false,
      value: { textDecoration: "underline" },
    },
  ];

  return buttons.map(createButton).join("");
}
