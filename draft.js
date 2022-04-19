/* eslint-disable @typescript-eslint/no-var-requires */
const bcrypt = require('bcrypt');

console.time('salt');
const salt = bcrypt.genSaltSync(1);
console.timeEnd('salt');
console.info(salt);
console.time('hash');
const hash = bcrypt.hashSync('ok', salt);
console.timeEnd('hash');
console.info(hash);
console.time('decode');
const decode = bcrypt.compareSync('test', hash);
console.timeEnd('decode');
console.info(decode);
