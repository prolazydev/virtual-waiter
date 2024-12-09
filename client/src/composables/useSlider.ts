/**
 * This is a composable function that uses the Intersection Observer API to animate elements when they are in view.
 */
export default () => {
    const homeSlider = () => {
        const observerOptions: IntersectionObserverInit = {
            root: null, // Use the viewport as the root
            threshold: 0.85, // Percentage of the element that must be visible to trigger
        };
    
        const observeSlide1 = new IntersectionObserver(async (entries) => {
            const slide1 = entries[0].target.childNodes[1] as HTMLElement;
    
            if (entries[0].isIntersecting) {
                (slide1.childNodes[0] as HTMLElement).style.animation = 'appear-from-left 1s ease 0s 1 normal forwards running';
                (slide1.childNodes[1] as HTMLElement).style.animation = 'appear-from-right 1s ease 0.5s 1 normal forwards running';
                (slide1.childNodes[2] as HTMLElement).style.animation = 'appear-from-bottom 1s ease 1s 1 normal forwards running';
                // (slide1.childNodes[3] as HTMLElement).style.animation = 'go-down 2.5s ease 2s infinite';
                (slide1.childNodes[3] as HTMLElement).style.animation = 'fade-in 2.5s ease 1.5s 1 forwards';
            } else {
                (slide1.childNodes[0] as HTMLElement).style.animation = 'none';
                (slide1.childNodes[1] as HTMLElement).style.animation = 'none';
                (slide1.childNodes[2] as HTMLElement).style.animation = 'none';
                (slide1.childNodes[3] as HTMLElement).style.animation = 'none';
                (slide1.childNodes[4] as HTMLElement).style.animation = 'none';
            }
    
        }, observerOptions);
    
        const observeSlide2 = new IntersectionObserver(async (entries) => {
            const slide2 = entries[0].target.childNodes[1] as HTMLElement;
    
            if (entries[0].isIntersecting) {
                ((slide2.children[0] as HTMLDivElement).children[0] as HTMLParagraphElement).style.animation = 'appear-from-left 1s ease 0s 1 normal forwards running';
                ((slide2.children[0] as HTMLDivElement).children[1] as HTMLHeadingElement).style.animation = 'appear-from-right 1s ease 0.5s 1 normal forwards running';
                (slide2.children[1] as HTMLDivElement).style.animation = 'appear-from-bottom 1s ease 1s 1 normal forwards running';
            } else {
                ((slide2.children[0] as HTMLDivElement).children[0] as HTMLParagraphElement).style.animation = 'none';
                ((slide2.children[0] as HTMLDivElement).children[1] as HTMLHeadingElement).style.animation = 'none';
                (slide2.children[1] as HTMLDivElement).style.animation = 'none';
            }
        }, observerOptions);
    
        const observeSlide3 = new IntersectionObserver(async (entries, observer) => {
            const slide3 = entries[0].target.childNodes[1] as HTMLElement;
    
            if (entries[0].isIntersecting) {
                (slide3.childNodes[0] as HTMLElement).style.animation = 'appear-from-left 1s ease 0s 1 normal forwards running';
                (slide3.childNodes[1] as HTMLElement).style.animation = 'appear-from-right 1s ease 0.5s 1 normal forwards running';
                (slide3.childNodes[2] as HTMLElement).style.animation = 'appear-from-bottom 1s ease 1s 1 normal forwards running';
                
            } else {
                (slide3.childNodes[0] as HTMLElement).style.animation = 'none';
                (slide3.childNodes[1] as HTMLElement).style.animation = 'none';
                (slide3.childNodes[2] as HTMLElement).style.animation = 'none';
            }
        }, observerOptions);
    
        return {
            observeSlide1,
            observeSlide2,
            observeSlide3
        }
    }

    // const initSlider = (  ) => {
        
    // }

    return {
        homeSlider,

    }
}
