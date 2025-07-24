import { SectionHeader } from "@/components/reusable/user"
import { Button } from "@/components/ui/button"
import { HelpCircle } from "lucide-react"
import { Link } from "react-router-dom"

const FaqTeaser = () => {
    return (
        <div className="w-full max-w-2xl mx-auto space-y-8">
            <div className="space-y-2">
                <HelpCircle className="mx-auto dark:text-orange-500 text-cyan-500 size-20" />
                <p className="text-muted-foreground text-wrap text-center">
                    Before sending us a message, check out our FAQs — we’ve answered the most common concerns.
                </p>
            </div>

            <Button size={'lg'} className="w-full hover:scale-105  py-6 duration-300 text-lg">
                <Link to="/faqs">Go to FAQs</Link>
            </Button>
        </div>
    )
}

export default FaqTeaser
