currentFunctionLength = 0;
expectedFunctionLength = 4;
func = 0;
diff = 0;
bestListMap = "";
db = new restdb("62cc9744cba57849d7caf95d");
namesArray = [[],[],[]];
$(window).on('load', function () {
    newFunction();
    loadScoreBoard();
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
            addScore(1);
        }
    });
    $("#answer-field").keydown(function (e) {
        var input = $(this).val();
        if (e.which == 13) {
            if(math.symbolicEqual(input,diff)) {
                newFunction();
                addScore(1);
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
    currentFunctionLength++;
    if (currentFunctionLength >= expectedFunctionLength) {
        return randomOperator()+"x"
    }
    console.log("current: "+currentFunctionLength);
    switch(type) {
        case(1):
            if (randomRange(1,3) < 3)
            {
                output += randomOperator()+"x^"+randomRange(-6,6);
            } else {
                output += randomOperator()+"x^("+randomRange(1,10)+"/"+randomRange(1,10)+")";
            }
        break;
        case(2):
            output += randomOperator()+"e^x";
        break;
        case(3):
            var inside = ""
            currentFunctionLength-=0.25;
            var repeat = randomRange(1,4)
            i=0;
            do
            {
                inside += addFunctionPart(randomRange(1,4))
                i++;
            } while(i<repeat && currentFunctionLength < expectedFunctionLength);
            inside = inside.substring(1);
            output += randomOperator()+"sin("+inside+")";
        break;
        case(4):
            var inside = ""
            currentFunctionLength-=0.25;
            var repeat = randomRange(1,4)
            i=0;
            do
            {
                inside += addFunctionPart(randomRange(1,4))
                i++
            } while(i<repeat && currentFunctionLength < expectedFunctionLength);
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

function addScore(points) {
    var input = $("#name-input").val();
    if (input != "none") {
        if (namesArray[1].includes(input)) {
            console.log("update");
            var position = $.inArray(String(input),namesArray[1])
            console.log(position)
            if (position > -1)
            {
                id = namesArray[0][position];
            } else {
                id = 0
                alert("id not found");
            }
            console.log(id)
            var jsondata = {"score": namesArray[2][position]+points};
            $.ajax({
                url: "https://johnsdorfer-3d8a.restdb.io/rest/ableitungsscore/"+id,
                beforeSend: function(xhr) { 
                    xhr.setRequestHeader('x-apikey', '62cc9744cba57849d7caf95d');
                },
                headers: {
                    "content-type": "application/json",
                    "x-apikey": "62cc9744cba57849d7caf95d",
                    "cache-control": "no-cache"
                },
                type: 'Put',
                data: JSON.stringify(jsondata),
                success: function () {
                    loadScoreBoard();
                },
                error: function(){
                  alert("Cannot send data");
                }
            });
        } else {
            console.log("add");
            var jsondata = {"username":String(input),"score":String(points)};
            $.ajax({
                url: "https://johnsdorfer-3d8a.restdb.io/rest/ableitungsscore",
                beforeSend: function(xhr) { 
                    xhr.setRequestHeader('x-apikey', '62cc9744cba57849d7caf95d');
                },
                headers: {
                    "content-type": "application/json",
                    "x-apikey": "62cc9744cba57849d7caf95d",
                    "cache-control": "no-cache"
                },
                type: 'Post',
                data: JSON.stringify(jsondata),
                success: function () {
                    loadScoreBoard();
                },
                error: function(){
                  alert("Cannot send data");
                }
            });
        }
    }
}
function loadScoreBoard() {
    console.log("loading scores");
    var query = {};
    var hints = {"$orderby": {"score": -1}};
    db.ableitungsscore.find(query, hints, function(err, res){
        if (!err){
            // res is an array of ableitungsscore instances
            for(i=0;i<res.length;i++)
            {
                currentPlayerMap = new Map(Object.entries(res[i]));
                console.log("currentPlayerArray")
                console.log(currentPlayerMap)
                namesArray[0].push(currentPlayerMap.get("_id"));
                namesArray[1].push(currentPlayerMap.get("username"));
                namesArray[2].push(currentPlayerMap.get("score"));
                $("#wrapper").append("<p class='score-new'>"+currentPlayerMap.get("username")+": "+currentPlayerMap.get("score")+"</p>");
            }
            $(".score").remove();
            $(".score-new").attr("class","score");
            console.log(namesArray);
        }
    });
}