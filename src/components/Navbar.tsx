import { ReactComponent as TwitterIcon } from "../assets/svg/twitter.svg";
import { ReactComponent as TelegramIcon } from "../assets/svg/telegram.svg";
import { ReactComponent as DiscordIcon } from "../assets/svg/discord.svg";
import { ReactComponent as YoutubeIcon } from "../assets/svg/youtube.svg";
import { ReactComponent as GithubIcon } from "../assets/svg/github.svg";
import { ReactComponent as ArrowDownIcon } from "../assets/svg/arrow-down.svg";
import { useTranslation } from "react-i18next";
import { languages } from "../i18n";

const socialLinks = [
  {
    name: "Telegram",
    href: "https://t.me/CCHAINCOIN",
    icon: <TelegramIcon className="h-6 w-6" />,
  },
  {
    name: "Github",
    href: "https://github.com/CCHAINest",
    icon: <GithubIcon className="h-6 w-6" />,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/CrossChain",
    icon: <TwitterIcon className="h-6 w-6" />,
  },
  {
    name: "Youtube",
    href: "https://www.youtube.com/@CrossChain",
    icon: <YoutubeIcon className="h-6 w-6" />,
  },
  {
    name: "Discord",
    href: "https://discord.com/invite/8ERptThDZC",
    icon: <DiscordIcon className="h-6 w-6" />,
  },
];

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const navigationLinks = [
    {
      name: t("home"),
      href: "https://CrossChain.com/",
    },

  ];
  return (
    <div className="container px-4 lg:px-0">
      <div className="flex items-center justify-between py-6">
        <div className="flex items-center lg:gap-6">
          <nav className="hidden lg:block">
            <ul className="-mx-3 flex divide-x-2 divide-gray-400">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="0 block px-3 text-lg font-semibold leading-none text-gray-600 transition-opacity duration-200 hover:text-primary"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center justify-center gap-4 text-[#1e3050]">
            {socialLinks.map((link, key) => (
              <a
                key={`social-link-${key}`}
                href={link.href}
                target="_blank"
                className="inline-block w-auto"
              >
                {link.icon}
              </a>
            ))}
          </div>
      <div className="group relative">
            <button className="flex items-center gap-2 rounded-lg border border-primary py-2 px-4 text-sm uppercase transition-all duration-300 hover:bg-primary hover:text-white">
              <span>{i18n.language}</span>
              <ArrowDownIcon className="h-3 w-3" />
            </button>
            <div className="absolute z-30 hidden pt-2 group-hover:block">
              <div className=" w-44 divide-y divide-gray-100 rounded-lg bg-white shadow ">
                <ul className="py-2 text-sm text-gray-700">
                  {languages.map((lang) => (
                    <li
                      key={lang.code}
                      onClick={() => i18n.changeLanguage(lang.code)}
                    >
                      <span className="block cursor-pointer px-4 py-2 hover:bg-primary hover:text-white">
                        {lang.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
