class DeviceFactory {
    constructor() {
    }

    createDevice(name, loc) {
        throw "Implement something here"
    }
}

class LightFactory extends DeviceFactory {
    constructor() {
        super()
    }
    createDevice(id) {
        let lightState // 1 means on, 0 means off
        if (id[0] == "1") lightState = 1
        else lightState = 0
        return new DeviceLight(`Light ${id[1]}`, lightState)
    }
}

class DoorFactory extends DeviceFactory {
    constructor() {
        super()
    }
    createDevice(id) {
        let doorState
        if (id[1] == "1") doorState = 1
        else doorState = 0
        return new DeviceDoor("Door", doorState)
    }
}

class FanFactory extends DeviceFactory {
    constructor() {
        super()
    }
    createDevice(id) {
        let fanState = Math.floor(parseInt(id.slice(1)) / 25)
        return new DeviceFan(`Fan`, fanState)
    }
}

class Device {
    setDeviceState(state) {
        throw "Implementing setDeviceState function"
    }

    displayState() {
        throw "Implementing displayState function"
    }
}

class DeviceLight extends Device {
    constructor(name, currState) {
        super()
        this.name = name
        this.state = currState
    }

    setDeviceState(state) {
        let onOrOff = state == 0 ? "2" : "1"
        return onOrOff + this.name.slice(this.name.length-1)
    }

    displayState() {
        return {
            type: "light",
            name: this.name,
            state: this.state
        }
    }
}

class DeviceDoor extends Device {
    constructor(name, currState) {
        super()
        this.name = name
        this.state = currState
    }

    setDeviceState(state) {
        return "3" + this.state
    }

    displayState() {
        return {
            type: "door",
            name: this.name,
            state: this.state
        }
    }
}

class DeviceFan extends Device {
    constructor(name, currState) {
        super()
        this.name = name
        this.state = currState
    }

    setDeviceState(state) {
        return "4" + String(parseInt(25 * this.state))
    }

    displayState() {
        return {
            type: "fan",
            name: this.name,
            state: this.state
        }
    }
}

export {LightFactory, DoorFactory, FanFactory}
