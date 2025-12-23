import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, setIsOpen }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    target: string
  ) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(target);
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - 100,
        behavior: "smooth",
      });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-lg z-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 right-0 h-full w-full max-w-xs bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-2xl font-bold text-slate-900">Menu</h2>
                <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-slate-900">
                  <X className="w-8 h-8" />
                </button>
              </div>
              <div className="flex flex-col gap-8">
                {["Stack", "Projects", "Blog", "CV"].map((item, i) => (
                  <motion.a
                    key={item}
                    href={
                      item === "CV"
                        ? "/img/turkce_tam_cv.pdf"
                        : `#${item.toLowerCase()}`
                    }
                    download={item === "CV" ? "ihsan_yigit_onay_cv.pdf" : undefined}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                    className="text-2xl font-semibold text-slate-700 hover:text-blue-600 transition-colors"
                    onClick={(e) => {
                      if (item !== "CV") {
                        handleLinkClick(e, `#${item.toLowerCase()}`);
                      }
                    }}
                  >
                    {item}
                  </motion.a>
                ))}
              </div>
            </div>
            <div className="absolute bottom-8 left-8 right-8">
               <a
              href="mailto:ihsanyigitonay@gmail.com"
              className="w-full inline-flex items-center justify-center px-6 py-4 bg-slate-900 text-white hover:bg-blue-600 rounded-xl text-sm font-bold tracking-widest uppercase transition-all shadow-lg hover:shadow-blue-200"
            >
              İletişim
            </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;