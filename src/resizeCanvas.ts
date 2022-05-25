// Based on code from:
// https://webgl2fundamentals.org/webgl/lessons/webgl-resizing-the-canvas.html

type CanvasToDisplaySizeMap = Map<HTMLCanvasElement, [number, number]>;

const DEFAULT_CANVAS_DIMENSIONS: [number, number] = [300, 150];

export function getCanvasResizer(
  canvas: HTMLCanvasElement,
  respectDpr: boolean = false
) {
  const dpr = respectDpr ? window.devicePixelRatio : 1;
  const resizeObserver = new ResizeObserver(onResize);
  const canvasToDisplaySizeMap: CanvasToDisplaySizeMap = new Map([
    [canvas, DEFAULT_CANVAS_DIMENSIONS],
  ]);

  try {
    resizeObserver.observe(canvas, { box: "device-pixel-content-box" });
  } catch (err) {
    // fallback if device-pixel-content-box not supported
    resizeObserver.observe(canvas, { box: "content-box" });
  }

  function onResize(entries: ResizeObserverEntry[]) {
    for (const entry of entries) {
      let width: number;
      let height: number;

      let localDpr = dpr;

      if (entry.devicePixelContentBoxSize) {
        width = entry.devicePixelContentBoxSize[0].inlineSize;
        height = entry.devicePixelContentBoxSize[0].blockSize;
        localDpr = 1; // already factored in width/height
      } else if (entry.contentBoxSize) {
        width = entry.contentBoxSize[0].inlineSize;
        height = entry.contentBoxSize[0].blockSize;
        // Possible additional fallback needed where contentBoxSize
        // is itself a ResizeObserverSize, but TS does not consider this possible,
      } else {
        width = entry.contentRect.width;
        height = entry.contentRect.height;
      }

      const displayWidth = Math.round(width * localDpr);
      const displayHeight = Math.round(height * localDpr);
      canvasToDisplaySizeMap.set(entry.target as HTMLCanvasElement, [
        displayWidth,
        displayHeight,
      ]);
    }
  }

  function resizeCanvasToDisplaysize() {
    let displayWidth, displayHeight;
    try {
      [displayWidth, displayHeight] = canvasToDisplaySizeMap.get(canvas) as [
        number,
        number
      ];
    } catch (err) {
      throw new Error("Could not find canvas to resize");
    }

    // Check if canvas is not the same size
    const needResize =
      canvas.width !== displayWidth || canvas.height !== displayHeight;

    if (needResize) {
      canvas.width = displayWidth;
      canvas.height = displayHeight;
    }

    return needResize;
  }

  return resizeCanvasToDisplaysize;
}
