const app = new Vue ({
  el: '#root', //where the vue is displayed
  data: {
    greeting: 'Chckeej nugges',
    cats: [
      {
        first: 'Biscuit',
        last: 'Parara',
        age: 5
      },
      {
        first: 'Coco',
        last: 'Nut',
        age: 4
      },
      {
        first: 'Shadow',
        last: 'Blaster',
        age: 3
      }
    ]
  },
  computed: { // functions can be declared and called in vue. Values can be computed.
    spellCorrect() {
      if (this.greeting === 'Chicken nuggets'){
        return this.greeting
      } else {
        this.greeting = 'Chicken nuggets'
        }
      return this.greeting
    },
    giveCocoName() {
      return `${this.cats[1].last}`
    }
  },
  filters : { //these filter values have to be in a filter object
    giveFullName(value) {
      return `${value.last}, ${value.first} ${value.age}`
    }
  },
  methods: {
    incrementAge(value){
      value.age = value.age + 1
    }
  },
  template: `
  <div>
    <h2>{{cats[2] | giveFullName}}</h2>
    <h2 v-for='cat in cats'>
      {{cat | giveFullName}}
      <input v-model='cat.first'/>
      <button v-on:click=incrementAge(cat)>+</button>
    </h2>
    <h2>{{spellCorrect}} </h2>
    <h2>{{giveCocoName}}</h2>
  </div>
  `//template seems to override original message. Injected html. Pipe puts value as a parameter in the function (this is only a 'Vue' thing).
   //v-for is a vue for loop. This case makes a h2 and an input tag for each cat in the cats array
   //v-model is the two way binding command. Whatever is typed in changes the value and vice versa.
   //the h4 tag in this case is purely to put a space between the prev values.
})
