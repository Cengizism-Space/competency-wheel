import { RefObject } from 'react';

const useExportToPng = (svgRef: RefObject<SVGSVGElement>, title: string) => {
  const exportToPng = () => {
    const svg = svgRef.current;

    if (svg) {
      const clonedSvg = svg.cloneNode(true) as SVGSVGElement;
      document.body.appendChild(clonedSvg);

      const titleElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
      titleElement.textContent = title;
      titleElement.setAttribute("x", "50%");
      titleElement.setAttribute("y", "30");
      titleElement.setAttribute("text-anchor", "middle");
      titleElement.setAttribute("style", "font: bold 24px serif;");
      clonedSvg.prepend(titleElement);

      const labels = clonedSvg.querySelectorAll("text");
      labels.forEach(label => {
        label.setAttribute("style", "font: 16px sans-serif;");
        const transform = label.getAttribute("transform") || "";
        label.setAttribute("transform", `${transform} translate(-17, 0)`);
      });

      const svgData = new XMLSerializer().serializeToString(clonedSvg);
      const canvas = document.createElement("canvas");
      const svgSize = clonedSvg.getBoundingClientRect();
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

      img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));

      document.body.removeChild(clonedSvg);
    }
  };

  return exportToPng;
};

export default useExportToPng;