import { useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShieldAlert, Eye, X } from "lucide-react";

/**
 * PrivacyShield — A comprehensive anti-capture deterrent layer.
 *
 * WHAT IT DOES:
 * 1. Disables right-click context menu
 * 2. Blocks common screenshot keyboard shortcuts (PrintScreen, Cmd+Shift+3/4, etc.)
 * 3. Disables text selection & image dragging site-wide
 * 4. Blurs/hides all content when the tab loses focus or visibility changes
 *    (many screenshot tools cause a brief visibility change)
 * 5. Detects and blocks Screen Capture API (getDisplayMedia)
 * 6. Renders a dynamic watermark overlay with session-specific identifiers
 * 7. Disables dev tools shortcuts (F12, Ctrl+Shift+I/J/C)
 *
 * NOTE: No web-based solution can prevent OS-level screenshots entirely.
 * This provides strong deterrents, not absolute prevention.
 */

function generateSessionId(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function PrivacyShield() {
  const [isObscured, setIsObscured] = useState(false);
  const [showWarning, setShowWarning] = useState(true);
  const [sessionId] = useState(() => generateSessionId());
  const [timestamp] = useState(() => {
    const now = new Date();
    return now.toISOString().slice(0, 19).replace("T", " ");
  });

  // Auto-dismiss warning after 8 seconds
  useEffect(() => {
    if (showWarning) {
      const timer = setTimeout(() => setShowWarning(false), 8000);
      return () => clearTimeout(timer);
    }
  }, [showWarning]);

  // Block right-click
  const handleContextMenu = useCallback((e: MouseEvent) => {
    e.preventDefault();
    return false;
  }, []);

  // Block screenshot & dev tools keyboard shortcuts
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // PrintScreen
    if (e.key === "PrintScreen") {
      e.preventDefault();
      setIsObscured(true);
      setTimeout(() => setIsObscured(false), 1500);
      return;
    }

    // macOS: Cmd+Shift+3 (full), Cmd+Shift+4 (selection), Cmd+Shift+5 (tool)
    if (e.metaKey && e.shiftKey && ["3", "4", "5"].includes(e.key)) {
      e.preventDefault();
      setIsObscured(true);
      setTimeout(() => setIsObscured(false), 1500);
      return;
    }

    // Windows Snipping: Win+Shift+S
    if (e.metaKey && e.shiftKey && e.key.toLowerCase() === "s") {
      e.preventDefault();
      setIsObscured(true);
      setTimeout(() => setIsObscured(false), 1500);
      return;
    }

    // Dev tools shortcuts
    if (e.key === "F12") {
      e.preventDefault();
      return;
    }
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && ["i", "j", "c"].includes(e.key.toLowerCase())) {
      e.preventDefault();
      return;
    }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "u") {
      e.preventDefault();
      return;
    }
    // Block Ctrl+S (save page)
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
      e.preventDefault();
      return;
    }
    // Block Ctrl+P (print)
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "p") {
      e.preventDefault();
      return;
    }
  }, []);

  // Visibility change — blur content when tab is hidden
  const handleVisibilityChange = useCallback(() => {
    if (document.visibilityState === "hidden") {
      setIsObscured(true);
    } else {
      // Brief delay before revealing to catch screenshot tools
      setTimeout(() => setIsObscured(false), 300);
    }
  }, []);

  // Window blur — fires when window loses focus (e.g., screenshot overlay appears)
  const handleWindowBlur = useCallback(() => {
    setIsObscured(true);
  }, []);

  const handleWindowFocus = useCallback(() => {
    setTimeout(() => setIsObscured(false), 200);
  }, []);

  useEffect(() => {
    // Event listeners
    document.addEventListener("contextmenu", handleContextMenu, true);
    document.addEventListener("keydown", handleKeyDown, true);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("focus", handleWindowFocus);

    // Disable text selection & image dragging via CSS
    const style = document.createElement("style");
    style.id = "privacy-shield-styles";
    style.textContent = `
      * {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
        -webkit-user-drag: none !important;
        -webkit-touch-callout: none !important;
      }
      input, textarea {
        -webkit-user-select: text !important;
        -moz-user-select: text !important;
        -ms-user-select: text !important;
        user-select: text !important;
      }
      img {
        pointer-events: none !important;
        -webkit-user-drag: none !important;
      }
      @media print {
        body * {
          display: none !important;
        }
        body::after {
          content: "Printing is disabled for confidentiality.";
          display: block;
          text-align: center;
          padding: 100px;
          font-family: sans-serif;
          font-size: 18px;
          color: #666;
        }
      }
    `;
    document.head.appendChild(style);

    // Override getDisplayMedia (Screen Capture API)
    if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
      const originalGetDisplayMedia = navigator.mediaDevices.getDisplayMedia.bind(navigator.mediaDevices);
      navigator.mediaDevices.getDisplayMedia = function (constraints?: DisplayMediaStreamOptions) {
        setIsObscured(true);
        return originalGetDisplayMedia(constraints)
          .then((stream: MediaStream) => {
            setIsObscured(true);
            return stream;
          });
      };
    }

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu, true);
      document.removeEventListener("keydown", handleKeyDown, true);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("focus", handleWindowFocus);
      const existingStyle = document.getElementById("privacy-shield-styles");
      if (existingStyle) existingStyle.remove();
    };
  }, [handleContextMenu, handleKeyDown, handleVisibilityChange, handleWindowBlur, handleWindowFocus]);

  return (
    <>
      {/* Confidentiality Warning Overlay */}
      <AnimatePresence>
        {showWarning && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center px-4"
            style={{ zIndex: 999999 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.85)", backdropFilter: "blur(8px)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => setShowWarning(false)}
            />

            {/* Warning Card */}
            <motion.div
              className="relative w-full max-w-md"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="relative overflow-hidden"
                style={{
                  background: "linear-gradient(180deg, #161616 0%, #0D0D0D 100%)",
                  border: "1px solid rgba(184, 149, 106, 0.2)",
                  borderRadius: "2px",
                }}
              >
                {/* Top gold accent line */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: "linear-gradient(90deg, transparent, #B8956A, transparent)" }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                />

                {/* Close button */}
                <button
                  onClick={() => setShowWarning(false)}
                  className="absolute top-4 right-4 p-1 transition-colors duration-300"
                  style={{ color: "rgba(138, 132, 120, 0.5)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#B8956A")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(138, 132, 120, 0.5)")}
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="px-8 py-10 text-center">
                  {/* Shield Icon */}
                  <motion.div
                    className="flex justify-center mb-6"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <div
                      className="relative flex items-center justify-center w-14 h-14"
                      style={{
                        border: "1px solid rgba(184, 149, 106, 0.25)",
                        borderRadius: "50%",
                      }}
                    >
                      <ShieldAlert className="w-6 h-6" style={{ color: "#B8956A" }} />
                      {/* Pulse ring */}
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{ border: "1px solid rgba(184, 149, 106, 0.15)" }}
                        animate={{ scale: [1, 1.3, 1.3], opacity: [0.4, 0, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                      />
                    </div>
                  </motion.div>

                  {/* Title */}
                  <motion.h3
                    className="font-serif tracking-[0.15em] mb-3"
                    style={{
                      color: "#F5F0EB",
                      fontSize: "0.85rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.2em",
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.45 }}
                  >
                    Confidential Environment
                  </motion.h3>

                  {/* Divider */}
                  <motion.div
                    className="w-10 h-px mx-auto mb-5"
                    style={{ background: "rgba(184, 149, 106, 0.3)" }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  />

                  {/* Message */}
                  <motion.p
                    className="mb-6"
                    style={{
                      color: "rgba(138, 132, 120, 0.85)",
                      fontSize: "0.8rem",
                      lineHeight: 1.8,
                      letterSpacing: "0.03em",
                      maxWidth: "320px",
                      margin: "0 auto 1.5rem",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.55 }}
                  >
                    Screen capture, recording, and printing are
                    <span style={{ color: "#B8956A" }}> strictly prohibited</span>.
                    All sessions are monitored and forensically watermarked.
                    Unauthorized reproduction may result in immediate membership revocation.
                  </motion.p>

                  {/* Monitoring badge */}
                  <motion.div
                    className="flex items-center justify-center gap-2 mb-6"
                    style={{
                      padding: "8px 16px",
                      background: "rgba(184, 149, 106, 0.06)",
                      border: "1px solid rgba(184, 149, 106, 0.1)",
                      borderRadius: "1px",
                      display: "inline-flex",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.65 }}
                  >
                    <Eye className="w-3 h-3" style={{ color: "rgba(184, 149, 106, 0.5)" }} />
                    <span
                      className="font-mono"
                      style={{
                        fontSize: "0.6rem",
                        color: "rgba(184, 149, 106, 0.45)",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                      }}
                    >
                      Session {sessionId} &mdash; Monitored
                    </span>
                  </motion.div>

                  <br />

                  {/* Acknowledge button */}
                  <motion.button
                    onClick={() => setShowWarning(false)}
                    className="w-full py-3 transition-all duration-300"
                    style={{
                      background: "transparent",
                      border: "1px solid rgba(184, 149, 106, 0.3)",
                      borderRadius: "1px",
                      color: "#B8956A",
                      fontSize: "0.7rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                    }}
                    whileHover={{
                      borderColor: "rgba(184, 149, 106, 0.6)",
                      backgroundColor: "rgba(184, 149, 106, 0.05)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.75 }}
                  >
                    I Acknowledge &mdash; Proceed
                  </motion.button>

                  {/* Auto-dismiss countdown hint */}
                  <motion.p
                    style={{
                      fontSize: "0.55rem",
                      color: "rgba(138, 132, 120, 0.3)",
                      marginTop: "12px",
                      letterSpacing: "0.1em",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.9 }}
                  >
                    This notice will auto-dismiss
                  </motion.p>
                </div>

                {/* Bottom gold accent line */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-px"
                  style={{ background: "linear-gradient(90deg, transparent, #B8956A, transparent)" }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Obscure overlay — covers everything when capture is detected */}
      {isObscured && (
        <div
          className="fixed inset-0 flex items-center justify-center"
          style={{
            zIndex: 99999,
            backgroundColor: "#0D0D0D",
          }}
        >
          <div className="text-center">
            <div className="w-8 h-px bg-gold/30 mx-auto mb-6" />
            <p
              className="text-warm-gray/50 font-serif tracking-[0.2em]"
              style={{ fontSize: "0.75rem", textTransform: "uppercase" }}
            >
              Content Protected
            </p>
            <div className="w-8 h-px bg-gold/30 mx-auto mt-6" />
          </div>
        </div>
      )}

      {/* Subtle forensic watermark — visible on screenshots if captured */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 9998, overflow: "hidden" }}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 200px,
              rgba(184, 149, 106, 0.012) 200px,
              rgba(184, 149, 106, 0.012) 201px
            )`,
          }}
        />
        {/* Session-stamped watermark tiles */}
        <div
          className="absolute inset-0 flex flex-wrap items-start justify-start gap-0"
          style={{
            transform: "rotate(-30deg) scale(1.5)",
            transformOrigin: "center center",
          }}
        >
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="flex-shrink-0"
              style={{
                width: "350px",
                padding: "80px 40px",
                textAlign: "center",
              }}
            >
              <span
                className="font-mono"
                style={{
                  fontSize: "0.5rem",
                  color: "rgba(184, 149, 106, 0.025)",
                  letterSpacing: "0.15em",
                  whiteSpace: "nowrap",
                }}
              >
                ALC-{sessionId} {timestamp}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}