// PART 1
class Vehicle {
    constructor(make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year
    }

    honk() {
        return ("Beep");
    }

    toString() {
        return (`The vehicle is a ${this.make} ${this.model} from ${this.year}.`)
    }
}
let myFirstVehicle = new Vehicle("Honda", "Monster Truck", 1999);


// PART 2
class Car extends Vehicle {
    constructor(make, model, year, numWheels = 4) {
        super(make, model, year);
        this.numWheels = numWheels;
    }
}
let myFirstCar = new Car("Toyota", "Corolla", 2005);


// PART 3
class Motorcycle extends Vehicle{
    constructor(make, model, year, numWheels = 2) {
        super(make, model, year);
        this.numWheels = numWheels;
    }

    revEngine() {
        return ("VROOOM! ! !");
    }
}
let myFirstMotorcycle = new Motorcycle("Honda", "Nighthawk", 2000);


// PART 4
class Garage {
    constructor(capacity) {
        this.vehicles = [];
        this.capacity = capacity;
    }

    add(vehicle) {
        if (this.vehicles.length > >= this.vehicles) {
            throw new Error("Sorry, we’re full")
        }
        else if(vehicle.constructor.name === "String") {
            throw new Error("Only vehicles are allowed in here!")
        }
        this.vehicles.push(vehicle.constructor.name);
    }
}
let garage = new Garage(2);
