<template>
  <section>
    <ShareNetwork
      v-for="network in networks"
      :key="network.network"
      :network="network.network"
      :url="sharing.url"
      :title="sharing.title"
      :description="sharing.description"
      :quote="sharing.quote"
      :hashtags="sharing.hashtags"
      :twitter-user="sharing.twitterUser"
      class="mx-1"
    >
      <v-icon>{{ network.icon }}</v-icon>
    </ShareNetwork>
  </section>
</template>

<script>
export default {
  data () {
    return {
      sharing: {
        url: 'https://news.vuejs.org/issues/180',
        title: 'Say hi to Vite! A brand new, extremely fast development setup for Vue.',
        description: 'This week, I’d like to introduce you to "Vite", which means "Fast". It’s a brand new development setup created by Evan You.',
        quote: 'The hot reload is so fast it\'s near instant. - Evan You',
        hashtags: 'vuejs,vite,javascript',
        twitterUser: 'youyuxi'
      },
      networks: [
        { network: 'twitter', icon: 'mdi-twitter' },
        { network: 'telegram', icon: 'mdi-telegram' },
        { network: 'facebook', icon: 'mdi-facebook' },
        { network: 'vk', icon: 'mdi-vk' },
        { network: 'odnoklassniki', icon: 'mdi-odnoklassniki' },
        { network: 'whatsapp', icon: 'mdi-whatsapp' },
        { network: 'pinterest', icon: 'mdi-pinterest' }
      ]
    }
  }
}
</script>
