<h1 align="center">Welcome to element-checklist 👋</h1>
<p align="center">
  <img alt="npm version" src="https://img.shields.io/badge/version-0.0.1-blue.svg?cacheSeconds=2592000" />
   <a href="https://github.com/AlexZhong22c/element-checklist/blob/master/LICENSE">
    <img alt="License: GPL v3" src="https://img.shields.io/badge/License-AGPL%20v3-blue.svg" target="_blank" />
  </a>
  <a href='https://travis-ci.org/AlexZhong22c/element-checklist' target="_blank" alt='travis ci'>
  <img alt='travis ci' src='https://travis-ci.org/AlexZhong22c/element-checklist.svg?branch=preview'>
  </a>
</p>

> checklist工作流，快速创建 element-ui 组件代码。

## 🏠 [Homepage](https://AlexZhong22c.github.io/element-checklist/)

## Install

```sh
npm install -g element-checklist
```

## How to Use

> 服务端占用 3000 端口

`e-checklist serve`

### 表单

一份表单有两个需要编辑的地方，一个是表单本身的属性，比如表单对象，表单的 Ref（用于表单验证），另一个就是表单包含的表单元素。

表单属性在表单属性编辑区可以编辑，表单元素的生成有两种方式

- 拖拽

将表单元素拖拽到拖拽区，然后编辑表单元素属性

- 支持 JSON 转化为表单

作为一个表单编辑工具，拖拽虽然简单，但是表单数量多的时候还是很麻烦。

因为我司接口通过 swagger 管理，其 post 接口列出了数据，如下图

![swagger图](https://wpimg.wallstcn.com/98883408-e3aa-43ef-9ab8-ea9ea15d4947.png)

你可以很方便的把数据粘贴至 JSON 表单对象的输入框，支持嵌套的对象。

![表单编辑区](https://wpimg.wallstcn.com/80a00d25-c157-42f6-a4b4-3e9366dff194.png)

但是粘贴过来的数据仅有 value 值，因此我定义了`value:label` 这样的结构，value 作为表单的 value,label 作为表单的 label。注意 label 需要用引号引起来。

```js
{
  "id": 'ID',
  "title": '标题',
  "type": '类型'
}
```

然后点击生成表单即可，默认生成 Input，可在表单元素编辑区修改

### 表格

将后端返回得数据粘贴到生成表单得输入框中，生成表单，然后编辑表格头即可，后续会加上表格查询

## Author

👤 **az22c**

- Github: [@AlexZhong22c](https://github.com/AlexZhong22c)

## Show your support

Give a ⭐️ if this project helped you!
