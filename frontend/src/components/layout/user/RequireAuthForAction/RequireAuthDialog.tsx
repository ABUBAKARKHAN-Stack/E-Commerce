import { IUser } from "@/types/main.types";
import { FC, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { SignInForm } from "@/components/reusable/shared";
import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const RequireAuthDialog: FC<Props> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent ShowXIcon={false}>
        <DialogHeader className="mb-8 flex flex-col gap-3 text-center">
          {/* Icon + Title */}
          <div className="mb-2 flex items-center justify-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 animate-pulse rounded-xl bg-green-400/20 blur-sm"></div>
              <div className="relative transform rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 p-3 shadow-lg transition-all duration-300 hover:scale-105 dark:from-green-900/40 dark:to-emerald-900/40">
                <ShieldCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>

            <DialogTitle className="xxxs:text-2xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-xl font-bold tracking-tight text-transparent dark:from-gray-100 dark:via-gray-200 dark:to-gray-100">
              You need to log in
            </DialogTitle>
          </div>

          {/* Friendly Description */}
          <DialogDescription className="space-y-2 text-base leading-relaxed text-gray-600 dark:text-gray-300">
            <div className="font-medium">
              <span className="text-destructive-foreground font-semibold">
                To perform this action
              </span>
              , please sign in to your account.
            </div>
            <div className="xxxs:text-sm text-xs">
              Don’t have an account?
              <Link
                to="/signup"
                className="ml-1 inline-flex items-center gap-1 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text font-semibold text-transparent underline decoration-cyan-500/30 decoration-2 underline-offset-2 transition-all duration-300 hover:from-cyan-700 hover:to-blue-700 hover:decoration-cyan-600 dark:from-orange-400 dark:to-red-400 dark:decoration-orange-400/30 dark:hover:from-orange-300 dark:hover:to-red-300 dark:hover:decoration-orange-300"
              >
                Create your account
              </Link>
            </div>
          </DialogDescription>
        </DialogHeader>

        {/* Sign-in form */}
        <SignInForm isAdmin={false} isUsingInAuthDialog />
        <DialogClose className="xsm:absolute xsm:right-6 xsm:bottom-1.5 xsm:-translate-y-1/2 static">
          <Button variant="outline" className="w-full">
            Close — You can sign in later
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default RequireAuthDialog;
