import "./Features.css";

const features = [
  {
    number: "01",
    icon: "📋",
    title: "Build your event",
    description:
      "Start with the basics. Set your event name, date, attendee count and requirements in one place.",
  },
  {
    number: "02",
    icon: "✨",
    title: "Customize everything",
    description:
      "Choose your venue, catering and audio-visual equipment to create an event that fits your needs.",
  },
  {
    number: "03",
    icon: "📊",
    title: "Control your budget",
    description:
      "See your costs update as you plan, understand your spending and keep your event within budget.",
  },
];

function Features() {
  return (
    <section className="features" id="features">
      <div className="features__container">
        <div className="features__heading">
          <div>
            <span className="features__eyebrow">
              HOW CONFERA WORKS
            </span>

            <h2>
              From idea to event,
              <span>without the guesswork.</span>
            </h2>
          </div>

          <p>
            Confera gives you a simple way to build your
            event while keeping every important decision
            and cost in view.
          </p>
        </div>

        <div className="features__grid">
          {features.map((feature) => (
            <article
              className="feature-card"
              key={feature.number}
            >
              <div className="feature-card__top">
                <span className="feature-card__number">
                  {feature.number}
                </span>

                <span className="feature-card__icon">
                  {feature.icon}
                </span>
              </div>

              <h3>{feature.title}</h3>

              <p>{feature.description}</p>

              <span className="feature-card__arrow">
                →
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;