import React from 'react'

const CustomeLink = ({linkAddress, linkName}) => {
  return (
    <li className="nav-item">
    <a className="nav-link text-gray-900" aria-current="page" href={linkAddress} >{linkName}</a>
  </li>
  )
}

export default CustomeLink
