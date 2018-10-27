
const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const script = (async (yargs) => {
  try {
    const source = await readFile('./src/slides.html', 'utf8');
    let md = await readFile(`${yargs.input}`);
    let final = source.replace(/(\<textarea id\=\"source\"\>)(.*)(\<\/textarea\>)/s, `$1 ${md} $3`)
    await writeFile(yargs.output, final);
    console.log(`Success writing ${yargs.output}`);
  } catch(err){
    if(err.code = 'ENOENT'){
      console.log('The file source.md doesn´t exist. Please provide an --input parameter.')
    }
  }
})

let yargs = require('yargs')
    .usage('$0 [args]', 'Compile markdown to HTML slides using remark', yargs => {
      return yargs.options({
        'input': {
          alias: 'i',
          default: 'source.md',
          describe: 'Input file including extension'
        },
        'output': {
            alias: 'o',
            default: 'slides.html',
            describe: 'Output file including extension'
          },
      })
  }, argv => {
    script(argv)
  })
    .help()
    .argv
