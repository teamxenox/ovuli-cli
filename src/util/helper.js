const fs = require('fs');

const appendData = (jsonData, lastDate, result) => {
  let jsonDataHistory = JSON.parse(jsonData).history;
  jsonDataHistory.push({ ...lastDate, ...result });
  fs.writeFileSync(
    './data.json',
    JSON.stringify(
      { previousData: { ...lastDate, ...result }, history: jsonDataHistory },
      null,
      2
    ),
    'utf-8'
  );
};

const saveData = (lastDate, result) => {
  fs.readFile('./data.json', 'utf8', (err, jsonData) => {
    if (err) {
      fs.writeFileSync(
        './data.json',
        JSON.stringify(
          {
            previousData: { ...lastDate, ...result },
            history: [{ ...lastDate, ...result }]
          },
          null,
          2
        ),
        'utf-8'
      );
    } else {
      appendData(jsonData, lastDate, result);
    }
  });
};

module.exports = {
  saveData,
  appendData
};
