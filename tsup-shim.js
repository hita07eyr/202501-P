export const useRuntimeConfig = () => ({
  region: process.env.NUXT_REGION ?? "ap-northeast-1",
  bucketName: process.env.NUXT_BUCKET_NAME ?? "",
  bucketNameTenki: process.env.NUXT_BUCKET_NAME_TENKI ?? "km202501-13182",
});
