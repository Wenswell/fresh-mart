// https://stackoverflow.com/questions/71219745/cannot-use-swiper-with-vue-2-6-11

import Vue from "vue";

import  Swiper, { Navigation, Pagination, Autoplay } from 'swiper'

import  'swiper/swiper-bundle.min.css'

Swiper.use([Navigation, Pagination, Autoplay])

Vue.prototype.$swiper = Swiper