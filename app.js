const express = require("express");
const bodyParser = require("body-parser");
const math = require("C:/Users/grey man/AppData/Roaming/npm/node_modules/mathjs");
const app = express();  
const urlencodedParser = bodyParser.urlencoded({extended: false});
var str = "3 * x + 2 = 7"
str = str.split('=') 
var node1 = math.parse(str[0])
var node2 = math.parse(str[1])

function inverse(op){
    switch (op) {
        case '+' :
        return '-'
        break
        case '-' :
        return '+'
        break
        case '*' :
        return '/'
        break
        case '/' :
        return '*'
        break
        case 'add' :
        return 'subtract'
        break
        case 'multiply' :
        return 'divide'
        break
        case 'divide' :
        return 'multiply'
        case 'subtract' :
        return 'add'
    }
}

console.log('aaaa')
console.log(math.parse('x - 1'))
console.log('aaaa')


node1.traverse(function (node, path, parent) {
  switch (node.type) {
    case 'OperatorNode':
      console.log(node.type, node.op, path)
      console.log(node.clone())
      if ((node.args[0].type == 'ConstantNode' || node.args[0].type == 'SymbolNode') && node.args[0].name != 'x') return node2 = new math.expression.node.OperatorNode(inverse(node.op), inverse(node.fn), [node2, node.args[0]])
      if ((node.args[1].type == 'ConstantNode' || node.args[1].type == 'SymbolNode') && node.args[1].name != 'x') return node2 = new math.expression.node.OperatorNode(inverse(node.op), inverse(node.fn), [node2, node.args[1]])
      node2 = math.parse(node2)
      console.log(' ')
      console.log(' ')
      break
    case 'ConstantNode':
      console.log(node.type, node.value, path)
      console.log(node.clone())
      console.log(' ')
      console.log(' ')
      break
    case 'SymbolNode':
      console.log(node.type, node.name, path)
      console.log(node.clone())

      console.log(' ')
      console.log(' ')
      break
    default:
      console.log(nod1.type, node.path)
  }
})

console.log(' ')
console.log(' ')
console.log(' ')
console.log(' ')
console.log(' ')
console.log(node2.toString())





















app.get("/", urlencodedParser, function (request, response) {
    response.sendFile(__dirname + "/register.html");
});
app.post("/register", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
    var equation  = request.body.equation
    var firstcond = request.body.firstcond
    var seconcond = request.body.seconcond
    response.send(`${request.body.equation} - ${request.body.firstcond}`);
});
  
app.get("/", function(request, response){
    response.send("Devil");
});
  
app.listen(3000);
