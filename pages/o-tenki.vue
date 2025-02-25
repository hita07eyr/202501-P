<script setup>
const { data: Tenkis } = await useOTenki();

// 日付をフォーマットする関数
const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours()}時`;
};
</script>

<template>
  <div>
    <h1>大阪の天気</h1>
    <h2 v-if="Tenkis">{{ Tenkis.publishingOffice }}</h2>
    <h2 v-if="Tenkis">{{ formatDate(Tenkis.reportDatetime) }}</h2>
    <GamifyList>
      <h3 v-if="Tenkis">{{ Tenkis.targetArea }}</h3>
      <p v-if="Tenkis" class="weather-text">{{ Tenkis.text }}</p>
    </GamifyList>
    <CatchButton :to="`/`">メニューに戻る</CatchButton>
  </div>
</template>




<style scoped>

form {
  border-radius: 0.5rem;
  border: solid 4px #555;
  padding: 1.5rem 3rem;
}

form > :not(:last-child) {
  display: block;
  margin-bottom: 1rem;
}

.weather-text {
  white-space: pre-line;
}

.item > label,
.item > span {
  display: block;
  margin-bottom: 0.25rem;
}
.item > span {
  font-size: 0.875rem;
}
</style>
