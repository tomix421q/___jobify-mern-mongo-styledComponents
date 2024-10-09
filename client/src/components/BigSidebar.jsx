import Wrapper from '../assets/wrappers/BigSidebar'
import NavLinks from './NavLinks'
import Logo from './Logo'
import { useDashboardContext } from '../pages/DashboardLayout'

function BigSidebar() {
  const { showSidebar } = useDashboardContext()

  return (
    <Wrapper>
      <div className={showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'}>
        <div className='content'>
          <header>
            <Logo />
          </header>
          <NavLinks isBigSidebar={true} />
        </div>
      </div>
    </Wrapper>
  )
}
export default BigSidebar
