const { config } = require('dotenv');
const { exec } = require('child_process');
const { join } = require('path');

config();

const { MODE } = process.env;
const [command, argForCreate] = process.argv.slice(2);
const commands = ['create', 'up', 'down'];

if (!commands.includes(command)) throw new Error(`Expected: one from ${commands}\nActual: ${command}`);
if (command === 'create' && !argForCreate) throw new Error('"create" command require "name" argument');

const cmdStr = `\
cd ${join(__dirname, '..')} \
&& \
npx node-pg-migrate ${command} ${argForCreate || ''} \
-f migrations/.${MODE}.config.json \
--tsconfig tsconfig.json
`;

console.info(`run: ${cmdStr}`);

exec(cmdStr, (err, stdOut, stdErr) => {
  if (err) {
    throw err;
  }

  console.info(stdOut);
  console.error(stdErr);
});
