import { createElement } from "./domUtilities";

export function createCanvasStats(canvas: HTMLCanvasElement) {
  // create elements
  const canvasStatsContainer = createElement("div", {
    class: "canvas-stats-container",
  });

  const statsElements = {
    x: createElement("p", { id: "canvas-stats-x" }),
    y: createElement("p", { id: "canvas-stats-y" }),
    width: createElement("p", { id: "canvas-stats-width" }),
    height: createElement("p", { id: "canvas-stats-height" }),
  };

  // nest all stat in container element
  Object.values(statsElements).forEach((elm) =>
    canvasStatsContainer.appendChild(elm)
  );

  function updateTextContent() {
    const canvasStats = getCanvasAttributes(canvas);
    Object.entries(canvasStats).forEach(([k, v]: [k: string, v: number]) => {
      const statElm = statsElements[k as keyof typeof statsElements];
      if (statElm) {
        statElm.textContent = `${k}: ${v.toString()}`;
      }
    });
  }

  updateTextContent();

  return canvasStatsContainer;
}

function getCanvasAttributes(canvas: HTMLCanvasElement) {
  const { top, right, left, bottom } = canvas.getBoundingClientRect();
  const x = right - left;
  const y = bottom - top;

  const { width, height } = canvas;

  return {
    width,
    height,
    x,
    y,
  };
}
