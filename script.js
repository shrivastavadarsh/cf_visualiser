var user = 'unpossible';
let api = `https://codeforces.com/api/user.rating?handle=${user}`;
var rating_data = [];

function getRandomRgb() {
    var num = Math.round(0xffffff * Math.random());
    var r = num >> 16;
    var g = num >> 8 & 255;
    var b = num & 255;
    var a = 0.6;
    var aa = 1;
    // it returns border background color as well as border color
    return 'rgba(' + r + ', ' + g + ', ' + b + ',' + a + ')' //,  'rgba(' + r + ', ' + g + ', ' + b +','+ aa+')';
}
async function rating_changes() {
    const promice = await fetch(api);
    const data = await promice.json();
    // console.log(data);
    // console.log(data.result.length);

    var i;
    for (i = 0; i < data.result.length; i++) {

        if (i == 0) {
            var x = data.result[i].oldRating;

            var y = data.result[i].newRating;
            rating_data.push(x, y);
        } else {
            var y = data.result[i].newRating;
            rating_data.push(y);
        }

    }
    // console.log(rating_data);

}
// console.log(rating_data)
// console.log(data);

var y = [];




async function plotting1() {
    await rating_changes();
    var i;
    for (i = 0; i < rating_data.length; i++) {
        y.push(i);
    }
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: y,
            datasets: [{
                label: `codeforces Rating after every contest of ${user}`,
                data: rating_data,
                backgroundColor: 'rgba(54, 162, 235, 0.7)',
                borderColor: 'rgba(255, 99, 132, 1)',


            }],
            borderWidth: 1,
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false
                    }
                }]
            }
        }
    });


}





// calling the function for drawing Graph


// implementing function for finding contest average accuracy and practice average accuracy

var correctInContest = 0;
var wrongInContest = 0;
var correctInPractice = 0;
var wrongInPractice = 0;
var contestAccuracy;
var practiceAcuracy;

let submissionApi = `https://codeforces.com/api/user.status?handle=${user}`;

async function accuracy() {
    const promice = await fetch(submissionApi);
    const data = await promice.json();
    var n = (data.result.length);
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
  var options = {
    responsive: true,
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
    console.log(tagWiseProblem);
    console.log(tagWiseTotal);
    var keys = Object.keys(tagWiseProblem);
    var values = Object.values(tagWiseProblem);
    

    // console.log(keys);
    // console.log(values);
    var bg_color = [];
    var borderColor = [];
    for (var i = 0; i < keys.length; i++)

    {
        y = getRandomRgb();
        // console.log(1);
        bg_color.push(y);
        // borderColor.push(y2);
    }
    // PLOTTING THE PIE CHART FOR TAGWISE PROBLEM LIST AND TAGWISE ACCURACY 
    var ctx = document.getElementById('myChart3').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: keys,
            datasets: [{
                label: 'solved problem count(TAGWISE)',
                data: values,
                backgroundColor: bg_color,
                borderColor: 'white',
                borderWidth: 2
            }]
        },

    }); 

    var accuracy_tagwise = {};

    for (var i=0 ; i< keys.length;i++)
    {
        accuracy_tagwise[keys[i]]=(tagWiseProblem[keys[i]]/tagWiseTotal[keys[i]]).toPrecision(2);
    }
    console.log(accuracy_tagwise);

    var ctx = document.getElementById('myChart4').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(accuracy_tagwise),
            datasets: [{
                label: 'Tagwise accuracy',
                data: Object.values(accuracy_tagwise),
                backgroundColor: bg_color,
                borderColor: 'white',
                borderWidth: 2
            }]
        },
        options : options

    }); 




    










}

// calculating the accuracy 
async function plotting2() {
    await accuracy();
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
plotting2();
plotting1();
// console.log(tagWiseProblem);