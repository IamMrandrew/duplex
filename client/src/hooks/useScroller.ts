// @flow
import { useState, useEffect } from 'react';

export const useScroller = ( id:string ) => {
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref) setRef(document.getElementById(id));
  }, []);

  const scrollToTop = () => {
    const elem = ref || document.getElementById(id);
    if (elem) return (elem.scrollTop = 0);
  };

  const scrollToBottom = () => {
    const elem = ref || document.getElementById(id);
    if (elem) return (elem.scrollTop = elem.scrollHeight - elem.clientHeight);
  };

  const scrollTo = (pos: number) => {
    const elem = ref || document.getElementById(id);
    if (elem) return (elem.scrollTop = pos);
  };

  return { scrollToTop, scrollTo, scrollToBottom, ref };
};
