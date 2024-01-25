import './App.css';
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

function App() {
  const app = useRef(null);
  const tl = useRef();

  const handleClick = (e) => {
    gsap.to(e.target, { rotation: 50, yoyo: true, repeat: 1 });
  };

  const onEnter = (e) => {
    gsap.to(e.target, { scale: 1.2 });
  };

  const onLeave = (e) => {
    gsap.to(e.target, { scale: 1 });
  };

  useEffect(() => {
    tl.current = gsap.timeline({ paused: true });
  
    // Animation pour .square et .square2
    tl.current.to(".square", { rotate: 360, duration: 2 }, 0)
              .to(".square2", { x: 200, duration: 2 }, 0);
  
    // Animation des lettres
    tl.current.fromTo(".span-container span", 
      { opacity: 0, y: -40 },
      {
        duration: 0.8,
        opacity: 1,
        y: 0,
        ease: "bounce.out",
        stagger: 0.1
      },
      0 // Démarre en même temps que les autres animations
    );
  
    // Animation du trait
    const totalDuration = 0.8 + (0.1 * 6);
    tl.current.fromTo(".underline", 
      { width: 0 },
      {
        duration: totalDuration,
        width: "100%",
        ease: "linear"
      },
      0 // Démarre en même temps que les autres animations
    );
  
    // Démarrer la timeline
    tl.current.play();
  
    return () => {
      // Nettoyer la timeline à la désactivation du composant
      tl.current.kill();
    };
  }, []);

  return (
    <>
      <div className='span-container'>
        <span>w</span>
        <span>e</span>
        <span>l</span>
        <span>c</span>
        <span>o</span>
        <span>m</span>
        <span>e</span>
        <div className='underline'></div>
      </div>

      <div ref={app}>
        <div className="square" onClick={handleClick}>
          Hello World
        </div>
        <div className='square2' onMouseEnter={onEnter} onMouseLeave={onLeave}>
          Hello world 2
        </div>
      </div>

      <div className='square3' onClick={handleClick} onMouseEnter={onEnter} onMouseLeave={onLeave}>
        Hello world 3
      </div>
    </>
  );
}

export default App;
