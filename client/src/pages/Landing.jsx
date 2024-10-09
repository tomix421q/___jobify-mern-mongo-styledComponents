import Wrapper from '../assets/wrappers/LandingPage'
import main from '../assets/images/main.svg'
import { Link } from 'react-router-dom'
import { Logo } from '../components'

function Landing() {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className='container page'>
        <div className='info'>
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            Cliche brunch la croix, bicycle rights grailed messenger bag +1 franzen. Af sartorial viral four dollar toast, bicycle
            rights vibecession 90's vinyl raw denim sustainable glossier distillery pour-over grailed austin. Distillery pitchfork
            vape, tofu cloud bread grailed PBR&B forage cornhole pug hashtag street art gorpcore. Bushwick direct trade
            farm-to-table disrupt gochujang. Pinterest plaid health goth ethical meditation gochujang jean shorts viral tofu tonx
            fam cred.
          </p>
          <Link to={'/register'} className='btn register-link'>
            Register
          </Link>
          <Link to={'/login'} className='btn '>
            Login / Demo User
          </Link>
        </div>
        <img src={main} alt='job hunt' className='img main-img' />
      </div>
    </Wrapper>
  )
}

export default Landing
