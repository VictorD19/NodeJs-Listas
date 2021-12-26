const filesystem = require("fs");

const getListDate = (month) => {
    const date = new Date();
    const year = date.getFullYear();
    const numDays = new Date(year, month, 0);
    const listDate = [];
  
    for (let day = 1; day <= numDays.getDate(); day++) {
      if (month == 12 || month == 1) month--;
      let dayOfWeek = new Date(year, month, day);
      if (!(dayOfWeek.getDay() == 0 || dayOfWeek.getDay() == 6))
        listDate.push(`${day}/${month}/${year}`);
    }
    return listDate;
  };

const getDataJson = (nameJson)=>{
  const data =  JSON.parse(
    filesystem.readFileSync("src/" + `${nameJson}.json`, "utf-8")
  );
  return data
}
  module.exports = {
    getListDate,
    getDataJson
  };
    