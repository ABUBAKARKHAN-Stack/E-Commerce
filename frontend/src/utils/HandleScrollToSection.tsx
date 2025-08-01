export const handleScrollToSection = (sectionClassName: string) => {
  const section = document.querySelector(`.${sectionClassName}`);
  console.log(section);

  if (!section) return;
  section.scrollIntoView({
    behavior: "smooth",
  });
};
