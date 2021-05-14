/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!***********************!*\
  !*** ./src/client.ts ***!
  \***********************/

//@ts-nocheck
var _a;
var socket = new WebSocket("ws://localhost:8080");
socket.onopen = function (e) {
    alert("Connected");
};
socket.onmessage = function (data) {
    var _a;
    var newData = JSON.parse(data.data).payload.message;
    var newListElement = document.createElement("li");
    newListElement.textContent = newData;
    (_a = document.getElementById("messages")) === null || _a === void 0 ? void 0 : _a.appendChild(newListElement);
};
(_a = document.getElementById("send")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
    var message = document.getElementById("msg").value;
    var messageObj = {
        type: "NEW_MESSAGE",
        payload: {
            author: "Pewau",
            message: message,
        },
    };
    socket.send(JSON.stringify(messageObj));
});

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly96YWQxLy4vc3JjL2NsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLENBQUMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuLy9AdHMtbm9jaGVja1xyXG52YXIgX2E7XHJcbnZhciBzb2NrZXQgPSBuZXcgV2ViU29ja2V0KFwid3M6Ly9sb2NhbGhvc3Q6ODA4MFwiKTtcclxuc29ja2V0Lm9ub3BlbiA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICBhbGVydChcIkNvbm5lY3RlZFwiKTtcclxufTtcclxuc29ja2V0Lm9ubWVzc2FnZSA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICB2YXIgX2E7XHJcbiAgICB2YXIgbmV3RGF0YSA9IEpTT04ucGFyc2UoZGF0YS5kYXRhKS5wYXlsb2FkLm1lc3NhZ2U7XHJcbiAgICB2YXIgbmV3TGlzdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XHJcbiAgICBuZXdMaXN0RWxlbWVudC50ZXh0Q29udGVudCA9IG5ld0RhdGE7XHJcbiAgICAoX2EgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1lc3NhZ2VzXCIpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuYXBwZW5kQ2hpbGQobmV3TGlzdEVsZW1lbnQpO1xyXG59O1xyXG4oX2EgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlbmRcIikpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIG1lc3NhZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1zZ1wiKS52YWx1ZTtcclxuICAgIHZhciBtZXNzYWdlT2JqID0ge1xyXG4gICAgICAgIHR5cGU6IFwiTkVXX01FU1NBR0VcIixcclxuICAgICAgICBwYXlsb2FkOiB7XHJcbiAgICAgICAgICAgIGF1dGhvcjogXCJQZXdhdVwiLFxyXG4gICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlLFxyXG4gICAgICAgIH0sXHJcbiAgICB9O1xyXG4gICAgc29ja2V0LnNlbmQoSlNPTi5zdHJpbmdpZnkobWVzc2FnZU9iaikpO1xyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==