import { ProxyAgent } from "proxy-agent";
import { ofetch } from "ofetch";
import {PutObjectCommand, ListObjectsCommand,
} from "@aws-sdk/client-s3";
import s3Client from './s3Client';
const config = useRuntimeConfig();

/** const agent = new ProxyAgent(); **/
const agent = new ProxyAgent({requestTls:{rejectUnauthorized:false}});
/** 天気の取得 */
/*
export const findTenki = async (code) => {
  const tenki = await ofetch(`www.jma.go.jp/bosai/forecast/data/overview_forecast/${code}.json`, {
    agent,
  });
  return tenki;
};
*/
export const findTenkis = async () => {
  const tenki = await ofetch(`https://www.jma.go.jp/bosai/forecast/data/forecast/270000.json`, {
///const pokemon = await ofetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {

agent,
  });
  return tenki;
};


/** 天気Codeの追加更新 */
export const upsertTenki = async (name, trainer) => {
  const result = await s3Client.send(
    new PutObjectCommand({
      Bucket: config.bucketName,
      Key: `${name}.json`,
      Body: JSON.stringify({ name: "", pokemons: [], ...trainer }),
    }),
  );
  return result;
};

/** 登録天気コード一覧の取得 */
export const findTenkiCodes = async () => {
  const objects = await s3Client.send(
    new ListObjectsCommand({ Bucket: config.bucketName }),
  );
  return objects.Contents ?? []; //「nullish coalescing operator」
};