const cache = new Map();

export function recolorPlan(href, color) {
  const key = `${color}|${href.length}|${href.slice(-24)}`;
  const cached = cache.get(key);
  if (cached) return cached;

  const pending = new Promise((resolve) => {
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.naturalWidth || image.width;
      canvas.height = image.naturalHeight || image.height;
      const context = canvas.getContext("2d", { willReadFrequently: true });
      context.drawImage(image, 0, 0);
      const frame = context.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = frame.data;
      const red = Number.parseInt(color.slice(1, 3), 16);
      const green = Number.parseInt(color.slice(3, 5), 16);
      const blue = Number.parseInt(color.slice(5, 7), 16);
      for (let index = 0; index < pixels.length; index += 4) {
        const alpha = pixels[index + 3];
        if (alpha < 8) continue;
        const luminance = (pixels[index] + pixels[index + 1] + pixels[index + 2]) / 3;
        if (luminance > 230) continue;
        const strength = (alpha / 255) * (1 - luminance / 255);
        pixels[index] = red;
        pixels[index + 1] = green;
        pixels[index + 2] = blue;
        pixels[index + 3] = Math.round(Math.min(1, strength) * 255);
      }
      context.putImageData(frame, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };
    image.onerror = () => resolve(href);
    image.src = href;
  });
  cache.set(key, pending);
  return pending;
}
