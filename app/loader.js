
/* Image loader */
export function loadImage(name, src) {
  const image = new Image();

  return new Promise(function(resolve, reject) {
    image.onload = () => resolve({ name, image });
    image.onerror = reject;
    image.src = src;
  });
}

export function waitForImages(array) {
  return Promise.all(array).then(function(images) {
    return images.reduce(function(acc, image) {
      acc[image.name] = image.image;
      return acc;
    }, {});
  });
}
