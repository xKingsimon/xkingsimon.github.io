currentFunctionLength = 0;
expectedFunctionLength = 2;
$(window).on('load', function () {
    var x = createRandomFunction();
    var aufgabeFunktion = nerdamer.convertFromLaTeX(x);
    var string = aufgabeFunktion.toString();
    $("#question").text("$$"+x+"$$");
    console.log(nerdamer.convertToLaTeX(string))
    var ableitung = nerdamer.diff(aufgabeFunktion,"x");
    var ableitungString = ableitung.toString();
    var ableitungVereifacht = nerdamer('simplify('+ableitungString+')');
    var ableitungVereifachtString = ableitungVereifacht.toString();
    $("#question2").text("$$"+ableitungString.toString()+"$$");
    $("#question3").text("$$"+nerdamer.convertToLaTeX(ableitungVereifachtString)+"$$");
    const checkboxes = document.querySelectorAll('input[name="select-math-checkbox"]');

    for (var i=0; i<checkboxes.length; i++) {
        
    }
    $("#answer-field").keydown(function (e) {
        var input = $(this).val();
        if (e.which == 13) {
            console.log(nerdamer(input).eq(ableitung));
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
                output += randomOperator()+"{x^"+randomRange(-6,6)+"}";
                currentFunctionLength++;
            } else {
                output += randomOperator()+"\\sqrt["+randomRange(2,10)+"]{x}";
                currentFunctionLength++;
            }
        break;
        case(2):
            output += randomOperator()+"{e^x}";
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
            output += randomOperator()+"\\sin("+inside+")";
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