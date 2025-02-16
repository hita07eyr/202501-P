import { ProxyAgent } from "proxy-agent";
import { ofetch } from "ofetch";

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

