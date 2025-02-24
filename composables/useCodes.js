import { useFetch, useRuntimeConfig } from "#app";

export default () => {
  const config = useRuntimeConfig();
  const response = useFetch("/api/tenkis", {
    default: () => [],
    server: false,
    baseURL: config.public.backendOrigin,
  });
  return response;
};
