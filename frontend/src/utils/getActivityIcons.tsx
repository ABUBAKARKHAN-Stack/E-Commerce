import { ActivityType } from "@/types/main.types";
import {
  LogIn,
  LogOut,
  UserPlus,
  UserCog,
  KeyRound,
  ShieldCheck,
  RotateCcw,
  ShoppingCart,
  Trash2,
  Heart,
  HeartOff,
  PackageCheck,
  Ban,
  MessageCircle,
  Eye,
  BadgeDollarSign,
} from "lucide-react";

export const getActivityIcons = (activityType: string) => {
  const baseIcon = "size-5 stroke-[2.5]";

  switch (activityType) {
    case ActivityType.LOGIN:
      return (
        <LogIn className={`${baseIcon} text-blue-700 dark:text-blue-400`} />
      );

    case ActivityType.LOGOUT:
      return (
        <LogOut className={`${baseIcon} text-zinc-700 dark:text-zinc-300`} />
      );

    case ActivityType.REGISTER:
      return (
        <UserPlus
          className={`${baseIcon} text-green-700 dark:text-green-400`}
        />
      );

    case ActivityType.UPDATE_PROFILE:
      return (
        <UserCog
          className={`${baseIcon} text-yellow-700 dark:text-yellow-400`}
        />
      );

    case ActivityType.CHANGE_PASSWORD:
      return (
        <KeyRound
          className={`${baseIcon} text-orange-700 dark:text-orange-400`}
        />
      );

    case ActivityType.VERIFY_ACCOUNT:
      return (
        <ShieldCheck
          className={`${baseIcon} text-emerald-700 dark:text-emerald-400`}
        />
      );

    case ActivityType.RESET_PASSWORD:
      return (
        <RotateCcw
          className={`${baseIcon} text-purple-700 dark:text-purple-400`}
        />
      );

    case ActivityType.ADD_TO_CART:
      return (
        <ShoppingCart
          className={`${baseIcon} text-blue-700 dark:text-blue-400`}
        />
      );

    case ActivityType.REMOVE_FROM_CART:
      return (
        <Trash2 className={`${baseIcon} text-rose-700 dark:text-rose-400`} />
      );

    case ActivityType.ADD_TO_WISHLIST:
      return (
        <Heart className={`${baseIcon} text-pink-700 dark:text-pink-400`} />
      );

    case ActivityType.REMOVE_FROM_WISHLIST:
      return (
        <HeartOff className={`${baseIcon} text-rose-700 dark:text-rose-400`} />
      );

    case ActivityType.PLACE_ORDER:
      return (
        <PackageCheck
          className={`${baseIcon} text-lime-700 dark:text-lime-400`}
        />
      );
    case ActivityType.PAID_ORDER:
      return (
        <BadgeDollarSign
          className={`${baseIcon} text-green-700 dark:text-green-400`}
        />
      );

    case ActivityType.CANCEL_ORDER:
      return <Ban className={`${baseIcon} text-red-700 dark:text-red-400`} />;

    case ActivityType.WRITE_REVIEW:
      return (
        <MessageCircle
          className={`${baseIcon} text-indigo-700 dark:text-indigo-400`}
        />
      );

    case ActivityType.DELETE_REVIEW:
      return (
        <Trash2 className={`${baseIcon} text-rose-700 dark:text-rose-400`} />
      );

    case ActivityType.VIEW_PRODUCT:
      return <Eye className={`${baseIcon} text-gray-700 dark:text-gray-400`} />;

    default:
      return <Eye className={`${baseIcon} text-muted-foreground`} />;
  }
};
