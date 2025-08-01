import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
} from "lucide-react";

const FooterOwner = () => {
  const followMeLinks = [
    {
      icon: <GithubIcon className="size-5 text-white" />,
      link: "https://github.com/ABUBAKARKHAN-Stack",
    },
    {
      icon: <LinkedinIcon className="size-5 text-white" />,
      link: "https://pk.linkedin.com/in/abubakar-aijaz-dev",
    },
    {
      icon: <InstagramIcon className="size-5 text-white" />,
      link: "https://www.instagram.com/abubakar_aijaz",
    },
    {
      icon: <FacebookIcon className="size-5 text-white" />,
      link: "https://www.facebook.com/abubakar.tanoli.961",
    },
  ];

  return (
    <section className="space-y-4" aria-labelledby="owner-heading">
      <div className="text-center text-lg font-light">
        <span className="font-semibold text-cyan-500 dark:text-orange-500">
          ShopNex
        </span>{" "}
        Owner Abubakar Aijaz
      </div>
      <div className="space-y-3">
        <h3
          id="owner-heading"
          className="text-center font-semibold text-gray-950 dark:text-white"
        >
          Follow Me
        </h3>
        <div className="flex items-center justify-center gap-x-4">
          {followMeLinks.map(({ icon, link }, i) => (
            <a
              key={i}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Owner social link ${i + 1}`}
              className="rounded-full bg-cyan-500 p-2 transition-all duration-200 ease-linear hover:-translate-y-1 hover:scale-110 hover:transform hover:bg-cyan-600/90 dark:bg-orange-500 dark:hover:bg-orange-600/90"
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FooterOwner;
