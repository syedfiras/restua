import { useState } from 'react'
import PageContainer from '../layout/PageContainer'
import SectionWrapper from '../layout/SectionWrapper'
import GlassCard from '../ui/GlassCard'
import PremiumButton from '../ui/PremiumButton'
import Reveal from '../ui/Reveal'

function ReservationCTA() {
  const [status, setStatus] = useState('idle')

  const handleSubmit = (event) => {
    event.preventDefault()
    setStatus('loading')
    window.setTimeout(() => setStatus('success'), 650)
  }

  return (
    <SectionWrapper id="reservation" className="reservation-section">
      <PageContainer>
        <Reveal>
          <GlassCard className="reservation-panel">
            <div className="reservation-panel__intro">
              <p className="eyebrow">Reservations</p>
              <h2>Reserve the evening.</h2>
              <p>For tasting menus, celebrations, and private dining requests, our host team will confirm by email.</p>
            </div>

            <form className="reservation-form" onSubmit={handleSubmit} aria-describedby="reservation-status">
              <label>
                <span>Name</span>
                <input name="name" type="text" autoComplete="name" required />
              </label>
              <label>
                <span>Email</span>
                <input name="email" type="email" autoComplete="email" required />
              </label>
              <label>
                <span>Guests</span>
                <select name="guests" defaultValue="2" required>
                  {[1, 2, 3, 4, 5, 6].map((guest) => (
                    <option key={guest} value={guest}>
                      {guest}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span>Date</span>
                <input name="date" type="date" required />
              </label>
              <label>
                <span>Time</span>
                <input name="time" type="time" required />
              </label>
              <label className="reservation-form__note">
                <span>Optional note</span>
                <textarea name="note" rows="4" />
              </label>
              <PremiumButton as="button" type="submit" className="reservation-form__submit" disabled={status === 'loading'}>
                {status === 'loading' ? 'Sending Request' : 'Reserve Experience'}
              </PremiumButton>
              <p
                id="reservation-status"
                className={`reservation-form__status ${status === 'success' ? 'reservation-form__status--visible' : ''}`}
                aria-live="polite"
              >
                Your request has been received. Our host team will confirm by email.
              </p>
            </form>
          </GlassCard>
        </Reveal>
      </PageContainer>
    </SectionWrapper>
  )
}

export default ReservationCTA
