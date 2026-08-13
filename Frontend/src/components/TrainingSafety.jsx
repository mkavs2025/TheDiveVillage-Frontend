import SectionReveal, { StaggerGrid, StaggerItem } from './SectionReveal'

const SAFETY_PROMISES = [
  {
    title: 'Globally Certified Instructors',
    desc: 'Professional guides trained to handle any situation with calm and expertise.',
  },
  {
    title: 'Personalized Training',
    desc: 'Instruction tailored to your skill level, whether you are a beginner or a pro.',
  },
  {
    title: 'High-Quality Equipment',
    desc: 'Top-tier dive gear that is regularly serviced and rigorously checked.',
  },
  {
    title: 'Emergency-Ready Staff',
    desc: 'Rescue-trained professionals prepared for any scenario on the water.',
  },
]

export default function TrainingSafety() {
  return (
    <section className="relative py-16 sm:py-20 text-white pointer-events-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal className="mb-12 text-center">
          <h2 className="font-heading text-h2 font-extrabold">
            Confidence Beneath <em className="font-heading italic font-bold text-accent">Every Wave</em>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">
            At Dive Village, every adventure begins with safety. Our focus is on comfort, skill, and confidence for every participant.
          </p>
        </SectionReveal>

        <StaggerGrid className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SAFETY_PROMISES.map((promise) => (
            <StaggerItem key={promise.title}>
              <div className="h-full rounded-card bg-black/30 backdrop-blur-lg border border-white/20 p-6 transition duration-hover hover:-translate-y-1 hover:bg-white/20">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white">
                  <CheckIcon />
                </div>
                <h3 className="font-heading text-lg font-bold">{promise.title}</h3>
                <p className="mt-2 text-sm text-white/70">{promise.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>

        <SectionReveal className="mt-12 text-center">
          <p className="font-heading text-lg font-bold text-accent">
            Because trust is the deepest dive of all.
          </p>
        </SectionReveal>
      </div>
    </section>
  )
}

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
