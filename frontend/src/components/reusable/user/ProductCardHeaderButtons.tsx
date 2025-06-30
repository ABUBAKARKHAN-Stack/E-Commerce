import { cardActionButtonsData } from "@/data/trendingProducts";
import { ToolTip } from "../shared";

const ProductCardHeaderButtons = () => {
  return (
    <div className='flex lg:group-hover:opacity-100 lg:opacity-0 opacity-100 transition-opacity ease-linear duration-300 absolute left-1 top-1.5 z-10 flex-row gap-x-1.5'>
      {cardActionButtonsData.map(({ icon, tooltip }, i) => (

        <ToolTip
          key={i}
          triggerValue={
            <button className='dark:bg-white hover:dark:bg-orange-500 transition-all ease-linear cursor-pointer dark:text-black hover:dark:text-white  text-white hover:scale-105 duration-300 bg-black hover:text-white hover:bg-cyan-500 shadow-xs dark:shadow-white shadow-black dark:hover:shadow-orange-500 hover:shadow-cyan-500 size-6 rounded-full'>
              {icon}
            </button>
          }
          tooltip={tooltip}
        />
      ))}
    </div>
  );
};

export default ProductCardHeaderButtons;
