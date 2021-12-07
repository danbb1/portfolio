import React, { useRef, useEffect } from 'react';
import { Link } from 'gatsby';
import { AiOutlineArrowDown } from 'react-icons/ai';
import PropTypes from 'prop-types';

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

const Canvas = ({ size }) => {
  const canvasRef = useRef();

  const strokeColors = {
    0: '#D64933',
    1: '#99E1D9',
    2: '#D7F75B',
  };

  const draw = (context, shapes) => {
    context.clearRect(0, 0, size?.width, size?.height);

    shapes.forEach(shape => {
      shape.draw();
      shape.move();
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    let animationFrameId;

    if (!context) return;

    const shapes = [];

    for (let i = 0; i < 5; i += 1) {
      shapes.push(
        new Circle(context, strokeColors[Math.floor(Math.random() * 3)]),
        new Triangle(context, strokeColors[Math.floor(Math.random() * 3)]),
        new Square(context, strokeColors[Math.floor(Math.random() * 3)]),
      );
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
  const ref = useRef();

  const { elSize: canvasSize } = useWindowSize(ref);

  return (
    <div ref={ref} className={container}>
      <Canvas size={canvasSize} />
      <div className={canvasMask} />
      <div className={headingContainer}>
        <h1 className={heading}>
          <span>Hello</span>
          <span>I&apos;m Dan Bridges</span>
          <span>A web developer</span>
        </h1>
        <Link className={canvasButton} to="/#projects-anchor">
          <span>See For Yourself</span> <AiOutlineArrowDown />
        </Link>
      </div>
    </div>
  );
};

export default Hero;

Canvas.propTypes = {
  size: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
  }),
};

Canvas.defaultProps = {
  size: {},
};

Hero.defaultProps = {
  projectsRef: undefined,
};
