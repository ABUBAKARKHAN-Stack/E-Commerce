import { SectionHeader } from "@/components/reusable/user";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

const FaqTeaser = () => {
  return (
    <div className="mx-auto w-full max-w-2xl space-y-8">
      <div className="space-y-2">
        <HelpCircle className="mx-auto size-20 text-cyan-500 dark:text-orange-500" />
        <p className="text-muted-foreground text-center text-wrap">
          Before sending us a message, check out our FAQs — we’ve answered the
          most common concerns.
        </p>
      </div>

      <Button
        size={"lg"}
        className="w-full py-6 text-lg duration-300 hover:scale-105"
      >
        <Link to="/faqs">Go to FAQs</Link>
      </Button>
    </div>
  );
};

export default FaqTeaser;
