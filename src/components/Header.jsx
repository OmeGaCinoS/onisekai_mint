import { useState } from "react"
import arrowIcon from "../assets/icons/arrow-down.png"
import hamBurger from "../assets/icons/bar.png"
import discordIcon from "../assets/icons/discord.png"
import instagramIcon from "../assets/icons/instagram.png"
import twitterIcon from "../assets/icons/twitterIcon.png"
import logo from "../assets/images/main_logo.png"
import Sidebar from "./Sidebar"
import { Connect } from "../utility/Connect"

const links = ["home", "About Us", "Gallery"]

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <div className="fixed top-0 !z-50 hidden w-full font-bebas-neue md:block">
        <div className="mx-auto flex w-[92%] max-w-7xl flex-col items-center">
          <div className="w-[150px] sm:w-[300px]">
            <img src={logo} alt="dnisekai" className="w-full object-contain" />
          </div>
          <div className="font_italic flex items-center text-lg font-semibold italic text-light-white">
            <HeaderLinkBtn>
              <a href="#">home</a>
            </HeaderLinkBtn>
            <HeaderLinkBtn>
              <a href="#">about us</a>
            </HeaderLinkBtn>
            <HeaderLinkBtn>
              <a href="#">gallery</a>
            </HeaderLinkBtn>
            <HeaderLinkBtn>
              <a href="#" className="mx-1">
                <img src={twitterIcon} alt="twitter" />
              </a>
              <a href="#" className="mx-1">
                <img src={instagramIcon} alt="twitter" />
              </a>
              <a href="#" className="mx-1">
                <img src={discordIcon} alt="twitter" />
              </a>
              <a href="#" className="mx-1">
                <img src={arrowIcon} alt="twitter" />
              </a>
            </HeaderLinkBtn>
            {/* <HeaderLinkBtn>
              <button className="flex items-end border-0 bg-transparent font-bebas-neue italic text-light-white">
                <h2>Connect</h2>
                <span className="mx-1 text-base">your</span>
                <h2>wallet</h2>
              </button>
            </HeaderLinkBtn> */}
            {/* <HeaderLinkBtn> */}
            <Connect />
            {/* </HeaderLinkBtn> */}
          </div>
        </div>
      </div>
      {/* mobile header */}
      <div className="fixed top-0 z-50 flex h-28 w-full items-center justify-between pr-4 sm:px-8 md:hidden">
        <img src={logo} alt="logo" className="w-[150px]" />
        <HeaderLinkBtn onClick={() => setIsOpen(true)}>
          <img src={hamBurger} alt="ham burger" className="w-[40px]" />
        </HeaderLinkBtn>
        {/* mobile */}
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} links={links} />
      </div>
    </>
  )
}

const HeaderLinkBtn = ({ children, className, onClick }) => {
  return (
    <div
      className={`headerLinkBtn flex w-14 items-center justify-center rounded-md bg-brand-gray/80 p-2 sm:w-auto md:mx-[10px] md:h-[33px] md:py-0 md:px-4 ${className ? className : ""
        }`}
      onClick={() => onClick?.()}
    >
      {children}
    </div>
  )
}

export default Header
