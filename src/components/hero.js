import React, { useState, useRef, useEffect } from "react"

import {
  canvas as canvasStyle,
  canvasMask,
  container,
  heading,
  headingContainer,
} from "./hero.module.css"

import Circle from "./shapeClasses/Circle"
import Triangle from "./shapeClasses/Triangle"
import Square from "./shapeClasses/Square"

const Canvas = ({ size }) => {
  const canvasRef = useRef()

  const strokeColors = {
    0: "#D64933",
    1: "#99E1D9",
    2: "#D7F75B",
  }

  const radius = 20
  const initialDirections = {
    0: 1,
    1: -1,
  }

  // generate random centre points so no shape runs off canvas
  const randomX = () =>
    Math.floor(Math.random() * (size?.width - radius - radius) + radius)
  const randomY = () =>
    Math.floor(Math.random() * (size?.height - radius - radius) + radius)
  const randomVelX = () =>
    (Math.floor(Math.random() * 3) + 1) / 2 *
    initialDirections[Math.round(Math.random())]
  const randomVelY = () =>
    (Math.floor(Math.random() * 3) + 1) / 2 *
    initialDirections[Math.round(Math.random())]
  const randomRotation = () =>
    Math.random() * 0.08 * initialDirections[Math.round(Math.random())]

  const draw = (context, shapes) => {
    context.clearRect(0, 0, size?.width, size?.height)

    shapes.forEach(shape => {
      shape.draw()
      shape.move()
    })
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext("2d")
    let animationFrameId

    const shapes = []

    for (let i = 0; i < 5; i += 1) {
      shapes.push(
        new Circle(
          randomX(),
          randomY(),
          context,
          radius,
          strokeColors[Math.floor(Math.random() * 3)],
          randomVelX(),
          randomVelY()
        ),
        new Triangle(
          randomX(),
          randomY(),
          context,
          radius,
          strokeColors[Math.floor(Math.random() * 3)],
          randomVelX(),
          randomVelY(),
          randomRotation()
        ),
        new Square(
          randomX(),
          randomY(),
          context,
          radius,
          strokeColors[Math.floor(Math.random() * 3)],
          randomVelX(),
          randomVelY(),
          randomRotation()
        )
      )
    }

    const render = () => {
      draw(context, shapes)
      animationFrameId = window.requestAnimationFrame(render)
    }

    render()

    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw])

  return (
    <canvas
      height={size?.height}
      width={size?.width}
      ref={canvasRef}
      className={canvasStyle}
    />
  )
}

const Hero = () => {
  const [size, setSize] = useState()

  const ref = useRef()

  useEffect(() => {
    const newSize = ref.current?.getBoundingClientRect() || null

    setSize({ width: newSize.width, height: newSize.height })
  }, [])

  return (
    <div ref={ref} className={container}>
      <Canvas size={size} />
      <div className={canvasMask} />
      <div className={headingContainer}>
        <h1 className={heading}>
          Hello.
          <span>I'm Dan Bridges.</span>
          <span>A web developer.</span>
        </h1>
        <button type="button">See For Yourself</button>
      </div>
    </div>
  )
}

export default Hero
