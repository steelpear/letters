<template>
  <v-container>
    {{ count }}
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      count: ''
    }
  },
  mounted () {
    this.get()
  },
  methods: {
    get () {
      axios.get(process.env.VUE_APP_SERVER + '/api/records/count')
        .then((response) => {
        // eslint-disable-next-line no-console
          this.count = response.data
        })
        .catch((error) => {
        // eslint-disable-next-line no-console
          console.log(error)
        })
    }
  }
}
</script>
