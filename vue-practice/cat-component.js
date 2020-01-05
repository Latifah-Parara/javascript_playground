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

export default {
  name: 'cat-component'
}
