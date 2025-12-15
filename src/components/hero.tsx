import React, { useRef, useEffect } from 'react';
import { Link } from 'gatsby';
import { AiOutlineArrowDown } from 'react-icons/ai';

import {
  canvasButton,
  canvas as canvasStyle,
  canvasMask,
  container,
  heading,
  headingContainer,
} from './hero.module.css';

import Circle from './shapeClasses/Circle';
import Triangle from './shapeClasses/Triangle';
import Square from './shapeClasses/Square';
import useWindowSize from '../utils/useWindowSize';

const Canvas = ({ size }: { size: { width: number; height: number } }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = (context: CanvasRenderingContext2D, shapes: (Square | Circle | Triangle)[]) => {
    context.clearRect(0, 0, size?.width, size?.height);

    shapes.forEach(shape => {
      shape.draw();
      shape.move();
    });
  };

  useEffect(() => {
    if (!canvasRef.current) return () => {};
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
    let animationFrameId: number;

    if (!context) return () => {};

    const shapes: (Square | Circle | Triangle)[] = [];

    for (let i = 0; i < 5; i += 1) {
      shapes.push(new Circle(context), new Triangle(context), new Square(context));
    }

    const render = () => {
      draw(context, shapes);
      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);

  return <canvas height={size?.height} width={size?.width} ref={canvasRef} className={canvasStyle} />;
};

const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { elSize: canvasSize } = useWindowSize(ref);

  return (
    <div ref={ref} className={container}>
      {canvasSize && <Canvas size={canvasSize} />}
      <div className={canvasMask} />
      <div className={headingContainer}>
        <h1 className={heading}>
          <span>Hello</span>
          <span>I&apos;m Dan Bridges</span>
          <span>A software developer</span>
        </h1>
        <Link className={canvasButton} to="/#projects-anchor">
          <span>See For Yourself</span> <AiOutlineArrowDown />
        </Link>
      </div>
    </div>
  );
};

export default Hero;
