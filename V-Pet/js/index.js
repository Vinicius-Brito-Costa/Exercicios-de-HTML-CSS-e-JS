let data = {
    "digimon":[
       {
          "name":"Koromon",
          "level":"In-Training",
          "evolutions":[
             {
                "name":"Agumon",
                "food":1,
                "training":1,
                "time": 60
             }
          ]
       },
       {
          "name":"Agumon",
          "level":"Rookie",
          "evolutions":[
             {
                "name":"Greymon",
                "food":2,
                "training":2,
                "time": 120
             }
          ]
       },
       {
          "name":"Greymon",
          "level":"Champion",
          "evolutions":[
             {
                "name":"MetalGreymon",
                "food":4,
                "training":4,
                "time": 240
             }
          ]
       },
       {
          "name":"MetalGreymon",
          "level":"Ultimate",
          "evolutions":[

          ]
       },
       {
          "name":"Tsunomon",
          "level":"In-Training",
          "evolutions":[
             {
                "name":"Gabumon",
                "food":1,
                "training":1,
                "time": 60
             }
          ]
       },
       {
          "name":"Gabumon",
          "level":"Rookie",
          "evolutions":[
             {
                "name":"Drimogemon",
                "food":2,
                "training":2,
                "time": 120
             }
          ]
       },
       {
          "name":"Drimogemon",
          "level":"Champion",
          "evolutions":[
             {
                "name":"Digitamamon",
                "food":4,
                "training":4,
                "time": 240
             }
          ]
       },
       {
          "name":"Digitamamon",
          "level":"Ultimate",
          "evolutions":[

          ]
       },
       {
          "name":"Monzaemon",
          "level":"Ultimate",
          "evolutions":[

          ]
       },
       {
          "name":"Numemon",
          "level":"Champion",
          "evolutions":[
             {
                "name":"Monzaemon",
                "food":4,
                "training":6,
                "time": 240
             }
          ]
       }
    ],
    "time":[
       {
          "In-Training":60000,
          "Rookie":12000,
          "Ultimate":24000
       }
    ]
}

if(localStorage.getItem("digimon") === null){
    Reset();
}
else{
    let dados = localStorage.getItem('digimon') || {};
    LoadDigimon(JSON.parse(dados));
}

setInterval(() => {
    let novo = JSON.parse(localStorage.getItem('digimon'));
    novo.time = novo.time + 1;
    localStorage.setItem('digimon', JSON.stringify(novo))
    let minuto = Math.floor(novo.time / 60);
    let segundos = novo.time - (minuto * 60);
    document.getElementById('timeStat').innerHTML = minuto.toString().padStart(2, ) + ":" + segundos.toString().padStart(2, "0");
    CheckEvo(novo);
}, 1000)
function LoadDigimon(digimon){
    for(let digi of data.digimon){
        if(digimon.name === digi.name){
            let novo = digimon;
            novo.evolutions = digi.evolutions;
            localStorage.setItem("digimon", JSON.stringify(novo));
            document.getElementById('trainStat').innerHTML = novo.train;
            document.getElementById('foodStat').innerHTML = novo.weight;
            document.getElementById('digimon').src = `./image/digimon/${digi.name}.gif`;
        }
    }
}
function FeedDigimon(){
    let dados = JSON.parse(localStorage.getItem('digimon') || {});
    dados.weight++;
    document.getElementById('foodStat').innerHTML = dados.weight;
    localStorage.setItem('digimon', JSON.stringify(dados));
    CheckEvo(dados);
}
function TrainDigimon(){
    let dados = JSON.parse(localStorage.getItem('digimon') || {});
    dados.train++;
    document.getElementById('trainStat').innerHTML = dados.train;
    localStorage.setItem('digimon', JSON.stringify(dados));
    CheckEvo(dados);
}
function CheckEvo(digimon){
    for(let evo of digimon.evolutions){
        if(digimon.train >= evo.training && digimon.train < evo.training + 2 && digimon.weight >= evo.food && digimon.weight < evo.food + 2 && digimon.time >= evo.time){
            let novo = digimon;
            novo.name = evo.name;
            novo.train = 0;
            novo.weight = 0;
            novo.time = 0;
            localStorage.setItem('digimon', JSON.stringify(novo));
            ControlButton(true);
            document.getElementById('status').src = './image/stats/evolution.gif'
            setTimeout(() => {
                ControlButton(false);
                LoadDigimon(novo);
                document.getElementById('status').src = './image/stats/smile.gif';
            }, 3500)
        }
        else if((digimon.train > evo.training * 3 || digimon.time >= evo.time)&& digimon.name != "Numemon"){
            let novo = digimon;
            novo.name = "Numemon";
            novo.train = 0;
            novo.weight = 0;
            novo.time = 0;
            localStorage.setItem('digimon', JSON.stringify(novo));
            ControlButton(true);
            document.getElementById('status').src = './image/stats/evolution.gif'
            setTimeout(() => {
                ControlButton(false);
                LoadDigimon(novo);
                document.getElementById('status').src = './image/stats/smile.gif';
            }, 3500)
        }
    }
    if(digimon.time >= 240){
        Reset();
    }
}
function ControlButton(bool){
    for(let botao of document.getElementsByTagName('button')){
        botao.disabled = bool;
    }
}
function Reset(){
    let digimon = {
        "name": "Koromon",
        "train": 0,
        "weight": 0,
        "time": 0,
    }
    localStorage.setItem("digimon", JSON.stringify(digimon));
    LoadDigimon(digimon);
}