import { Link, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";

export default function AppHeader() {
  const location = useLocation();

  const navItems = [
    { name: "My Profile", href: "/profile" },
    { name: "Matches", href: "/matches" },
    { name: "Credits", href: "/credits" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
      <div className="h-16 max-w-6xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="Rentle Match"
            className="h-8 w-auto"
          />
          <span className="font-serif text-xl font-bold text-neutral-800">
            Rentle
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-neutral-900",
                location.pathname === item.href
                  ? "text-neutral-900"
                  : "text-neutral-500"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Profile button (placeholder) */}
        <Link
          to="/profile"
          className="rounded-full bg-neutral-200 hover:bg-neutral-300 transition-colors h-8 w-8 flex items-center justify-center text-neutral-700"
        >
          <span className="sr-only">Profile</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5.121 17.804A9 9 0 1118.364 4.56M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </Link>
      </div>
    </header>
  );
}
