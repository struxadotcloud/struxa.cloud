"use client";

import * as React from "react";
import { Mail } from "lucide-react";

import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogPanel,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { signupForNewsletter } from "@/lib/actions/newsletter";

interface FeatureComingSoonDialogProps {
  children: React.ReactNode;
  featureName: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function FeatureComingSoonDialog({
  children,
  featureName,
  open,
  onOpenChange,
}: FeatureComingSoonDialogProps) {
  const [email, setEmail] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setSubmitStatus({ type: "error", message: "Email address is required" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSubmitStatus({ type: "error", message: "Please enter a valid email address" });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const result = await signupForNewsletter({
        email: email.trim().toLowerCase(),
        locale: "en",
        source: `coming-soon-${featureName.toLowerCase().replace(/\s+/g, "-")}`,
      });

      if (result.success) {
        setSubmitStatus({ type: "success", message: "You're on the waitlist. We'll email you when Struxa Cloud launches." });
        setEmail("");
      } else {
        if (result.rateLimited) {
          setSubmitStatus({ type: "error", message: "Too many attempts. Please try again later." });
        } else if (result.message.includes("already subscribed")) {
          setSubmitStatus({ type: "error", message: "You're already on our list!" });
        } else {
          setSubmitStatus({ type: "error", message: "Something went wrong. Please try again." });
        }
      }
    } catch (error) {
      console.error("Newsletter signup error:", error);
      setSubmitStatus({ type: "error", message: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger render={<span className="contents" />} nativeButton={false}>
        {children}
      </DialogTrigger>
      <DialogPopup className="sm:max-w-md">
        <DialogHeader className="text-center gap-3">
          <DialogTitle className="text-xl font-semibold">
            Join the Struxa Cloud Waitlist
          </DialogTitle>
          <DialogDescription className="text-sm leading-relaxed">
            Struxa Cloud hosts the panel for you — you still bring your own Wings nodes. Coming soon. Sign up to get early access to {featureName} and be notified when we launch.
          </DialogDescription>
        </DialogHeader>

        <DialogPanel>
          <div className="space-y-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="inline-flex w-full items-center gap-2.5 rounded-lg border border-input bg-background px-3 text-sm shadow-xs ring-ring/24 transition-shadow focus-within:border-ring focus-within:ring-[3px]">
                <Mail aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-8.5 flex-1 bg-transparent leading-8.5 outline-none placeholder:text-muted-foreground/72 sm:h-7.5 sm:leading-7.5"
                  required
                />
              </div>

              {submitStatus.type && (
                <div
                  className={cn(
                    "text-xs p-2 rounded-md text-center",
                    submitStatus.type === "success"
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-red-50 text-red-700 border border-red-200",
                  )}
                >
                  {submitStatus.message}
                </div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting || submitStatus.type === "success"}
                className="w-full"
              >
                {isSubmitting ? "Signing up..." : "Sign me up"}
              </Button>
            </form>
          </div>
        </DialogPanel>
      </DialogPopup>
    </Dialog>
  );
}

export function useFeatureComingSoon() {
  const [dialogState, setDialogState] = React.useState<{
    open: boolean;
    featureName: string;
  }>({ open: false, featureName: "" });

  const openDialog = React.useCallback((featureName: string) => {
    setDialogState({ open: true, featureName });
  }, []);

  const closeDialog = React.useCallback(() => {
    setDialogState((prev) => ({ ...prev, open: false }));
  }, []);

  return {
    ...dialogState,
    openDialog,
    closeDialog,
    setOpen: (open: boolean) =>
      setDialogState((prev) => ({ ...prev, open })),
  };
}
