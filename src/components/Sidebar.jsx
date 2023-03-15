import arrowIcon from "../assets/icons/arrow-down.png"
import discordIcon from "../assets/icons/discord.png"
import instagramIcon from "../assets/icons/instagram.png"
import twitterIcon from "../assets/icons/twitterIcon.png"
import logo from "../assets/images/main_logo.png"

const Sidebar = ({ isOpen, setIsOpen, links }) => {
  return (
    <div
      className={`fixed top-0 left-0 z-50 bg-white lg:hidden ${
        isOpen ? "hide-scroll" : "pointer-events-none"
      }`}
    >
      <div
        className={`fixed inset-0 transition-all ${
          isOpen ? "bg-black/40" : "pointer-events-none bg-black/0"
        }`}
        onClick={() => setIsOpen(false)}
      />
      <div className="fixed z-20 flex">
        <div
          className={`${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } relative flex h-screen w-80 flex-col justify-start gap-5 overflow-y-auto bg-[#191919] pl-6 pb-12 shadow-xl transition-all duration-300`}
        >
          <div
            className="my-4 text-center text-4xl font-black uppercase"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" })
              setIsOpen(false)
            }}
          >
            <img src={logo} alt="logo" className="w-[150px]" />
          </div>
          <h3 className="text-lg ">Navigations</h3>
          {links.map((link, index) => {
            return (
              // TODO: close dialog
              <a
                href="#"
                className={
                  "headerLinkBtn w-[90%]  cursor-pointer rounded bg-brand-gray/80 p-2 font-bold uppercase transition-all hover:bg-brand-gray"
                }
                key={index}
                onClick={() => setIsOpen(false)}
              >
                {link}
              </a>
            )
          })}
          <h3 className="mt-4 text-lg">Social Links</h3>
          <div
            href="#"
            className={`headerLinkBtn w-[90%] rounded-md bg-brand-gray/80 p-2 py-3`}
            onClick={() => setIsOpen(false)}
          >
            <div className="mx-auto flex max-w-[210px] items-center justify-between">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
