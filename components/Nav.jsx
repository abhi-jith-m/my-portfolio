'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { name: "Home", path: "/" },
  { name: "Resume", path: "/Resume" },
  { name: "Skills", path: "/Skill" },
  { name: "Project", path: "/Project" },
  { name: "Contact", path: "/Contact" },
];

const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className="navbar flex gap-8 backdrop-blur-sm bg-black/90 p-4 rounded-xl">
      {links.map((link, index) => {
        const isActive = pathname === link.path;
        return (
          <Link
            key={index}
            href={link.path}
            className={`capitalize font-medium transition-colors duration-300 relative group
              ${isActive ? 'text-green-400' : 'text-white'}
              hover:text-green-400 active:text-[#00e187]`}
          >
            {link.name}
            {/* Underline */}
            <span
              className={`absolute left-0 -bottom-1 w-full h-0.5 bg-green-400 transition-all duration-300
                ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
              `}
            ></span>
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;
