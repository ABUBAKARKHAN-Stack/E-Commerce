import { Input } from '@/components/ui/input';
import { useAuthContext } from '@/context/authContext';
import { Link } from 'react-router-dom';


const RenderFooterLinks = ({ heading, links }: { heading: string; links: any[] }) => {
    return (
        <div className='flex flex-col gap-y-4'>
            <div className="space-y-1">
                <h2 className="text-xl font-semibold text-gray-950 dark:text-white">{heading}</h2>
            </div>
            <div className='flex flex-col gap-y-2 text-sm text-gray-900 dark:text-gray-300'>
                {
                    links.map(({ name, link }, i) => (
                        <Link key={i} to={link}>
                            {name}
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

const FooterTop = () => {
    const { user } = useAuthContext();

    const accountLinks = [
        !user && { name: 'Login', link: '/sign-in' },
        !user && { name: 'Sign Up', link: '/sign-up' },
        { name: 'My Account', link: '/me' },
        { name: 'Dashboard', link: '/user/dashboard' },
        { name: 'Cart', link: '/cart' },
        { name: 'Wishlist', link: '/wishlist' },
        { name: 'Order', link: '/orders' }
    ].filter(Boolean);


    const quickLinks = [
        { name: 'Products', link: '/products' },
        { name: 'FAQS', link: '/faqs' },
        { name: 'About', link: '/about' },
        { name: 'Contact', link: '/contact' },
        { name: 'Privacy Policy', link: '/privacy-policy' }
    ];

    return (
        <section
            className="flex sm:justify-between flex-wrap sm:flex-row flex-col gap-10 w-full"
            aria-labelledby="footer-main"
        >
            {/* === Newsletter Subscription === */}
            <div className="flex flex-col gap-y-4" aria-labelledby="newsletter-heading">
                <div className="space-y-1">
                    <h2
                        id="newsletter-heading"
                        className="text-xl font-semibold text-gray-950 dark:text-white"
                    >
                        Newsletter
                    </h2>
                </div>
                <div className="flex flex-col gap-y-2">
                    <p className="text-sm text-gray-900 dark:text-gray-300">
                        Subscribe for updates, offers & product tips.
                    </p>
                    <Input
                        placeholder="Enter your email"
                        aria-label="Enter your email for newsletter"
                    />
                </div>
            </div>

            {/* === Support Info === */}
            <div className="flex flex-col gap-y-4" aria-labelledby="support-heading">
                <div className="space-y-1">
                    <h2
                        id="support-heading"
                        className="text-xl font-semibold text-gray-950 dark:text-white"
                    >
                        Support
                    </h2>
                </div>
                <div className="flex flex-col gap-y-2 text-sm text-gray-900 dark:text-gray-300">
                    <a
                        href="mailto:shopnex.support@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Email ShopNex Support"
                    >
                        shopnex.support@gmail.com
                    </a>
                    <Link to="/support" aria-label="Visit help and support page">Help & Support</Link>
                </div>
            </div>

            {/* === Account Links === */}
            <RenderFooterLinks
                heading="Account"
                links={accountLinks}
            />

            {/* === Quick Links === */}
            <RenderFooterLinks
                heading="Quick Links"
                links={quickLinks}
            />
        </section>
    )
}

export default FooterTop