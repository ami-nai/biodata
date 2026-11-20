export const formattedHeight = (inches: number): string => {
  const feet = Math.floor(inches / 12);
  const remainingInches = inches % 12;
  return `${feet}'${remainingInches}"`;
};

export const hasContent = (val: any): boolean => {
  if (val === null || val === undefined) return false;
  if (typeof val === 'string' && val.trim() === '') return false;
  if (typeof val === 'number' && isNaN(val)) return false;
  if (Array.isArray(val) && val.length === 0) return false;
  return true;
};

export const joinList = (items: any[]): string =>
  items.filter((i) => hasContent(i)).join(', ');