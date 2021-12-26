const filesystem = require("fs");
const { off } = require("process");
const { getDataJson, getListDate } = require("../../utils/funtions");

module.exports = {
  exercicio1(req, res) {
    if (filesystem.lstatSync("src/" + "user.json").isFile()) {
      const { name } = req.body;

      const users = getDataJson("user");
      const findUser = users.find((user) => user === name);

      if (!findUser)
        return res
          .status(400)
          .json({ message: `${name} não se encontra na lista dos convidados` });

      const [firstUser] = users;
      const reOrderUser = users.map((user) => {
        if (user === "Pedro") return "Danilo";
        if (user === "Danilo") return firstUser;
        return user;
      });

      return res.status(201).json({ reOrderUser });
    }
  },
  exercicio2(req, res) {
    let { month } = req.params;

    if (!(month <= 12 && month > 0))
      return res
        .status(400)
        .json({ error: `O mes ${month} não existe no ano ` });

    const listDate = getListDate(month);
    return res.json({ list: listDate });
  },
  exercicio3(req, res) {
    if (filesystem.lstatSync("src/" + "data.json").isFile()) {
      const dataJson = req.body;

      const data = getDataJson("data");
      const findUser = data.find((item) => item.name === dataJson.name);

      if (findUser)
        return res.status(400).json({ message: ` ${dataJson.name} ja existe` });
      const count = data.length + 1;
      const listData = [...data, { ...dataJson, id: count }];
      filesystem.writeFileSync(
        "src/data.json",
        JSON.stringify(listData, null, 2)
      );
      return res.status(201).json(listData);
    }
  },
  exercicio4(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    if (filesystem.lstatSync("src/" + "data.json").isFile()) {
      const data = getDataJson("data");
      if (data.length <= 0)
        return res
          .status(400)
          .json({ message: "Impossivel fazer alterações sem datos existente" });

      const findItem = data.find((item) => item.id === Number(id));

      if (!findItem)
        return res
          .status(400)
          .json({ message: `${id} não existe no database` });
      if (name === findItem.name)
        return res.json({
          message: `Não existe mudanza no item valores sâo iguais`,
        });
      findItem.name = name;

      const newData = data.map((item) => {
        if (item.id === id) return findItem;
        return item;
      });

      filesystem.writeFileSync(
        "src/data.json",
        JSON.stringify(newData, null, 2)
      );

      res.json({ message: `Item ${id} foi alterado com sucesso` });
    }
  },
  exercicio5(req, res) {
    if (filesystem.lstatSync("src/" + "user.json").isFile()) {
      const data = getDataJson("user");

      const {job ,ageMax,ageMin,state} = req.query

      if((ageMax && ageMin) && ageMax < ageMin ){
        return res.status(400).json({message: 'O valor max não pode ser menor que o minimo'})
      }

      let dataFilter = data


      if(ageMax || ageMin){
        dataFilter = dataFilter.filter(user => {
          const existedAgeMax = ageMax ? user.age <= ageMax : user.age >= ageMin
          const existedAgeMin = ageMin ? user.age >= ageMin : user.age <= ageMax
           return existedAgeMax && existedAgeMin
        })
      }

      if(state){
        dataFilter = dataFilter.filter(user => user.state === state)
      }

      if(job){
        dataFilter = dataFilter.filter(user => user.job === job)
      }

      res.json(dataFilter);
    }
  },
  exercicio6(req, res) {
    const { number } = req.body;
    if (!Number.isInteger(number) || number <= 0)
      return res.status(400).json({
        message: "Não podem ser enviados numero decimales ou menor que 0",
      });

    const result = [];
    Array(number)
      .fill()
      .map((_, index) => {
        result.push({ item: index + 1 });
      });
    filesystem.writeFileSync("src/number.json", JSON.stringify(result));

    res.status(201).json(result);
  },
  exercicio7(req, res){
    if (filesystem.lstatSync("src/" + "user.json").isFile()){
      const {id} = req.params
      
      const dataUser = getDataJson("user")

      const findIdUser = dataUser.find(user => user.id == id)
     
      if(!findIdUser) return res.status(400).json({message: 'Usuario não encontrado na base de datos'})
      const newListUser = dataUser.filter(user => user.id != id)
      
      filesystem.writeFileSync('src/user.json',JSON.stringify(newListUser,null,2))
      
      res.json({ message:'Usuario deletado com sucesso'})



    }
  },
  exercicio9(req, res){
    if (filesystem.lstatSync("src/" + "user.json").isFile()){
      const {id} = req.params
      
      const dataUser = getDataJson("user")

      const findIdUser = dataUser.find(user => user.id == id)
     
      if(!findIdUser) return res.status(400).json({message: 'Usuario não encontrado na base de datos'})
      
      
      res.json(findIdUser)



    }
  },
  fatorial(req, res) {
    const { numero } = req.query;
    const numberConvert = Number(numero);
    let fatorial = 1;

    for (let i = 1; i <= numberConvert; i++) {
      fatorial = fatorial * i;
    }

    return res.status(201).json({ fatorial });
  },
  
  switchStringCase(req, res) {
    const { item } = req.body;

    if (typeof item !== "string")
      return res.status(400).json({ error: "Somente é aceitado string" });

    const textConvert = item
      .split("")
      .map((char) => {
        if (char === char.toLowerCase()) {
          return char.toUpperCase();
        } else {
          return char.toLowerCase();
        }
      })
      .join("");
    console.log(textConvert);

    return res.status(201).json({ convert: textConvert });
  },
};
