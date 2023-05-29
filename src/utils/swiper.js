// // swiper.js
// import { SwiperCore, Swiper, SwiperSlide } from 'swiper-vue2'
// import { Navigation, Pagination } from 'swiper'
// import 'swiper/swiper-bundle.css'

// SwiperCore.use([Navigation, Pagination])

// export { Swiper, SwiperSlide }

// import Vue from "vue";
// import { Swiper, SwiperSlide } from "swiper/vue";
// import SwiperCore, { Navigation, Pagination } from "swiper/core";
// import "swiper/swiper-bundle.css";

// SwiperCore.use([Navigation, Pagination]);

// // eslint-disable-next-line vue/multi-word-component-names
// // Vue.component("Swiper", Swiper);
// Vue.component("MySwiper", Swiper);

// Vue.component("SwiperSlide", SwiperSlide);

// import 'swiper/swiper-bundle.css'
// //（若是使用的是2.6.0以上的版本須要本身手動去加載css）
// import { Swiper, SwiperSlide, /* rest swiper/vue API... */ } from 'vue-awesome-swiper'
// // exactly equivalent to
import { Swiper, SwiperSlide, /* rest swiper/vue API... */ } from 'vue-awesome-swiper'
import SwiperCore, { Navigation, Pagination ,Autoplay} from "swiper/core";
import 'swiper/swiper-bundle.css'

SwiperCore.use([Navigation, Pagination,Autoplay]);
// Vue.component("MySwiper", Swiper);
// Vue.component("SwiperSlide", SwiperSlide);
export { Swiper, SwiperSlide }
// Vue.mixin({
//   components: {
//     mySwiper:Swiper,
//     SwiperSlide:SwiperSlide
//   }
// })

// Vue.use(SwiperSlide)
// Vue.use(Swiper)

// import Vue from 'vue'
// import VueAwesomeSwiper from 'vue-awesome-swiper'
 
// //引入样式
import 'swiper/swiper-bundle.css'
 
// Vue.use(VueAwesomeSwiper, /* { 全局组件的默认选项 } */)
