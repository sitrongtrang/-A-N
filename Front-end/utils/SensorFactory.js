class SensorFactory {
    constructor() {
    }

    createDevice(name, loc) {
        throw "Implement something here"
    }
}

class LightSensorFactory extends SensorFactory {
    createDevice(name, value) {
        return new LightSensor(name, value)
    }
}

class HumidSensorFactory extends SensorFactory {
    createDevice(name, value) {
        return new HumidSensor(name, value)
    }
}

class TemperatureSensorFactory extends SensorFactory {
    createDevice(name, value) {
        return new TempSensor(name, value)
    }
}

class Sensor {
    setDeviceState(state) {
        throw "Implementing setDeviceState function"
    }

    displayState() {
        throw "Implementing displayState function"
    }
}

class LightSensor extends Sensor {
    constructor(name, value) {
        super()
        this.name = name
        this.value = value
    }

    displayState() {
        return {
            type: "sun",
            name: this.name,
            value: this.value
        }
    }
}

class HumidSensor extends Sensor {
    constructor(name, value) {
        super()
        this.name = name
        this.value = value
    }

    displayState() {
        return {
            type: "humid",
            name: this.name,
            value: this.value
        }
    }
}

class TempSensor extends Sensor {
    constructor(name, currState) {
        super()
        this.name = name
        this.value = currState
    }

    displayState() {
        return {
            type: "temp",
            name: this.name,
            value: this.value
        }
    }
}

export {HumidSensorFactory, TemperatureSensorFactory, LightSensorFactory}


