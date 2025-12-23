import React, { useState, useEffect } from "react";
import { Github, Linkedin, Mail, Menu } from "lucide-react";

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    target: string
  ) => {
    e.preventDefault();
    const element = document.querySelector(target);
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - 100,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md py-4 shadow-sm border-b border-blue-50"
          : "bg-transparent py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
        <a
          href="#"
          className="flex items-center gap-2 text-xl font-extrabold tracking-tighter text-slate-900 group"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white text-xs font-mono shadow-lg shadow-blue-200 transition-transform group-hover:rotate-12">
            İYÖ
          </div>
          İHSAN YİĞİT ÖNAY
        </a>

        <div className="flex items-center gap-12">
          <div className="hidden lg:flex items-center gap-10 text-[12px] font-bold uppercase tracking-[0.2em] text-slate-500">
            {["Stack", "Projects", "Blog", "CV"].map((item) => (
              <a
                key={item}
                href={item === "CV" ? "my_cv.pdf" : `#${item.toLowerCase()}`}
                download={item === "CV" ? "ihsan_yigit_onay_cv.pdf" : undefined}
                className="hover:text-blue-600 transition-colors"
                onClick={(e) => {
                  if (item !== "CV") {
                    handleLinkClick(e, `#${item.toLowerCase()}`);
                  }
                }}
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/iYigitOnay"
                className="text-slate-400 hover:text-blue-600 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/ihsan-yigit-onay/"
                className="text-slate-400 hover:text-blue-600 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
            <div className="hidden sm:block h-6 w-px bg-slate-200" />
            <a
              href="mailto:ihsanyigitonay@gmail.com"
              className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 bg-slate-900 text-white hover:bg-blue-600 rounded-xl text-xs font-bold tracking-widest uppercase transition-all shadow-lg hover:shadow-blue-200"
            >
              İletişim
            </a>
            <button className="lg:hidden text-slate-900" onClick={onMenuClick}>
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
