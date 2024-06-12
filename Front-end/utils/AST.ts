import ASTGen from "@/visitor/VisitCheck"

// These class will be used for Visitor Pattern
class Exp {
    public accept(visitAST: ASTGen) {
        throw("You need to implement this")
    }

}

class IfStmt {
    condition: BinaryOp | NotOp | null
    actions: DeviceNode[] 
    constructor(condition: any, actions: any[]) {
        this.condition = condition 
        this.actions = actions
    }

    public accept(visitAST: ASTGen) {
        visitAST.visit(this)
    }

    public addSubTree(newTree: any) {
        this.condition = newTree
        return this.condition
    }

    public removeSubTree() {
        this.condition = null
    }
}

class BinaryOp extends Exp {
    op: string 
    lhs: BinaryOp | NotOp | Sensor | null
    rhs: BinaryOp | NotOp | Sensor | null
    constructor(op: string, lhs: any, rhs: any) {
        super()
        this.op = op 
        this.lhs = lhs
        this.rhs = rhs
    }

    public accept(visitAST: ASTGen) {
        visitAST.visit(this)
    }

    public addSubTree(leftTree: any, rightTree: any, insertPos: string) {
        
        this.lhs = leftTree
        this.rhs = rightTree
        if (insertPos == "left") return this.lhs 
        else if (insertPos == "right") return this.rhs
        // return this.lhs ? this.lhs : this.rhs
    }


    public removeSubTree(pos: string) {
        if (pos == "left")
            this.lhs = null
        else if (pos == "right")
            this.rhs = null
    }
}

class NotOp extends Exp {
    operand: BinaryOp | NotOp | null
    constructor(operand: any) {
        super()
        this.operand = operand
    }

    public accept(visitAST: ASTGen) {
        visitAST.visit(this)
    }

    public addSubTree(subTree: any) {
        this.operand = subTree
        return this.operand
    }

    public removeSubTree() {
        this.operand = null
    }
}

class Sensor extends Exp {
    sensorName: string
    sensorType: string 
    constructor(name: string, type: string) {
        super()
        this.sensorName = name;
        this.sensorType = type;;
    }

    public accept(visitAST: ASTGen) {
        visitAST.visit(this)
    }
}

class AstTime extends Exp {
    constructor() {
        super()
    }

    public accept(visitAST: ASTGen) {
        visitAST.visit(this)
    }
}

class Threshold extends Exp {
    threshold: string
    constructor(value: string) {
        super()
        this.threshold = value
    }

    public accept(visitAST: ASTGen) {
        visitAST.visit(this)
    }
}

class DeviceNode {
    name: string;
    type: string;
    state: number;
    constructor(name: string, deviceType: string, state: number) {
        this.name = name
        this.type = deviceType
        this.state = state
    }

    public accept(visitAST: ASTGen) {
        visitAST.visit(this)
    }
}

export {BinaryOp, NotOp, Sensor, Threshold, IfStmt, AstTime, DeviceNode}