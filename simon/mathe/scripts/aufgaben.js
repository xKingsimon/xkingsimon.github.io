currentFunctionLength = 0;
expectedFunctionLength = 2;
func = 0;
diff = 0;
$(window).on('load', function () {
    newFunction()
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
    MathJax.typesetPromise();
});
function createRandomFunction() {
    func = "";
    var i=0;
    while(currentFunctionLength < expectedFunctionLength) {
        func += addFunctionPart(randomRange(1,3))
        i++;
    }
    return func.substring(1);
}
function addFunctionPart(type) {
    var output = ""
    switch(type) {
        case(1):
            if (randomRange(1,3) == 4)
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
            var repeat = randomRange(1,3)
            for(var i=0;i<repeat;i++)
            {
                inside += addFunctionPart(randomRange(1,2))
            }
            inside = inside.substring(1);
            console.log("in: "+inside)
            output += randomOperator()+"sin("+inside+")";
            currentFunctionLength++;
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
    func = math.parse(createRandomFunction());
    console.log(func.toString())
    $("#question").text("$$"+math.parse(func.toString()).toTex()+"$$");
    diff = math.derivative(func,"x");
    console.log(diff);
    $("#question2").text("$$"+math.parse(diff.toString()).toTex()+"$$");
    const checkboxes = document.querySelectorAll('input[name="select-math-checkbox"]');

    for (var i=0; i<checkboxes.length; i++) {
        
    }
}