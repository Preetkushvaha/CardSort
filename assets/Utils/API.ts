import { APINAME } from "../Constants/GameConstants";

export default class API {
    getRequest(apiName, options, callback): Promise<any> {
        return new Promise((resolve: any, reject: any) => {
            // var decryptor = new Decryptor();
            var request_url = this.getAPIURL(apiName);
            var http = new XMLHttpRequest();
            http.timeout = 10000; //7 seconds
            var self = this;
            var params = '';
            if (options) {
                for (var key in options) {
                    params += ((Object.keys(options)[0] == key) ? '?' : '&') + key + '=' + options[key];
                }
            }
            http.open("GET", request_url + params, true);

            http.onreadystatechange = function () {
                if (http.responseText) {
                    var responseJSON = eval(`(${http.responseText})`)
                } else {
                    // var responseJSON = {};
                }
                switch (http.readyState) {
                    case 4:
                        // console.log("response : ", responseJSON);
                        if (responseJSON.length == 0) {
                            return reject(responseJSON);
                        }
                        if (Object.keys(responseJSON).length > 0) {
                            callback(responseJSON);
                            return resolve(responseJSON);
                        }
                }
            };

            http.ontimeout = function () {
                console.log("ontimeout");
                var errorJson = {
                    "status": {
                        "resp_code": 405,
                        "resp_message": "Please make sure you have good network and try again",
                        "heading": "Oops! Internet Problem"
                    }
                };
                callback(errorJson);
                return reject(errorJson);
            };

            http.onerror = function () {
                console.log("error");
                var errorJson = {
                    "status": {
                        "resp_code": 405,
                        "resp_message": "Please make sure you have good network and try again",
                        "heading": "Oops! Internet Problem"
                    }
                };
                callback(errorJson);
                return reject(errorJson);
            };

            http.send();
        })
    }

    public postRequest(apiName: APINAME, postData: any, callback): Promise<any> {
        return new Promise((resolve: any, reject: any) => {
            const request_url = this.getAPIURL(apiName);
            const http = new XMLHttpRequest();
            http.timeout = 15000; // 7 secondds

            http.open('POST', request_url, true);
            http.setRequestHeader('authorization', 'Bearer ' + '');
            http.setRequestHeader('Content-type', 'application/json');
            http.onreadystatechange = function () {
                let responseJSON: any = {};
                if (http.responseText) {
                    responseJSON = eval(`(${http.responseText})`);
                    // var responseJSON = decryptor.decrypt(http.responseText);
                }
                switch (http.readyState) {
                    case 4:
                        if (Object.keys(responseJSON).length > 0) {
                            resolve(responseJSON);
                        }
                }
            };

            http.ontimeout = function () {
                const errorJson = {
                    status: {
                        resp_code: 405,
                        heading: 'Whoops!',
                        resp_message: 'Please make sure you have good network and try again',
                    },
                };
                // window.PopUpManager.show(window.PopUpType.Error, {
                //     error: 'Please make sure you have good network and try again',
                //     action: 'Restart',
                // });
                return reject(errorJson);
            };

            http.onerror = function () {
                const errorJson = {
                    status: {
                        resp_code: 405,
                        heading: 'Whoops!',
                        resp_message: 'Please make sure you have good network and try again',
                    },
                };
                // window.PopUpManager.show(window.PopUpType.Error, {
                //     error: 'Please make sure you have good network and try again',
                //     action: 'Restart',
                // });
                return reject(errorJson);
            };

            http.send(JSON.stringify(postData));
        });
    }

    private errorCases(code: number): string {
        switch (code) {
            case 401:
                return 'Login Failed';
            case 414:
                return 'You have already played today\nCome back tomorrow!';
            case 415:
                return 'You have already played\nin this season\nCome back again in the next season!';
            case 3001:
            // case 3013:
            //     return "Something Went Wrong";
            case 3002:
            case 3003:
            case 3004:
            case 3006:
            case 3007:
                return 'Login Failed';
            case 3005:
            case 1001:
                return 'Something Went Wrong';
            case 3011:
            case 3012:
                return 'Please Login again';
            case 1200:
                return 'You have not initiated the payment.';
            case 1201:
                return 'You have trying to play without payment.';
            case 1202:
                return 'Looks like you cancelled the payment.';

            default:
                return '';
        }
    }

    private getAPIURL(name: APINAME): string {
        // TODO for production use this url( https://leaderboard-prod.bombayplay.com/minesweeper/get_top_scores)
        switch (name) {
            case APINAME.TOPLEADERBOARD:
                return 'https://bonza-test-server-6tghwe1x.uk.gateway.dev/test/lb/get_top_scores';
            case APINAME.LEADERBOARD:
                return 'https://bonza-test-server-6tghwe1x.uk.gateway.dev/test/lb/get_top_scores';
            case APINAME.USER_ENTRY:
                return 'https://bonza-test-server-6tghwe1x.uk.gateway.devtest/lb/get_scores?payload=eyJ1c2VyaWRzIjpbInRlc3RfdXNlcl8xIiwidGVzdF91c2VyXzIiLCJ0ZXN0X3VzZXJfMyIsInRlc3RfdXNlcl80Il0sImxlYWRlcmJvYXJkIjoidGVzdF9ib2FyZF8xIn0=';
            case APINAME.SET_SCORE:
                return 'https://bonza-test-server-6tghwe1x.uk.gateway.dev/test/lb/set_score';
            case APINAME.SET_PROFILE:
                return 'https://bonza-test-server-6tghwe1x.uk.gateway.dev/test/lb/set_profile';
        }
        //         'https://leaderboard-{{stage}}.bombayplay.com/{{game_id}}/set_score' \
        // --data-raw '[{
        //     "board": "{{board}}",
        //     "userid": "rand",
        //     "score": "249",
        //     "country": "IN"
        // }]'
    }
}
