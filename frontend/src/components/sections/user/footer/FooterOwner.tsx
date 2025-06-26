import { FacebookIcon, GithubIcon, InstagramIcon, LinkedinIcon } from 'lucide-react'

const FooterOwner = () => {


    const followMeLinks = [
        {
            icon: <GithubIcon className='size-5 text-white' />,
            link: 'https://github.com/ABUBAKARKHAN-Stack'
        },
        {
            icon: <LinkedinIcon className='size-5 text-white' />,
            link: 'https://pk.linkedin.com/in/abubakar-aijaz-dev'
        },
        {
            icon: <InstagramIcon className='size-5 text-white' />,
            link: 'https://www.instagram.com/abubakar_aijaz'
        },
        {
            icon: <FacebookIcon className='size-5 text-white' />,
            link: 'https://www.facebook.com/abubakar.tanoli.961'
        },

    ]


    return (
        <section className="space-y-4" aria-labelledby="owner-heading">
            <div className="font-light text-lg text-center">
                <span className="font-semibold dark:text-orange-500 text-cyan-500">ShopNex</span> Owner Abubakar Aijaz
            </div>
            <div className="space-y-3">
                <h3 id="owner-heading" className="font-semibold text-center dark:text-white text-gray-950">Follow Me</h3>
                <div className="flex justify-center items-center gap-x-4">
                    {followMeLinks.map(({ icon, link }, i) => (
                        <a
                            key={i}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Owner social link ${i + 1}`}
                            className="p-2 dark:bg-orange-500 dark:hover:bg-orange-600/90 bg-cyan-500 hover:bg-cyan-600/90 transition-all hover:transform hover:scale-110 duration-200 ease-linear hover:-translate-y-1 rounded-full"
                        >
                            {icon}
                        </a>
                    ))}
                </div>
            </div>
        </section>)
}

export default FooterOwner