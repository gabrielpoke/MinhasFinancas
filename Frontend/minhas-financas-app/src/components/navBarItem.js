import React from 'react'

function NavbarItem(promps) {
  return (
    <li className="nav-item">
      <a className="nav-link" href={promps.href}>
        {promps.label}
      </a>
    </li>
  )
}

export default NavbarItem
