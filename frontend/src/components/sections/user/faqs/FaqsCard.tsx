import { BlurFade } from '@/components/magicui/blur-fade';
import { Button } from '@/components/ui/button';
import { MinusCircle, PlusCircle } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { FC, JSX } from 'react';
import { motion } from 'motion/react';

type Props = {
  id: number;
  question: string;
  answer: string | JSX.Element;
  i: number;
  showFaq: { id: number | null; isFaqOpen: boolean };
  setShowFaq: React.Dispatch<React.SetStateAction<{ id: number | null; isFaqOpen: boolean }>>;
};

const FaqsCard: FC<Props> = ({ id, question, answer, i, showFaq, setShowFaq }) => {
  return (
    <BlurFade
      key={id}
      direction="up"
      delay={0.15 * i}
      once={false}
      inView
      className="dark:bg-orange-500 bg-cyan-500 w-full p-6 rounded-lg flex flex-col gap-4 transition-all duration-300"
    >
      <div className="flex justify-between items-start">
        <h2 className="text-lg md:text-xl font-medium text-white leading-snug">
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
            key={showFaq.id === id && showFaq.isFaqOpen ? 'minus' : 'plus'}
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 90 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {showFaq.id === id && showFaq.isFaqOpen ? (
              <MinusCircle className="size-6.5 drop-shadow-2px" />
            ) : (
              <PlusCircle className="size-6.5 drop-shadow-2px" />
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
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="text-sm md:text-base font-light dark:text-orange-50 text-cyan-50 leading-relaxed"
          >
            {answer}
          </motion.p>
        )}
      </AnimatePresence>
    </BlurFade>
  );
};

export default FaqsCard;
