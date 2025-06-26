import { FacebookIcon, InstagramIcon, TwitterIcon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const FooterSocial = () => {

    const socailLinks = [
        {
            icon: <FacebookIcon className='size-6 text-white' />,
            link: "#"
        },
        {
            icon: <InstagramIcon className='size-6 text-white' />,
            link: "#"
        },
        {
            icon: <TwitterIcon className='size-6 text-white' />,
            link: "#"
        },
    ]


    return (
        <section className="space-y-4" aria-labelledby="social-heading">
            <h2
                id="social-heading"
                className="text-3xl tracking-wide font-bold text-gray-950 dark:text-white text-center"
            >
                Follow Us
            </h2>
            <div className="flex items-center justify-center gap-x-5">
                {socailLinks.map(({ icon, link }, i) => (
                    <Link
                        to={link}
                        key={i}
                        aria-label={`ShopNex social link ${i + 1}`}
                        className="p-2.5 dark:bg-orange-500 dark:hover:bg-orange-600/90 bg-cyan-500 hover:bg-cyan-600/90 transition-all hover:transform hover:scale-110 duration-200 ease-linear hover:-translate-y-1 rounded-full"
                    >
                        {icon}
                    </Link>
                ))}
            </div>
        </section>
    )
}

export default FooterSocial