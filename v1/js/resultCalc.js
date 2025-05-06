let advice1 = `
    Your carbon footprint is quite nice, you've been saving the earth due to your generous activites. However there are more improvements that can be made. Want to share your results add your email address and save it locally to your device. Don't forget to share`

const calculateUserTotal = function(userAnswers) {
    let sources = [];
    let co2Values = []
    for (let [source, value] of Object.entries(userAnswers)) {
        sources.push(source);
        co2Values.push(value)
    }
    
    let total = 0
    let co2Converted = co2Values.map(value => Number((value/1000).toFixed(1)));
    co2Converted.forEach(value => {
        total = total + value
    })

    return [total, sources,  co2Converted]
}


export function displayResults(userAnswers) {
    const myCanvas = document.getElementById('myCanvas');

    const carbonResult = document.querySelector('.figure');
    const advice = document.querySelector('.advice')

    let [total, sources, co2Converted] = calculateUserTotal(userAnswers);
    carbonResult.innerText = total;
    Chart.defaults.font.family = 'Poppins'
    Chart.defaults.font.size = '20'

    let myChart = new Chart(myCanvas, {
        type: 'bar',
        data: {
            labels: sources,
            datasets: [{
                label: "Your Carbon Footprint",
                data: co2Converted,
            }]
        }
    })


    advice.innerText = advice1
}
