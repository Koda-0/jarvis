import { useEffect } from 'react';
import Blogs from '../components/sections/Blogs';

export default function BlogsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Blog | Sabri';
  }, []);
  return (
    <div className="pt-20 bg-dark-950 min-h-screen">
      <Blogs />
    </div>
  );
}
