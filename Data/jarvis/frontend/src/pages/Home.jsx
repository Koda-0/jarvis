import Hero     from '../components/sections/Hero';
import About    from '../components/sections/About';
import Services from '../components/sections/Services';
import Skills   from '../components/sections/Skills';
import Projects from '../components/sections/Projects';
import Blogs    from '../components/sections/Blogs';
import Contact  from '../components/sections/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Skills />
      <Projects limit={6} />
      <Blogs limit={3} />
      <Contact />
    </>
  );
}
