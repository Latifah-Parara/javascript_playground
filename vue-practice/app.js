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
    editCat: null,
    cats: []
  },
  mounted () { //is called when vue is 'mounted'. Other lifcycyle methods include 'beforeMount', 'create', 'beforeCreate', 'beforeDestroy', 'Destroy'
    //curl post command: curl -H "Content-Type:application/json" -X POST -d "{\"first\": \"Camila\", \"last\": \"Supor\"}" http://rest.learncode.academy/api/lat/cats
    fetch('http://rest.learncode.academy/api/lat/cats') //learn more about this. Fetching data from an online JSON file and assigning it to cats. Comment out to use default cats.
      .then(response => response.json())
      .then((data) => {
        this.cats = data
      })
  },
  filters: {
    giveFullName(value) {
      return `${value.last}, ${value.first} ${value.age}`
    }
  },
  methods: {
    deleteCat(id) {
      fetch('http://rest.learncode.academy/api/lat/cats/' + id, {
        method: "DELETE"
      }) //learn more about this. Fetching data from an online JSON file and assigning it to cats. Comment out to use default cats.
        .then(() => {
          this.cats.splice(i, 1)
        })
    },
    updateCat(cat) { //understand this better
      fetch('http://rest.learncode.academy/api/lat/cats/' + cat.id, {
        body: JSON.stringify(cat),
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        }
      }) //learn more about this. Fetching data from an online JSON file and assigning it to cats. Comment out to use default cats.
        .then(() => {
          this.editCat = null
        })
    }
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
    <li v-for='cat, i in cats'>
      <div v-if='editCat === cat.id'>
        <input v-on:keyup.13='updateCat(cat)' v-model='cat.first' />
        <button v-on:click='updateCat(cat)'>save</button>
      </div>
      <div v-else>
        <button v-on:click='editCat = cat.id'>edit</button>
        <button v-on:click='deleteCat(cat.id, i)'>x</button>{{cat | giveFullName}}
      </div>
    </li>
    <img v-bind:src="picture"/>
    <h2>{{spellCorrect}} </h2>
  </div>
  `//template seems to override original message. Injected html. Pipe puts value as a parameter in the function (this is only a 'Vue' thing).
  //v-bind here set the div id to the value of msg
   //v-for is a vue for loop. This case makes a h2 and an input tag for each cat in the cats array
   //v-model is the two way binding command. Whatever is typed in changes the value and vice versa.
   //the h4 tag in this case is purely to put a space between the prev values.
})
