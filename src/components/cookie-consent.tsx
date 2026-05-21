"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCookieConsent, setCookieConsent } from "@/lib/cookie-consent";
import Link from "next/link";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if user has already seen the notification
    const hasConsented = getCookieConsent();
    if (!hasConsented) {
      setIsVisible(true);
    }
    setIsLoaded(true);
  }, []);

  const acceptCookies = () => {
    setCookieConsent("accepted");
    setIsVisible(false);
  };

  const closeNotification = () => {
    setCookieConsent("accepted"); // Auto-accept when closing
    setIsVisible(false);
  };

  if (!isLoaded) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.9 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            duration: 0.5,
          }}
          className="fixed bottom-6 left-6 z-50 max-w-sm pointer-events-auto"
        >
          <div className="relative pointer-events-auto">
            {/* Glassy background */}
            <div className="absolute inset-0 bg-background/95 backdrop-blur-xl rounded-2xl border border-border shadow-xl" />

            {/* Content */}
            <div className="relative p-6 text-foreground">
              <div className="flex items-start gap-3 mb-4">
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut",
                  }}
                  className="flex-shrink-0 p-2 bg-primary/20 rounded-full"
                >
                  <Cookie className="w-5 h-5 text-primary" />
                </motion.div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold mb-2">Cookie Notice</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    This website uses cookies to enhance your experience and
                    analyze our website traffic.{" "}
                    <Link
                      href="/legal/cookies"
                      className="underline text-primary hover:text-primary/80"
                    >
                      Learn more
                    </Link>
                    .
                  </p>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={acceptCookies}
                  size="sm"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 border-primary/30 transition-all duration-200 hover:scale-105 pointer-events-auto"
                >
                  Got it!
                </Button>
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={closeNotification}
              className="absolute -top-2 -right-2 p-1.5 bg-card hover:bg-accent rounded-full border border-border transition-all duration-200 hover:scale-110 pointer-events-auto"
            >
              <X className="w-3 h-3 text-foreground" />
            </button>

            {/* Animated border gradient */}
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                background:
                  "linear-gradient(45deg, transparent, rgba(var(--primary), 0.1), transparent)",
                backgroundSize: "200% 200%",
              }}
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
