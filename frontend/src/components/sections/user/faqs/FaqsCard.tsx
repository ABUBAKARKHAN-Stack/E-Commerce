import { BlurFade } from "@/components/magicui/blur-fade";
import { Button } from "@/components/ui/button";
import { MinusCircle, PlusCircle } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { FC, JSX } from "react";
import { motion } from "motion/react";

type Props = {
  id: number;
  question: string;
  answer: string | JSX.Element;
  i: number;
  showFaq: { id: number | null; isFaqOpen: boolean };
  setShowFaq: React.Dispatch<
    React.SetStateAction<{ id: number | null; isFaqOpen: boolean }>
  >;
};

const FaqsCard: FC<Props> = ({
  id,
  question,
  answer,
  i,
  showFaq,
  setShowFaq,
}) => {
  return (
    <BlurFade
      key={id}
      direction="up"
      delay={0.15 * i}
      once={false}
      inView
      className="flex w-full flex-col gap-4 rounded-lg bg-cyan-500 p-6 transition-all duration-300 dark:bg-orange-500"
    >
      <div className="flex items-start justify-between">
        <h2 className="text-lg leading-snug font-medium text-white md:text-xl">
          {question}
        </h2>
        <Button
          onClick={() =>
            setShowFaq((prev) => ({
              id,
              isFaqOpen: showFaq.id === id ? !prev.isFaqOpen : true,
            }))
          }
          size="icon"
          variant="default"
          className="text-white hover:text-white"
        >
          <motion.div
            key={showFaq.id === id && showFaq.isFaqOpen ? "minus" : "plus"}
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 90 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {showFaq.id === id && showFaq.isFaqOpen ? (
              <MinusCircle className="drop-shadow-2px size-6.5" />
            ) : (
              <PlusCircle className="drop-shadow-2px size-6.5" />
            )}
          </motion.div>
        </Button>
      </div>

      <AnimatePresence mode="wait">
        {showFaq.id === id && showFaq.isFaqOpen && (
          <motion.p
            key={id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="text-sm leading-relaxed font-light text-cyan-50 md:text-base dark:text-orange-50"
          >
            {answer}
          </motion.p>
        )}
      </AnimatePresence>
    </BlurFade>
  );
};

export default FaqsCard;
