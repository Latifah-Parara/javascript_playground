Vue.component('cat-component', {
  props: ['cat'], //the parameter passed in from the root node to allow these functions to return the cats. Only works if 'cat' is bound in the root node
  filters:{
    giveFullName(value) {
      return `${value.last}, ${value.first} ${value.age}`
    }
  },
  methods:{
    incrementAge(value) {
      value.age = value.age + 1
    }
  },
  template: `
  <div>
    {{cat | giveFullName}}
    <input v-model='cat.first'/>
    <button v-on:click=incrementAge(cat)>+</button>
  </div>
  `
})


const app = new Vue ({
  el: '#root', //where the vue is mounted. Can be removed if you wanna mount later on.
  data: {
    greeting: 'Chckeej nugges',
    msg: `You loaded this page on ${new Date()}`,
    picture: 'desperate1-onion-head-emoticon.gif',
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
  },
  template: `
  <div v-bind:id="msg">
    <cat-component v-for='meow in cats'v-bind:cat='meow'/>
    <img v-bind:src="picture"/>
    <h2>{{spellCorrect}} </h2>
  </div>
  `//template seems to override original message. Injected html. Pipe puts value as a parameter in the function (this is only a 'Vue' thing).
  //v-bind here set the div id to the value of msg
   //v-for is a vue for loop. This case makes a h2 and an input tag for each cat in the cats array
   //v-model is the two way binding command. Whatever is typed in changes the value and vice versa.
   //the h4 tag in this case is purely to put a space between the prev values.
})
