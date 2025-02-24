import { ProxyAgent } from "proxy-agent";
import { ofetch } from "ofetch";
import {PutObjectCommand, ListObjectsCommand,GetObjectCommand,
} from "@aws-sdk/client-s3";
import s3Client from './s3Client';
const config = useRuntimeConfig();

/** const agent = new ProxyAgent(); **/
const agent = new ProxyAgent({requestTls:{rejectUnauthorized:false}});


/** 大阪の天気情報取得 */
export const findTenkis = async () => {
  const tenki = await ofetch(`https://www.jma.go.jp/bosai/forecast/data/forecast/270000.json`, {
  agent,
  });
  return tenki;
};

/** 天気情報取得 */
export const findTenki = async (name) => {
  const tenki = await ofetch(`https://www.jma.go.jp/bosai/forecast/data/forecast/${name}.json`, {
  agent,
  });
  return tenki;
};


/** 天気コードの追加更新 */
export const upsertTenkiCode = async (name) => {
  const result = await s3Client.send(
    new PutObjectCommand({
      Bucket: "km202501-13182",
      Key: `${name}.json`,
      Body: JSON.stringify({ name: `${name}`, publishingOffice: "", timeSeries: [] })
    }),
  );
  return result;
};

/** 登録天気コード一覧の取得 */
export const findTenkiCodes = async () => {
  const objects = await s3Client.send(
    new ListObjectsCommand({ Bucket: "km202501-13182" }),
  );
  return objects.Contents ?? []; //「nullish coalescing operator」
};

/** 登録天気の取得 */
export const findTenkiCode = async (name) => {
  const object = await s3Client.send(
    new GetObjectCommand({
      Bucket: "km202501-13182",
      Key: `${name}.json`,
    }),
  );

  const TenkiCode = JSON.parse(await object.Body.transformToString());
  return TenkiCode;
};
