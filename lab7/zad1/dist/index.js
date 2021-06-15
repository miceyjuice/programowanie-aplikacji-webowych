/******/ (() => { // webpackBootstrap
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly96YWQxLy4vc3JjL2NsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLENBQUMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL0B0cy1ub2NoZWNrXHJcbnZhciBfYTtcclxudmFyIHNvY2tldCA9IG5ldyBXZWJTb2NrZXQoXCJ3czovL2xvY2FsaG9zdDo4MDgwXCIpO1xyXG5zb2NrZXQub25vcGVuID0gZnVuY3Rpb24gKGUpIHtcclxuICAgIGFsZXJ0KFwiQ29ubmVjdGVkXCIpO1xyXG59O1xyXG5zb2NrZXQub25tZXNzYWdlID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgIHZhciBfYTtcclxuICAgIHZhciBuZXdEYXRhID0gSlNPTi5wYXJzZShkYXRhLmRhdGEpLnBheWxvYWQubWVzc2FnZTtcclxuICAgIHZhciBuZXdMaXN0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuICAgIG5ld0xpc3RFbGVtZW50LnRleHRDb250ZW50ID0gbmV3RGF0YTtcclxuICAgIChfYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWVzc2FnZXNcIikpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5hcHBlbmRDaGlsZChuZXdMaXN0RWxlbWVudCk7XHJcbn07XHJcbihfYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VuZFwiKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgbWVzc2FnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXNnXCIpLnZhbHVlO1xyXG4gICAgdmFyIG1lc3NhZ2VPYmogPSB7XHJcbiAgICAgICAgdHlwZTogXCJORVdfTUVTU0FHRVwiLFxyXG4gICAgICAgIHBheWxvYWQ6IHtcclxuICAgICAgICAgICAgYXV0aG9yOiBcIlBld2F1XCIsXHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXHJcbiAgICAgICAgfSxcclxuICAgIH07XHJcbiAgICBzb2NrZXQuc2VuZChKU09OLnN0cmluZ2lmeShtZXNzYWdlT2JqKSk7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9