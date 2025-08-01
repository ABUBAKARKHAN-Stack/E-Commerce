import { FacebookIcon, InstagramIcon, TwitterIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const FooterSocial = () => {
  const socailLinks = [
    {
      icon: <FacebookIcon className="size-6 text-white" />,
      link: "#",
    },
    {
      icon: <InstagramIcon className="size-6 text-white" />,
      link: "#",
    },
    {
      icon: <TwitterIcon className="size-6 text-white" />,
      link: "#",
    },
  ];

  return (
    <section className="space-y-4" aria-labelledby="social-heading">
      <h2
        id="social-heading"
        className="text-center text-3xl font-bold tracking-wide text-gray-950 dark:text-white"
      >
        Follow Us
      </h2>
      <div className="flex items-center justify-center gap-x-5">
        {socailLinks.map(({ icon, link }, i) => (
          <Link
            to={link}
            key={i}
            aria-label={`ShopNex social link ${i + 1}`}
            className="shadow-20px rounded-full bg-cyan-500 p-2.5 shadow-cyan-400 transition-all duration-200 ease-linear hover:-translate-y-1 hover:scale-110 hover:transform hover:bg-cyan-600/90 hover:shadow-cyan-600 dark:bg-orange-500 dark:shadow-orange-400 dark:hover:bg-orange-600/90 dark:hover:shadow-orange-600"
          >
            {icon}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FooterSocial;
