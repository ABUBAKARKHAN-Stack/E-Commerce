import { IUser } from '@/types/main.types';
import { FC, useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogClose,

} from "@/components/ui/dialog"
import { SignInForm } from '@/components/reusable/shared';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

const RequireAuthDialog: FC<Props> = ({
    open,
    onOpenChange
}) => {



    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent ShowXIcon={false}>
                <DialogHeader className="flex flex-col gap-3 text-center mb-8">
                     {/* Icon + Title */}
                    <div className="flex items-center justify-center gap-3 mb-2">
                        <div className="relative">
                            <div className="absolute inset-0 bg-green-400/20 rounded-xl blur-sm animate-pulse"></div>
                            <div className="relative bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40 p-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
                                <ShieldCheck className="w-6 h-6 text-green-600 dark:text-green-400" />
                            </div>
                        </div>

                        <DialogTitle className="xxxs:text-2xl text-xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-gray-100 dark:via-gray-200 dark:to-gray-100 bg-clip-text text-transparent tracking-tight">
                            You need to log in
                        </DialogTitle>
                    </div>


                    {/* Friendly Description */}
                    <DialogDescription className="text-base leading-relaxed text-gray-600 dark:text-gray-300 space-y-2">
                        <div className="font-medium">
                            <span className='text-destructive-foreground font-semibold'>To perform this action</span>, please sign in to your account.
                        </div>
                        <div className="xxxs:text-sm text-xs">
                            Don’t have an account?
                            <Link
                                to="/signup"
                                className="ml-1 font-semibold inline-flex items-center gap-1 text-transparent bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-orange-400 dark:to-red-400 bg-clip-text hover:from-cyan-700 hover:to-blue-700 dark:hover:from-orange-300 dark:hover:to-red-300 transition-all duration-300 underline decoration-2 underline-offset-2 decoration-cyan-500/30 dark:decoration-orange-400/30 hover:decoration-cyan-600 dark:hover:decoration-orange-300"
                            >
                                Create your account
                            </Link>
                        </div>
                    </DialogDescription>
                </DialogHeader>

                {/* Sign-in form */}
                <SignInForm isAdmin={false} isUsingInAuthDialog />
                <DialogClose className='xsm:absolute xsm:right-6 xsm:bottom-1.5 xsm:-translate-y-1/2 static' >
                    <Button variant="outline" className="w-full">
                        Close — You can sign in later
                    </Button>
                </DialogClose>
            </DialogContent>
        </Dialog>


    );
};

export default RequireAuthDialog;
