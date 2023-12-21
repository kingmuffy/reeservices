"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu } from "lucide-react";
import { X } from "lucide-react";
import { navLinks } from "../constants";
import { Button } from "../components/Button";

interface NavLink {
  label: string;
  href: string;
}

const mobileLinkVars = {
  initial: {
    y: "30vh",
    transition: {
      duration: 0.5,
      ease: [0.37, 0, 0.63, 1],
    },
  },
  open: {
    y: 0,
    transition: {
      ease: [0, 0.55, 0.45, 1],
      duration: 0.7,
    },
  },
};

const MobileNavLink: React.FC<{ title: string; href: string }> = ({
  title,
  href,
}) => {
  return (
    <motion.div
      variants={mobileLinkVars}
      className="text-3xl uppercase text-white"
    >
      <a href={href}>{title}</a>
    </motion.div>
  );
};

export const PageHeader: React.FC = () => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [open]);

  const menuVars = {
    initial: {
      scaleY: 0,
    },
    animate: {
      scaleY: 1,
      transition: {
        duration: 0.5,
        ease: [0.12, 0, 0.39, 0],
      },
    },
    exit: {
      scaleY: 0,
    },
  };

  const containerVars = {
    initial: {
      transition: {
        staggerChildren: 0.09,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.09,
        staggerDirection: 1,
      },
    },
  };
  return (
    <motion.nav
      className={`backdrop-blur-[2px] bg-stone-50 lg:gap-custom flex w-full flex-col justify-center items-center py-6 max-md:max-w-full ${
        open ? "h-screen" : "originalHeightClass"
      }`}
    >
      <nav className="flex w-full px-0 max-w-[1440px]  justify-between  items-start max-md:max-w-full max-md:flex-wrap">
        <a href="/">
          <h1 className="pl-5 pt-4 lg:pt-6 lg:pl-[100px] md:pl-[100px] text-gray-700 text-sm font-bold w-44 leading-7 tracking-[3px] grow whitespace-nowrap">
            COTTAGE RETREAT
          </h1>
        </a>

        <ul className="flex items-stretch justify-between w-[368px] gap-5 mr-[111px] pt-6 max-md:justify-center max-md:hidden">
          {navLinks.map((item: NavLink) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="text-gray-700 text-sm font-light justify-between leading-7 whitespace-nowrap"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <Button
          onClick={toggleMenu}
          variant="ghost"
          size="icon"
          className="hidden  max-md:block"
        >
          <Menu />
        </Button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed left-0 top-0 w-full h-screen origin-top bg-green-900 text-white p-5"
          >
            <div className="flex  h-full flex-col">
              <div className="flex justify-between">
                <h1 className="text-lg text-white">COTTAGE RETREAT</h1>
                <Button
                  variant={"green"}
                  size={"icon"}
                  className="cursor-pointer  text-md text-white"
                  onClick={toggleMenu}
                >
                  <X />
                </Button>
              </div>
              <motion.div
                variants={containerVars}
                initial="initial"
                animate="open"
                exit="initial"
                className="flex flex-col h-full justify-center  items-center gap-4 "
              >
                {navLinks.map((link, index) => (
                  <div className="overflow-hidden" key={index}>
                    <MobileNavLink title={link.label} href={link.href} />
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default PageHeader;
