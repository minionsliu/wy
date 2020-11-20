// 怎么知道我想要打包生成环境还开发环境？
// 需要知道输入的执行命令
// nodejs中有个全局对象 process 进程对象
// console.log( process )// {...}
// console.log( process.argv )// [...]
// console.log( process.argv[2] )// dev  build ...

let mode = process.argv[2]

switch(mode){
  case 'dev':
    require('./gulpfile-dev.js')
    break
  case 'build':
    require('./gulpfile-build.js')
    break
}
