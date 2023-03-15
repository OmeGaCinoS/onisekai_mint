import footerLogo from "../assets/images/logo.png"

const Footer = () => {
  return (
    <div className="relative z-10 bg-[#d1cecb] py-5 font-helvetica text-xs sm:px-5">
      <div className="mx-auto flex max-w-6xl flex-col justify-between px-7 sm:flex-row">
        <div className="sm:max-w-lg sm:font-bold">
          <img src={footerLogo} alt="" className="-ml-2 h-10 w-auto sm:h-14" />
          <p className="mt-1 text-[#555554]">
            Our ambition is to build OnisekaiTM into a community-centric
            powerhouse IP ( Intellectual Property ). To realise this, we will
            focus on technical advancement, brand activation and collaboration
            as well as position our creator and community at the heart of our
            ecosystem. This approach will set us beyond the traditional approach
            of a brand and further maximize the true use case of Web3.
            <br /> <br />
            <span className="font-bold">
              © 2022 Element 119, Inc. All Rights Reserved.
            </span>
          </p>
        </div>
        <div className="flex items-start font-semibold sm:justify-between">
          <div className="mt-1 text-xs font-normal sm:mt-0 sm:ml-12">
            <a href="#" className="my-3 block w-max text-[#555554]">
              {" "}
              LEGAL OVERVIEW
            </a>
            <a href="#" className="my-3 block w-max text-[#555554]">
              PRIVACY POLICY
            </a>
            <a href="#" className="my-3 block w-max text-[#555554]">
              TERMS & CONDITIONS
            </a>
            <a href="#" className="my-3 block w-max text-[#555554]">
              PRESS INFO
            </a>
          </div>
          <div className="mt-1 ml-6 text-xs font-normal sm:ml-12 sm:mt-0">
            <a href="#" className="my-3 block w-max text-[#555554]">
              {" "}
              INSTAGRAM
            </a>
            <a href="#" className="my-3 block w-max text-[#555554]">
              DISCORD
            </a>
            <a href="#" className="my-3 block w-max text-[#555554]">
              TWITTER
            </a>
            <a href="#" className="my-3 block w-max text-[#555554]">
              YOUTUBE
            </a>
            <a href="#" className="my-3 block w-max text-[#555554]">
              TIKTOK
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
