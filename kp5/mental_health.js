
class MentalHealth {
  constructor(city, health_score) {
    this.city = city;
    this.health_score = health_score;
  }


  mentalHealth_return(){
    return this.health_score;
}
update(health_score){
this.health_score = health_score;
}
}
