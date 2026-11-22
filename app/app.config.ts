export default defineAppConfig({
  ui: {
    colors: { primary: 'emerald', neutral: 'stone' },
    button: { slots: { base: 'min-h-11 rounded-md font-medium justify-center px-4' } },
    input: { slots: { base: 'min-h-11 rounded-md text-base px-3 py-2' } },
    textarea: { slots: { base: 'rounded-md text-base px-3 py-3' } },
    selectMenu: { slots: { base: 'min-h-11 rounded-md text-base px-3 py-2', content: 'rounded-md', item: 'min-h-11' } },
  },
});
