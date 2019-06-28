const express = require("express");
const bodyParser = require("body-parser");
const math = require("C:/users/bss/AppData/Roaming/npm/node_modules/mathjs");
const app = express();  
const urlencodedParser = bodyParser.urlencoded({extended: false});
var str
var node1
var node2
var x_val = []
var y_val = []
var iteration = []
var counter = 0
var flag = 0
var i = 0
var z
var u
var x1 
var y1
var x2
var y2
var h

function inverse(op){
    switch (op) {
        case '+' :
        return '-'
        case '-' :
        return '+'
        case '*' :
        return '/'
        case '/' :
        return '*'
        case 'add' :
        return 'subtract'
        case 'multiply' :
        return 'divide'
        case 'divide' :
        return 'multiply'
        case 'subtract' :
        return 'add'
        case 'unaryMinus' :
        return 'unaryMinus'
        case 'pow' :
        return 'pow'
    }
}

function reduce(node1){
  node1.traverse(function (node, path, parent) {
    switch (node.type) {
      case 'OperatorNode':
        if (node.fn == 'pow' && node.args[0] == 'z'){
          node2 = new math.expression.node.OperatorNode('^', inverse(node.fn), [node2,1/node.args[1]])
        }
        if (node.fn == 'unaryMinus' && node.args[0].name == 'z'){
          node2 = new math.expression.node.OperatorNode('-', inverse(node.fn), [node2])
          return
        }
        if (node.args[0].type == 'OperatorNode' && node.args[0].fn == 'unaryMinus' ){
          node2 = new math.expression.node.OperatorNode(inverse(node.op), inverse(node.fn), [node2, node.args[0]])
          return
        }
        if (node.fn != 'unaryMinus' && (node.args[0].type == 'ConstantNode' || node.args[0].type == 'SymbolNode') && node.args[0].name != 'z' && counter == 0 ){
          node2 = new math.expression.node.OperatorNode(inverse(node.op), inverse(node.fn), [node2, node.args[0]])
          return
        }
        if (node.fn != 'unaryMinus' && (node.args[1].type == 'ConstantNode' || node.args[1].type == 'SymbolNode') && node.args[1].name != 'z' && counter == 0 ){ 
          node2 = new math.expression.node.OperatorNode(inverse(node.op), inverse(node.fn), [node2, node.args[1]])
          return
        }
        if (node.fn != 'unaryMinus' && node.args[1].type == 'OperatorNode' && node.args[0].type == 'SymbolNode' && node.args[1].name != 'z'){
          node2 = new math.expression.node.OperatorNode(inverse(node.op), inverse(node.fn), [node2, node.args[1]])
          return
        }
        if (node.fn != 'unaryMinus' && (node.args[0].type == 'OperatorNode' && node.args[1].type == 'SymbolNode' && node.args[1].name != 'z')){
          node2 = new math.expression.node.OperatorNode(inverse(node.op), inverse(node.fn), [node2, node.args[0]])
          return
        }
      break
    case 'ConstantNode':
      break
    case 'SymbolNode':
      break
    default:
  }
})
}




function koshi() {
  u = z.replace(/x/g,x1)
  u = u.replace(/y/g,y1)
  u = math.simplify(z).toString()
  x_val.push(x1)
  y_val.push(y1)
  iteration.push(i)
  if (i < 3)
  {
    i = i + 1
    x1 = x1 + '+' + h
    x1 = math.simplify(x).toString()
    y1 = y1 + '+' + h + '*' + u 
    y1 = math.simplify(y).toString()
    koshi()
  }
}

function parsevalue(firstcond,seconcond,equation){
  if (firstcond != ''){
    x1 = firstcond.slice(firstcond.indexOf("("),firstcond.indexOf(")"))
    y1 = firstcond.slice(firstcond.indexOf("="),firstcond.length)
    flag = 1
  }
  if (seconcond != ''){
    x2 = seconcond.slice(seconcond.indexOf("("),seconcond.indexOf(")"))
    y2 = seconcond.slice(seconcond.indexOf("="),seconcond.length)
    flag = 2
  }
  if (firstcond.indexOf("y") === -1 || firstcond.indexOf("=") === -1 || seconcond.indexOf("y") === -1 || seconcond.indexOf("=") === -1 || firstcond === '' || seconcond === '' ){
    flag = 3
  }
  if (equation != ''){
    str = equation.replace(/y'/g, 'z')
    console.log(str)
    str = str.split("=")
    console.log(str)
    node1 = math.parse(str[0])
    node2 = math.parse(str[1])
  }
  if (equation === ''){
    flag = 3
  }
}


app.get("/", urlencodedParser, function (request, response) {
    response.sendFile(__dirname + "/register.html");
});
app.post("/register", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
    var equation  = request.body.equation
    var firstcond = request.body.firstcond
    var seconcond = request.body.seconcond
    parsevalue(firstcond,seconcond,equation)
    reduce(node1)
    z = math.simplify(node2.toString()).toString()
    console.log(z)
    if (flag === 1) {
      koshi()
    }
    if (flag === 2){
      edge()
    }
    if (flag === 3){
      //сообщение об ошибке
    }
    console.log(node2.toString())
    console.log(x_val)
    console.log(y_val)
    console.log(iteration)
    response.send(`${request.body.equation} - ${request.body.firstcond}`);
});
  
app.get("/", function(request, response){
    response.send("Devil");
});
  
app.listen(3000);