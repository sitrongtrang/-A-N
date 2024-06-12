import { BinaryJsonParseType, DeviceJsonParseType, JsonParseType, NotJsonParseType, SensorInfoType } from "@/Type";
import { IfStmt, BinaryOp, NotOp, Sensor, Threshold, AstTime, DeviceNode } from "../utils/AST";

class ASTJsonParser {
    jsonParser: JsonParseType
    constructor(ast: IfStmt, actionName: string) {
        this.jsonParser = this.visitIfStmt(ast)
        this.jsonParser.actionName = actionName
    }

    public visit(ast: IfStmt | BinaryOp | NotOp | Sensor | Threshold | AstTime | DeviceNode): any {
        if (ast instanceof IfStmt) 
            return this.visitIfStmt(ast)
        else if (ast instanceof BinaryOp)
            return this.visitBinaryOp(ast)
        else if (ast instanceof NotOp)
            return this.visitNotOp(ast)
        else if (ast instanceof Sensor)
            return this.visitSensor(ast)
        else if (ast instanceof AstTime) 
            return this.visitAstTime(ast)
        else if (ast instanceof Threshold)
            return this.visitThreshold(ast)
        else if (ast instanceof DeviceNode) 
            return this.visitAction(ast)
    }

    public visitIfStmt(ast: IfStmt): JsonParseType {
        return {
            actionName: "",
            condition: this.visit(ast.condition),
            actionList: ast.actions.map(ele => this.visit(ele))
        }
    }

    public visitBinaryOp(ast: BinaryOp): BinaryJsonParseType {
        return {
            operator: ast.op,
            lhs: this.visit(ast.lhs),
            rhs: this.visit(ast.rhs)
        }
    }
    public visitNotOp(ast: NotOp): NotJsonParseType {
        return {
            operator: "not",
            operand: this.visit(ast.operand)
        }
    }
    public visitSensor(ast: Sensor): SensorInfoType {
        return {
            name: ast.sensorName,
            type: ast.sensorType,
            location: ast.sensorLoc
        }
    }
    public visitAstTime(ast: AstTime): "time" {
        return "time"
    }
    public visitThreshold(ast: Threshold): string {
        return ast.threshold
    }
    public visitAction(ast: DeviceNode): DeviceJsonParseType {
        return {
            deviceName: ast.name,
            deviceType: ast.type,
            deviceLocation: ast.location,
            state: ast.state
        }
    }
}

export default ASTJsonParser;