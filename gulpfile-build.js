// console.log('构建生成环境的包')
let {task,src,dest,watch,series,parallel} = require('gulp')
let load = require('gulp-load-plugins')()
let del = require('del')

// 删除dist目录
async function delDist(){
  await del('./dist')
}

// 处理图片
async function img(){
  src('./img/*.*')
  .pipe(dest('./dist/img'))
}

// 处理JS
async function script(){
  src('./js/*.js')
  .pipe(load.babel({ presets: ['@babel/env']}))// ES6转ES5
  .pipe(load.uglify())// 压缩js
  .pipe(load.rev())// 给文件名添加哈希值
  .pipe(dest('./dist/js'))// 保存
  .pipe(load.rev.manifest())// 生成记录哈希值的json文件
  .pipe(dest('./rev/js'))// 保存
}

// 处理sass
async function sass(){
  src('./sass/*.scss')
  .pipe(load.sassChina())// sass转成css
  .pipe(load.minifyCss())// 压缩css
  .pipe(load.rev())// 给文件名添加哈希值
  .pipe(dest('./dist/css'))// 保存
  .pipe(load.rev.manifest())// 生成记录哈希值的json文件
  .pipe(dest('./rev/css'))// 保存
}

// 处理html
async function html(){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{// 延迟执行html任务
      resolve()
      src(['./rev/**/*.json','./pages/*.html'])
      .pipe(load.revCollector({
        replaceReved: true// 根据之前生成的json配置，用带哈希值的文件替换原来文件
      }))
      .pipe(load.minifyHtml())// 压缩html
      .pipe(dest('./dist'))
    },2000)
  })
}

// 打包任务
task('build', async ()=>{
  await delDist()
  await img()
  await script()
  await sass()
  await html()
})
