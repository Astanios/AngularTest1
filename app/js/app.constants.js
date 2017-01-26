angular.module('app.constants', [])

.constant('APP', {version:'1.1.4'})
.constant("HOST", {
        LDEV: "http://127.0.0.1:8000/",
        PDEV: "http://162.243.243.166:8000/",
        LCDEV:"http://162.243.243.166:3000/",
        LQA: "",
        PQA: "",
        LPRO: "",
        PPRO: "",
        ENV: "LCDEV"

 });