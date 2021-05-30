"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootServer = void 0;
const common_1 = require("../common");
const bootServer = () => {
    common_1.app.use(common_1.express.json({ limit: '50mb' }));
    common_1.app.listen(common_1.environment.port, () => {
        console.log(`Listen on port ${common_1.environment.port}`);
    });
};
exports.bootServer = bootServer;
//# sourceMappingURL=server.boot.js.map