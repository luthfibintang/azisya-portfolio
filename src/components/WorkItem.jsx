import React from 'react'
import {useRef, useEffect} from "react"
import gsap from "gsap";
import { useGSAP } from '@gsap/react';
import imageTest from "../assets/image/regrant-preview.png";

const WorkItem = ({title, category, link, image = imageTest}) => {
  const previewRef = useRef();
  const containerRef = useRef();

  useGSAP(() => {
    const preview = previewRef.current;
    const container = containerRef.current;

    gsap.set(preview, {
      scale: 0
    })
    
    const movePreview = (e) => {
      gsap.set(preview, {
        x: e.pageX,
        y: e.pageY,
      });
    };

    const handleEnter = () => {
      gsap.set(preview, {
        xPercent: -50,
        yPercent: -50,
      });
      
      gsap.to(preview, {
        scale: 1,
        zIndex: 99,
        duration: 0.3,
        ease: "power2.out",
      });

      window.addEventListener('mousemove', movePreview);
    };

    const handleLeave = () => {
      gsap.to(preview, {
        scale: 0,
        duration: 0.3,
        ease: "power2.out"
      });

      window.removeEventListener('mousemove', movePreview);
    };

    container.addEventListener("mouseenter", handleEnter);
    container.addEventListener("mouseleave", handleLeave);
    
  }, []);


  return (
    <div ref={containerRef}>
      <a href={link} target='_blank' className='relative flex justify-between items-center py-10 px-10 border-b border-gray-200 cursor-pointer transition-colors'>
        <h2 className='text-2xl font-medium'>{title}</h2>
        <p className='text-sm text-gray-500'>{category}</p>
      </a>

      <div
        ref={previewRef}
        className="fixed top-0 left-0 pointer-events-none"
      >
        <div className="w-lg h-lg bg-black p-1 shadow-2xl relative border">
          <img
            src={image}
            alt="preview"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  )
}

export default WorkItem;