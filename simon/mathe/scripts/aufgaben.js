currentFunctionLength = 0;
expectedFunctionLength = 4;
func = 0;
diff = 0;
$(window).on('load', function () {
    newFunction();

    $("#length-number").on("input", function() {
        expectedFunctionLength = this.value;
    });
    $("#reload-button").click(function() {
        newFunction();
    });
    $("#answer-submit").click(function() {
        var input = $("#answer-field").val();
        if(math.symbolicEqual(input,diff)) {
            newFunction();
        }
    });
    $("#answer-field").keydown(function (e) {
        var input = $(this).val();
        if (e.which == 13) {
            if(math.symbolicEqual(input,diff)) {
                newFunction();
            }
        }
    });
});
function createRandomFunction() {
    func = "";
    var i=0;
    while(currentFunctionLength < expectedFunctionLength) {
        func += addFunctionPart(randomRange(1,4))
        i++;
    }
    return func.substring(1);
}
function addFunctionPart(type) {
    var output = ""
    if (currentFunctionLength >= expectedFunctionLength) {
        return "";
    }
    switch(type) {
        case(1):
            if (randomRange(1,3) < 3)
            {
                output += randomOperator()+"x^"+randomRange(-6,6);
                currentFunctionLength++;
            } else {
                output += randomOperator()+"x^("+randomRange(1,10)+"/"+randomRange(1,10)+")";
                currentFunctionLength++;
            }
        break;
        case(2):
            output += randomOperator()+"e^x";
            currentFunctionLength++;
        break;
        case(3):
            var inside = ""
            var repeat = randomRange(1,4)
            for(var i=0;i<repeat;i++)
            {
                inside += addFunctionPart(randomRange(1,3))
                currentFunctionLength++;
            }
            inside = inside.substring(1);
            output += randomOperator()+"sin("+inside+")";
        break;
        case(4):
            var inside = ""
            var repeat = randomRange(1,4)
            for(var i=0;i<repeat;i++)
            {
                inside += addFunctionPart(randomRange(1,3))
                currentFunctionLength++;
            }
            inside = inside.substring(1);
            output += randomOperator()+"log("+inside+")";
        break;
    }
    return output;
}
function randomOperator() {
    rand = randomRange(1,4)
    switch(rand) {
        case(1):
            output = "+"
        break;
        case(2):
            output = "-"
        break;
        case(3):
            output = "*"
        break;
        case(4):
            output = "/"
        break;
    }
    return output;
}
function randomRange(min,max) {
    return Math.round((Math.random()*(max-min))+min);
}
function newFunction() {
    do //No ln(e^x) or e^x/e^x -> Too easy!
    {
        currentFunctionLength = 0;
        func = math.parse(createRandomFunction());
    } while (math.symbolicEqual(math.derivative(func,"x"),0) || math.symbolicEqual(math.derivative(func,"x"),1));
    $("#question").text("$$"+math.parse(func.toString()).toTex()+"$$");
    diff = math.derivative(func,"x");
    $("#question2").text("$$"+math.parse(diff.toString()).toTex()+"$$");
    MathJax.typesetPromise();
}