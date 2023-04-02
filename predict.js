const nn = ml5.neuralNetwork({ task: "regression" });
nn.load("./model/model.json", modelLoaded);

async function modelLoaded() {
  console.log("the model was loaded!");
}

let button = document.getElementById("predict");
button.addEventListener("click", predict);

async function predict() {
  let fixedFilled = document.getElementById("fixed").value;
  let volatileFilled = document.getElementById("volatile").value;
  let citricFilled = document.getElementById("citric").value;
  let chloridesFilled = document.getElementById("chlorides").value;
  let sulfurFilled = document.getElementById("sulfur").value;
  let totalSulferFilled = document.getElementById("totalSulfer").value;
  let sulphatesFilled = document.getElementById("sulphates").value;
  let alcoholFilled = document.getElementById("alcohol").value;

  const result = await nn.predict({
    fixed: parseInt(fixedFilled),
    volatile: parseInt(volatileFilled),
    citric: parseInt(citricFilled),
    chlorides: parseInt(chloridesFilled),
    sulfur: parseInt(sulfurFilled),
    totalSulfer: parseInt(totalSulferFilled),
    sulphates: parseInt(sulphatesFilled),
    alcohol: parseInt(alcoholFilled),
  });
  console.log(result);

  let endResult = document.getElementById("result");
  let qualityResult = result[0].quality;
  endResult.innerHTML = `De kwaliteit is: ${qualityResult.toFixed(1)} / 10`;
}
