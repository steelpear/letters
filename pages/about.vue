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
      axios.get(process.env.VUE_APP_SERVER + '/api/records/last')
        .then((response) => {
        // eslint-disable-next-line no-console
          this.count = response.data[0].letterId
        })
        .catch((error) => {
        // eslint-disable-next-line no-console
          console.log(error)
        })
    }
  }
}
</script>
