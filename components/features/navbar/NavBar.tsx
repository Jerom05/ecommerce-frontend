import React from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

import Search from "./SearcBar";

const Navbar: React.FC = async () => {
  return (
    <nav className="sticky top-0 z-50 flex flex-col sm:flex-row sm:items-center justify-between p-4 shadow-md bg-white dark:bg-gray-800">
      <div className="text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-0">
        <Link href="/">Rigel</Link>
      </div>

      <Search />

      <div className="flex items-center justify-end">
        <Link
          href="/cart"
          className="flex items-center gap-1 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
        >
          <ShoppingCart className="w-5 h-5" />
          <span className="hidden sm:inline">Cart</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
