import { LanguageProvider } from './context/LanguageContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import ChoosePath from './components/ChoosePath'
import Projects from './components/Projects'
import WhyWorkWithMe from './components/WhyWorkWithMe'
import Contact from './components/Contact'

export default function App() {
  return (
    <LanguageProvider>
      <div className="bg-white overflow-x-hidden">
        <div className="max-w-[430px] mx-auto relative">
          <Navbar />
          <Hero />
          <About />
          <ChoosePath />
          <Projects />
          <WhyWorkWithMe />
          <Contact />
        </div>
      </div>
    </LanguageProvider>
  )
}
