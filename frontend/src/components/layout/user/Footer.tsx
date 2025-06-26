import { Layout } from '../shared'
import { Separator } from '@/components/ui/separator'
import {
    FooterCopyRight,
    FooterOwner,
    FooterSocial,
    FooterTop
} from '@/components/sections/user/footer/index'


const Footer = () => {






    return (
        <footer className="w-full dark:bg-[#1B1B1F] bg-[#FAFAFA] shadow-lg">
            <Layout className="py-10 space-y-8">
                {/* === Main Footer Section === */}
                <FooterTop />

                {/* === Social Media Section === */}
                <FooterSocial />

                {/* === Separator === */}
                <Separator />

                {/* === Owner Info Section === */}
                <FooterOwner />

                {/* === Copyright Section === */}
                <FooterCopyRight />

            </Layout>
        </footer>
    )
}

export default Footer