export function scrollToIdWithMotion(id: string, duration = 800) {
  const element = document.getElementById(id);
  if (!element) return;

  const targetY = element.getBoundingClientRect().top + window.pageYOffset;
  const startY = window.pageYOffset;
  const distance = targetY - startY;
  let startTime: number | null = null;

  function animationStep(timestamp: number) {
    if (!startTime) startTime = timestamp;
    const timeElapsed = timestamp - startTime;
    const progress = Math.min(timeElapsed / duration, 1);

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const easedProgress = easeInOutCubic(progress);
    const scrollY = startY + distance * easedProgress;

    window.scrollTo(0, scrollY);

    if (timeElapsed < duration) {
      requestAnimationFrame(animationStep);
    }
  }

  requestAnimationFrame(animationStep);
}
