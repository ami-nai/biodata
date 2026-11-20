import { jsPDF } from 'jspdf';
import { toCanvas } from 'html-to-image';
import { getPageSlices } from './pdfPagination';

export const generateBiodataPdf = async (element: HTMLElement, filename: string = 'biodata.pdf') => {
  try {
    // Wait for any pending renders or fonts to load
    await document.fonts.ready;

    // Convert the HTML element to a high-quality PNG image
    // Using a higher pixel ratio (2x or 3x) for crisp text print resolution
    const canvas = await toCanvas(element, {
      pixelRatio: 2,
      style: {
        transform: 'scale(1)',
        transformOrigin: 'top left',
        width: element.offsetWidth + 'px',
        height: element.offsetHeight + 'px',
      },
      cacheBust: true,
    });

    // Create a standard A4 PDF document
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Measure rendered text lines in screenshot pixels. The preview may be scaled.
    const bounds = element.getBoundingClientRect();
    const scale = canvas.height / bounds.height;
    const protectedRanges: Array<{ top: number; bottom: number }> = [];
    const addRect = (rect: DOMRect) => {
      if (rect.width && rect.height) protectedRanges.push({
        top: Math.max(0, Math.floor((rect.top - bounds.top) * scale) - 2),
        bottom: Math.min(canvas.height, Math.ceil((rect.bottom - bounds.top) * scale) + 2),
      });
    };
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      if (!walker.currentNode.textContent?.trim()) continue;
      const range = document.createRange();
      range.selectNodeContents(walker.currentNode);
      Array.from(range.getClientRects()).forEach(addRect);
    }
    element.querySelectorAll('img').forEach(img => addRect(img.getBoundingClientRect()));

    const pagePixels = Math.floor(canvas.width * pdfHeight / pdfWidth);
    const slices = getPageSlices(canvas.height, pagePixels, protectedRanges);
    for (const [index, slice] of slices.entries()) {
      if (index) pdf.addPage();
      const page = document.createElement('canvas');
      page.width = canvas.width;
      page.height = slice.end - slice.start;
      const context = page.getContext('2d');
      if (!context) throw new Error('Could not create PDF page');
      context.drawImage(canvas, 0, slice.start, canvas.width, page.height,
        0, 0, page.width, page.height);
      const ratio = Math.min(pdfWidth / page.width, pdfHeight / page.height);
      pdf.addImage(page.toDataURL('image/png'), 'PNG', 0, 0,
        page.width * ratio, page.height * ratio, undefined, 'FAST');
    }

    // Save the generated document
    pdf.save(filename);
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};
