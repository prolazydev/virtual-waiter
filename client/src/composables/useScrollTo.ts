const isScrolling = ref(false);
const scrollPos = ref(0);

const stopScroll = () => {
    isScrolling.value = false;
    document.removeEventListener('wheel', stopScroll);
    document.removeEventListener('touchstart', stopScroll);
};

// /**
//  * 
//  * @param elementId - The id of the element to scroll to
//  * @param offset - The offset to apply to the scroll position. Defaults to 87 (Height of the header)
//  */
// export const useScrollTo = (elementId: string | number, offset: number = 87) => {
//     isScrolling.value = true;

//     document.addEventListener("wheel", stopScroll);
//     document.addEventListener("touchstart", stopScroll);

//     if (typeof elementId === 'string') {
//         const el = document.getElementById(elementId);
//         if (el) {
//             scrollPos.value = el.offsetTop - offset;
//             handleScroll();
//         }
//     } else {
//         handleScroll();
//     }
// };
/**
 * 
 * @param elementId - The id of the element to scroll to
 * @param offset - The offset to apply to the scroll position. Defaults to 87 (Height of the header)
 */
export default (elementId: string | number, offset: number = 87) => {
    isScrolling.value = true;

    document.addEventListener("wheel", stopScroll);
    document.addEventListener("touchstart", stopScroll);

    if (typeof elementId === 'string') {
        const el = document.getElementById(elementId);
        if (el) {
            scrollPos.value = el.offsetTop - offset;
            handleScroll();
        }
    } else {
        handleScroll();
    }
};

function handleScroll() {
    if (!isScrolling.value || window.scrollY === scrollPos.value) 
        return stopScroll();

    const distance = scrollPos.value - window.scrollY;
    const easingAmount = 0.055; // Adjust the easing amount as needed
    
    const newScrollPosition = Math.round(window.scrollY + distance * easingAmount + (distance > 0 ? 1 : -1));
    // const newScrollPosition = Math.round(window.scrollY + distance * easingAmount + (window.scrollY !== scrollPos.value ? 1 : -1));

    window.scrollTo(0, newScrollPosition);
    window.requestAnimationFrame(handleScroll);
}
