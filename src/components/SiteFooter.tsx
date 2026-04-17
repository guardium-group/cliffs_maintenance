import Image from "next/image";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

const socials = [
  { href: "https://www.facebook.com/guardiumgroup",    Icon: Facebook,  label: "Facebook"  },
  { href: "https://www.instagram.com/guardium.group/", Icon: Instagram, label: "Instagram" },
  { href: "https://x.com/group_guardium",              Icon: Twitter,   label: "Twitter"   },
];

export function SiteFooter() {
  return (
    <footer className="bg-[#511010] relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative">
        {/* Contact strip */}
        <div className="border-b border-white/10">
          <div className="container mx-auto px-4 py-5 max-w-7xl">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 md:gap-10">
              <a
                href="tel:+17804511555"
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm"
              >
                <Phone className="h-4 w-4 shrink-0" />
                +1 (780) 451-1555
              </a>
              <a
                href="mailto:dispatch@cliffstowing.com"
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm"
              >
                <Mail className="h-4 w-4 shrink-0" />
                dispatch@cliffstowing.com
              </a>
              <span className="flex items-center gap-2 text-white/60 text-sm">
                <MapPin className="h-4 w-4 shrink-0" />
                4918 Roper Rd NW Suite 206, Edmonton, AB
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 bg-black/20">
          <div className="container mx-auto px-4 py-4 max-w-7xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <Image
                src="/cliffs_logo.png"
                alt="Cliff's Towing"
                width={100}
                height={28}
                className="h-7 w-auto object-contain brightness-0 invert opacity-60"
              />
              <div className="flex items-center gap-2">
                {socials.map(({ href, Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-white/60 hover:bg-white hover:text-[#511010] transition-all duration-200"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
              <p className="text-xs text-white/40">
                &copy; {new Date().getFullYear()} Cliff&apos;s Towing Inc. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
