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
      <GamifyItem>
        <NuxtLink to="/tenkis">大阪の天気を調べる</NuxtLink>
      </GamifyItem>
      <GamifyItem>
        <NuxtLink to="/code">コードで天気を調べる</NuxtLink>
      </GamifyItem>
    </GamifyList>
  </div>
</template>
