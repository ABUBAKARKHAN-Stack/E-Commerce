const FooterCopyRight = () => {
  const date = new Date();
  return (
    <section className="space-y-4" aria-label="copyright">
      <p className="text-center text-sm font-extralight">
        © {date.getFullYear()}{" "}
        <span className="font-semibold text-cyan-500 dark:text-orange-500">
          ShopNex
        </span>
        . All rights reserved.
      </p>
    </section>
  );
};

export default FooterCopyRight;
