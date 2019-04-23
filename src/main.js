import Vue from 'vue';
import YoutubeList from './components/Youtube/YoutubeList';
import MeetupList from './components/Meetup/MeetupList';

Vue.component('youtube-list', YoutubeList);
Vue.component('meetup-list', MeetupList);


new Vue({
    el: "#app",
  }
);
