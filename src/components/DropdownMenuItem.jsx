import { Menu } from "@headlessui/react"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}
export default function DropdownMenuItem({ href, children }) {
  return (
    <Menu.Item>
      {({ active }) => (
        <a
          href={`#${href}`}
          className={classNames(
            active ? "bg-zinc-700" : "",
            "block px-4 py-2 text-sm"
          )}
          onClick={() => {
            const ref = document.getElementById(href)
            if (ref) {
              window.scrollTo({ behavior: "smooth", top: ref.offsetTop })
            }
          }}
        >
          {children}
        </a>
      )}
    </Menu.Item>
  )
}
