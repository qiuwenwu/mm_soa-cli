# mm-soa-cli
 这是用来构建mm_soa服务端用的脚手架，用于快速搭建自动化智能网站

## 一、起步
### 1.安装mm-soa-cli
`npm i mm-soa-cli -g`
<br/>

### 2.创建mm-soa项目
`mm init <project_name>`

根据指示填写相关信息，最后确认创建信息如下：
<br/>

```javascript
{
  name: 'test',
  author: 'qww',
  version: '0.1.0',
  web_title: '网站标题',
  web_description: '网站描述',
  web_language: 'zh',
  cache: 'redis',
  timed_task: true,
  db: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  database: 'mm',
  user: 'root',
  password: 'asd123'
}
```
> 创建时，会出现
`\ Project creating...`
这是正在安装依赖，mm_expand和mm_soa，如果觉得安装太久，也可以Ctrl+C结束，然后手动安装
`npm i mm_expand mm_soa`

<br/>


### 4.启动项目
创建完成后提示如下：
```shell
Please install the tool for the first development:

        npm i cross-env nodemon -g


To get started:

        npm run dev


To start for production:

        npm run start
```
> `npm i cross-env nodemon -g` 是用于安装我们开发时所需要的模块 <br/>
`npm run dev` 是启动开发模式 <br/>
`npm run start` 是启动生产模式 <br/>

<br/>
现在就让我们 `npm run dev` 开始开发项目吧！
> 为了方便开发，我们再开启一个命令提示符窗口，通过 mm-soa-cli 辅助我们创建相关文件。

<br/>

### 5.创建应用
`mm create-app <app_name>`
创建应用命令，其实就是在项目 根目录/app 目录下创建一个文件夹，并在该文件夹下面创建空的app.json配置文件，然后mm-soa就会为自动创建好app.json配置信息，并生成了一个index.js的脚本文件。
> 配置信息是一个模板,部分的信息还需要我们手动修改

<br/>

### 5.创建插件
`mm create-plugin <plugin_name> <app_name>`
创建插件命令，其实就是在项目 根目录/app/app_name 目录下创建一个plugin文件夹，然后在 根目录/app/app_name/plugin 文件夹下再创建名为plugin_name的文件夹，并在该文件夹下面创建空的plugin.json配置文件，然后mm-soa就会为自动创建好plugin.json配置信息，并生成了一个index.js的脚本文件。
> 和创建应用一样，配置信息是一个模板, 部分的信息还需要我们手动修改

<br/>

### 5.创建API接口
`mm create-api <api_name> <app_name>`
创建API命令，会帮助我们在 /app/app_name/plugin/main/event_app_name目录下创建一个名为api_name的文件夹，并且在该文件夹下创建了一个空的api.json的文件。然后mm-soa就会为自动创建好api.json配置信息，并生成了一个index.js的脚本文件以及param.json、sql.json文件。
> 同样的，配置信息是一个模板, 部分的信息还需要我们手动修改

param.json 配置文件是用来校验请求API时的参数
sql.json 配置文件则时辅助使用mysql数据库的SQL模板

<br/>


### 6.根据数据库自动创建API及文档
当我们创建项目时，会携带有一个dev的app，这是一个辅助开发的用用。
当我们启动程序后，可以通过 `域名/api/dev/db?method=update_config&table=demo_*`来动态创建API，
> 需要注意的是`table=demo_*`，demo_*是表名，代表了以demo_开头的所有表，同时表的第一个前缀demo会被当作是应用

创建完成后会在指定的应用下创建server的插件(例如：/app/demo/plugin/server)，同时里面创建了api_demo_client、api_demo_manage、db文件夹，并且里面包含了许多文件
> 另外，如果已经创建有了API，但数据表发生了减少字段或增加字段行为，最好删除相关的API

<br/>

备注：动态创建会节省很多开发时间，但是对于数据表的设计也有严格要求，要求如下：
1. 数据表采用_命名方式，例如：user_account、user_group、user_admin
2. 数据表必须包含主键，主键最好用后缀名+_id命名，例如：user_group的主键group_id、user_admin的主键user_id

<br/>

为方便生成API和文档，数据表的字段最好采用如下方式写备注：
![](https://github.com/qiuwenwu/mm-soa-cli/blob/main/pic/table.png)

