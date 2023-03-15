import { Menu, Transition } from "@headlessui/react"
import { Fragment } from "react"
import IoMenu from "../assets/icons/bar.png"
import DropdownMenuItem from "./DropdownMenuItem"

export default function DropdownMenu({ tags }) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button
          className="focus:ring-yellow bg- inline-flex justify-center rounded-md bg-brand-gray/80 px-2 py-2 text-sm  font-medium shadow-sm transition-all hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100"
          aria-label="menu"
        >
          <img src={IoMenu} alt="" className="h-5 w-5" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right  divide-zinc-700 rounded-md bg-zinc-800 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <div className="px-3 py-2 text-xs font-bold uppercase">
              Navigation
            </div>
            {tags.map((tag) => {
              return (
                <DropdownMenuItem key={tag} href={`${tag}`}>
                  {tag}
                </DropdownMenuItem>
              )
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
