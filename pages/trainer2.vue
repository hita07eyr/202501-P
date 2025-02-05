
<script setup>
const trainers = useTrainers();
</script>

<template>
  <div>
    <h1>つづきからはじめる</h1>
    <GamifyList>
      <GamifyItem>{{ trainers.data }}</GamifyItem>
    </GamifyList>
  </div>
</template>