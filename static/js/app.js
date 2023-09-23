url= "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

d3.json(url).then((d) => {
    console.log(d);
});



function dropdown (){
    d3.json(url).then((d) => {

let dropdownmenu=d3.select("#selDataset")

        let names=d.names

        names.forEach((element) => {
            dropdownmenu
            .append("option")
            .text(element)
            .property("value", element); 
          });
          charts (names[0])
          showmetadata(names[0])
          
    });

}

dropdown ()

function optionChanged(sample_id){
    charts (sample_id)
    showmetadata(sample_id)

}
function charts (sample_id) {
    d3.json(url).then((d) => {

        
        
                let samples=d.samples
                let newArray = samples.filter(number => number.id == sample_id)[0];
                let otu_ids=newArray.otu_ids
                let otu_labels=newArray.otu_labels
                let sample_values=newArray.sample_values

                var bubbledata = [{
                    x: otu_ids,
                    y: sample_values,

                    text:otu_labels,
                    mode: 'markers',
                    marker: {
                      color: otu_ids,
                     
                      size:sample_values,
                    }
                }];
                  
                  
                  
                  var bubblelayout = {
                    title: 'bubblechart',
                    showlegend: false,
                    
                  };
                  
                  Plotly.newPlot('bubble', bubbledata, bubblelayout);
                  
                  var barData=[{
                    x:sample_values.slice(0,10).reverse(),
                    y:otu_ids.slice(0,10).map(otu_id=>"OTU "+otu_id).reverse(),
                    text:otu_labels.slice(0,10).reverse(),
                    type:"bar",
                    orientation:"h"
                  }]
                  var barlayout= {}
                  Plotly.newPlot('bar',barData,barlayout)

        
                
            });


}
function showmetadata(sample_id){
  d3.json(url).then((d) => {

    let metadata = d.metadata.filter(number => number.id == sample_id)[0];

    let panel=d3.select("#sample-metadata")
    panel.html("")
    for (key in metadata){
      panel.append("p").text(key.toUpperCase()+ ": "+metadata[key])
    }
  })
}
