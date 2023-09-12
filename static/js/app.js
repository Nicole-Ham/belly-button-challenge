// reading into D3 library
var data;
d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(function (response){
data = response
// console.log(response) // JS way to prit
idNames = response.names
// console.log(names)
dropDown = d3.select("#selDataset")
for(var i of idNames){
    // console.log(i)
    dropDown.append("option").text(i)
}
chartInfo(idNames[0])
})

// async function example(){
//     var data=await d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json");
//     console.log(data)
//     console.log(5)
// }
// example()

function optionChanged (userChange){
    console.log(userChange)
    chartInfo(userChange)
}

function chartInfo (id){
    console.log(id)
    var thisSample = data.samples.filter((obj) => obj.id == id)[0];
    console.log(thisSample);
}