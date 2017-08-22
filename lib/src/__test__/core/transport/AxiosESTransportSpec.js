"use strict";
var _this = this;
var _1 = require("../../../");
require("jasmine-ajax");
var axios_1 = require("axios");
describe("AxiosESTransport", function () {
    beforeEach(function () {
        jasmine.Ajax.install();
        _this.host = "http://search:9200/";
        _this.transport = new _1.AxiosESTransport(_this.host);
    });
    afterEach(function () {
        jasmine.Ajax.uninstall();
    });
    it("constructor()", function () {
        expect(_this.transport.host).toBe(_this.host);
        expect(_this.transport.options.headers).toEqual({});
        var axiosConfig = _this.transport.axios.defaults;
        expect(axiosConfig.baseURL).toBe(_this.host);
        expect(axiosConfig.timeout).toBe(_1.AxiosESTransport.timeout);
        expect(axiosConfig.headers).toEqual(axios_1.default.defaults.headers);
        expect(_this.transport instanceof _1.ESTransport).toBe(true);
    });
    it("constructor() - additional options", function () {
        var transport = new _1.AxiosESTransport(_this.host, {
            headers: {
                "Content-Type": "application/json",
            },
            basicAuth: "key:val",
            searchUrlPath: "/_search/",
            timeout: 10000
        });
        expect(transport.options.headers).toEqual({
            "Content-Type": "application/json"
        });
        expect(transport.axios.defaults.auth.username).toBe("key");
        expect(transport.axios.defaults.auth.password).toBe("val");
        expect(transport.options.timeout).toEqual(10000);
        expect(transport.options.searchUrlPath).toBe("/_search/");
    });
    it("search()", function (done) {
        var mockResults = { hits: [1, 2, 3] };
        _this.host = "http://search:9200/";
        _this.transport = new _1.AxiosESTransport(_this.host, {
            searchUrlPath: "/search"
        });
        jasmine.Ajax.stubRequest(_this.host + "search").andReturn({
            "responseText": JSON.stringify(mockResults)
        });
        _this.transport.search({
            size: 10,
            from: 0
        }).then(function (result) {
            expect(result.hits).toEqual([1, 2, 3]);
            var request = jasmine.Ajax.requests.mostRecent();
            expect(request.method).toBe("POST");
            expect(request["data"]()).toEqual({ size: 10, from: 0 });
            done();
        });
    });
    it("search - basicAuth", function (done) {
        var mockResults = { hits: [1, 2, 3] };
        _this.host = "http://search:9200/";
        _this.transport = new _1.AxiosESTransport(_this.host, {
            searchUrlPath: "/search",
            basicAuth: 'user:pass'
        });
        jasmine.Ajax.stubRequest(_this.host + "search").andReturn({
            "responseText": JSON.stringify(mockResults)
        });
        _this.transport.search({
            size: 10,
            from: 0
        }).then(function (result) {
            expect(result.hits).toEqual([1, 2, 3]);
            var request = jasmine.Ajax.requests.mostRecent();
            expect(request.requestHeaders['Authorization'])
                .toEqual("Basic " + btoa("user:pass"));
            done();
        });
    });
    it("search - withCredentials", function (done) {
        document.cookie = axios_1.default.defaults.xsrfCookieName + '=12345';
        var mockResults = { hits: [1, 2, 3] };
        _this.host = "http://search:9200/";
        _this.transport = new _1.AxiosESTransport(_this.host, {
            searchUrlPath: "/search",
            withCredentials: true
        });
        jasmine.Ajax.stubRequest(_this.host + "search").andReturn({
            "responseText": JSON.stringify(mockResults)
        });
        _this.transport.search({
            size: 10,
            from: 0
        }).then(function (result) {
            expect(result.hits).toEqual([1, 2, 3]);
            var request = jasmine.Ajax.requests.mostRecent();
            expect(request.requestHeaders[axios_1.default.defaults.xsrfHeaderName]).toEqual('12345');
            done();
        });
    });
    it("test timeout", function () {
        _1.AxiosESTransport.timeout = 10;
        _this.transport = new _1.AxiosESTransport(_this.host);
        expect(_this.transport.axios.defaults.timeout)
            .toEqual(10);
    });
});
//# sourceMappingURL=AxiosESTransportSpec.js.map