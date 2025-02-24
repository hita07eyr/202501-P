<script setup></script>

<template>
  <div>
    <h1>ポケットモンスター</h1>
    <GamifyList>
      <GamifyItem>
        <NuxtLink to="/trainer">つづきからはじめる</NuxtLink>
      </GamifyItem>
      <GamifyItem>
        <NuxtLink to="/new">あたらしくはじめる</NuxtLink>
      </GamifyItem>
    </GamifyList>
    <h1>天気を調べる</h1>
    <GamifyList>
      <GamifyItem>
        <NuxtLink to="/o-tenki">大阪の天気を調べる</NuxtLink>
      </GamifyItem>
      <GamifyItem>
        <NuxtLink to="/code">登録地点の今日・明日・明後日の天気予報を調べる</NuxtLink>
      </GamifyItem>
    </GamifyList>
  </div>
</template>
