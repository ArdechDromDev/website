<template>
  <div>
    <div class="card">
      <img width="100%" class="card-img-top" v-bind:src="image" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">{{title}}</h5>
        <p class="card-text" v-html="description"></p>
        <a v-bind:href="link" target="_blank" class="btn btn-primary">S'inscrire à l'événement</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'meetup-item',
    props: {
      title: '',
      description: '',
      image: '',
      link: ''
    },
    created: function() {
    }
  }
</script>
