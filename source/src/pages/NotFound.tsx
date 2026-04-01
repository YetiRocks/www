import { useState, useEffect } from 'react'
import { Link } from '@tanstack/react-router'

const facts = [
  'Samoyeds were bred by the Samoyede people of Siberia to herd reindeer, pull sleds, and keep their owners warm by sleeping on top of them.',
  'A Samoyed\'s mouth curves upward at the corners, giving them a permanent smile. This is called the "Sammy smile" and it actually serves a purpose — it prevents drooling, which would form icicles in freezing temperatures.',
  'Samoyed fur is so warm and soft that it can be spun into yarn and knitted into clothing. It\'s sometimes called "Samoyed wool" and is as warm as actual sheep\'s wool.',
  'Samoyeds were part of Roald Amundsen\'s expedition to the South Pole in 1911. A Samoyed named Etah was the lead dog on the first team to reach the South Pole.',
  'Despite being Arctic dogs, Samoyeds are surprisingly adaptable and can live comfortably in warmer climates — their double coat actually insulates against heat as well as cold.',
  'Samoyeds are one of the 14 ancient dog breeds, meaning their DNA is closest to wolves among all domestic dogs. They\'ve been companions to humans for over 3,000 years.',
  'A group of Samoyeds is sometimes called a "cloud" because when they lie down together, they look like a fluffy white cloud on the ground.',
  'Samoyeds have black lips, nose, and eye rims — the dark pigmentation protects against sunburn and snow glare in Arctic conditions.',
  'The Samoyed\'s tail curls over their back and can be used as a face warmer. They\'ll curl up and tuck their nose under their tail to stay warm while sleeping in snow.',
  'Samoyeds are known as "velcro dogs" because they form extremely strong bonds with their families and want to be involved in everything. Leaving them alone too long makes them dramatically sad.',
  'A Samoyed named Moustan of Doginton was the first Best in Show winner at Crufts in 1929, back when the competition was only two years old.',
  'Samoyeds can pull up to 1.5 times their own body weight on a sled. A team of six Samoyeds can haul over 1,000 pounds across frozen terrain.',
  'Samoyed puppies are born with their ears folded down. The ears gradually stand up over the first few months, giving them their alert, fox-like appearance.',
  'In their native Siberia, Samoyeds were considered family members, not just working dogs. They slept inside the chooms (tents) with their human families for mutual warmth.',
  'Samoyeds have a double coat that sheds heavily twice a year — an event owners call "blowing coat." During this time, you can literally pull handfuls of soft undercoat off them.',
  'The Samoyed breed nearly went extinct in England in the early 1900s. The modern breed descends from just 12 dogs brought to England by Arctic explorers.',
  'Samoyeds are one of the few breeds that genuinely enjoy cold weather baths. Many owners report their Samoyeds rolling in snow immediately after being towel-dried.',
  'A Samoyed\'s bark is surprisingly deep for their size. They\'re also known for "talking" — a distinctive woo-woo-woo vocalization they use to communicate with their owners.',
  'Samoyeds have an incredible sense of direction. Sled teams in the Arctic were often trusted to find the way home through blizzards when humans couldn\'t see the trail.',
  'The white color of the Samoyed wasn\'t always dominant. Early Samoyeds came in white, cream, biscuit, and even black. Selective breeding in England favored the all-white coat.',
]

export default function NotFound() {
  const [fact, setFact] = useState('')
  const [factIndex, setFactIndex] = useState(-1)

  const pickFact = () => {
    let next: number
    do {
      next = Math.floor(Math.random() * facts.length)
    } while (next === factIndex && facts.length > 1)
    setFactIndex(next)
    setFact(facts[next])
  }

  useEffect(() => { pickFact() }, [])

  return (
    <div className="container" style={{ textAlign: 'center' }}>
      <div className="page-header" style={{ paddingBottom: 0 }}>
        <img
          src={`${import.meta.env.BASE_URL}favicon.png`}
          alt="Yeti"
          style={{ width: 120, height: 120, margin: '0 auto var(--space-6)', display: 'block', opacity: 0.8 }}
        />
        <h1 className="page-title">Uh oh, we couldn't find that page.</h1>
        <p className="page-subtitle" style={{ maxWidth: 500 }}>
          But here's a fun fact about Samoyeds:
        </p>
      </div>

      <div className="section" style={{ borderTop: 'none', maxWidth: 600, margin: '0 auto' }}>
        <p className="section-desc" style={{ fontSize: 'var(--font-size-lg)', lineHeight: 1.8, maxWidth: 'none' }}>
          "{fact}"
        </p>
        <div style={{ marginTop: 'var(--space-6)', display: 'flex', gap: 'var(--space-4)', justifyContent: 'center' }}>
          <button className="btn" onClick={pickFact}>Another fact</button>
          <Link to="/" className="btn btn-primary">Go home</Link>
        </div>
      </div>
    </div>
  )
}
