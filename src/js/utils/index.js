export function smoothScroll(el, duration, options = {}) {
  let { callback, toEl, stepAmt } = options;
  if(!stepAmt) { stepAmt = 15; }

  if(toEl) {
    // TODO: Implement smooth scroll to element
    const toPos = toEl.getBoundingClientRect().top + document.body.scrollTop;
    el.scrollTo(el.scrollX, toPos - 65 - 15); // 65 is app bar height
    return;
  }

  const scrollHeight = el.scrollY || el.scrollTop;
  const scrollStep = Math.PI / (duration / stepAmt);
  const cosParam = scrollHeight / 2;

  let scrollCounter = 0;
  let scrollMargin;

  function step() {
    setTimeout(function() {
      let h = el.scrollY || el.scrollTop;
      if(h || h > 0) {
        requestAnimationFrame(step);

        scrollCounter++;
        scrollMargin = cosParam - cosParam * Math.cos(scrollCounter * scrollStep);

        let scroll = scrollHeight - scrollMargin;
        if(scroll <= 10) {
          scroll = 0;
        }

        if(el.scrollY) {
          el.scrollTo(el.scrollX, scroll);
        } else {
          el.scrollTop = scroll;
        }
      } else {
        callback && callback();
      }
    }, stepAmt);
  }

  requestAnimationFrame(step);
}