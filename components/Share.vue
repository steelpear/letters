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
        url: process.env.VUE_APP_URL,
        title: 'Напишите письмо, благодарность, поздравление.',
        description: 'Сайт "Ваши письма" — это место, где можно признаться в любви, поздравить своего коллегу с юбилеем, поблагодарить врача, делавшего тебе операцию, попросить о помощи, найти друга и просто поделиться своими мыслями со всеми.',
        quote: 'Пишите письма - это ничего не стоит и это бесценно.',
        hashtags: 'письмо, поздравление, благодарность',
        twitterUser: ''
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
