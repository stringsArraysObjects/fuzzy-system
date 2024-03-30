
document.querySelector('button').addEventListener('click', getFetch)

function getFetch(){

  const choice = document.querySelector('input').value.toLowerCase()
  const url = `https://pokeapi.co/api/v2/pokemon/${choice}`

  fetch(url)
      .then(res => res.json()) 
      .then(data => {
        console.log(data)
        //code I need to change
        const notSureWhatIamDoingYet = new PokeInfo (data.name, data.abilities, data.height, data.weight, data.types, data.sprites.other['official-artwork'].front_default, data.location_area_encounters)
        notSureWhatIamDoingYet.getTypes()
       
        notSureWhatIamDoingYet.getAbilities()
        notSureWhatIamDoingYet.encounterInfo()
        
        let info = `Type(s):${notSureWhatIamDoingYet.typeList} 
                      Abilities:${notSureWhatIamDoingYet.abilitiesList}
                      Location(s):`
                      
                      
       
        document.querySelector('img').src = notSureWhatIamDoingYet.image
        document.querySelector('h2').innerText = info
        document.getElementById('locations').innerText = ''

         
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
  
  
}
class PokeInfo extends Poke {
    constructor(name, abilities, height, weight, types, image, location){
      super(name, abilities, height, weight, types, image)
      this.locationURL = location
      this.locationList = []
      this.locationString = '' 

    }
    
    encounterInfo(){
      fetch(this.locationURL)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        for(const item of data){
          this.locationList.push(item.location_area.name)
        }
        let target = document.getElementById('locations')
        target.innerText = this.locationCleanup()
          
        })
        .catch(err => {
          console.log(`error ${err}`)
        });
      }
      locationCleanup() {
        const words = this.locationList.slice(0, 5).join(', ').replaceAll('-', ' ').split(' ')
        //capitalize the first letter in each word
        for(let i=0; i <words.length; i++){
          words[i] = words[i][0].toUpperCase() + words[i].slice(1)
          
        }
        
        return words.join(' ')
      }
 
}     





   