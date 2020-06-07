var Component           = require('ijs-server/component')
var express             = require('express');
var ParseServer         = require('parse-server').ParseServer;

module.exports = class IJSParseServer extends Component {
    constructor() {
        super();
        this.$_name = 'IJSParseServer'
        this.defaultConfig = {
            database_uri: 'mongodb://localhost/dev',
            app_id: 'myAppId',
            master_key: 'myMasterKey',
            server_url: 'http://localhost:1337/parse',
            mount_path: '/parse',
            port: 1337
        }
        this.ready = false
    }
    async startup() {
        var isReadyExpressServer = !!this.server.expressServer
        var app = this.server.expressServer || express();
        var api = new ParseServer({
            databaseURI: this.config.get('database_uri'),
            appId: this.config.get('app_id'),
            masterKey: this.config.get('master_key'),
            serverURL: this.config.get('server_url')
        });

        // Serve the Parse API on the /parse URL prefix
        app.use(this.config.get('mount_path'), api);
        if (!isReadyExpressServer) {
            app.listen(this.config.get('port'), () => {
                this.logDebug(3, 'IJSParseServer ready start at port ' + this.config.get('port'))
                this.ready = true
                this.emit('server-started', this.ready)
            }); 
        }
    }
}