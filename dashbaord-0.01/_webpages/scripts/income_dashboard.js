var Data;
var total_income = 0;
var maxIncome;

var topFiveMonths = [];
var topFiveAmount = [];

var topFiveType = [];
var topFiveTypeAmount = [];
var intArray;

var goal_amount;
var finalGloalAmount;

let goalChart;

$(function(){
	
	var income_data = JSON.parse(sessionStorage.getItem("INCOME_DASHDATA"));
	
	if(income_data != null && income_data != "" && income_data != undefined){
		
		_.each(income_data, function(item){
			if(item.amount != null && item.amount !="" && item.amount != undefined){
				total_income += parseFloat(item.amount);
			} 
		})
		maxIncome = _.max(income_data, (item) => parseFloat(item.amount));
	}
	$("#totalIncome").html(`&#8377;`+total_income)
	$("#topIncomeSource").html(maxIncome.income_type)
	$("#topIncomeAmount").html(`&#8377;`+maxIncome.amount)
	$("#bestMonth").html(maxIncome.month_of_receipt)
	
	
	
	goal_amount = sessionStorage.getItem("GOAL_AMOUNT");
	goal_amount = sessionStorage.getItem("GOAL_AMOUNT");
	
	if(goal_amount != null && goal_amount != "" && goal_amount != undefined){
		$("#Goalamount").val(goal_amount);
		goalAmountChart(finalGloalAmount)
	}
	
	
//---------------------------top five incomes by month-----------------------------------

	
async function fetchMonthData() {
    const strURL = request_url + "/income/groupBy/month/" + sessionStorage.getItem("USER_ID");
    
    try {
        const usrData = await getAPIdata(strURL,function(usrData){
			Data = usrData
			//console.log(usrData); // This will log after Data is set
			
			if(Data != null && Data != undefined && Data != ""){
				if(Data.length > 5){
					Data = Data.slice(0, 5);
				}
				_.each(Data, function(item){
					topFiveMonths.push(item.month_of_receipt)
					topFiveAmount.push(item.total_amount)
				})
			}
		});

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

fetchMonthData();



//---------------------------top five incomes by income type----------------------------------
const strURL = request_url + "/income/groupBy/incomeType/" + sessionStorage.getItem("USER_ID");
getAPIdata(strURL,function(usrData){	
	sessionStorage.setItem('INCOME_GROUPBY_MONTH',JSON.stringify(usrData))
})

var groupbyMonthData = JSON.parse(sessionStorage.getItem('INCOME_GROUPBY_MONTH'));
if(groupbyMonthData != null && groupbyMonthData != undefined && groupbyMonthData != ""){
	if(groupbyMonthData.length > 5){
		groupbyMonthData = groupbyMonthData.slice(0, 5);
	}
	_.each(groupbyMonthData, function(item){
		topFiveType.push(item.income_type)
		topFiveTypeAmount.push(item.total_amount)
	})
}
intArray = topFiveTypeAmount.map(str => +str);
 
 
	   const doughnutLabelsLine = {
	    		  id: "doughnutLabelsLine",
	    		  
	    		  beforeDraw(chart, args, options) {
	    		    const {
	    		      ctx,
	    		      chartArea: { width, height, top, bottom, left, right} } = chart;

					const sum = chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
					
	    		    chart.data.datasets.forEach((dataset, i) => {
	    		    	chart.getDatasetMeta(i).data.forEach((datapoint,index) => {
	    		    		
	    		    		//console.log(chart.data.labels)
	    		    		const {x,y} = datapoint.tooltipPosition();
	    		    		
	    		/*     		ctx.fillStyle = dataset.borderColor[index];
	    		    		ctx.fill();*/
	    		    		
	    					//console.log(x);    		
							
	    					const halfwidth = width / 2;
	    					const halfheight = height / 2;
	    					
	    					
	    					const xLine = x >= halfwidth ? x + 30: x -30;
	    					const yLine = y >= halfheight ? y + 30: y -30;
	    					const extraLine = x >= halfwidth ? 15 : -15
	    					
	    					
	    					
	    					ctx.beginPath();
	    					ctx.moveTo(x,y);
	    					ctx.lineTo(xLine, yLine);
	    					ctx.lineTo(xLine + extraLine ,yLine);
	    					ctx.strokeStyle = dataset.borderColor[index];
	    					ctx.stroke();
	    		    		
	    					const textWidth = ctx.measureText(chart.data.labels[index]).width;
	    					
	    					
	    					const textXPosition = x >= halfwidth ? 'left' : 'right';
	    					const plusFivePx = x >= halfwidth ? 5 : -5;
	    					ctx.textBaseline ='middle';
	    					ctx.textAlign = textXPosition;
	    					//ctx.fillStyle = dataset.borderColor[index];
	    					ctx.fillStyle = "black";
	    					ctx.font='12px Arial';
/*	    					ctx.fillText(
	                		((chart.data.datasets[0].data[index] * 100) / sum).toFixed(2) +
			                  "%",
			                xLine + extraLine + plusFivePx,
			                yLine
			              );*/
						  ctx.fillText(
						      chart.data.labels[index], // Display the label text
						      xLine + extraLine + plusFivePx,
						      yLine
						  );
	    								
	    		    	})
	    		    })
	    		  },
	    		};
	    		

	
				const pieLabelsLine = {
				        id: "pieLabelsLine",
				        beforeDraw(chart) {
				          const {
				            ctx,
				            chartArea: { width, height },
				          } = chart;

				          const cx = chart._metasets[0].data[0].x;
				          const cy = chart._metasets[0].data[0].y;

				          const sum = chart.data.datasets[0].data.reduce((a, b) => a + b, 0);

				          chart.data.datasets.forEach((dataset, i) => {
				            chart.getDatasetMeta(i).data.forEach((datapoint, index) => {
				              const { x: a, y: b } = datapoint.tooltipPosition();

				              const x = 2 * a - cx;
				              const y = 2 * b - cy;

				              // draw line
				              const halfwidth = width / 2;
				              const halfheight = height / 2;
				              const xLine = x >= halfwidth ? x + 20 : x - 20;
				              const yLine = y >= halfheight ? y + 20 : y - 20;

				              const extraLine = x >= halfwidth ? 10 : -10;

				              ctx.beginPath();
				              ctx.moveTo(x, y);
				              ctx.arc(x, y, 0, 0, 2 * Math.PI, true);
				              ctx.fill();
				              ctx.moveTo(x, y);
				              ctx.lineTo(xLine, yLine);
				              ctx.lineTo(xLine + extraLine, yLine);
				              ctx.strokeStyle = dataset.backgroundColor[index];
				              //ctx.strokeStyle = "black";
				              ctx.stroke();

				              // text
				              const textWidth = ctx.measureText(chart.data.labels[index]).width;
				              ctx.font = "12px Arial";
				              // control the position
				              const textXPosition = x >= halfwidth ? "left" : "right";
				              const plusFivePx = x >= halfwidth ? 5 : -5;
				              ctx.textAlign = textXPosition;
				              ctx.textBaseline = "middle";
				              //ctx.fillStyle = dataset.backgroundColor[index];
				              //ctx.fillStyle = dataset.borderColor[index];
				              ctx.fillStyle = "black";

							  ctx.fillText(
							      chart.data.labels[index], // Display the label text
							      xLine + extraLine + plusFivePx,
							      yLine
							  );
				            });
				          });
				        },
				      };  				
				
				
					  
				
					  const incomeByTypeData = {
					      labels: topFiveType,
					      datasets: [{
					        label: 'Production Machine By Volume',
					        data: intArray,
					        borderWidth: 0.8,
					        backgroundColor: [
					          '#DC3535FF',
					          '#FFB200FF',
					          '#FF4949FF',
					          '#E8AA42FF',
					          '#CD104DFF',
					        ],
					        borderColor:[
					          '#DC3535FF',
					          '#FFB200FF',
					          '#FF4949FF',
					          '#E8AA42FF',
					          '#CD104DFF',
					        ],
					      }]
					    };

					    // Options for the chart
					    const incomeByTypeOptions = {
					  	responsive: true,
					      maintainAspectRatio: false,
					      plugins: {
					        tooltip: {
					          backgroundColor: 'white',
					          bodyColor: 'black',
					          titleColor: 'black',
					          footerColor: 'black',
					          borderColor: '#ddd',
					          borderWidth: 1,
					          callbacks: {
					            label: function(tooltipItem) {
					              const dataset = tooltipItem.dataset;
					              const index = tooltipItem.dataIndex;
					              const machineName = tooltipItem.chart.data.labels[index];
					              const value = dataset.data[index];
					              const productionVolume = value;

					              return [
					                `Month: ${machineName}`,
					                `Amount: ${`\u20B9`+ productionVolume.toLocaleString()}`
					              ];
					            }
					          },
					          displayColors: false
					        },
					        legend: {
					          display: false,
					        },
					        datalabels: {
					  		display:false,
					          color: 'white',
					          anchor: 'center',
					          align: 'center',
					          formatter: function(value) {
					            return value.toLocaleString() + '%';
					          },
					        },
					        pieLabelsLine: {} // Ensure this plugin is added
					      },
					      layout: {
					        padding: {
					          top: 45,
					          bottom: 80 // Adjusted bottom padding
					        }
					      },
					              scales: {
					            y: {
					              display: false,
					              beginAtZero: true,
					              ticks: {
					                display: false,
					              },
					              grid: {
					                display: false,
					              },
					            },
					            x: {
					              display: false,
					              ticks: {
					                display: false,
					              },
					              grid: {
					                display: false,
					              },
					            },
					          },
					    };

					    // Create the chart
					    const ct4 = document.getElementById('incomeByType').getContext('2d');
					    const chart1 = new Chart(ct4, {
					      type: 'pie',
					      data: incomeByTypeData,
					      options: incomeByTypeOptions,
					      plugins: [pieLabelsLine] // Ensure the plugin is added here
					    });
					   
//--------------------------------------------------------------------------------------------------------	 
const incomeByMonthData = {
  labels: topFiveMonths,
  datasets: [{
    label: 'Production Machine By Volume',
    data: topFiveAmount,
    borderWidth: 1,
    backgroundColor: [
      '#DC3535FF',
      '#FFB200FF',
      '#FF4949FF',
      '#E8AA42FF',
      '#CD104DFF',
    ],
    borderColor: [
      '#DC3535FF',
      '#FFB200FF',
      '#FF4949FF',
      '#E8AA42FF',
      '#CD104DFF',
    ],
  }]
};

// Options for the bar chart
const incomeByMonthOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      backgroundColor: 'white',
      bodyColor: 'black',
      titleColor: 'black',
      footerColor: 'black',
      borderColor: '#ddd',
      borderWidth: 1,
      callbacks: {
        label: function(tooltipItem) {
          const dataset = tooltipItem.dataset;
          const index = tooltipItem.dataIndex;
          const machineName = tooltipItem.chart.data.labels[index];
          const value = dataset.data[index];
          const productionVolume = value;

          return [
           // `Month: ${machineName}`,
            `Amount: ${`\u20B9` + productionVolume.toLocaleString()}`
          ];
        }
      },
      displayColors: false
    },
    legend: {
      display: false,
    },
  },
  layout: {
    padding: {
      top: 20,
      bottom: 20
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: (value) => `₹${value.toLocaleString()}`, // Format tick labels
        color: '#666',
      },
      grid: {
        color: '#e0e0e0'
      },
      title: {
        display: true,
        text: 'Amount (₹)',
        color: '#333',
        font: {
          size: 14,
          weight: 'bold',
        }
      }
    },
    x: {
      ticks: {
        color: '#666',
      },
      grid: {
        display: false
      },
      title: {
        display: true,
        text: 'Months',
        color: '#333',
        font: {
          size: 14,
          weight: 'bold',
        }
      }
    },
  },
};

// Create the bar chart
const ct9 = document.getElementById('incomeByMonth').getContext('2d');
const chart2 = new Chart(ct9, {
  type: 'bar', // Change the type to 'bar'
  data: incomeByMonthData,
  options: incomeByMonthOptions
});

	

	
});



function incomeBack(){
	window.location.href="incomeinq.html"
}



function goalAmount(){

	var goalAmount = $("#Goalamount").val();
	sessionStorage.setItem("GOAL_AMOUNT",goalAmount);

	
	if(total_income != null && total_income != "" && total_income != undefined && goalAmount != null && goalAmount != "" && goalAmount != undefined){
			finalGloalAmount =  ((parseFloat(total_income)/parseFloat(goalAmount))*100).toFixed(2); 

			goalAmountChart(finalGloalAmount)
	}
}



function goalAmountChart(Data){

	const availabilityData = {
			labels: ['Financial Goal'],
			datasets: [{
				label: 'Financial Goal',
				data: [Data, 100-Data],
				borderWidth: 0,
				backgroundColor: [
					'#1dc061ff',
					'#e0e0e0'
				]
			}]
		};
	const config = {
	type: 'doughnut',
	data: availabilityData,
	options: {
		responsive: true, 
		maintainAspectRatio: false,
		cutout: '70%',	
			plugins: {
				autocolors: false,
				annotation: {
					annotations: {
						box1: {
							type: 'line',
							xMin: 0,
							xMax: 1,
							yMin: 0,
							yMax: 1,
							backgroundColor: 'rgba(255, 99, 132, 0)', // Fully transparent background
							borderColor: 'rgba(255, 99, 132, 0)', // Transparent border color
							borderWidth: 2, // Line width set to 0 (invisible line)
							label: {
								enabled: true,
								content: Data+'%',
								position: 'center', // Position of the label
								backgroundColor: 'rgba(0, 0, 0, 0)', // Transparent background for label
								color: '#1dc061ff', // Text color
								font: {
									size:25, // Set font size here
									//weight: 'bold', // Optional: make the font boldke the font bold
								},
							}
						}
					}
				},
				tooltip:{
					backgroundColor: 'white',
					bodyColor: 'black', 
					titleColor: 'black', 
					footerColor: 'black', 
					borderColor: '#ddd',
					borderWidth: 1,
				callbacks:{
						label: function(tooltipItem){
							const value = tooltipItem.raw;
							
							return [
								`Goal Amount: ${value.toLocaleString()}%`
							];
							
						}
					},
					displayColors: false
				},
				legend:{
					display:false,
				},
				datalabels: {
					display: false,
					color: 'white', // Color of the data labels
					anchor: 'center', // Anchor position
					align: 'center',  // Align position
					  formatter: function(value, context) {
							return value.toLocaleString() + '%'; 
					},
				},
				
			},
			layout: {
				//height: 150,
				padding: {
					top: 0,
					  bottom: 40
				}
			},
		}
	};

	if (goalChart) {
		goalChart.destroy();
	}


//const ctz = new Chart(document.getElementById('AvailabilityChart').getContext('2d'), config);
	const ctz = document.getElementById('goalAmount').getContext('2d');
	goalChart = new Chart(ctz, config);

}