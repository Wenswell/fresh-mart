<template>
  <ul>
    <li v-for="item in data" :key="item.id">
      <span>{{ item.name }}</span>
      <span>{{ item.price }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
};
</script>