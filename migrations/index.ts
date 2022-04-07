import { config } from 'dotenv';
import { join } from 'path';
import { exec } from 'child_process';

config();
config({ path: `.${process.env.MODE}.env` });

const [command, argForCreate] = process.argv.slice(2);
const commands = ['create', 'up', 'down', 'redo'];

if (!commands.includes(command)) throw new Error(`Expected: one from ${commands}\nActual: ${command}`);
if (command === 'create' && !argForCreate) throw new Error('"create" command require "name" argument');

const cmdStr = `\
cd ${join(__dirname, '..')} \
&& \
npx node-pg-migrate ${command} ${argForCreate || ''} \
-m migrations/up-down \
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
