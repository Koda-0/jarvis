import { useEffect } from 'react';
import Projects from '../components/sections/Projects';

export default function ProjectsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Projects | Sabri';
  }, []);
  return <Projects />;
}
