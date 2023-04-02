function loadData() {
  Papa.parse("./data/winequality.csv", {
    download: true,
    header: true,
    dynamicTyping: true,
    complete: (results) => prepareData(results.data),
  });
}

function prepareData(data) {
  const nn = ml5.neuralNetwork({ task: "regression", debug: true });

  data.sort(() => Math.random() > 0.5);

  let trainData = data.slice(0, Math.floor(data.length * 0.8));
  let testData = data.slice(Math.floor(data.length * 0.8) + 1);

  for (let row of trainData) {
    nn.addData(
      {
        fixed: row["fixedAcidity"],
        volatile: row["volatileAcidity"],
        citric: row["citricAcid"],
        chlorides: row["chlorides"],
        sulfur: row["freeSulfurDioxide"],
        totalSulfer: row["totalSulfurDioxide"],
        sulphates: row["sulphates"],
        alcohol: row["alcohol"],
      },
      { quality: row.quality }
    );
  }

  nn.normalizeData();
  nn.train({ epochs: 10 });

  let saveBtn = document.getElementById("saveBtn");
  saveBtn.addEventListener("click", () => saveModel(nn));
}

function saveModel(nn) {
  nn.save();
}

loadData();
