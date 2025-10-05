class Shape {
    area() {
        throw new Error('area() must be implemented by subclasses');
    }
}

class Rectangle extends Shape {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }

    area() {
        if (this.width == null || this.height == null) {
            throw new Error('Width and Height are required');
        }
        if (typeof this.width !== 'number' || typeof this.height !== 'number') {
            throw new TypeError('Width and Height must be numbers');
        }

        return this.width * this.height;
    }
}

class Circle extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }

    area() {
        if (this.radius == null && typeof this.radius !== 'number') {
            throw new Error('Radius is required');
        }
        return Math.PI * this.radius * this.radius;
    }
}

const rect1 = new Rectangle(4, 5);
const rect2 = new Rectangle(1); // height missing

try {
    console.log(`Area of Rectangle1: ${rect1.area()}`);
} catch (err) {
    console.error('Error calculating rect1 area:', err.message);
}

try {
    console.log(`Area of Rectangle2: ${rect2.area()}`);
} catch (err) {
    console.error('Error calculating rect2 area:', err.message);
}

// Example for circle
const c = new Circle(3);
console.log(`Area of circle: ${c.area().toFixed(2)}`);