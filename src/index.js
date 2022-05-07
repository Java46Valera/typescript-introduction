class Point {
    constructor(_x, _y) {
        this._x = _x;
        this._y = _y;
        Point.checkValue(_x);
        Point.checkValue(_y);
    }
    static checkValue(value) {
        if (value < Point.minValue || value > Point.maxValue) {
            throw `wrong value ${value}, should be in range [${Point.minValue} - ${Point.maxValue}]`;
        }
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    set x(value) {
        Point.checkValue(value);
        this._x = value;
    }
    set y(value) {
        Point.checkValue(value);
        this._y = value;
    }
    draw() {
        console.log(`Point [x: ${this._x}, y: ${this._y}]`);
    }
}
Point.minValue = -100;
Point.maxValue = 100;
class Line extends Point {
    constructor(x, y, _point) {
        super(x, y);
        this._point = _point;
    }
    draw() {
        console.log("-----------Line----------");
        super.draw();
        this._point.draw();
        console.log('-'.repeat(20));
    }
    get point() {
        return this._point;
    }
}
class Square extends Point {
    constructor(x, y, _width) {
        super(x, y);
        this._width = _width;
    }
    get width() {
        return this._width;
    }
    draw() {
        console.log("--------Square-----------");
        super.draw();
        console.log(`width: ${this._width}`);
        console.log("-".repeat(20));
    }
}
class Rectangle extends Square {
    constructor(x, y, width, _height) {
        super(x, y, width);
        this._height = _height;
    }
    draw() {
        console.log("==========Rectangle=================");
        super.draw();
        console.log(`height: ${this._height}`);
        console.log("=".repeat(20));
    }
}
const shape = new Square(3, 4, 10);
const shapes = [
    new Line(3, 4, new Point(10, 10)),
    new Square(2, 5, 10),
    new Line(20, 30, new Point(3, 4)),
    new Rectangle(10, 15, 20, 5)
];
shapes.forEach(shape => shape.draw());
class Canvas {
    constructor() {
        this._shapes = [];
    }
    draw() {
        this._shapes.forEach(s => s.draw());
    }
    addShape(shape) {
        return this._shapes.push(shape) - 1;
    }
    removeShape(index) {
        return this._shapes.splice(index, 1)[0];
    }
    sort() {
        this._shapes.sort((a, b) => a instanceof Point && b instanceof Point ?
            b.x - a.x || a.y - b.y : 0);
    }
    removeIf(predicate) {
        this._shapes = this._shapes.filter(s => !predicate(s));
    }
}
const canvas = new Canvas();
canvas.addShape(new Line(3, 4, new Point(2, 4)));
canvas.addShape(new Line(3, 4, new Point(4, 3)));
canvas.addShape(new Rectangle(10, 2, 50, 20));
canvas.addShape(new Square(5, 50, 30));
canvas.addShape(new Square(5, 5, 30));
canvas.addShape(new Square(5, 5, 30));
canvas.addShape(new Line(3, 4, new Point(4, 3)));
console.log(`removed shape is ${JSON.stringify(canvas.removeShape(5))}`);
canvas.sort();
console.log('+++++++++++++++++++++++++draw before reomoving+++++++++++++++++++++++');
canvas.draw();
console.log('+++++++++++++++++++++++++draw after reomoving+++++++++++++++++++++++');
canvas.removeIf(s => s instanceof Line && s.point.x > s.x);
canvas.draw();