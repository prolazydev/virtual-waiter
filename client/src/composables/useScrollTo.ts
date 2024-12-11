let isScrolling = false;
let scrollPos = 0;

const stopScroll = () => {
    isScrolling = false;
    document.removeEventListener('wheel', stopScroll);
    document.removeEventListener('touchstart', stopScroll);
};

/**
 * 
 * @param elementId - The id of the element to scroll to
 * @param offset - The offset to apply to the scroll position. Defaults to 87 (Height of the header)
 */
export default (elementId: string | number, offset: number = 87) => {
    isScrolling = true;

    document.addEventListener("wheel", stopScroll);
    document.addEventListener("touchstart", stopScroll);

    if (typeof elementId === 'string') {
        const el = document.getElementById(elementId);
        if (el) {
            scrollPos = el.offsetTop - offset;
            handleScroll();
        }
    } else {
        handleScroll();
    }
};

function handleScroll() {
    if (!isScrolling || window.scrollY === scrollPos) 
        return stopScroll();

    const distance = scrollPos - window.scrollY;
    const easingAmount = 0.055; // Adjust the easing amount as needed
    
    const newScrollPosition = Math.round(window.scrollY + distance * easingAmount + (distance > 0 ? 1 : -1));
    // const newScrollPosition = Math.round(window.scrollY + distance * easingAmount + (window.scrollY !== scrollPos.value ? 1 : -1));

    window.scrollTo(0, newScrollPosition);
    window.requestAnimationFrame(handleScroll);
}
