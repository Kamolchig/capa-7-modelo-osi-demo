import ParticleField from './components/ParticleField'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BridgeConcept from './components/BridgeConcept'
import OsiOverview from './components/OsiOverview'
import Layer7DeepDive from './components/Layer7DeepDive'
import StatusCodesSection from './components/StatusCodesSection'
import HeadersPayloadSection from './components/HeadersPayloadSection'
import SecuritySection from './components/SecuritySection'
import DiagnosticsSection from './components/DiagnosticsSection'
import DemoSection from './components/DemoSection'
import FooterSection from './components/FooterSection'

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <ParticleField />
      <div className="bg-grid pointer-events-none fixed inset-0 -z-10" />
      <Navbar />
      <main className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <Hero />
        <OsiOverview />
        <BridgeConcept />
        <Layer7DeepDive />
        <StatusCodesSection />
        <HeadersPayloadSection />
        <SecuritySection />
        <DiagnosticsSection />
        <DemoSection />
        <FooterSection />
      </main>
    </div>
  )
}
