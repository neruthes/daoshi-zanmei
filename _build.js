// Copyright (c) 2020 Neruthes <https://neruthes.xyz>.
// Published under GPLv2.

const fs = require('fs');
const child_process = require('child_process');
const exec = child_process.exec;
const qsort = require('@alvarocastro/quicksort');

// -----------------------------------------------------------------------------

const renderReviewItem = function (reviewItem, i) {
    return `<div class="review-item">
        <div class="review-item--index">
            #${i}
        </div>
        <div class="review-item--date-and-author">
            ${reviewItem.date} | ${reviewItem.author}
        </div>
        <h3 class="review-item--summary">
            ${reviewItem.summary}
        </h3>
        <div class="review-item--full-text">
            ${reviewItem.full}
        </div>
    </div>`;
};

const renderReviewsList = function (reviewsList, i) {
    return reviewsList.map(renderReviewItem).reverse().join('');
};

var listOfFiles = fs.readdirSync('reviews');

const globalDataEntries = listOfFiles.map(function (fileName) {
    var stdName = fileName.replace('.txt', '');
    var rawData = fs.readFileSync(`reviews/${fileName}`).toString().replace(/\r/g, '').trim();
    var midData1 = rawData.split('\n\n------\n\n');
    var midData2 = midData1[0].split('\n');
    var midData3 = midData1[1].split('\n\n');
    var entryDataObj = {
        meta: {},
        list: []
    };
    midData2.map(function (line) {
        var key = line.split(': ')[0];
        var val = line.split(': ')[1];
        entryDataObj.meta[key] = val;
    });
    midData3.map(function (record, i) {
        var lines = record.split('\n');
        entryDataObj.list[i] = {
            date: lines[0].slice(3),
            author: lines[1].slice(3),
            summary: lines[2].slice(3),
            full: lines[3].slice(3)
        };
    });
    return entryDataObj;
});

const BuildTargets = {};

BuildTargets.DetailPages = function () {
    globalDataEntries.map(function (entryDataObj) {
        var myHtml = `
            <!DOCTYPE html>
            <html>
                <head>
                    <meta charset="utf-8" />
                    <title>${entryDataObj.meta.COM} - 导师赞美</title>
                    <link rel="stylesheet" href="../css/main.css" />
                </head>
                <body>
                    <div class="container">
                        <header class="content">
                            <div class="content-inner">
                                <h1><a href="../../">导师赞美</a></h1>
                            </div>
                        </header>
                    </div>
                    <div class="container">
                        <div class="section-profile content">
                            <div class="">
                                <div class="content-inner">
                                    <h2 class="profile--name">${entryDataObj.meta.COM}</h2>
                                    <p class="profile--meta">${entryDataObj.meta.INS} - ${entryDataObj.meta.DEP}</p>
                                    <p class="profile--bio">简介：<br />${entryDataObj.meta.DES}</p>
                                </div>
                            </div>
                        </div>
                        <div class="content" style="padding: 20px 0 40px">
                            <h3 class="content-inner">
                                赞美列表（${entryDataObj.list.length}）
                            </h3>
                        </div>
                        <div class="content" style="padding: 20px 0 40px; text-align: center;">
                            <a style="color: #FFF; text-decoration: none; background: #07F; border-radius: 6px; display: inline-block; padding: 10px 18px; margin: 0;" href="https://github.com/neruthes/daoshi-zanmei/edit/master/reviews/${entryDataObj.meta.STD}.txt">为这位导师添加赞美</a>
                        </div>
                        <div class="section-profile content">
                            <div class="">
                                <div class="content-inner">
                                    ${renderReviewsList(entryDataObj.list)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="container">
                        <footer class="content">
                            <div class="content-inner" style="padding: 80px 0 100px;">
                                &copy; 2020 导师赞美<br />
                                GitHub: <a href="https://github.com/neruthes/daoshi-zanmei">neruthes/daoshi-zanmei</a>
                            </div>
                        </footer>
                    </div>
                </body>
            </html>`;
        fs.writeFileSync(`www/reviews/${entryDataObj.meta.STD}.html`, myHtml);
    });
};

BuildTargets.ProfilesList = function () {
    var globalDataEntriesSorted = qsort(globalDataEntries, function (left, right) {
        if (left.list.length > right.list.length) {
            return -1;
        };
        if (left.list.length < right.list.length) {
            return 1;
        };
        if (left.meta.STD < right.meta.STD) {
            return -1;
        } else {
            return 1;
        };
    });
    const renderProfilesList = function () {
        return globalDataEntriesSorted.map(function (entryDataObj) {
            return `<tr>
                <td>${entryDataObj.list.length}</td>
                <td><a href="./reviews/${entryDataObj.meta.STD}.html">${entryDataObj.meta.COM}</a></td>
                <td>${entryDataObj.meta.INS}</td>
            </tr>`;
        }).join('');
    };
    const myMdTable = globalDataEntriesSorted.map(function (entryDataObj) {
        return `${entryDataObj.list.length} | [${entryDataObj.meta.COM}](./reviews/${entryDataObj.meta.STD}.html) | ${entryDataObj.meta.INS}`;
    }).join('\n');
    const myHtml = `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8" />
                <title>导师列表 - 导师赞美</title>
                <link rel="stylesheet" href="./css/main.css" />
            </head>
            <body>
                <div class="container">
                    <header class="content">
                        <div class="content-inner">
                            <h1><a href="../../">导师赞美</a></h1>
                        </div>
                    </header>
                </div>
                <div class="container">
                    <div class="section-profile content">
                        <div class="">
                            <div class="content-inner">
                                <table>
                                    <style>
                                    table { border-collapse: collapse; width: 100%; }
                                    th, td { text-align: left; border: 1px solid #DDD; min-width: 90px; }
                                    </style>
                                    <thead>
                                        <tr>
                                            <th>赞美数</th>
                                            <th>名称</th>
                                            <th>机构</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${renderProfilesList()}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container">
                    <footer class="content">
                        <div class="content-inner" style="padding: 80px 0 100px;">
                            &copy; 2020 导师赞美<br />
                            GitHub: <a href="https://github.com/neruthes/daoshi-zanmei">neruthes/daoshi-zanmei</a>
                        </div>
                    </footer>
                </div>
            </body>
        </html>`;
    fs.writeFileSync(`www/ProfilesList.html`, myHtml);
    fs.writeFileSync(`README.md`, fs.readFileSync('README-tmpl.md').toString().replace('{{TABLE}}', myMdTable));
};

const myTarget = process.argv[2];
if (Object.keys(BuildTargets).indexOf(myTarget) !== -1) {
    console.log(`Build target: ${myTarget}.\nBuilding...`);
    BuildTargets[myTarget]();
} else {
    console.error(`Build target "${myTarget}" does not exist.`)
};
