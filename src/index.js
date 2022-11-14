"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.auroraMigrationRunnerHandler = void 0;
var child_process_1 = require("child_process");
var path = require("path");
// import {SecretsManager} from "aws-sdk";
// interface SecretCredentials {
//     username: string;
//     password: string;
//     dbname: string;
//     port: string;
// }
var auroraMigrationRunnerHandler = function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var command_1, schema, options, fileToExecute_1, commandsToExecuteFileWith_1, err_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                command_1 = (_a = event.command) !== null && _a !== void 0 ? _a : "deploy";
                schema = event.schema;
                options = schema ? ["--schema=".concat(schema)] : [];
                if (command_1 == "reset") {
                    // skip confirmation and code generation
                    options = __spreadArray(__spreadArray([], options, true), ["--force", "--skip-generate"], false);
                }
                // const connectionUrl = await fetchConnectionUrl();
                process.env.DATABASE_URL = "test-url";
                fileToExecute_1 = path.resolve("./node_modules/prisma/build/index.js");
                commandsToExecuteFileWith_1 = ["migrate", command_1].concat(options);
                return [4 /*yield*/, new Promise(function (resolve, _) {
                        (0, child_process_1.execFile)(fileToExecute_1, commandsToExecuteFileWith_1, function (error, _, stderr) {
                            if (error != null || stderr != null) {
                                console.log(stderr);
                                resolve({
                                    success: false,
                                    message: "prisma migrate ".concat(command_1, " exited with error ").concat(error.message)
                                });
                            }
                            else {
                                resolve({
                                    success: true
                                });
                            }
                        });
                    })];
            case 1: return [2 /*return*/, _b.sent()];
            case 2:
                err_1 = _b.sent();
                return [2 /*return*/, {
                        success: false,
                        message: err_1.message
                    }];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.auroraMigrationRunnerHandler = auroraMigrationRunnerHandler;
// const fetchConnectionUrl = async (): Promise<string> => {
//     const secretName = process.env.MIGRATION_ROLE_SECRET_NAME as string;
//     const secretCredentials = await fetchSecretValue(secretName);
//     const proxyEndpoint = process.env.RDS_PROXY_ENDPOINT;
//
//     return `postgresql://${secretCredentials.username}:${encodeURIComponent(
//         secretCredentials.password
//     )}@${proxyEndpoint}:${secretCredentials.port}/${
//         secretCredentials.dbname
//     }?schema=public&sslmode=require`;
// };
//
// const fetchSecretValue = async (
//     secretName: string
// ): Promise<SecretCredentials> => {
//     const secretsRequest = await new SecretsManager()
//         .getSecretValue({ SecretId: secretName })
//         .promise();
//     if (secretsRequest.SecretString) {
//         return JSON.parse(secretsRequest.SecretString);
//     } else {
//         throw new Error("Unable to retrieve role secret");
//     }
// };
