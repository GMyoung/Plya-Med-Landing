import { useEffect } from "react";
import { layout, measureLineStats, prepareWithSegments } from "@chenglou/pretext";

const PRETEXT_SELECTOR = [
  ".hero h1",
  ".hero-text",
  ".hero-product-info h2",
  ".hero-product-info > .liquid-content > p",
  ".section-head h2",
  ".card-copy h3",
  ".card-copy p",
  ".maker-card h3",
  ".maker-card blockquote",
  ".proof-grid h3",
  ".proof-grid p",
  ".bundle-card h3",
  ".bundle-card > .liquid-content > p:not(.eyebrow)",
  ".steps h3",
  ".steps p",
  ".use-note",
  ".portal h2",
  ".portal p",
  ".faq h2",
  ".faq p",
  ".subscribe h2",
  ".subscribe p",
  ".subscribe small",
  ".footer-brand p",
  ".footer-legal p",
].join(",");

function px(value) {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function canvasFont(style) {
  if (style.font && style.font !== "") return style.font;
  return `${style.fontStyle} ${style.fontVariant} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
}

function resolveLineHeight(style) {
  const lineHeight = px(style.lineHeight);
  if (lineHeight > 0) return lineHeight;
  const fontSize = px(style.fontSize);
  return fontSize > 0 ? fontSize * 1.2 : 20;
}

function fitElement(element) {
  const text = element.textContent?.replace(/\s+/g, " ").trim();
  if (!text || text.length < 18) return;

  const style = window.getComputedStyle(element);
  const font = canvasFont(style);
  const letterSpacing = style.letterSpacing === "normal" ? 0 : px(style.letterSpacing);
  const lineHeight = resolveLineHeight(style);
  const parentWidth = element.parentElement?.clientWidth ?? element.clientWidth;
  const declaredMax = px(style.maxWidth);
  const ceiling = Math.max(180, Math.min(parentWidth, declaredMax > 0 ? declaredMax : parentWidth));

  if (ceiling <= 0) return;

  try {
    const prepared = prepareWithSegments(text, font, { letterSpacing });
    const initial = measureLineStats(prepared, ceiling);
    const targetLines = initial.lineCount || 1;

    let low = 180;
    let high = Math.ceil(ceiling);
    while (low < high) {
      const mid = Math.floor((low + high) / 2);
      const midLines = layout(prepared, mid, lineHeight).lineCount || 1;
      if (midLines <= targetLines) {
        high = mid;
      } else {
        low = mid + 1;
      }
    }

    const tight = measureLineStats(prepared, low);
    const width = Math.min(ceiling, Math.max(180, Math.ceil(tight.maxLineWidth + 2)));
    const height = Math.max(1, targetLines) * lineHeight;
    element.style.setProperty("--pretext-width", `${Math.ceil(width)}px`);
    element.style.setProperty("--pretext-lines", String(targetLines));
    element.style.setProperty("--pretext-height", `${Math.ceil(height)}px`);
    element.classList.add("pretext-fitted");
  } catch {
    element.classList.remove("pretext-fitted");
  }
}

export function usePretextTypography() {
  useEffect(() => {
    const root = document.querySelector(".page-shell");
    if (!root) return undefined;

    let frame = 0;
    const apply = () => {
      frame = 0;
      root.querySelectorAll(PRETEXT_SELECTOR).forEach(fitElement);
    };
    const schedule = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(apply);
    };

    const ready = document.fonts?.ready ?? Promise.resolve();
    ready.then(schedule);

    const observer = new ResizeObserver(schedule);
    const mutations = new MutationObserver(schedule);
    observer.observe(root);
    mutations.observe(root, { childList: true, characterData: true, subtree: true });
    window.addEventListener("resize", schedule);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
      mutations.disconnect();
      window.removeEventListener("resize", schedule);
    };
  }, []);
}
