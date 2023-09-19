// reading into D3 library
var data;
d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(function (response){
data = response
// console.log(response) // JS way to print
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


function chartInfo (id){
    console.log(id)
    var thisSample = data.samples.filter((obj) => obj.id == id)[0];
    console.log(thisSample);

//Step 2: create horizontal bar chart
// M14, D2, A3: stu greek mapping

    var otuID = thisSample.otu_ids
    var sampleValues = thisSample.sample_values
    var otuLabels = thisSample.otu_labels

    let barTrace = {
        x: sampleValues.slice(0,10).reverse(),
        y: otuID.map(function (o){
            return "OTU" + o
        }).slice(0,10).reverse(),
        text: otuLabels.slice(0,10).reverse(),
        type: "bar",
        orientation: "h"
    }
// data trace array
    let barData = [barTrace];

    let layout = {
        title: "Top 10 OTU per patient"
    }

    Plotly.newPlot("bar", barData, layout);

//Step 3: Create a bubble chart that displays each sample
    let bubbleTrace= {
        x: otuID,
        y: sampleValues,
        marker: {
            size: sampleValues,
            color: otuID,
            colorscale: "Jet"
        },
        text: otuLabels,
        mode: "markers"
    }

    let bubbleData = [bubbleTrace];

    layout = {
        title: "Bubble Map"
    }

    Plotly.newPlot("bubble", bubbleData, layout)

 //Step 4: Display the sample metadata, the individuals dempgraphic information
    var thisMeta = data.metadata.filter((obj) => obj.id == id)[0];
    let metaData = d3.select("#sample-metadata")
    metaData.html("")
    //Step 5: Display each key-value pair from the metadata json object on the page
    Object.entries(thisMeta).forEach(function ([label,value]){
        metaData.append("div").html(`<b>${label}</b> ${value}`)
    })

}

//Step 6: Update all the plots when a new sample is selected. 
function optionChanged (userChange){
    console.log(userChange)
    chartInfo(userChange)
}


//Step 7: Deploy app to GitHub ,submit links to deployment and github repo. 

