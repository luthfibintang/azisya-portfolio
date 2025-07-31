import './App.css'
import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap';
import {useGSAP} from '@gsap/react'
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import worksData from "./data/worksData"
import images from './assets/image';


import Lenis from 'lenis';

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

function App() {
  // const [isLoading, setIsLoading] = useState(true)
  const [hidePreloader, setHidePreloader] = useState(false);
  const [activeImage, setActiveImage] = useState(null);
  const [navbarScrolled, setNavbarScrolled] = useState(false);

  // Refs for preloader page & container
  const mainRef = useRef();
  const preloaderRef = useRef();

  // Refs for section 1
  const section1Ref = useRef();
  const menuRefs = useRef([]);
  const projectButtonRef = useRef(); 
  const bgTextRefs = useRef([]);

  // Refs for section 2
  const section2Ref = useRef();
  const aboutMeTitleRef = useRef();
  const aboutMeTextRef = useRef();
  const whatIDoTitleRef = useRef();
  const whatIDoTextRef = useRef();

  // Refs for section 3 (works)
  const section3Ref = useRef();
  const recentWorkRef = useRef();
  const linkContainer = useRef();
  const previewRef = useRef();

  // Refs for section 4 (contact)
  const footerRef = useRef();
  const footerText1Ref = useRef();
  const footerText2Ref = useRef();
  const footerButtonContainerRef = useRef();
  const socialButtonRefs = useRef([]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      smooth: true,
      smoothTouch: true
    });
    function raf(time){
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  })

  useEffect(() => {
    if(!hidePreloader){
      document.body.style.overflow="hidden";
    } else {
      document.body.style.overflow="auto";
    }
  })

  useEffect(() => {
    const handleScroll = () => {
      setNavbarScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  useGSAP(() => {

    const tl = gsap.timeline()

    // Preloader Animation
    tl.fromTo(".preloader-text1", 
      {opacity: 0},
      {opacity: 1, duration: 0.25, ease: "power2.out"}
    )

    tl.fromTo(".preloader-text1",
      {letterSpacing: "-0.1em"},
      {letterSpacing: "0em", duration: 0.8, ease:"power2.out"},
      "-=0.3"
    )

    tl.fromTo(".preloader-text2",
      {opacity: 0},
      {opacity: 1, duration: 0.25, ease: "power2.out"},
      "-=0.6"
    )

    tl.fromTo(".preloader-text2",
      {letterSpacing: "-0.1em"},
      {letterSpacing: "0em", duration: 0.8, ease:"power2.out"},
      "-=0.6"
    )

    tl.fromTo(".preloader-text3",
      {opacity: 0},
      {opacity: 1, duration: 0.25, ease: "power2.out"},
      "-=0.6"
    )

    tl.fromTo(".preloader-text3",
      {letterSpacing: "-0.1em"},
      {
        letterSpacing: "0em",
        duration: 0.8, 
        ease:"power2.out", 
        onStart: () => {
          window.scrollTo(0, 0);
          ScrollTrigger.refresh()
        }},
      "-=0.6"
    )

    // Animasi push sliding dari preload ke mainpage
    // Preloader page push ke kiri
    tl.to(preloaderRef.current, {
      x: "-100%",
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        setHidePreloader(true);
      }
    }, "+=0.5") 

    // Main page masuk dari kanan ke posisi normal
    tl.fromTo(mainRef.current, 
      { x: '100%' }, 
      { x: '0%', duration: 1, ease: "power2.inOut" },
      "<"
    )

    // Hero Title show Animation ("AZISYA LUHTFI BINTANG")
    const heroTitleSplit = new SplitText('.hero-title', { type: 'chars' });
    const heroTitleChars = heroTitleSplit.chars; 
    tl.fromTo(
      heroTitleChars,
      { opacity: 0, filter: "blur(5px)", }, 
      {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        filter: "blur(0px)",
        stagger: 0.04, 
      }
    );

    // Button show animation
    tl.fromTo(".btn-animation",
      {y: 10, opacity: 0, filter: "blur(2px)"},
      {y: 0, opacity: 1, filter:"blur(0px", duration: 0.8, ease: "power3.out"},
      "-=1.3"
    )

    tl.fromTo(
      bgTextRefs.current,
      { x: 0 },
      {
        x: (index) => (index % 2 === 0 ? "-10%" : "10%"),
        duration: 2,
        ease: "power2.out",
      },
      "-=2"
    )

    // Menu hover animation
    menuRefs.current.forEach((link) => {
      const underline = link.querySelector('.menu-underline')
      gsap.set(underline, {scaleX: 0})

      link.addEventListener("mouseenter", () => {
        gsap.to(underline, {
          scaleX: 1,
          duration: 0.3,
          ease: "power2.out",
          transformOrigin: "left"
        });
      });

      link.addEventListener("mouseleave", () => {
        gsap.to(underline, {
          scaleX: 0,
          duration: 0.3,
          ease: "power2.out",
          transformOrigin: "right",
        })
      });
    });

    // Project button hover animation
    const projectButton = projectButtonRef.current;
    const defaultText = projectButton.querySelector('.btn-text-default')
    const hoverText = projectButton.querySelector('.btn-text-hover')

    gsap.set(defaultText, {z: 0, opacity: 1, scale: 1})
    gsap.set(hoverText, {z: -20, opacity: 0, y: 28, scale: 1.2, filter: "blur(3px)"})

    projectButton.addEventListener("mouseenter", () => {
      gsap.to(projectButton, {
        backgroundColor: "#000000",
        color: "#ffffff",
        duration: 0.4,
        ease: "power3.inOut"
      });
      gsap.to(defaultText, {
        z: 20, 
        y: -28,
        opacity: 0,
        scale: "0.8",
        filter: "blur(3px)",
        duration: 0.4,
        ease: "power3.inOut"
      });
      gsap.to(hoverText, {
        z: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.4,
        ease: "power3.inOut"
      })
    })

    projectButton.addEventListener("mouseleave", () => {
      gsap.to(projectButton, {
        backgroundColor: "#ffffff",
        color: "#000000",
        duration: 0.4,
        ease: "power3.inOut"
      });
      gsap.to(defaultText, {
        z: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.4,
        ease: "power3.inOut"
      });
      gsap.to(hoverText, {
        z: -20,
        y: 28,
        opacity: 1,
        filter: "blur(3px)",
        scale: 1.2,
        duration: 0.4,
        ease: "power3.inOut"
      })
    })

    bgTextRefs.current.forEach((text, index) => {
      gsap.fromTo(
        text,
        {x: 0},
        {
          x: index % 2 === 0 ? "-30%" : "30%",
          ease: "none",
          scrollTrigger: {
            trigger: section1Ref.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 2.5,
          }
        }
      )
    })

    // Animations for text in about
    const aboutMeTitleSplit = new SplitText(aboutMeTitleRef.current, { type: 'chars' });

    gsap.fromTo(
      aboutMeTitleSplit.chars,
      { opacity: 0, filter: "blur(5px)" },
      {
        opacity: 1,
        filter: "blur(0px)",
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
           trigger: aboutMeTitleRef.current,
            start: 'top 90%',
            end: 'top 50%',
            scrub: true, 
        },
      }
    )
    
    const aboutMeTextSplit = new SplitText(aboutMeTextRef.current, { type: 'words' });

    gsap.fromTo(
      aboutMeTextSplit.words,
      {opacity: 0, filter: "blur(5px)"},
      {
        opacity: 1,
        filter: "blur(0px)",
        ease: "power2.out",
        stagger: 0.07,
        scrollTrigger: {
          trigger: aboutMeTextRef.current,
          start: 'top 90%',
          end: 'top 50%',
          scrub: true,
        }
      }
    )

    const whatIDoTitleSplit = new SplitText(whatIDoTitleRef.current, { type: 'chars' });

    gsap.fromTo(
      whatIDoTitleSplit.chars,
      { opacity: 0, filter: "blur(5px)" },
      {
        opacity: 1,
        filter: "blur(0px)",
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
           trigger: whatIDoTitleRef.current,
            start: 'top 90%',
            end: 'top 50%',
            scrub: true, 
        },
      }
    )
    
    const whatIDoTextSplit = new SplitText(whatIDoTextRef.current, { type: 'words' });

    gsap.fromTo(
      whatIDoTextSplit.words,
      {opacity: 0, filter: "blur(5px)"},
      {
        opacity: 1,
        filter: "blur(0px)",
        ease: "power2.out",
        stagger: 0.07,
        scrollTrigger: {
          trigger: whatIDoTextRef.current,
          start: 'top 90%',
          end: 'top 50%',
          scrub: true,
        }
      }
    )

    // SECTION 3 ANIMATIONS
    const recentWorks = new SplitText(recentWorkRef.current, { type: 'chars' });

    gsap.fromTo(
      recentWorks.chars,
      { opacity: 0, filter: "blur(5px)" },
      {
        opacity: 1,
        filter: "blur(0px)",
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
           trigger: recentWorkRef.current,
            start: 'top 90%',
            end: 'top 70%',
            scrub: true, 
        },
      }
    )

    const preview = previewRef.current;
    const workslinkContainer = linkContainer.current;

    gsap.set(preview, { scale: 0 });

    const workItems = linkContainer.current.querySelectorAll('a');
    workItems.forEach((item) => {
      const bg = item.querySelector('.work-bg');
      const title = item.querySelector('.work-title');
      const category = item.querySelector('.work-category');
      
      gsap.set(bg, { yPercent: 100 });
      
      item.addEventListener('mouseenter', () => {
        gsap.to(bg, {
          yPercent: 0,
          duration: 0.6,
          ease: "power3.out"
        });
        gsap.to([title, category], {
          color: "#ffffff",
          duration: 0.4,
          ease: "power2.out"
        });
        gsap.to(item, {
          paddingLeft: "1.5rem", // px-8 (32px)
          paddingRight: "1.5rem", // px-8 (32px)
          duration: 0.6,
          ease: "power3.out"
        });
      });
      
      item.addEventListener('mouseleave', () => {
        gsap.to(bg, {
          yPercent: 100,
          duration: 0.6,
          ease: "power3.out"
        });
        gsap.to(title, {
          color: "#000000",
          duration: 0.4,
          ease: "power2.out"
        });
        gsap.to(category, {
          color: "#6b7280", // gray-500
          duration: 0.4,
          ease: "power2.out"
        });
        gsap.to(item, {
          paddingLeft: "2.5rem", // px-10 (40px) - back to original
          paddingRight: "2.5rem", // px-10 (40px) - back to original
          duration: 0.6,
          ease: "power3.out"
        });
      });
    });

    let lastMouseEvent;
    const movePreview = (e) => {
      lastMouseEvent = e;
      gsap.to(preview, {
        x: e.clientX,
        y: e.clientY + window.scrollY,
        duration: 0.5,
      });
    };

    const scrollInPreview = (e) => {
      if (lastMouseEvent) {
        gsap.to(preview, {
          x: lastMouseEvent.clientX,
          y: lastMouseEvent.clientY + window.scrollY,
          duration: 0.1,
        });
      }
    };

    const handleEnter = (e) => {
      gsap.set(preview, {
        xPercent: -50,
        yPercent: -50,
        x: e.clientX,
        y: e.clientY + window.scrollY,
        scale: 0,
      });

      gsap.to(preview, {
        scale: 1,
        zIndex: 99,
        duration: 0.3,
        ease: "power2.out",
      });

      window.addEventListener("mousemove", movePreview);
      window.addEventListener("scroll", scrollInPreview);
    };

    const handleLeave = () => {
      gsap.to(preview, {
        scale: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    };

    workslinkContainer.addEventListener("mouseenter", handleEnter);
    workslinkContainer.addEventListener("mouseleave", handleLeave);

    // SECTION 4 ANIMATIONS
    const footerText1 = new SplitText(footerText1Ref.current, { type: 'chars' });

    gsap.fromTo(
      footerText1.chars,
      { opacity: 0, filter: "blur(5px)" },
      {
        opacity: 1,
        filter: "blur(0px)",
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
           trigger: footerText1Ref.current,
            start: 'top 90%',
            end: 'top 70%',
            scrub: true, 
        },
      }
    )

    const footerText2 = new SplitText(footerText2Ref.current, { type: 'chars' });

    gsap.fromTo(
      footerText2.chars,
      { opacity: 0, filter: "blur(5px)" },
      {
        opacity: 1,
        filter: "blur(0px)",
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
           trigger: footerText2Ref.current,
            start: 'top 90%',
            end: 'top 70%',
            scrub: true, 
        },
      }
    )

    gsap.set(".footer-btn-animation", { opacity: 0, y: 10 });
    gsap.fromTo(
      ".footer-btn-animation",
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        ease: "power2.out",
        duration: 1.2,
        stagger: 0.2,
        scrollTrigger: {
           trigger: footerButtonContainerRef.current,
           start: "top 90%",
           end: "top 70%",
           scrub: true, 
        },
      }
    )

    socialButtonRefs.current.forEach((button, index) => {
        if (!button) return;
        
        const socialDefaultText = button.querySelector('.btn-text-default');
        const socialHoverText = button.querySelector('.btn-text-hover');

        gsap.set(socialDefaultText, {z: 0, opacity: 1, scale: 1});
        gsap.set(socialHoverText, {z: -20, opacity: 0, y: 42, scale: 1.2, filter: "blur(3px)"});

        button.addEventListener("mouseenter", () => {
          gsap.to(button, {
            backgroundColor: "#ffffff",
            color: "#1C1D20",
            duration: 0.4,
            ease: "power3.inOut"
          });
          gsap.to(socialDefaultText, {
            z: 20, 
            y: -42,
            opacity: 0,
            scale: "0.8",
            filter: "blur(3px)",
            duration: 0.4,
            ease: "power3.inOut"
          });
          gsap.to(socialHoverText, {
            z: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.4,
            ease: "power3.inOut"
          });
        });

        button.addEventListener("mouseleave", () => {
          gsap.to(button, {
            backgroundColor: "#1C1D20",
            color: "#ffffff",
            duration: 0.4,
            ease: "power3.inOut"
          });
          gsap.to(socialDefaultText, {
            z: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.4,
            ease: "power3.inOut"
          });
          gsap.to(socialHoverText, {
            z: -20,
            y: 42,
            opacity: 1,
            filter: "blur(3px)",
            scale: 1.2,
            duration: 0.4,
            ease: "power3.inOut"
          });
        });
      });

    return () => {
      aboutMeTitleSplit.revert();
      aboutMeTextSplit.revert();
      whatIDoTitleSplit.revert();
      whatIDoTextSplit.revert();
    };

  }, [])

  const scrollToClick = (sectionRef) => {
    gsap.to(window, {
      duration: 1.5,
      scrollTo: {
        y: sectionRef.current,
      },
      ease: "power2.inOut"
    });
  };

  const works = worksData;

  useEffect(() => {
    works.forEach((work) => {
      const img = new Image();
      img.src = work.image;
    });
  }, []);

  return (
   <>
      {!hidePreloader && (
        <section ref={preloaderRef} className='fixed top-0 left-0 w-full h-full bg-[#1C1D20] text-white flex justify-center items-center z-50'>
          <div className='flex flex-1 h-full flex-col justify-between p-10'>
            <h1 className='preloader-text1 text-8xl font-medium'>Mobile</h1>
            <h1 className='preloader-text2 flex justify-center text-8xl font-medium'>Website</h1>
            <h1 className='preloader-text3 flex justify-end text-8xl font-medium'>Developer</h1>
          </div>
        </section>
      )}

      {/* Section 1 for introducing the website and to show the menu */}
      <main ref={mainRef}>
          <nav 
            className={`sticky top-0 left-0 w-full z-40 transition-all duration-500 ${navbarScrolled ? 'backdrop-blur-md bg-white/40' : 'bg-transparent'}`}
          >
            <div className="flex justify-center items-center gap-20 p-6">
              <button onClick={() => scrollToClick(section2Ref)} className='relative cursor-pointer' ref={(el) => (menuRefs.current[0] = el)}>
                About
                <span className="menu-underline absolute bottom-0 left-0 w-full h-[2px] bg-black"></span>
              </button>
              <button onClick={() => scrollToClick(section3Ref)} className='relative cursor-pointer' ref={(el) => (menuRefs.current[1] = el)}>
                Works
                <span className="menu-underline absolute bottom-0 left-0 w-full h-[2px] bg-black"></span>
              </button>
              <button onClick={() => scrollToClick(footerRef)} className='relative cursor-pointer' ref={(el) => (menuRefs.current[2] = el)}>
                Contact
                <span className="menu-underline absolute bottom-0 left-0 w-full h-[2px] bg-black"></span>
              </button>
            </div>
          </nav>
        <section ref={section1Ref} className="h-screen flex flex-col">
          <div className="absolute top-0 left-0 whitespace-nowrap w-screen h-screen overflow-hidden z-[-1] pointer-events-none justify-center rotate-10">
            <div ref={(el) => (bgTextRefs.current[0] = el)} className="absolute top-[10%] whitespace-nowrap text-9xl font-medium text-gray-100">
              Frontend Developer · Backend Developer · Mobile Developer · UI/UX · Adaptive Developer · Problem Solver · Fast Learner · Detail-Oriented
            </div>
            <div ref={(el) => (bgTextRefs.current[1] = el)} className="absolute top-[47.5%] left-1/2 -translate-x-1/2 whitespace-nowrap text-9xl font-medium text-gray-100">
              Typescript · Javascript · Node.js · React Native · TailwindCSS · Firebase · Typescript · Javascript · Node.js · React Native · Typescript
            </div>
            <div ref={(el) => (bgTextRefs.current[2] = el)} className="absolute top-[85%] whitespace-nowrap text-9xl font-medium text-gray-100">
              Adaptive Developer · Problem Solver · Fast Learner · Detail-Oriented · Adaptive Developer · Problem Solver · Fast Learner · Detail-Oriented
            </div>
          </div>
          
          <div className='flex flex-1 flex-col justify-center items-center gap-8'>
            <div className='flex flex-col justify-center items-center gap-4'>
              <h1 className='hero-title text-8xl font-semibold'>AZISYA LUTHFI BINTANG</h1>
              <p className='hero-subtitle text-lg font-base'>SoftwareEngineer, Web & Mobile Developer</p>
            </div>
            <div className='flex gap-5'>
              <button
                onClick={() => scrollToClick(section3Ref)}
                className="btn-animation border border-solid border-black rounded-full py-2 px-4 relative overflow-hidden cursor-pointer"
                ref={projectButtonRef}
              >
                <span className="invisible">See my project</span>
                <span className="btn-text-default absolute inset-0 flex items-center justify-center">
                  See my project
                </span>
                <span className="btn-text-hover absolute inset-0 flex items-center justify-center">
                  See my project
                </span>
              </button>
              <a ref={(el) => (menuRefs.current[3] = el)} target='_blank' href="https://www.linkedin.com/in/azisya-luthfi-bintang/" className='btn-animation rounded-full py-2 px-4 relative'>
                <div className='flex relative'>
                  Get in touch
                  <span className="menu-underline absolute bottom-0 left-0 w-full h-[2px] bg-black"></span>
                </div>
              </a>
            </div>
          </div>
          <div className='scroll-animate flex flex-col justify-center items-center pb-2 text-gray-600'>
            <p>Scroll</p>
            <div>↓</div>
          </div>
        </section>

        {/* Section 2 for about me and what to do  */}
        <section ref={section2Ref} className='w-screen h-screen bg-white flex py-40 px-40 justify-between gap-10'>
          {/* About me */}
          <div className='w-1/2 flex flex-col justify-between'>
            <div className='flex flex-col gap-10'>
              <h1 ref={aboutMeTitleRef} className='text-5xl font-semibold'>About Me</h1>
              <p ref={aboutMeTextRef} className='text-base max-w-2xl leading-7'>I’m a fullstack developer currently pursuing a degree in Informatics, with a strong focus on building modern web and mobile applications. Most of my experience comes from academic projects, hackathons, and personal exploration, which taught me how to solve problems with clarity and structure.</p>
            </div>
            <div className='flex flex-col gap-10'>
              <h1 ref={whatIDoTitleRef} className='text-5xl font-semibold'>What i do</h1>
              <p ref={whatIDoTextRef} className='text-base max-w-2xl leading-7'>I primarily work with JavaScript, TypeScript, and PHP to build fullstack applications across both web and mobile platforms. My backend experience includes building REST APIs and scalable architectures with Laravel, Node.js, and Express.js, often paired with databases like MySQL, PostgreSQL, MongoDB, and Firebase. On the frontend, I create responsive interfaces using React.js and mobile experiences using React Native focusing on usability and performance. I enjoy switching between backend logic and frontend development, always aiming for maintainable code and real-world impact.</p>
            </div>
          </div>
          <div className='flex flex-col gap-10 w-1/2 items-center justify-end py-10'>
            <img src={images.profileImage} className='w-auto h-full object-cover' alt='Profile Image'/>
            {/* <a ref={(el) => (menuRefs.current[4] = el)} className='btn-animation text-lg relative' href="#">
              <div className='jump-animation flex relative btn-semibold'>
                get Resume
                <span className="menu-underline absolute bottom-0 left-0 w-full h-[2px] bg-black"></span>
              </div>
            </a> */}
          </div>
        </section>

        {/* Section 3 for works */}
        <section ref={section3Ref} className='w-screen flex-col bg-white flex py-20 px-40 justify-between gap-20'>
          <h1 ref={recentWorkRef} className='font-semibold text-5xl'>
            Recent Work
          </h1>
          <div ref={linkContainer} className='border-t border-gray-200'>
            {works.map((work, i) => (
              <a
                key={i}
                href={work.link} 
                target='_blank' 
                onMouseEnter={() => setActiveImage(work.image)}
                className='relative flex justify-between items-center h-30 px-10 border-b border-gray-200 cursor-pointer overflow-hidden'
              >
                
                <h2 className='work-title text-2xl z-10 font-medium'>{work.title}</h2>
                <p className='work-category text-sm z-10 text-gray-500'>{work.category}</p>
                <div className="work-bg absolute bg-black inset-0"></div>
              </a>
            ))}
              <div
                ref={previewRef}
                className="fixed top-0 left-0 pointer-events-none"
              >
                <div className="w-lg h-lg bg-black p-1 shadow-2xl relative border">
                  <img
                    src={activeImage}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
          </div>
        </section>
      </main>
      <footer ref={footerRef} style={{backgroundColor: "#1C1D20"}} className='w-screen h-screen flex-col flex px-40 justify-center gap-25 text-white'>
            <div className='flex flex-col gap-10'>
              <h1 ref={footerText1Ref} className='text-8xl font-semibold letter-spacing-5'>Let's work together</h1>
              <p ref={footerText2Ref} className='text-xl'>Feel free to reach out if you have a project in mind or just want to connect</p>
            </div>
            <hr className='opacity-50'/>
            <div ref={footerButtonContainerRef} className='flex gap-5'>
              <a
                target='_blank'
                href='mailto:azisya.luthfibintang@gmail.com'
                className="footer-btn-animation border border-solid border-white rounded-full py-5 px-8 relative overflow-hidden cursor-pointer"
                ref={(el) => (socialButtonRefs.current[0] = el)}
              >
                <span className="invisible">azisya.luthfibintang@gmail.com</span>
                <span className="btn-text-default absolute inset-0 flex items-center justify-center">
                  azisya.luthfibintang@gmail.com
                </span>
                <span className="btn-text-hover absolute inset-0 flex items-center justify-center">
                  azisya.luthfibintang@gmail.com
                </span>
              </a>
              <a
                target='_blank'
                href='https://www.linkedin.com/in/azisya-luthfi-bintang/'
                className="footer-btn-animation border border-solid border-white rounded-full py-5 px-8 relative overflow-hidden cursor-pointer"
                ref={(el) => (socialButtonRefs.current[1] = el)}
              >
                <span className="invisible">Linkedin</span>
                <span className="btn-text-default absolute inset-0 flex items-center justify-center">
                  Linkedin
                </span>
                <span className="btn-text-hover absolute inset-0 flex items-center justify-center">
                  Linkedin
                </span>
              </a>
              <a
                target='_blank'
                href='https://github.com/luthfibintang/'
                className="footer-btn-animation border border-solid border-white rounded-full py-5 px-8 relative overflow-hidden cursor-pointer"
                ref={(el) => (socialButtonRefs.current[2] = el)}
              >
                <span className="invisible">Github</span>
                <span className="btn-text-default absolute inset-0 flex items-center justify-center">
                  Github
                </span>
                <span className="btn-text-hover absolute inset-0 flex items-center justify-center">
                  Github
                </span>
              </a>
            </div>
        </footer>
    </>
  )
}


export default App
