const dbo = require("../db/conn");
const axios = require("axios");

exports.CepCadastrado = async (C) => {
  try {
    const dbConnect = await dbo.getDb();

    const X = await dbConnect.collection("Cep").find({ code: C }).toArray();

    if (X.length) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);

    return false;
  }
};

exports.CepExiste = async (C) => {
  try {
    const dbConnect = await dbo.getDb();

    const X = await axios.get(
      "https://cdn.apicep.com/file/apicep/" + C + ".json"
    );

    await dbConnect.collection("Cep").insertOne(X.data);

    return true;
  } catch (error) {
    console.log(error);

    return false;
  }
};

exports.VerificaCep = async (cep) => {
  const dbConnect = await dbo.getDb();

  const X = await dbConnect.collection("Cep").findOne({ code: cep });

  if (X) {
    return true;
  } else {
    await axios
      .get("https://cdn.apicep.com/file/apicep/" + cep + ".json")

      .then(async (dados) => {
        await dbConnect.collection("Cep").insertOne(dados.data);

        return true;
      })

      .catch((error) => {
          console.log(error)
      });
  }
};
