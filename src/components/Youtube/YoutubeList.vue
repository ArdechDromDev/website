<template>
  <div class="row">
    <div v-for="video in videos"
         :key="video.id"
         class="col-md-4 col-sm-6 mb-3">
      <youtube-item
                    v-bind:title="video.title"
                    v-bind:description="video.description"
                    v-bind:link="video.link"
                    v-bind:image="video.image"
      >
      </youtube-item>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import YoutubeItem from "./YoutubeItem";

  export default {
    components: {YoutubeItem},
    created: function () {
      this.getYoutubeVideos();
    },
    props: ['count'],
    data: function () {
      return {
        number: this.count,
        videos: []
      }
    },
    methods: {
      getYoutubeVideos: function () {
        const apiKey = 'AIzaSyCXi6jQgCF223JjSULcVY6rMBgbg60UbgA';
        const channelId = 'UCGeZ9KihmkrUc_Zq9EcDFUQ';
        const entryPoint = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${this.number}&type=video`;

        axios.get(entryPoint)
          .then(res => {
            let videos = [];
            if (res.data.items) {
              res.data.items.forEach(function (video) {
                videos.push({
                  id: video.id.videoId,
                  title: video.snippet.title,
                  description: video.snippet.description,
                  image: video.snippet.thumbnails.high.url,
                  link: `https://www.youtube.com/watch?v=${video.id.videoId}`,
                })
              });
            }
            this.videos = videos;
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    },
  }
</script>
