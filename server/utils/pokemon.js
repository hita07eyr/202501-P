import { ProxyAgent } from "proxy-agent";
import { ofetch } from "ofetch";

/** const agent = new ProxyAgent(); **/
const agent = new ProxyAgent({requestTls:{rejectUnauthorized:false}});
/** ポケモンの取得 */
export const findPokemon = async (name) => {
  const pokemon = await ofetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
    agent,
  });
  return pokemon;
};
