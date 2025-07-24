export const handleScrollToSection = (sectionClassName: string) => {
    const section = document.querySelector(`.${sectionClassName}`);
    if (!section) return;
    section.scrollIntoView({
        behavior: "smooth"
    })
}
