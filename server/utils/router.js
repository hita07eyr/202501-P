import { Router } from "express";
import { 
  deleteTrainer,
  findTrainers,
  upsertTrainer,
  findTrainer,
 } from "~/server/utils/trainer";
import { findPokemon } from "~/server/utils/pokemon";
import { findTenkis} from "~/server/utils/tenki";
//import Tenkis from "~/pages/tenkis.vue";

const router = Router();

router.get("/hello", (_req, res) => {
  res.send("Hello World");
});

/** トレーナー名の一覧の取得 */
router.get("/trainers", async (_req, res, next) => {
  try {
    const trainers = await findTrainers();
    // TODO: 期待するレスポンスボディに変更する
    //const SiikuinNames = trainers.map(({Key}) => Key.replace(/\.json$/,""));
    //const SiikuinNames = trainers.map(({Key}) => Key);
    const response = trainers.map((siikuin)=>siikuin.Key.split(".")[0])
    res.send(response);
  } catch (err) {
    next(err);
  }
});

/** トレーナーの追加 */
router.post("/trainer", async (req, res, next) => {
  try {
    if (!("name" in req.body && req.body.name.length > 0))
      return res.sendStatus(400);
    const trainers = await findTrainers();
    if (trainers.some(({ Key }) => Key === `${req.body.name}.json`))
      return res.sendStatus(409);
    const result = await upsertTrainer(req.body.name, req.body);
    res.status(result["$metadata"].httpStatusCode).send(result);
  } catch (err) {
    next(err);
  }
});

/** トレーナーの取得 */
// TODO: トレーナーを取得する API エンドポイントの実装
router.get("/trainer/:trainerName", async (req, res, next) => {
  try {
    const { trainerName } = req.params;
    const trainer = await findTrainer(trainerName);
    res.send(trainer);
  } catch (err) {
    next(err);
  }
});


/** トレーナーの更新 */
router.post("/trainer/:trainerName", async (req, res, next) => {
  try {
    const { trainerName } = req.params;
    // TODO: トレーナーが存在していなければ404を返す
    const trainers = await findTrainers();
    if (!trainers.some(({ Key }) => Key === `${trainerName}.json`))
      return res.sendStatus(404);
    const result = await upsertTrainer(trainerName, req.body);
    res.status(result["$metadata"].httpStatusCode).send(result);
  } catch (err) {
    next(err);
  }
});

/** トレーナーの削除 */
// TODO: トレーナーを削除する API エンドポイントの実装
router.delete("/trainer/:trainerName", async (req, res, next) => {
  try {
    const { trainerName } = req.params;
    const result = await deleteTrainer(trainerName);
    res.status(result["$metadata"].httpStatusCode).send(result);
  } catch (err) {
    next(err);
  }
});

/** ポケモンの追加 */
router.post("/trainer/:trainerName/pokemon", async (req, res, next) => {
  try {
    const { trainerName } = req.params;
    // TODO: リクエストボディにポケモン名が含まれていなければ400を返す

    const trainer = await findTrainer(trainerName);
    if (!("name" in req.body && req.body.name.length > 0))
      return res.sendStatus(400);

    const pokemon = await findPokemon(req.body.name);
    // TODO: 削除系 API エンドポイントを利用しないかぎりポケモンは保持する
    const {
      order,
      name,
      sprites: { front_default },
    } = pokemon;
    trainer.pokemons.push({
      id: (trainer.pokemons[trainer.pokemons.length - 1]?.id ?? 0) + 1,
      nickname: "",
      order,
      name,
      sprites: { front_default },
    });
    const result = await upsertTrainer(trainerName, trainer);
    res.status(result["$metadata"].httpStatusCode).send(result);
    } catch (err) {
    next(err);
  }
});



/** ポケモンの削除 */
// TODO: ポケモンを削除する API エンドポイントの実装
router.delete(
  "/trainer/:trainerName/pokemon/:pokemonId",
  async (req, res, next) => {
    try {
      const { trainerName, pokemonId } = req.params;
      const trainer = await findTrainer(trainerName);
      const index = trainer.pokemons.findIndex(
        (pokemon) => String(pokemon.id) === pokemonId,
      );
      trainer.pokemons.splice(index, 1);
      const result = await upsertTrainer(trainerName, trainer);
      res.status(result["$metadata"].httpStatusCode).send(result);
    } catch (err) {
      next(err);
    }
  },
);


//router.post("/trainer/:trainerName/pokemon", async (req, res, next) => {
/** 天気の取得 */
/*
router.get("/tenkis", async (req, res, next) => {
  try {
    const { areaCode } = req.params;
    const tenki = await findTenki(areaCode);
    //const pokemon = await findPokemon(req.body.name);
    //res.status(result["$metadata"].httpStatusCode).send(tenki);
    res.send(tenki);

  } catch (err) {
    next(err);
  }
});
*/
/** 天気一覧の取得 */
router.get("/tenkis", async (_req, res, next) => {
  try {
    const tenkis = await findTenkis();
    // TODO: 期待するレスポンスボディに変更する
    //const SiikuinNames = trainers.map(({Key}) => Key.replace(/\.json$/,""));
    //const SiikuinNames = trainers.map(({Key}) => Key);
    //const response = tenkis.map((siikuin)=>siikuin.Key.split(".")[0])
/*
    // 必要な情報を抽出
    const response = tenkis.map(({timeSeries}) => {
      const weatherInfo = timeSeries[0].areas[0].weathers[0];
      const areaInfo = timeSeries[0].areas[0].area.name;
      const timeInfo = timeSeries[0].timeDefines[0];
      return {
        area:areaInfo,
        time:timeInfo,
        weather: weatherInfo
      };
  });
*/
/*
    // 必要な情報を抽出
    const response = tenkis.map(({ publishingOffice, reportDatetime, timeSeries }) => {
      if (timeSeries && timeSeries.length > 0) {
        const areaInfo = timeSeries[0].areas[0].area.name;
        const timeInfo = timeSeries[0].timeDefines[0];
        const weatherInfo = timeSeries[0].areas[0].weathers[0];
        return {
          publishingOffice,
          reportDatetime,
          area: areaInfo,
          time: timeInfo,
          weather: weatherInfo
        };
      } else {
        return {
          publishingOffice,
          reportDatetime,
          area: null,
          time: null,
          weather: null
        };
      }
    });
    res.send(response);
*/
    // 必要な情報を抽出
    const response = tenkis.map(({ publishingOffice, timeSeries }) => {
      if (timeSeries && timeSeries.length > 0 && timeSeries[0].areas && timeSeries[0].areas.length > 0) {
        const areaInfo = timeSeries[0].areas[0].area?.name || "N/A";
        const timeInfo = timeSeries[0].timeDefines?.[0] || "N/A";
        const weatherInfo = timeSeries[0].areas[0].weathers?.[0] || "N/A";
        return {
          publishingOffice,
          area: areaInfo,
          time: timeInfo,
          weather: weatherInfo
        };
      } else {
        return {
          publishingOffice,
          area: "N/A",
          time: "N/A",
          weather: "N/A"
        };
      }
    });
    res.send(response[0]);
    
    
//    res.send(tenkis);
  } catch (err) {
    next(err);
  }
});

export default router;
