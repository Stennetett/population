var populationArr = [];

var diedArr = [];

var startPopulationAmount = 100;

let foodProduction;

//class variables
let mentalHealth = new MentalHealth();

const CHANCE_OF_DEATH_FROM_OLD_AGE = 0.2; // Konstanter som är globala som denna har som konvention att namnges med stora bokstäver och understreck.

const FOOD_PRODUCTION_PER_PERSON = 2;

function setup() {
    //initialize classes
    

    startPopulation();

    populationChange();
}

function preload() {

}

function draw() {

}
//push population to array
const startPopulation = () => {
    for(i = 0; i < startPopulationAmount; i++) {

        var sex = int(random(0,2)) == 1 ? "male" : "female";
        var age = int(random(0,100));

        populationArr.push({
            sex: sex,
            age: age,
        });
    }
}

const populationChange = () => {

    console.log(populationArr);

    var foodSurplus = food(); // returns foodSurplus;

    babiesBorn(foodSurplus);

    oldPeopleDeaths(); // ur funktion.

    ageIncrease();

    setTimeout(populationChange, 30000);
}

const food = () => {

    const workingPeopleArr = populationArr.filter(p => p.age > 18 && p.age < 65);

    foodProduction = workingPeopleArr.length * FOOD_PRODUCTION_PER_PERSON;
    
    const foodSurplus = foodProduction - populationArr.length;
    
    return foodSurplus;
}

const babiesBorn = (foodSurplus) => {

    const fertileFemales = populationArr.filter(p => p.age > 18 && p.age < 50 && p.sex == "female");

    const chanceOfReproduction = foodProduction / populationArr.length;

    for(i = 0; i < (int(chanceOfReproduction * fertileFemales.length)); i++) {

        var sex = int(random(0,2)) == 1 ? "male" : "female";

        populationArr.push({
            sex: sex,
            age: 0,
        })
    }

} 

const oldPeopleDeaths = () => { // Ur funktion för tillfället.

    const oldPeople = populationArr.filter(p => p.age > 75);

    console.log(`old people in the riskzone: ${oldPeople.length}`);

    oldPeople.forEach((person) => {

        if(random(0,1) < CHANCE_OF_DEATH_FROM_OLD_AGE) {
            diedArr.push(person);
        }

    });

    populationArr.filter( function( p ) {
        return !diedArr.includes( p );
    });

    console.table(`amount of people who died: ${diedArr.length}`);
    
}

const ageIncrease = () => {
    populationArr.filter(p => p.age + 1);
}