<template>
  <div>
    {{ letter.letterTitle }}
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      letter: ''
    }
  },
  mounted () {
    axios.get(process.env.VUE_APP_SERVER + '/api/records/find/' + this.$route.params.id, {
    })
      .then((response) => {
        this.letter = response.data
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error)
      })
  }
}
</script>
