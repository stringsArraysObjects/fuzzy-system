
document.querySelector('button').addEventListener('click', getFetch)

function getFetch(){

  const choice = document.querySelector('input').value.toLowerCase()
  const url = `https://pokeapi.co/api/v2/pokemon/${choice}`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        //code I need to change
        const notSureWhatIamDoingYet = new Poke (data.name, data.abilities, data.height, data.weight, data.types, data.sprites.other['official-artwork'].front_default)
        notSureWhatIamDoingYet.getTypes()
        notSureWhatIamDoingYet.isItUndecided()
        notSureWhatIamDoingYet.getAbilities()
        let decision = ''
        if(notSureWhatIamDoingYet.undecidedPurpose){
          decision = `${notSureWhatIamDoingYet.name} 
                      has these types:${notSureWhatIamDoingYet.typeList}
                      and these abilities: ${notSureWhatIamDoingYet.abilitiesList}`
        }else {
          decision = `${notSureWhatIamDoingYet.name} has these types:
                      ${notSureWhatIamDoingYet.typeList} 
                      and these abilities: ${notSureWhatIamDoingYet.abilitiesList}
                      ${notSureWhatIamDoingYet.reason.join(' and ')}.`
        }
        document.querySelector('h2').innerText = decision
        document.querySelector('img').src = notSureWhatIamDoingYet.image

              // pokeImg.push(data.sprites.other['official-artwork'].front_default)
              // document.querySelector('#pokeImg1').src = pokeImg[0]
              // document.querySelector('h3').innerText = data.name
              //end of code I need to change 
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}
        
class Poke {
    constructor(name, abilities, height, weight, types, image){
      this.name = name
      this.abilities = abilities
      this.height = height
      this.types = types
      this.image = image
      this.weight = weight
      this.undecidedPurpose = true
      this.reason = []
      this.typeList = []
      this.abilitiesList = []
    }

  getTypes(){
      for(const property of this.types) {
          this.typeList.push(property.type.name)
      }
    console.log(this.typeList)
  }

  getAbilities(){
    for(const property of this.abilities){
      this.abilitiesList.push(property.ability.name)
    }
    console.log(this.abilitiesList)
  }

  weightToPounds(bacon){
      return Math.round((bacon/4.536)*100)/100
  }

  heightToFeet(height){
    return Math.round((height/3.048)*100)/100
  }

  isItUndecided() {
    let badTypes = ['fire', 'electric', 'fighting', 'poison', 'ghost']
    if (badTypes.some(r=> this.typeList.indexOf(r) >= 0)){
      this.reason.push(`. Those types are too dangerous.`)
      this.undecidedPurpose = false
    }
    if (this.weightToPounds(this.weight) > 400){
      this.reason.push(`${this.name} is too heavy at 
        ${this.weightToPounds(this.weight)} pounds`)
        this.undecidedPurpose = false
    }
    if (this.heightToFeet(this.height) > 7) {
      this.reason.push(`${this.name} is too tall at 
      ${this.heightToFeet(this.height)} feet`)
      this.undecidedPurpose = false
    }
  }
}
class PokeInfo extends Poke {
    constructor(name, abilities, height, weight, types, image, location){
      super(name, abilities, height, weight, types, image)
      this.locationURL = location
      this.locationList = []
      this.locationString = '' 

    }
}     
      

      