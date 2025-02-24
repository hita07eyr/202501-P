<script setup>
import { ref, computed, watchEffect } from "vue";
import { useRoute, useRuntimeConfig } from "nuxt/app";

const route = useRoute();
const config = useRuntimeConfig();



// tenkicode を取得する
const { data: tenkicode, refresh: refreshTenkicode, error } = useFetch(
  () => `/api/code/${route.params.name}`,
  {
    default: () => ({}),
    server: false,
    baseURL: config.public.backendOrigin,
  }
);

// 取得した tenkicode を保存する変数
const otenkicode = ref({ name: "270000" }); // 初期値を設定

const apiUrl = computed(() => `https://www.jma.go.jp/bosai/forecast/data/forecast/${otenkicode.value.name}.json`);

// tenkicode が更新されたら otenkicode をセット
watchEffect(() => {
  if (tenkicode.value?.name) {
    otenkicode.value.name = tenkicode.value.name;
  }
});

// 天気情報を取得
const { data: tenkiInfos, refresh: refreshTenki } = useFetch(apiUrl, {
  default: () => ({}),
  server: false,
});

// otenkicode が更新されたら天気情報を再取得
watchEffect(() => {
  if (otenkicode.value?.name) {
    refreshTenki();
  }
});


//console.log("tenkiInfos:", tenkiInfos);

// 日付をフォーマットする関数
const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours()}時`;
};

const onDelete = async () => {
  const response = await $fetch(`/api/code/${route.params.name}`, {
    baseURL: config.public.backendOrigin,
    method: "DELETE",
  }).catch((e) => e);
  if (response instanceof Error) return;
};

</script>

<template>
  <div>
    <h1>天気予報</h1>
    <h2>{{ tenkicode.name }}</h2>
    <h2 v-if="tenkiInfos">{{ tenkiInfos[0]?.publishingOffice }}</h2>
    <p v-else>天気情報を取得中...</p>



    <!-- 天気予報の表示 -->
    <div v-if="tenkiInfos && tenkiInfos[0]?.timeSeries?.length > 0">
      <table border="1">
        <thead>
          <tr>
            <th>日時</th>
            <th>地域</th>
            <th>天気</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(time, index) in tenkiInfos[0]?.timeSeries[0]?.timeDefines" :key="index">
            <td>{{ formatDate(time) }}</td>
            <td v-for="area in tenkiInfos[0]?.timeSeries[0]?.areas" :key="area.area.code">
              <strong>{{ area.area.name }}</strong>
              <br>
              {{ area.weathers[index] || "データなし" }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <CatchButton :to="`/Code`">天気予報 確認終了</CatchButton>
    <CatchButton  @click="onDelete" :to="`/`">登録削除</CatchButton>
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

.trainer-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.trainer-info > img {
  width: 3rem;
  height: 3rem;
}
</style>
