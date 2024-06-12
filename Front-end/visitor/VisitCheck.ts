import { IfStmt, BinaryOp, NotOp, Sensor, Threshold, AstTime, DeviceNode } from "../utils/AST";

class ASTChecker {
    constructor(ast: IfStmt) {
        this.visitIfStmt(ast)
    }

    public visit(ast: any) {
        if (ast instanceof IfStmt) 
            this.visitIfStmt(ast)
        else if (ast instanceof BinaryOp)
            this.visitBinaryOp(ast)
        else if (ast instanceof NotOp)
            this.visitNotOp(ast)
        else if (ast instanceof Sensor)
            this.visitSensor(ast)
        else if (ast instanceof AstTime) {
            this.visitAstTime(ast)
        }
        else if (ast instanceof Threshold)
            this.visitThreshold(ast)
        else if (ast instanceof DeviceNode) 
            this.visitAction(ast)
    }

    public visitIfStmt(ast: IfStmt) {
        if (!ast.condition || ast.actions.length == 0) {
            throw {err:"Invalid Configuration",message:"Condition or list of action cannot be empty"}
        }
        this.visit(ast.condition)
        for (let activity of ast.actions)
            this.visit(activity)
    }

    public visitBinaryOp(ast: BinaryOp) {
        if (!ast.lhs) 
            throw {err: "LHS is empty", message: `The left hand side for ${ast.op} expression cannot be empty`}
        else if (!ast.rhs) 
            throw {err: "RHS is empty", message: `The right hand side for ${ast.op} expression cannot be empty`}
        this.visit(ast.lhs)
        this.visit(ast.rhs)
    }

    public visitNotOp(ast: NotOp) {
        if (!ast.operand)
            throw {err: "Empty not expression", message: "The not operand cannot be null"}
        this.visit(ast.operand)
    }

    public visitSensor(ast: Sensor) {
        if (ast.sensorName === "") 
            throw {err: "Unknown sensor", message: "You must choose the sensor"}
    }

    public visitAstTime(ast: AstTime) {
    }

    public visitThreshold(ast: Threshold) {
        if (ast.threshold === "") 
            throw {err: "Empty literal", message: "The value for sensor or time cannot be empty"}
    }

    public visitAction(ast: DeviceNode) {
        if (ast.name === "")
            throw {err: "Unchosen Device", message: "You have to choose the device"}
    }
}

export default ASTChecker;