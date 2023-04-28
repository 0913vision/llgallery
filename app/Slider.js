'use client'

import { useRef } from "react";

export default function Slider({result}) {

  let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;
  const carousel = useRef();
  const leftarrowIcon = useRef();
  const rightarrowIcon = useRef();
  
  const showHideIcons = () => {
    let scrollWidth = carousel.current.scrollWidth - carousel.current.clientWidth;
    leftarrowIcon.current.style.display = carousel.current.scrollLeft == 0 ? "none" : "block";
    rightarrowIcon.current.style.display = carousel.current.scrollLeft == scrollWidth ? "none" : "block";
  }

  const arrowClick = (e) => {
    const firstImgWidth = carousel.current.firstChild.clientWidth;
    carousel.current.scrollLeft += e.target.id == "left" ? -firstImgWidth : firstImgWidth;
    setTimeout(()=> showHideIcons(), 60);
  }

  const autoSlide = () => {
    if(carousel.current.scrollLeft == (carousel.current.scrollWidth - carousel.current.clientWidth)) return;
    if(carousel.current.scrollLeft == 0) return;

    positionDiff = Math.abs(positionDiff);
    const firstImgWidth = carousel.current.firstChild.clientWidth;
    const valDifference = firstImgWidth - positionDiff;

    if(carousel.current.scrollLeft > prevScrollLeft) {
      return carousel.current.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
    carousel.current.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;

  }

  const dragStart = (e) => {
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.current.scrollLeft;
  };

  const dragging = (e) => {
    if(!isDragStart) return;
    e.preventDefault();
    isDragging = true
    carousel.current.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX
    carousel.current.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
  }

  const dragStop = () => {
    isDragStart = false;
    carousel.current.classList.remove("dragging");
    if(!isDragging) return;
    isDragging = false;
    autoSlide();
  }

  return (
    <div className="slider" result={result}>
      <div className="wrapper">
        <img id="left" className='arrow' ref={leftarrowIcon} src='left_arrow.svg' onClick={arrowClick}/>
        <div className="carousel" 
          ref={carousel}
          onMouseMove={dragging} 
          onTouchMove={dragging} 

          onMouseDown={dragStart}
          onTouchStart={dragStart}

          onMouseUp={dragStop}
          onTouchEnd={dragStop}
          onMouseLeave={dragStop}
        > 
        { result.map((a, i) => {
          return (
            <ImageItem key={i} src={a.link} />
          )}
        )}
        </div>
        <img id="right" className='arrow' src='right_arrow.svg' ref={rightarrowIcon} onClick={arrowClick}/>
      </div>
    </div>
  );
}

function ImageItem(props) {
  return (
    <img src={props.src} alt={props.name} draggable="false"/>  
  )
}