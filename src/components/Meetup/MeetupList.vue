<template>
  <div class="row">
    <div v-for="meetup in meetups"
         :key="meetup.id"
         class="col-md-4 col-sm-6 mb-3">
      <meetup-item
                    v-bind:title="meetup.title"
                    v-bind:description="meetup.description"
                    v-bind:link="meetup.link"
                    v-bind:image="meetup.image"
      >
      </meetup-item>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import MeetupItem from "./MeetupItem";

  export default {
    components: {MeetupItem},
    created: function () {
      this.getMeetups();
    },
    props: ['count'],
    data: function () {
      return {
        number: this.count,
        meetups: []
      }
    },
    methods: {
      getMeetups: function () {

        const meetupurl = "https://api.meetup.com";
        const meetupgpinfo = "/Ardech-Drom-Dev?sign=true&photo-host=public";
        const meetupevents = `/Ardech-Drom-Dev/events?status=upcoming,past&fields=featured_photo&sign=true&photo-host=public&desc=1&page=${this.number}`;

        axios.get(`${meetupurl}${meetupgpinfo}`)
          .then(res => {
            axios.get(`${meetupurl}${meetupevents}`)
              .then(res => {
                let meetups = [];
                if (res.data) {
                  res.data.forEach(function (meetup) {
                    meetups.push({
                      id: meetup.id,
                      title: meetup.name,
                      description: meetup.description,
                      image: meetup.featured_photo && meetup.featured_photo.photo_link,
                      link:  meetup.link,
                    })
                  });
                }
                this.meetups = meetups;
              });

          })
          .catch(function (error) {
            console.log(error)
          })
      }
    },
  }
</script>
