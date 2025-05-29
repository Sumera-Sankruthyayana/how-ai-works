import React from "react";
import Sketch from "react-p5";

export default function DotProductSketch() {
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(200, 200).parent(canvasParentRef);
    p5.angleMode(p5.RADIANS);
  };
  const draw = (p5) => {
    p5.background(200);
    drawGrid(p5);
    drawAxes(p5);

    p5.translate(p5.width / 2, p5.height / 2);

    const angle = p5.frameCount * 0.02;
    const a = p5.createVector(80, 0);
    const b = p5.createVector(80 * Math.cos(angle), 80 * Math.sin(angle));

    const dot = a.dot(b) / (a.mag() * b.mag());

    drawArrow(p5, p5.createVector(0, 0), a, p5.color(0));
    drawArrow(p5, p5.createVector(0, 0), b, p5.color(100, 100, 255));

    const colorFactor = p5.map(dot, -1, 1, 0, 255);
    p5.fill(255 - colorFactor, colorFactor, 100);
    p5.noStroke();
    p5.ellipse(0, 0, 14, 14);

    p5.fill(0);
    p5.textSize(12);
    p5.textAlign(p5.LEFT);
    p5.text(
      `Dot product: ${dot.toFixed(2)}`,
      -p5.width / 2 + 6,
      p5.height / 2 - 6
    );
  };

  // 📐 Axis lines
  const drawAxes = (p5) => {
    p5.stroke(180);
    p5.strokeWeight(2);
    p5.line(p5.width / 2, 0, p5.width / 2, p5.height);
    p5.line(0, p5.height / 2, p5.width, p5.height / 2);
  };

  // 🧱 Grid lines
  const drawGrid = (p5) => {
    p5.stroke(220);
    p5.strokeWeight(1);
    for (let x = 0; x <= p5.width; x += 20) {
      p5.line(x, 0, x, p5.height);
    }
    for (let y = 0; y <= p5.height; y += 20) {
      p5.line(0, y, p5.width, y);
    }
  };

  // ➤ Arrow drawing
  const drawArrow = (p5, base, vec, color) => {
    p5.push();
    p5.stroke(color);
    p5.strokeWeight(3);
    p5.fill(color);
    p5.translate(base.x, base.y);
    p5.line(0, 0, vec.x, vec.y);
    p5.rotate(vec.heading());
    const arrowSize = 6;
    p5.translate(vec.mag() - arrowSize, 0);
    p5.triangle(0, 3, 0, -3, arrowSize, 0);
    p5.pop();
  };

  return (
    <>
      <div className="flex justify-center flex-col items-center">
        <p className="text-sm font-medium text-center text-gray-900 dark:text-white">
          This animation shows how the dot product reflects the similarity
          between two vectors. <br />
          As one vector rotates, the dot product increases when they align and
          decreases when they diverge. <br />
          The color and value dynamically illustrate this directional
          relationship.
        </p>
        <Sketch setup={setup} draw={draw} />
      </div>
    </>
  );
}
