import { FaTimes } from 'react-icons/fa'
import Wrapper from '../assets/wrappers/SmallSidebar'
import { useDashboardContext } from '../pages/DashboardLayout'
import { Logo } from './index'
import NavLinks from './NavLinks'

function SmallSidebar() {
  const { showSidebar, toggleSidebar } = useDashboardContext()

  return (
    <Wrapper>
      <div className={showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'}>
        <div className='content'>
          <button type='button' className='close-btn' onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  )
}
export default SmallSidebar
