import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const socialLinks = [
  {
    name: "Instagram",
    icon: FaInstagram,
    url: "https://www.instagram.com/balenciaga/",
  },
  {
    name: "Twitter",
    icon: FaTwitter,
    url: "https://twitter.com/balenciaga",
  },
  {
    name: "YouTube",
    icon: FaYoutube,
    url: "https://www.youtube.com/c/balenciaga",
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background relative z-10">
      <div className="container mx-auto px-6 lg:px-8 py-16">
        <div className="flex flex-col items-center justify-center gap-8">
          {/* Social Media Links */}
          <div className="flex items-center space-x-6">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                className="text-foreground-muted hover:text-primary transition-colors duration-300"
              >
                <link.icon className="w-6 h-6" />
              </a>
            ))}
          </div>

          {/* Copyright and Brand Statement */}
          <div className="text-center text-xs text-foreground-muted tracking-widest">
            <p>© {new Date().getFullYear()} BALENCIAGA</p>
            <p className="mt-2">A UNIVERSE OF CREATIVE EXPRESSION</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
