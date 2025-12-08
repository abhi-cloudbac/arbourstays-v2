import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import LogoSvg from './LogoSvg'
import ArbourLogo from './ArbourCompanyLogo.svg'

const LogoSvgLight = () => {
  return <Image src={ArbourLogo} alt="Arbour Company Logo" width={154} height={137} priority />
}

interface LogoProps {
  className?: string
}

const Logo: React.FC<LogoProps> = ({ className = 'w-22 sm:w-24' }) => {
  return (
    <Link href="/" className={`inline-block text-primary-600 focus:ring-0 focus:outline-hidden ${className}`}>
      <LogoSvgLight />
      {/* <LogoSvg /> */}
    </Link>
  )
}

export default Logo
