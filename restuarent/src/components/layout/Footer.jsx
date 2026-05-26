import { FiInstagram, FiMapPin, FiPhone } from 'react-icons/fi'
import PageContainer from './PageContainer'
import { navigation } from '../../data/navigation'
import { RESTAURANT } from '../../utils/constants'

function Footer() {
  return (
    <footer className="footer" id="contact">
      <PageContainer className="footer__inner">
        <div>
          <a className="footer__brand" href="#home">
            <span>Atelier</span>
            <small>Nocturne</small>
          </a>
          <p>{RESTAURANT.tagline} for intimate evenings, composed courses, and quiet celebration.</p>
        </div>

        <nav aria-label="Footer navigation">
          {navigation.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <address>
          <span>
            <FiMapPin aria-hidden="true" /> {RESTAURANT.address}
          </span>
          <a href={`tel:${RESTAURANT.phone.replace(/[^\d+]/g, '')}`}>
            <FiPhone aria-hidden="true" /> {RESTAURANT.phone}
          </a>
          <a href={`mailto:${RESTAURANT.email}`}>{RESTAURANT.email}</a>
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
            <FiInstagram aria-hidden="true" /> Instagram
          </a>
        </address>

        <div className="footer__hours">
          {RESTAURANT.hours.map((hour) => (
            <span key={hour}>{hour}</span>
          ))}
        </div>
      </PageContainer>
    </footer>
  )
}

export default Footer
