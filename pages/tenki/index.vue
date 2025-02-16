<script setup>
//import Tenkis from './tenkis.vue';
const { data: tenkiCodes } = await useTenkiCodes();
console.log('取得した天気コード:', tenkiCodes);  // レスポンスを確認
</script>

<template>
  <div>
    <h1>お天気情報</h1>

    <GamifyItem v-for="tenkiCode in tenkiCodes || []" :key="tenkiCode">
      <NuxtLink :to="`/tenki/${tenkiCode}`">{{ tenkiCode }}</NuxtLink>
    </GamifyItem>
  </div>
</template>

<style scoped>
.item > label {
  display: block;
  margin-bottom: 0.25rem;
}

.gamify-item:hover img {
  animation: bounce;
  animation-duration: 0.8s;
  animation-iteration-count: infinite;
}

.tenki-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tenki-info > img {
  width: 3rem;
  height: 3rem;
}
</style>
