
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Ignition from '../../scenes/Ignition'
import Origin from '../../scenes/Origin'
import Machines from '../../scenes/Machines'
import Lab from '../../scenes/Lab'
import Contact from '../../scenes/Contact'

gsap.registerPlugin(ScrollTrigger)


const SceneOverlay = () => {
  return (
    <>
      <Ignition />
      <Origin />
      <Machines />
      <Lab />
      <Contact />
    </>
  )
}

export default SceneOverlay
