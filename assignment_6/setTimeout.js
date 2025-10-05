setTimeout(() => {
    var currentTime = new Date();
    console.log("Current Time 1: " + currentTime.toLocaleTimeString());
}, 2000);

var currentTime = () => {
    var currentTime2 = new Date();
    console.log("Current Time 2: " + currentTime2.toLocaleTimeString());
}

currentTime();