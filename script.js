document.getElementById("ref").style.visibility = "hidden";



function getInputValue() {
    // Selecting the input element and get its value 
    var inputVal = document.getElementById("cf_id").value;
    console.log(inputVal);
    //  all(inputVal);

    // Displaying the value
    // alert(this.inputVal);
    return inputVal;


}


function getRandomRgb() {
    var num = Math.round(0xffffff * Math.random());
    var r = num >> 16;
    var g = num >> 8 & 255;
    var b = num & 255;
    var a = 0.6;
    var aa = 1;
    // it returns border background color as well as border color
    return 'rgba(' + r + ', ' + g + ', ' + b + ',' + a + ')', 'rgba(' + r + ', ' + g + ', ' + b + ',' + aa + ')';
}

function getRandomRgb_() {
    var num = Math.round(0xffffff * Math.random());
    var r = num >> 16;
    var g = num >> 8 & 255;
    var b = num & 255;
    var a = 0.6;
    var aa = .2;
    // it returns border background color as well as border color
    return 'rgba(' + r + ', ' + g + ', ' + b + ',' + a + ')', 'rgba(' + r + ', ' + g + ', ' + b + ',' + aa + ')';
}






// calling the function for drawing Graph


// implementing function for finding contest average accuracy and practice average accuracy

async function all() {




    // e.preventDefault();

    // console.log("hello world");
    var rating_data = [];

    var user = getInputValue();
    var correctInContest = 0;
    var wrongInContest = 0;
    var correctInPractice = 0;
    var wrongInPractice = 0;
    var contestAccuracy;
    var practiceAcuracy;
    var verdict = {};
    var verdict_type = new Set();
    var questionRating = {};
    var questionRating_types = new Set();
    var language = {};
    var language_types = new Set();
    var question_index_types = new Set();
    var question_index_count = {}; 
    
    var max_Rank=10000000000;
    var best_rannk = 0;


    // function calling for getting user input
    user = getInputValue();






    // console.log(user);
    //  converting promice into json format using Api 
    let submissionApi = `https://codeforces.com/api/user.status?handle=${user}`;


    // console.log("start");
    const promice = await fetch(submissionApi);

    console.log(promice.ok);
    if (promice.ok == false) {
        alert("Wrong username possibly");
        location.reload(true);


    } else {
        const data = await promice.json();

        var n = (data.result.length);
        if (n == 0 || data.status == 'FAILED') {
            alert("Wrong username possibly");
            location.reload(true);

        } else {
            var i;
            var array = [];
            for (i = 0; i < n; i++) {
                if (data.result[i].author.participantType == 'PRACTICE') {
                    if (data.result[i].verdict == 'OK') {
                        correctInPractice += 1;
                    } else {
                        wrongInPractice += 1;
                    }

                } else {
                    if (data.result[i].verdict == 'OK') {
                        correctInContest += 1;
                    } else {
                        wrongInContest += 1;
                    }

                }

            }
            // console.log(correctInContest);
            contestAccuracy = (correctInContest / (correctInContest + wrongInContest)) * 100;

            practiceAcuracy = (correctInPractice / (correctInPractice + wrongInPractice)) * 100;
            // console.log((correctInContest / (correctInContest + wrongIncontest)) * 100);
            // console.log(practiceAcuracy);
            //options for pie chart



            // implmenting function for tag wise problem count
            var tagWiseProblem = {};
            var tagWiseTotal = {};
            var pb_list = [];
            var total_pb_list = [];




            for (i = 0; i < n; i++) {
                var list_total;
                var list_total = data.result[i].problem.tags;
                for (var j = 0; j < list_total.length; j++) {

                    total_pb_list.push(list_total[j]);
                    tagWiseTotal[list_total[j]] = 0;
                }



                if (data.result[i].verdict == 'OK') {
                    var list;
                    var list = data.result[i].problem.tags;



                    for (var j = 0; j < list.length; j++) {

                        pb_list.push(list[j]);
                        tagWiseProblem[list[j]] = 0;
                    }
                }

            }


            for (var i = 0; i < pb_list.length; i++) {
                tagWiseProblem[pb_list[i]] += 1;
            }
            for (var i = 0; i < total_pb_list.length; i++) {
                tagWiseTotal[total_pb_list[i]] += 1
            }
            // console.log(tagWiseProblem);
            // console.log(tagWiseTotal);
            var keys = Object.keys(tagWiseProblem);
            var values = Object.values(tagWiseProblem);


            // console.log(keys);
            // console.log(values);
            var bg_color = [];
            var borderColor = [];
            for (var i = 0; i < keys.length; i++) {
                var x = getRandomRgb_();

                bg_color.push(x);
                x = x.slice(0, x.length - 4);
                x += "5)";
                // console.log(x);
                borderColor.push(x);
            }


            // PLOTTING THE PIE CHART FOR TAGWISE PROBLEM LIST AND TAGWISE ACCURACY 
            var options_tag_accuracy = {
                responsive:true,
                aspectRatio:1.5,
                maintainAspeectRatio:true,
                title: {
                    display: true,
                    position: "top",
                    text: `Tagwise Problem Count  of ${user}`,
                    fontSize: 18,
                    fontColor: "#111"
                },
                legend: {
                    display: true,
                    //   position: "boundry",
                    labels: {
                        fontColor: "#333",
                        fontSize: 12
                    }
                }
            };
            var ctx = document.getElementById('myChart3').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: keys,
                    datasets: [{
                        label: 'solved problem count(TAGWISE)',
                        data: values,
                        backgroundColor: bg_color,
                        borderColor: borderColor,
                        borderWidth: 2
                    }]
                },
                options:options_tag_accuracy,

            });

            var accuracy_tagwise = {};

            for (var i = 0; i < keys.length; i++) {
                accuracy_tagwise[keys[i]] = (tagWiseProblem[keys[i]] / tagWiseTotal[keys[i]]).toPrecision(2);
            }
            // console.log(accuracy_tagwise);

            var ctx = document.getElementById('myChart4').getContext('2d');
            var options = {
                responsive: true,
                aspectRatio:1.5,
                maintainAspeectRatio:true,

                title: {
                    display: true,
                    position: "top",
                    text: "TAGWISE ACCURACY",
                    fontSize: 18,
                    fontColor: "#111"
                },
                legend: {
                    display: true,
                    position: "right",
                    labels: {
                        fontColor: "#333",
                        fontSize: 12
                    }
                }
            };

            var myChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: Object.keys(accuracy_tagwise),
                    datasets: [{
                        label: 'Tagwise accuracy',
                        data: Object.values(accuracy_tagwise),
                        backgroundColor: bg_color,
                        borderColor: borderColor,
                        borderWidth: 2
                    }]
                },
                options: options

            });



            // verdict+language+question types
            for (var i = 0; i < n; i++) {
                language_types.add(data.result[i].programmingLanguage);
                questionRating_types.add(data.result[i].problem.rating)
                verdict_type.add(data.result[i].verdict); 
                question_index_types.add(data.result[i].problem.index);


            }
            // console.log(language_types);
            // console.log(verdict_type);
            // console.log(questionRating_types)
            console.log(question_index_types)

            for (let i of language_types) {
                language[i] = 0;
                // console.log(i);
            }
            for (let i of verdict_type) {
                verdict[i] = 0;
            }
            for (let i of questionRating_types) {
                questionRating[i] = 0;
            }
            // in question_index_types (a1 a1) = a similarily for all.... 
            for (let i of question_index_types) {
                question_index_count[i[0]] = 0;
            }
            console.log(question_index_count);
            // console.log(language);
            // console.log(questionRating);
            for (i = 0; i < n; i++) {
                language[data.result[i].programmingLanguage] += 1;
                verdict[data.result[i].verdict] += 1;
                if (data.result[i].verdict == 'OK') {

                    questionRating[data.result[i].problem.rating] += 1;
                    question_index_count[data.result[i].problem.index[0]]+=1;

                }


            }
            // console.log(question_index_count);

            // plotting graph for question type in mychart5 

            var keys = Object.keys(questionRating);
            var values = Object.values(questionRating);
            var color = [];
            var border_color = [];
            for (var i = 0; i < keys.length; i++) {
                var x = getRandomRgb_();

                color.push(x);
                x = x.slice(0, x.length - 4);
                x += "5)";
                // console.log(x);
                border_color.push(x);
            }
            new Chart(document.getElementById("myChart5"), {
                type: 'bar',
                data: {
                    labels: keys,
                    datasets: [{
                        label: "Problem solved",
                        backgroundColor: color,
                        borderColor: border_color,
                        data: values,
                        borderWidth: 3
                    }]
                },
                options: {
                    aspectRatio:1.3,
                    maintainAspeectRatio:true,
                    legend: {
                        display: true
                    },
                    title: {
                        display: true,
                    }
                }
            });
            // plotting vedict (no of correct and wrong attempts in mychart1)
            // collecting data 
            verdict_color = [];
            verdict_border_color = [];
            var keys_verdict = Object.keys(verdict);
            var values_verdict = Object.values(verdict);
            // plotting  
            for (var i = 0; i < keys.length; i++) {
                var x = getRandomRgb_();

                verdict_color.push(x);
                x = x.slice(0, x.length - 4);
                x += "5)";
                // console.log(x);
                verdict_border_color.push(x);
            }
            var options_verdict = {
                responsive:true,
                aspectRatio:1,
                maintainAspeectRatio:true,                title: {
                    display: true,
                    position: "top",
                    text: `Verdicts of ${user}`,
                    fontSize: 18,
                    fontColor: "#111"
                },
                legend: {
                    display: true,
                    //   position: "boundry",
                    labels: {
                        fontColor: "#333",
                        fontSize: 12
                    }
                }
            };
            var ctx = document.getElementById('myChart1').getContext('2d');


            var myChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: keys_verdict,
                    datasets: [{
                        label: 'Tagwise accuracy',
                        data: values_verdict,
                        backgroundColor: verdict_color,
                        borderColor: verdict_border_color,
                        borderWidth: 2
                    }]
                },
                options: options_verdict

            });

            // plotting graph for different languages of submissions  in mychart6
            lang_color = [];
            lang_border_color = [];
            var keys_lang = Object.keys(language);
            var values_lang = Object.values(language);
            // plotting  
            for (var i = 0; i < keys.length; i++) {
                var x = getRandomRgb_();

                lang_color.push(x);
                x = x.slice(0, x.length - 4);
                x += "5)";
                // console.log(x);
                lang_border_color.push(x);
            }
            var options_lang = {
                responsive: true,
                aspectRatio:1.5,
                maintainAspeectRatio:true,
                title: {
                    display: true,
                    position: "top",
                    text: `Languages of ${user}`,
                    fontSize: 18,
                    fontColor: "#111"
                },
                legend: {
                    display: true,
                    //   position: "boundry",
                    labels: {
                        fontColor: "##000000",
                        fontSize: 15
                    }
                }
            };
            var ctx = document.getElementById('myChart6').getContext('2d');


            var myChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: keys_lang,
                    datasets: [{
                        label: 'Tagwise accuracy',
                        data: values_lang,
                        backgroundColor: lang_color,
                        borderColor: lang_border_color,
                        borderWidth: 2
                    }]
                },
                options: options_lang

            });
            // plotting accuracy in contests Vs acuracy in Practice in mychart2
            var ctx = document.getElementById('myChart2').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Accuracy in contests', 'Accuaracy in practice'],
                    datasets: [{
                        label: '% accuracy',
                        data: [contestAccuracy, practiceAcuracy],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',

                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',

                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive:true,
                    aspectRatio:1,
                    maintainAspeectRatio:true,
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });


        }
        // plotting question_index_count in mychart7 
            var keys = Object.keys(question_index_count);
            var values = Object.values(question_index_count);
            var question_index_color = [];
            var question_index_border_color = [];
            for (var i = 0; i < keys.length; i++) {
                var x = getRandomRgb_();

                question_index_color.push(x);
                x = x.slice(0, x.length - 4);
                x += "5)";
                // console.log(x);
                question_index_border_color.push(x);
            }
            var options_question_index = {
                responsive: true,
                aspectRatio:1.5,
                maintainAspeectRatio:true,
                title: {
                    display: true,
                    position: "top",
                    text: `Count of questions Vs Question Index of  ${user}`,
                    fontSize: 18,
                    fontColor: "#000000"
                },
                legend: {
                    aspectRatio:1,
                    maintainAspeectRatio:true,
                    display: true,
                    //   position: "boundry",
                    labels: {
                        fontColor: "##000000",
                        fontSize: 18
                    }
                }
            };
            new Chart(document.getElementById("myChart7"), {
                type: 'bar',
                data: {
                    labels: keys,
                    fontSize:15,
                    datasets: [{
                        label: " Solved Problems count Vs Index ",
                        fontSize : 15,
                        backgroundColor: question_index_color,
                        borderColor: question_index_border_color,
                        data: values,
                        borderWidth: 2
                    }]
                },
                options: options_question_index
            });
           



    }

    document.getElementById("ref").style.visibility = "visible";
    document.getElementById("myChart1").style="border: 2px solid red";
    // document.getElementById("myChart1").style="margin: 5px 5px 5px 5px";

    document.getElementById("myChart2").style="border: 2px solid blue";

    document.getElementById("myChart3").style="border: 2px solid pink";

    document.getElementById("myChart4").style="border: 2px solid yellow";
    document.getElementById("myChart5").style="border: 2px solid green";
    document.getElementById("myChart6").style="border: 2px solid orange";
    document.getElementById("myChart7").style="border: 2px solid violet";

}






// event Listeners 

submit_button = document.querySelector("#bb");
submit_button.addEventListener("click", all);
refresh_button= document.querySelector("#ref");

refresh_button.addEventListener("click", function(){
    location.reload(true);
});

document.querySelector("#cf_id").addEventListener('keypress', function (event) {
    if (event.which === 13 || event.keyCode === 13 || event.key === "Enter")

      all();

    
});



