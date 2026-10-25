import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero__container">
        <div className="hero__content">
          <span className="hero__eyebrow">
            SMART CONFERENCE PLANNING
          </span>

          <h1>
            Plan your event.
            <span>Own your budget.</span>
          </h1>

          <p>
            Confera brings venues, catering, equipment and
            event costs together in one simple planning
            experience.
          </p>

          <div className="hero__actions">
            <a href="#planner" className="hero__primary">
              Start Planning
              <span>→</span>
            </a>

            <a href="#features" className="hero__secondary">
              Explore Features
            </a>
          </div>

          <div className="hero__trust">
            <div className="hero__avatars">
              <span>✓</span>
              <span>✓</span>
              <span>✓</span>
            </div>

            <p>
              Plan confidently with a clear view of
              your event costs.
            </p>
          </div>
        </div>

        <div className="hero__visual">
          <div className="dashboard-card">
            <div className="dashboard-card__top">
              <div>
                <span>YOUR EVENT</span>
                <h3>Tech Summit 2026</h3>
              </div>

              <span className="dashboard-card__status">
                Planning
              </span>
            </div>

            <div className="dashboard-card__stats">
              <div>
                <span>ATTENDEES</span>
                <strong>250</strong>
              </div>

              <div>
                <span>EVENT DATE</span>
                <strong>15 Oct</strong>
              </div>
            </div>

            <div className="budget-card">
              <div className="budget-card__header">
                <span>ESTIMATED BUDGET</span>
                <span>68%</span>
              </div>

              <strong>R65,450</strong>

              <div className="budget-card__bar">
                <span />
              </div>

              <small>
                R14,550 remaining from R80,000 budget
              </small>
            </div>

            <div className="dashboard-card__items">
              <div>
                <span className="item-icon">🏢</span>

                <div>
                  <strong>Venue</strong>
                  <small>Grand Conference Hall</small>
                </div>

                <b>R18,000</b>
              </div>

              <div>
                <span className="item-icon">🍽️</span>

                <div>
                  <strong>Catering</strong>
                  <small>250 attendees</small>
                </div>

                <b>R46,250</b>
              </div>

              <div>
                <span className="item-icon">🎤</span>

                <div>
                  <strong>Equipment</strong>
                  <small>Audio & visual</small>
                </div>

                <b>R1,200</b>
              </div>
            </div>
          </div>

          <div className="floating-card floating-card--top">
            <span>Budget status</span>
            <strong>On track ✓</strong>
          </div>

          <div className="floating-card floating-card--bottom">
            <span>Cost per attendee</span>
            <strong>R261.80</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;