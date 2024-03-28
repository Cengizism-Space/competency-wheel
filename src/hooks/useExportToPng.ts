import { RefObject } from 'react';

const useExportToPng = (svgRef: RefObject<SVGSVGElement>) => {
  const exportToPng = () => {
    const svg = svgRef.current;
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const svgSize = svg.getBoundingClientRect();
      canvas.width = svgSize.width;
      canvas.height = svgSize.height;
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.onload = () => {
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const png = canvas.toDataURL("image/png");
          const a = document.createElement("a");
          a.href = png;
          a.download = "competencies.png";
          a.click();
        }
      };
      img.src = "data:image/svg+xml;base64," + btoa(svgData);
    }
  };

  return exportToPng;
};

export default useExportToPng;