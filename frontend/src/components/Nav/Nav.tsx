import { FC } from 'react'
import classNames from 'classnames'
import useScroll from 'finpok/hooks/useScroll'
import NavAuthButtons from './NavAuthButtons'
import Button from '../Shared/Button'
import { Link } from 'react-router-dom'
import NavLink from './NavLink'
import { useUiDispatch, useUiState } from 'finpok/store/ui/UiProvider'
import useBlockScroll from 'finpok/hooks/useBlockScroll'
import useMediaQuery from 'finpok/hooks/useMediaQuery'
import { Suitcase2 } from '@styled-icons/remix-line/Suitcase2'
import { InfoSquare } from '@styled-icons/boxicons-regular/InfoSquare'
import { PermContactCalendar } from '@styled-icons/material-outlined/PermContactCalendar'

type NavProps = {
  showOnScroll?: boolean
}

const Nav: FC<NavProps> = ({ showOnScroll = false }) => {
  // actions
  const { isMobileMenuOpen } = useUiState()
  const { toggleMobileMenu } = useUiDispatch()

  // computed
  const isMobile = useMediaQuery()
  const { scrollingUp } = useScroll()

  useBlockScroll(isMobileMenuOpen)

  return (
    // NavLayout
    <nav
      className={classNames(
        'fixed navbar z-40 shadow-lg bg-neutral text-neutral-content w-screen flex justify-center top-0 left-0 right-0',
        showOnScroll && scrollingUp ? 'fixed animate-nav' : 'absolute'
      )}
    >
      {/* NavContent */}
      <div className="w-full max-w-[1200px] flex justify-between items-center">
        <Link to="/" className="navbar-start ml-4 flex-1 text-lg font-bold z-20">
          Finpok
        </Link>

        {/* NavMenu */}
        <div
          className={classNames(
            !isMobile || (isMobile && isMobileMenuOpen)
              ? 'animate-navMobileMenu fixed left-0 right-0 top-0 h-screen flex flex-col bg-neutral justify-between p-4 md:static md:h-12 md:z-40 pt-20 md:pt-0 md:flex-row md:justify-between'
              : 'hidden'
          )}
        >
          {/* NavLinks */}
          <div
            className="animate-navMobileLinks flex flex-col justify-between items-start md:flex-row"
            onClick={() => toggleMobileMenu()}
          >
            <NavLink to="portfolio" icon={<Suitcase2 size="24" />}>
              Portfolio
            </NavLink>
            <NavLink to="about" icon={<InfoSquare size="24" />}>
              About
            </NavLink>
            <NavLink to="contact" icon={<PermContactCalendar size="24" />}>
              Contact
            </NavLink>
          </div>

          {isMobile && <NavAuthButtons />}
        </div>

        {!isMobile && <NavAuthButtons />}

        {/* NavMobileButtons */}
        <div className="navbar-end mr-4 w-full flex md:hidden">
          <Button name="search-btn" className="btn btn-square btn-ghost w-auto h-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-6 h-6 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </Button>
          <Button
            name="menu-open-close-btn"
            className="btn btn-square btn-ghost w-auto ml-4 h-auto z-50"
            onClick={() => toggleMobileMenu()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-6 h-6 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </Button>
        </div>
      </div>
    </nav>
  )
}

export default Nav
