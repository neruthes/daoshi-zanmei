# 导师赞美

## 简介

本 repo 旨在发动一场社会实验。在导师评价网退出历史舞台后，帮助导师们得到赞美。

只允许赞美，不允许批评。赞美不热烈，不能等于批评。

## 约法三章

- 本 repo 只允许赞美导师。伪装成赞美的批评不会被接受。
- 如果需要匿名性，贡献者应当自己想办法保持匿名，例如使用专门的小号来提 PR。
- 维护者只对每个 PR 实施格式审查而不实施内容审查，更不会审查提交者是否真的是该导师的学生；参阅者应当自己辨别赞美内容的真实性。

## 如何提交赞美

### 1. 确定导师的标准化名称

如果导师拥有本人和国籍所在国政府同时认可的汉字名称，那么可以使用。汉字名称须使用 GB18030 规定的标准简体字；对于日本创造的和制汉字，如果在 GB18030 中没有对应的字，那么可以使用 JIS 的字。姓在前，名在后，中间使用下划线连接。例如，刘德华标准化后是 `刘_德华`。

对于其他情况，应当使用 Given Name + Surname 格式，仅用 ASCII 规定的 26 个字母，中间使用下划线连接，全部字母使用小写。例如，Donald J. Trump 标准化后是 `donald_trump`。

相似名称是不可避免的。所以要在标准化名称后加上自增序列号来防止冲突。在整个系统中，第一位 `刘_德华` 将会占用 `刘_德华-1`，第二位将会占用 `刘_德华-2`。自增序列从 1 开始，与标准化名称之间用连字符（减号）连接。

### 2. 导师元数据格式

本节以刘德华为例。在没有任何赞美时，`/reviews/刘_德华-1.txt` 文件内容应当符合如下结构：

```
COM: 刘德华
STD: 刘_德华-1
INS: mit.edu
DEP: CS
DES: 这是一些不痛不痒的描述

------

```

COM 代表通用名称，STD 代表标准名称，INS 代表 Institution，DEP 代表 Department，DES 代表 Description。

对于 INS 字段，应当使用机构的网站域名。对于 DEP 字段，如果不确定或难以定义，那么就写作半角问号。

### 3. 数据记录格式

本节以刘德华为例。贡献者可以在 `/reviews/刘_德华-1.txt` 文件增加如下格式的文本：

```
D: 2020-08-27
A: 作者署名
S: 这是一个摘要
F: 这是一段很长很长的全文。
```

D 代表 Date，A 代表 Author，S 代表 Summary，F 代表 Full。

在两条赞美之间，应当使用 2 个换行符隔开。最新增加的在最下方。

## 最新摘要

赞美数 | 通用名称 | 机构
--- | --- | ---
{{TABLE}}

本列表使用字母表 A-Z 排序，下划线比 A 靠前。使用汉字书写的人名，根据本人国籍决定使用汉语拼音方案或大韩民国文观部 2001 式韩国语罗马字方案或平文式日本语罗马字。

## 版权

本 repo 本体以 GPLv2 发布，任何贡献者同意提交进来的所有内容均会被以 GPLv2 发布。

## 注意事项

- 换行符使用 LF。
- 编码使用 UTF-8。

## 后续开发计划

- 用脚本来自动化统计赞美数据。
- 用脚本来自动化检测原始数据中的格式错误。
